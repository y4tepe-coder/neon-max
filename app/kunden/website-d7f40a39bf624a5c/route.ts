import { createHash, randomUUID } from 'node:crypto'
import { link, lstat, mkdir, open, realpath, unlink } from 'node:fs/promises'
import path from 'node:path'
import { fields, limit, render, sections, type Values } from './form'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const privateDirectory = '/home/u220996737/domains/neon-bw.de/.neon-kundenbogen'
const uuidPattern = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i
const headers = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'same-origin',
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
}

const rates = new Map<string, { count: number; until: number }>()
function permit(request: Request) {
  const now = Date.now()
  for (const [key, rate] of rates) if (rate.until <= now) rates.delete(key)
  const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  const key = createHash('sha256').update(ip).digest('hex')
  const rate = rates.get(key)
  if (rate) return ++rate.count <= 12
  if (rates.size >= 3000) return false
  rates.set(key, { count: 1, until: now + 10 * 60_000 })
  return true
}

function formPage(values: Values, errors: Values, notice: string, token: string, status = 200, fallback = '') {
  return new Response(render(values, errors, notice, false, token, fallback), { status, headers })
}

export async function GET() {
  const notice = await storageStatus() === 200 ? '' : 'Die direkte Übermittlung ist vorübergehend eingeschränkt. Sie können den Bogen ausfüllen und Ihre Antworten am Ende per E-Mail übernehmen.'
  return formPage({}, {}, notice, randomUUID())
}

async function parseBody(request: Request) {
  const reader = request.body?.getReader()
  if (!reader) return null
  let size = 0
  const parts: Uint8Array[] = []
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > 175_000) {
        await reader.cancel()
        return null
      }
      parts.push(value)
    }
  } finally { reader.releaseLock() }
  return new URLSearchParams(Buffer.concat(parts).toString('utf8'))
}

function validate(data: URLSearchParams) {
  const values: Values = {}, errors: Values = {}
  for (const f of fields) {
    const value = (data.get(f.key) || '').replace(/\r\n/g, '\n').trim()
    values[f.key] = value
    if (f.required && !value) errors[f.key] = 'Bitte füllen Sie dieses Feld aus.'
    if (value.length > limit(f)) errors[f.key] = 'Bitte kürzen Sie Ihre Antwort.'
    if ((f.type && /[\r\n]/.test(value)) || /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(value)) errors[f.key] = 'Bitte prüfen Sie die Eingabe.'
  }
  if (values.email && !/^[^\s@<>(),;:"]+@[^\s@<>(),;:"]+\.[^\s@<>(),;:"]+$/.test(values.email)) errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
  return { values, errors }
}

async function ensurePrivateDirectory() {
  // The host account's domain folder is above both its deployment tree and public_html.
  // Never create a directory chain on a different host or fall back into the app's public tree.
  const domainDirectory = path.dirname(privateDirectory)
  if (await realpath(domainDirectory) !== domainDirectory || !(await lstat(domainDirectory)).isDirectory()) {
    throw new Error('Host domain directory unavailable')
  }
  await mkdir(privateDirectory, { mode: 0o700 }).catch((e: NodeJS.ErrnoException) => {
    if (e.code !== 'EEXIST') throw e
  })
  const info = await lstat(privateDirectory)
  if (!info.isDirectory() || (info.mode & 0o077) !== 0 || await realpath(privateDirectory) !== privateDirectory) {
    throw new Error('Private directory unavailable')
  }
}

async function probeStorage() {
  await ensurePrivateDirectory()
  const probe = path.join(privateDirectory, '.probe-' + randomUUID())
  const linked = probe + '.link'
  const handle = await open(probe, 'wx', 0o600)
  try {
    await handle.close()
    await link(probe, linked)
    await unlink(linked)
  } finally { await unlink(probe) }
}

let storageCheck: { until: number; status: Promise<number> } | undefined
function storageStatus() {
  const now = Date.now()
  if (!storageCheck || now >= storageCheck.until) {
    storageCheck = { until: now + 30_000, status: probeStorage().then(() => 200, () => 503) }
  }
  return storageCheck.status
}

export async function HEAD() {
  return new Response(null, { status: await storageStatus(), headers })
}

async function savePrivate(values: Values, id: string) {
  await ensurePrivateDirectory()
  const temporary = path.join(privateDirectory, '.' + randomUUID())
  const target = path.join(privateDirectory, id + '.json')
  const handle = await open(temporary, 'wx', 0o600)
  try {
    try {
      const answers = fields.filter(f => values[f.key]).map(f => ({ frage: f.label, antwort: values[f.key] }))
      await handle.writeFile(JSON.stringify({ eingegangen: new Date().toISOString(), name: values.name, email: values.email, antworten: answers }, null, 2), 'utf8')
      await handle.sync()
    } finally { await handle.close() }
    // Exclusive link commits a complete answer set atomically; identical retries resolve to the original file.
    await link(temporary, target).catch((e: NodeJS.ErrnoException) => { if (e.code !== 'EEXIST') throw e })
  } finally { await unlink(temporary).catch(() => undefined) }
}

function message(values: Values) {
  return sections.map(s => s.title + '\n\n' + s.fields.filter(f => values[f.key]).map(f => f.label + '\n' + values[f.key]).join('\n\n')).join('\n\n')
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (origin !== 'https://neon-bw.de' && origin !== 'https://www.neon-bw.de') {
    return formPage({}, {}, 'Bitte öffnen Sie den ursprünglichen Formularlink und versuchen Sie es erneut.', randomUUID(), 403)
  }
  if (request.headers.get('content-type')?.split(';')[0] !== 'application/x-www-form-urlencoded') {
    return new Response('Unbekanntes Format.', { status: 415, headers })
  }
  const data = await parseBody(request)
  if (!data) return new Response('Die Eingabe ist zu groß.', { status: 413, headers })
  const token = data.get('submission') || ''
  const { values, errors } = validate(data)
  if (data.get('address2') || !uuidPattern.test(token)) return formPage(values, {}, 'Bitte prüfen Sie die Eingaben und versuchen Sie es erneut.', randomUUID(), 400)
  if (Object.keys(errors).length) return formPage(values, errors, 'Bitte prüfen Sie die markierten Felder.', token, 422)
  if (!permit(request)) return formPage(values, {}, 'Es sind zu viele Anfragen eingegangen. Bitte versuchen Sie es in zehn Minuten erneut.', token, 429)
  const id = createHash('sha256').update(token + JSON.stringify(values)).digest('hex')
  try {
    await savePrivate(values, id)
  } catch {
    return formPage(values, {}, 'Die Übermittlung konnte nicht bestätigt werden. Ihre Eingaben stehen weiterhin im Formular.', token, 503, message(values))
  }
  return new Response(render({}, {}, '', true), { headers })
}
