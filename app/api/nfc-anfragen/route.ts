import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BODY_BYTES = 16_384
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const RATE_LIMIT_MAX_ENTRIES = 1_000

const allowedFields = new Set([
  'company',
  'contactName',
  'role',
  'phone',
  'email',
  'website',
  'whatsapp',
  'location',
  'bio',
  'accent',
  'packageSize',
  'inquiryName',
  'inquiryEmail',
  'inquiryPhone',
  'note',
  'consent',
  'companyWebsite',
])

const accentLabels = {
  lime: 'Neon-Limette',
  blue: 'Blau',
  orange: 'Orange',
  sand: 'Sand',
} as const

const packageLabels = {
  '5': '5 Schlüsselanhänger',
  '10': '10 Schlüsselanhänger',
  '25+': '25 oder mehr Schlüsselanhänger',
} as const

type Accent = keyof typeof accentLabels
type PackageSize = keyof typeof packageLabels

interface NfcInquiry {
  company: string
  contactName: string
  role: string
  phone: string
  email: string
  website: string
  whatsapp: boolean
  location: string
  bio: string
  accent: Accent
  packageSize: PackageSize
  inquiryName: string
  inquiryEmail: string
  inquiryPhone?: string
  note?: string
  consent: true
}

interface RateLimitEntry {
  count: number
  resetAt: number
}

class RequestValidationError extends Error {
  constructor(
    message: string,
    readonly status = 400
  ) {
    super(message)
    this.name = 'RequestValidationError'
  }
}

const rateLimitEntries = new Map<string, RateLimitEntry>()

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  extraHeaders?: HeadersInit
) {
  const headers = new Headers(extraHeaders)
  headers.set('Cache-Control', 'no-store')
  headers.set('X-Content-Type-Options', 'nosniff')

  return NextResponse.json(body, {
    status,
    headers,
  })
}

function isAllowedOrigin(originHeader: string | null): boolean {
  if (!originHeader) {
    return false
  }

  try {
    const origin = new URL(originHeader)

    if (origin.origin !== originHeader) {
      return false
    }

    const isProductionHost =
      origin.hostname === 'neon-bw.de' || origin.hostname === 'www.neon-bw.de'

    if (isProductionHost) {
      return origin.protocol === 'https:' && origin.port === ''
    }

    const isLocalHost =
      origin.hostname === 'localhost' ||
      origin.hostname === '127.0.0.1' ||
      origin.hostname === '[::1]'

    return (
      isLocalHost &&
      (origin.protocol === 'http:' || origin.protocol === 'https:') &&
      (origin.port === '' ||
        (/^\d{1,5}$/.test(origin.port) &&
          Number(origin.port) >= 1 &&
          Number(origin.port) <= 65_535))
    )
  } catch {
    return false
  }
}

function getClientIdentifier(request: Request): string {
  const candidates = [
    request.headers.get('cf-connecting-ip'),
    request.headers.get('x-real-ip'),
    request.headers.get('x-forwarded-for')?.split(',')[0],
  ]

  const address = candidates
    .map((value) => value?.trim())
    .find((value): value is string => Boolean(value && /^[0-9a-f:.]{3,64}$/i.test(value)))

  if (address) {
    return address
  }

  const userAgent = request.headers.get('user-agent')?.slice(0, 160) ?? 'unknown'
  let hash = 2_166_136_261

  for (let index = 0; index < userAgent.length; index += 1) {
    hash ^= userAgent.charCodeAt(index)
    hash = Math.imul(hash, 16_777_619)
  }

  return `unknown-${(hash >>> 0).toString(16)}`
}

function checkRateLimit(identifier: string): {
  allowed: boolean
  retryAfterSeconds: number
} {
  const now = Date.now()

  for (const [key, entry] of rateLimitEntries) {
    if (entry.resetAt <= now) {
      rateLimitEntries.delete(key)
    }
  }

  const current = rateLimitEntries.get(identifier)

  if (current && current.resetAt > now) {
    if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
      }
    }

    current.count += 1
    return { allowed: true, retryAfterSeconds: 0 }
  }

  while (rateLimitEntries.size >= RATE_LIMIT_MAX_ENTRIES) {
    const oldestKey = rateLimitEntries.keys().next().value

    if (typeof oldestKey !== 'string') {
      break
    }

    rateLimitEntries.delete(oldestKey)
  }

  rateLimitEntries.set(identifier, {
    count: 1,
    resetAt: now + RATE_LIMIT_WINDOW_MS,
  })

  return { allowed: true, retryAfterSeconds: 0 }
}

async function readLimitedJson(request: Request): Promise<unknown> {
  const contentLength = request.headers.get('content-length')

  if (
    contentLength &&
    (!/^\d+$/.test(contentLength) || Number(contentLength) > MAX_BODY_BYTES)
  ) {
    throw new RequestValidationError('Die Anfrage ist zu groß.', 413)
  }

  if (!request.body) {
    throw new RequestValidationError('Die Anfrage enthält keine Daten.')
  }

  const reader = request.body.getReader()
  const decoder = new TextDecoder('utf-8', { fatal: true })
  let bytesRead = 0
  let body = ''

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        break
      }

      bytesRead += value.byteLength

      if (bytesRead > MAX_BODY_BYTES) {
        await reader.cancel()
        throw new RequestValidationError('Die Anfrage ist zu groß.', 413)
      }

      body += decoder.decode(value, { stream: true })
    }

    body += decoder.decode()
  } catch (error) {
    if (error instanceof RequestValidationError) {
      throw error
    }

    throw new RequestValidationError('Die Anfrage konnte nicht gelesen werden.')
  } finally {
    reader.releaseLock()
  }

  if (!body.trim()) {
    throw new RequestValidationError('Die Anfrage enthält keine Daten.')
  }

  try {
    return JSON.parse(body) as unknown
  } catch {
    throw new RequestValidationError('Die Anfrage enthält kein gültiges JSON.')
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  if (
    typeof value !== 'object' ||
    value === null ||
    Array.isArray(value) ||
    Object.getPrototypeOf(value) !== Object.prototype
  ) {
    throw new RequestValidationError('Ungültige Anfragedaten.')
  }

  const record = value as Record<string, unknown>

  if (Object.keys(record).some((field) => !allowedFields.has(field))) {
    throw new RequestValidationError('Die Anfrage enthält unbekannte Felder.')
  }

  return record
}

function normalizeInline(
  value: unknown,
  label: string,
  minimumLength: number,
  maximumLength: number
): string {
  if (typeof value !== 'string') {
    throw new RequestValidationError(`${label} ist erforderlich.`)
  }

  const normalized = value
    .normalize('NFKC')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (normalized.length < minimumLength || normalized.length > maximumLength) {
    throw new RequestValidationError(
      `${label} muss zwischen ${minimumLength} und ${maximumLength} Zeichen lang sein.`
    )
  }

  return normalized
}

function normalizeOptionalInline(
  value: unknown,
  label: string,
  maximumLength: number
): string | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined
  }

  return normalizeInline(value, label, 1, maximumLength)
}

function normalizeMultiline(
  value: unknown,
  label: string,
  minimumLength: number,
  maximumLength: number
): string {
  if (typeof value !== 'string') {
    throw new RequestValidationError(`${label} ist erforderlich.`)
  }

  const normalized = value
    .normalize('NFKC')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  if (normalized.length < minimumLength || normalized.length > maximumLength) {
    throw new RequestValidationError(
      `${label} muss zwischen ${minimumLength} und ${maximumLength} Zeichen lang sein.`
    )
  }

  return normalized
}

function normalizeOptionalMultiline(
  value: unknown,
  label: string,
  maximumLength: number
): string | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined
  }

  return normalizeMultiline(value, label, 1, maximumLength)
}

function normalizeEmail(value: unknown, label: string): string {
  const email = normalizeInline(value, label, 3, 254).toLowerCase()
  const separatorIndex = email.lastIndexOf('@')
  const localPart = email.slice(0, separatorIndex)
  const domain = email.slice(separatorIndex + 1)
  const domainLabels = domain.split('.')

  if (
    separatorIndex <= 0 ||
    localPart.length > 64 ||
    !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(localPart) ||
    localPart.startsWith('.') ||
    localPart.endsWith('.') ||
    localPart.includes('..') ||
    domain.length > 253 ||
    domainLabels.length < 2 ||
    !domainLabels.every((part) =>
      /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(part)
    ) ||
    !/^[a-z]{2,63}$/i.test(domainLabels.at(-1) ?? '')
  ) {
    throw new RequestValidationError(`${label} ist ungültig.`)
  }

  return email
}

function normalizePhone(
  value: unknown,
  label: string,
  optional = false
): string | undefined {
  if (optional && (value === undefined || value === null || value === '')) {
    return undefined
  }

  const phone = normalizeInline(value, label, 7, 40)

  if (!/^\+?[0-9][0-9 ()/.-]*$/.test(phone)) {
    throw new RequestValidationError(`${label} ist ungültig.`)
  }

  const compactPhone = phone.replace(/[ ()/.-]/g, '')
  const digits = compactPhone.replace(/\D/g, '')

  if (digits.length < 7 || digits.length > 15) {
    throw new RequestValidationError(`${label} ist ungültig.`)
  }

  return compactPhone.startsWith('00')
    ? `+${compactPhone.slice(2)}`
    : compactPhone
}

function normalizeWebsite(value: unknown): string {
  const rawWebsite = normalizeInline(value, 'Website', 4, 300)
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(rawWebsite)
    ? rawWebsite
    : `https://${rawWebsite}`

  let website: URL

  try {
    website = new URL(withScheme)
  } catch {
    throw new RequestValidationError('Website ist ungültig.')
  }

  if (
    !['http:', 'https:'].includes(website.protocol) ||
    website.username ||
    website.password ||
    !website.hostname ||
    website.href.length > 300
  ) {
    throw new RequestValidationError('Website ist ungültig.')
  }

  return website.toString()
}

function normalizeEnum<T extends string>(
  value: unknown,
  label: string,
  allowedValues: readonly T[]
): T {
  if (typeof value !== 'string' || !allowedValues.includes(value as T)) {
    throw new RequestValidationError(`${label} ist ungültig.`)
  }

  return value as T
}

function validateInquiry(value: unknown): NfcInquiry {
  const data = asRecord(value)

  if (typeof data.companyWebsite !== 'string') {
    throw new RequestValidationError('Ungültige Anfragedaten.')
  }

  if (data.companyWebsite.trim() !== '') {
    throw new RequestValidationError('Die Anfrage konnte nicht verarbeitet werden.')
  }

  if (data.whatsapp !== true && data.whatsapp !== false) {
    throw new RequestValidationError('WhatsApp-Auswahl ist ungültig.')
  }

  if (data.consent !== true) {
    throw new RequestValidationError(
      'Bitte stimmen Sie der Verarbeitung Ihrer Anfrage zu.'
    )
  }

  return {
    company: normalizeInline(data.company, 'Unternehmen', 2, 120),
    contactName: normalizeInline(data.contactName, 'Profilname', 2, 100),
    role: normalizeInline(data.role, 'Position', 2, 100),
    phone: normalizePhone(data.phone, 'Profil-Telefonnummer') as string,
    email: normalizeEmail(data.email, 'Profil-E-Mail-Adresse'),
    website: normalizeWebsite(data.website),
    whatsapp: data.whatsapp,
    location: normalizeInline(data.location, 'Standort', 2, 120),
    bio: normalizeMultiline(data.bio, 'Kurzbeschreibung', 5, 500),
    accent: normalizeEnum(data.accent, 'Akzentfarbe', [
      'lime',
      'blue',
      'orange',
      'sand',
    ] as const),
    packageSize: normalizeEnum(data.packageSize, 'Paketgröße', [
      '5',
      '10',
      '25+',
    ] as const),
    inquiryName: normalizeInline(data.inquiryName, 'Ansprechpartner', 2, 100),
    inquiryEmail: normalizeEmail(data.inquiryEmail, 'Kontakt-E-Mail-Adresse'),
    inquiryPhone: normalizePhone(
      data.inquiryPhone,
      'Kontakt-Telefonnummer',
      true
    ),
    note: normalizeOptionalMultiline(data.note, 'Anmerkung', 1_500),
    consent: true,
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderInquiryHtml(inquiry: NfcInquiry): string {
  const profilePhone = escapeHtml(inquiry.phone)
  const inquiryPhone = inquiry.inquiryPhone
    ? escapeHtml(inquiry.inquiryPhone)
    : 'Nicht angegeben'
  const note = inquiry.note
    ? escapeHtml(inquiry.note)
    : 'Keine zusätzliche Anmerkung'

  return `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#172019">
      <div style="background:#172019;color:#fff;padding:24px;border-radius:18px 18px 0 0">
        <p style="margin:0 0 6px;color:#c5f74f;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">NEON BW</p>
        <h1 style="margin:0;font-size:24px">Neue NFC-Schlüsselanhänger-Anfrage</h1>
      </div>
      <div style="border:1px solid #dfe4dc;border-top:0;padding:24px;border-radius:0 0 18px 18px">
        <h2 style="margin:0 0 14px;font-size:18px">Anfragendes Unternehmen</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:7px 10px 7px 0;color:#647067;width:175px">Unternehmen</td><td style="padding:7px 0;font-weight:600">${escapeHtml(inquiry.company)}</td></tr>
          <tr><td style="padding:7px 10px 7px 0;color:#647067">Ansprechpartner</td><td style="padding:7px 0;font-weight:600">${escapeHtml(inquiry.inquiryName)}</td></tr>
          <tr><td style="padding:7px 10px 7px 0;color:#647067">Kontakt-E-Mail</td><td style="padding:7px 0"><a href="mailto:${escapeHtml(inquiry.inquiryEmail)}">${escapeHtml(inquiry.inquiryEmail)}</a></td></tr>
          <tr><td style="padding:7px 10px 7px 0;color:#647067">Kontakt-Telefon</td><td style="padding:7px 0">${inquiryPhone}</td></tr>
          <tr><td style="padding:7px 10px 7px 0;color:#647067">Paket</td><td style="padding:7px 0;font-weight:600">${escapeHtml(packageLabels[inquiry.packageSize])}</td></tr>
        </table>

        <h2 style="margin:26px 0 14px;padding-top:22px;border-top:1px solid #e6eae4;font-size:18px">Daten für das konfigurierte Profil</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:7px 10px 7px 0;color:#647067;width:175px">Profilname</td><td style="padding:7px 0;font-weight:600">${escapeHtml(inquiry.contactName)}</td></tr>
          <tr><td style="padding:7px 10px 7px 0;color:#647067">Position</td><td style="padding:7px 0">${escapeHtml(inquiry.role)}</td></tr>
          <tr><td style="padding:7px 10px 7px 0;color:#647067">Profil-E-Mail</td><td style="padding:7px 0">${escapeHtml(inquiry.email)}</td></tr>
          <tr><td style="padding:7px 10px 7px 0;color:#647067">Profil-Telefon</td><td style="padding:7px 0">${profilePhone}</td></tr>
          <tr><td style="padding:7px 10px 7px 0;color:#647067">Website</td><td style="padding:7px 0"><a href="${escapeHtml(inquiry.website)}">${escapeHtml(inquiry.website)}</a></td></tr>
          <tr><td style="padding:7px 10px 7px 0;color:#647067">Standort</td><td style="padding:7px 0">${escapeHtml(inquiry.location)}</td></tr>
          <tr><td style="padding:7px 10px 7px 0;color:#647067">WhatsApp-Button</td><td style="padding:7px 0">${inquiry.whatsapp ? 'Ja' : 'Nein'}</td></tr>
          <tr><td style="padding:7px 10px 7px 0;color:#647067">Akzentfarbe</td><td style="padding:7px 0">${escapeHtml(accentLabels[inquiry.accent])}</td></tr>
        </table>

        <h3 style="margin:24px 0 8px;font-size:14px">Kurzbeschreibung</h3>
        <p style="margin:0;background:#f4f6f1;padding:14px;border-radius:10px;white-space:pre-wrap;font-size:14px;line-height:1.55">${escapeHtml(inquiry.bio)}</p>
        <h3 style="margin:20px 0 8px;font-size:14px">Anmerkung zur Anfrage</h3>
        <p style="margin:0;background:#f4f6f1;padding:14px;border-radius:10px;white-space:pre-wrap;font-size:14px;line-height:1.55">${note}</p>
      </div>
    </div>
  `
}

function renderInquiryText(inquiry: NfcInquiry): string {
  return [
    'NEUE NFC-SCHLÜSSELANHÄNGER-ANFRAGE',
    '',
    'ANFRAGENDES UNTERNEHMEN',
    `Unternehmen: ${inquiry.company}`,
    `Ansprechpartner: ${inquiry.inquiryName}`,
    `Kontakt-E-Mail: ${inquiry.inquiryEmail}`,
    `Kontakt-Telefon: ${inquiry.inquiryPhone ?? 'Nicht angegeben'}`,
    `Paket: ${packageLabels[inquiry.packageSize]}`,
    '',
    'KONFIGURIERTES PROFIL',
    `Profilname: ${inquiry.contactName}`,
    `Position: ${inquiry.role}`,
    `Profil-E-Mail: ${inquiry.email}`,
    `Profil-Telefon: ${inquiry.phone}`,
    `Website: ${inquiry.website}`,
    `Standort: ${inquiry.location}`,
    `WhatsApp-Button: ${inquiry.whatsapp ? 'Ja' : 'Nein'}`,
    `Akzentfarbe: ${accentLabels[inquiry.accent]}`,
    '',
    'Kurzbeschreibung:',
    inquiry.bio,
    '',
    'Anmerkung:',
    inquiry.note ?? 'Keine zusätzliche Anmerkung',
  ].join('\n')
}

function getRecipient(): string {
  return (
    process.env.NFC_INQUIRY_TO?.trim() ||
    process.env.NOTIFY_EMAIL?.trim() ||
    'hello@neon-bw.de'
  )
}

async function sendWithResend(
  inquiry: NfcInquiry,
  subject: string,
  html: string,
  text: string
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return false
  }

  const resend = new Resend(apiKey)
  const result = await resend.emails.send({
    from:
      process.env.NFC_FROM_EMAIL?.trim() ||
      'NEON NFC <onboarding@resend.dev>',
    to: getRecipient(),
    replyTo: inquiry.inquiryEmail,
    subject,
    html,
    text,
  })

  if (result.error) {
    console.error(
      `NFC-Resend-Ablehnung (Status: ${result.error.statusCode ?? 'unbekannt'}, Typ: ${result.error.name ?? 'unbekannt'}).`
    )
    throw new Error('Resend hat die Anfrage nicht angenommen.')
  }

  if (!result.data?.id) {
    console.error('NFC-Resend-Antwort enthielt keine Versand-ID.')
    throw new Error('Resend hat die Anfrage nicht angenommen.')
  }

  return true
}

async function sendWithSmtp(
  inquiry: NfcInquiry,
  subject: string,
  html: string,
  text: string
): Promise<boolean> {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return false
  }

  const smtpPort = Number(process.env.SMTP_PORT ?? 587)

  if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65_535) {
    throw new Error('Der konfigurierte SMTP-Port ist ungültig.')
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    requireTLS: smtpPort !== 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })

  const result = await transporter.sendMail({
    from: process.env.NFC_FROM_EMAIL?.trim() || `NEON NFC <${SMTP_USER}>`,
    to: getRecipient(),
    replyTo: inquiry.inquiryEmail,
    subject,
    html,
    text,
  })

  if (!result.accepted.length || result.rejected.length > 0) {
    throw new Error('Der SMTP-Server hat die Anfrage nicht angenommen.')
  }

  return true
}

async function deliverInquiry(inquiry: NfcInquiry): Promise<boolean> {
  const subject = `NFC-Anfrage: ${inquiry.company} – ${packageLabels[inquiry.packageSize]}`
  const html = renderInquiryHtml(inquiry)
  const text = renderInquiryText(inquiry)

  if (process.env.RESEND_API_KEY) {
    try {
      if (await sendWithResend(inquiry, subject, html, text)) {
        return true
      }
    } catch (error) {
      const errorType = error instanceof Error ? error.name : 'unbekannt'
      console.error(
        `NFC-Anfrage konnte nicht über Resend versendet werden (Typ: ${errorType}).`
      )
    }
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      if (await sendWithSmtp(inquiry, subject, html, text)) {
        return true
      }
    } catch (error) {
      const errorType = error instanceof Error ? error.name : 'unbekannt'
      console.error(
        `NFC-Anfrage konnte nicht über SMTP versendet werden (Typ: ${errorType}).`
      )
    }
  }

  return false
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request.headers.get('origin'))) {
    return jsonResponse({ error: 'Anfrage nicht erlaubt.' }, 403)
  }

  const contentType = request.headers.get('content-type')?.toLowerCase() ?? ''
  const mediaType = contentType.split(';', 1)[0].trim()

  if (mediaType !== 'application/json') {
    return jsonResponse(
      { error: 'Bitte senden Sie die Anfrage als JSON.' },
      415
    )
  }

  const rateLimit = checkRateLimit(getClientIdentifier(request))

  if (!rateLimit.allowed) {
    return jsonResponse(
      {
        error:
          'Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut.',
      },
      429,
      {
        'Retry-After': String(rateLimit.retryAfterSeconds),
      }
    )
  }

  try {
    const inquiry = validateInquiry(await readLimitedJson(request))
    const delivered = await deliverInquiry(inquiry)

    if (!delivered) {
      return jsonResponse(
        {
          error:
            'Der Versand ist momentan nicht verfügbar. Bitte schreiben Sie direkt an hello@neon-bw.de.',
        },
        503
      )
    }

    return jsonResponse(
      {
        success: true,
        message: 'Vielen Dank. Ihre Anfrage wurde erfolgreich versendet.',
      },
      200
    )
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return jsonResponse({ error: error.message }, error.status)
    }

    console.error('NFC-Anfrage konnte nicht verarbeitet werden.')
    return jsonResponse(
      {
        error:
          'Die Anfrage konnte nicht versendet werden. Bitte versuchen Sie es später erneut.',
      },
      500
    )
  }
}
