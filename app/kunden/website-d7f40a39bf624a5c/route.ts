import { createHash, randomUUID } from 'node:crypto'
import { fields, limit, render, type Values } from './form'
import { notificationReady, notifyAfterReceipt } from './notify'
import { FormError, probeStorage, readForm, readUploads, saveSubmission } from './upload'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Mode = 'full' | 'files'
const uuidPattern = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i
const emailPattern = /^[^\s@<>(),;:"]+@[^\s@<>(),;:"]+\.[^\s@<>(),;:"]+$/
const headers = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'same-origin',
  'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; font-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
}

const rates = new Map<string, { count: number; until: number }>()
let inFlight = 0

function permit(request: Request) {
  const now = Date.now()
  for (const [key, rate] of rates) if (rate.until <= now) rates.delete(key)
  const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  const key = createHash('sha256').update(ip).digest('hex')
  const rate = rates.get(key)
  if (rate) return ++rate.count <= 18
  if (rates.size >= 3000) return false
  rates.set(key, { count: 1, until: now + 10 * 60_000 })
  return true
}

function page(values: Values, errors: Values, notice: string, token: string, status = 200, mode: Mode = 'full') {
  return new Response(render(values, errors, notice, false, token, mode), { status, headers })
}

function requestMode(request: Request): Mode {
  return new URL(request.url).searchParams.get('nachreichen') === '1' ? 'files' : 'full'
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

export async function GET(request: Request) {
  if (new URL(request.url).searchParams.get('status') === 'eingang') {
    const [storage, mail] = await Promise.all([storageStatus(), notificationReady()])
    return new Response('Private Ablage: ' + (storage === 200 ? 'bereit' : 'nicht bereit') + '\nEingangshinweis: ' + (mail ? 'Mailtransport vorhanden' : 'Mailtransport nicht verfügbar'), {
      headers: { ...headers, 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
  const notice = await storageStatus() === 200 ? '' : 'Die private Ablage ist momentan nicht erreichbar. Bitte versuchen Sie es etwas später erneut.'
  return page({}, {}, notice, randomUUID(), 200, requestMode(request))
}

function validate(data: FormData, mode: Mode) {
  const values: Values = {}, errors: Values = {}
  for (const f of fields) {
    if (mode === 'files' && !['name', 'email', 'project', 'notes'].includes(f.key)) continue
    const entries = data.getAll(f.key)
    const raw = entries[0] ?? ''
    if (entries.length > 1 || typeof raw !== 'string') {
      errors[f.key] = 'Bitte prüfen Sie die Eingabe.'
      continue
    }
    const value = raw.replace(/\r\n/g, '\n').trim()
    const max = limit(f)
    values[f.key] = value.slice(0, max)
    if (f.required && !value) errors[f.key] = 'Bitte füllen Sie dieses Feld aus.'
    if (value.length > max) errors[f.key] = 'Bitte kürzen Sie Ihre Antwort.'
    if ((f.type && /[\r\n]/.test(value)) || /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(value)) errors[f.key] = 'Bitte prüfen Sie die Eingabe.'
    if ((f.key === 'email' || f.key === 'publicEmail') && value && !emailPattern.test(value)) errors[f.key] = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
  }
  return { values, errors }
}

export async function POST(request: Request) {
  let mode = requestMode(request)
  const origin = request.headers.get('origin')
  if (origin !== 'https://neon-bw.de' && origin !== 'https://www.neon-bw.de') {
    return page({}, {}, 'Bitte öffnen Sie den ursprünglichen Formularlink und versuchen Sie es erneut.', randomUUID(), 403, mode)
  }
  if (!permit(request)) return page({}, {}, 'Es sind zu viele Anfragen eingegangen. Bitte versuchen Sie es in zehn Minuten erneut.', randomUUID(), 429, mode)
  if (inFlight >= 2) return page({}, {}, 'Das Portal bearbeitet gerade andere Dateien. Bitte versuchen Sie es in einem Moment erneut.', randomUUID(), 503, mode)

  inFlight++
  let values: Values = {}, token: string = randomUUID()
  try {
    const data = await readForm(request)
    mode = data.get('mode') === 'files' ? 'files' : 'full'
    const submitted = data.get('submission')
    if (data.get('address2') || typeof submitted !== 'string' || !uuidPattern.test(submitted)) {
      throw new FormError(400, 'Bitte öffnen Sie den Formularlink erneut und versuchen Sie es noch einmal.')
    }
    token = submitted
    const checked = validate(data, mode)
    values = checked.values
    if (Object.keys(checked.errors).length) return page(values, checked.errors, 'Bitte prüfen Sie die markierten Felder und wählen Sie Ihre Dateien erneut aus.', token, 422, mode)
    const files = await readUploads(data)
    if (mode === 'files' && !files.length && !values.notes) throw new FormError(422, 'Bitte fügen Sie eine Datei oder eine Nachricht für NEON BW hinzu.', 'notes')
    const answers = fields.filter(f => values[f.key]).map(f => ({ frage: f.label, antwort: values[f.key] }))
    const receipt = await saveSubmission(token, {
      name: values.name, email: values.email, ...(values.project ? { project: values.project } : {}), bereich: mode === 'files' ? 'Nachreichung' : 'Impressum und Datenschutz', antworten: answers,
    }, files)
    if (receipt) await notifyAfterReceipt(receipt)
    return new Response(render({}, {}, '', true, '', mode), { headers })
  } catch (e) {
    const failure = e instanceof FormError ? e : new FormError(503, 'Die Übermittlung ist nicht bestätigt. Bitte versuchen Sie es später erneut.')
    const errors = failure.field ? { [failure.field]: failure.message } : {}
    return page(values, errors, failure.message + ' Bitte wählen Sie bereits hinzugefügte Dateien beim nächsten Versuch erneut aus.', token, failure.status, mode)
  } finally { inFlight-- }
}
