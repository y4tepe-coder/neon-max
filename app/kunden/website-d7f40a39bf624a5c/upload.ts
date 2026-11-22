import { createHash, randomUUID } from 'node:crypto'
import { lstat, mkdir, open, readdir, realpath, rename, rm } from 'node:fs/promises'
import path from 'node:path'

const MiB = 1024 * 1024
const maxFile = 15 * MiB
const maxTotal = 35 * MiB
const maxRequest = maxTotal + 128 * 1024
const privateDirectory = '/home/u220996737/domains/neon-bw.de/.neon-kundenbogen'

export class FormError extends Error {
  constructor(public status: number, message: string, public field = '') { super(message) }
}

export async function readForm(request: Request) {
  const type = request.headers.get('content-type') || ''
  const match = /^multipart\/form-data\s*;\s*boundary=(?:"([^"]+)"|([^;\s]+))\s*$/i.exec(type)
  const boundary = match?.[1] || match?.[2]
  if (!boundary || !/^[a-zA-Z0-9'()+_,.\/:=?-]{1,70}$/.test(boundary)) {
    throw new FormError(415, 'Bitte öffnen Sie das Portal erneut und nutzen Sie das dortige Formular.')
  }
  if (!request.body) throw new FormError(400, 'Die Übermittlung ist leer.')
  const sizeError = () => new FormError(413, 'Bitte teilen Sie die Dateien auf mehrere Übermittlungen mit jeweils höchstens 35 MB auf.')
  if (Number(request.headers.get('content-length')) > maxRequest) throw sizeError()

  // Bound both bytes and part count before the platform multipart parser constructs File objects.
  const marker = Buffer.from('\r\n--' + boundary)
  let tail = Buffer.alloc(0), bytes = 0, parts = 0
  let failure: FormError | undefined
  const timeout = AbortSignal.timeout(180_000)
  const stream = request.body.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      bytes += chunk.byteLength
      if (bytes > maxRequest) { failure = sizeError(); throw failure }
      const scan = Buffer.concat([tail, chunk])
      for (let offset = scan.indexOf(marker); offset !== -1; offset = scan.indexOf(marker, offset + marker.length)) {
        if (++parts > 50) { failure = new FormError(400, 'Das Formular enthält zu viele Felder oder Dateien.'); throw failure }
      }
      tail = Buffer.from(scan.subarray(-Math.min(marker.length - 1, scan.length)))
      controller.enqueue(chunk)
    },
  }), { preventCancel: true, signal: timeout })
  try { return await new Response(stream, { headers: { 'Content-Type': type } }).formData() }
  catch { throw failure || (timeout.aborted ? new FormError(408, 'Die Übertragung hat zu lange gedauert. Bitte laden Sie die Dateien in kleineren Gruppen hoch.') : new FormError(400, 'Die Übermittlung war unvollständig.')) }
}

// Verify a standard Word package by reading its bounded central directory without extracting any content.
function isWordPackage(data: Buffer) {
  if (data.length < 22 || data.readUInt32LE(0) !== 0x04034b50) return false
  const end = data.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]))
  if (end < 0 || end + 22 > data.length || end + 22 + data.readUInt16LE(end + 20) !== data.length) return false
  const count = data.readUInt16LE(end + 10)
  let position = data.readUInt32LE(end + 16)
  if (count < 3 || count > 16384 || position + data.readUInt32LE(end + 12) !== end) return false
  const required = new Set(['[Content_Types].xml', '_rels/.rels', 'word/document.xml'])
  for (let i = 0; i < count; i++) {
    if (position + 46 > end || data.readUInt32LE(position) !== 0x02014b50 || (data.readUInt16LE(position + 8) & 1)) return false
    const nameSize = data.readUInt16LE(position + 28)
    const next = position + 46 + nameSize + data.readUInt16LE(position + 30) + data.readUInt16LE(position + 32)
    if (next > end) return false
    const name = data.toString('utf8', position + 46, position + 46 + nameSize)
    if (/vbaProject\.bin$/i.test(name)) return false
    required.delete(name)
    position = next
  }
  return position === end && required.size === 0
}

function isHeif(data: Buffer) {
  if (data.length < 16 || data.toString('ascii', 4, 8) !== 'ftyp') return false
  const end = data.readUInt32BE(0)
  if (end < 16 || end > Math.min(4096, data.length)) return false
  const brands = [data.toString('ascii', 8, 12)]
  for (let i = 16; i + 4 <= end; i += 4) brands.push(data.toString('ascii', i, i + 4))
  return !brands.some(b => ['avif','avis'].includes(b)) &&
    brands.some(b => ['heic','heix','hevc','hevx','mif1','msf1'].includes(b))
}

function validFormat(group: string, ext: string, data: Buffer) {
  if (group === 'documents') {
    if (ext === '.pdf') return /^%PDF-\d\.\d/.test(data.toString('ascii', 0, 8)) && data.subarray(-8192).includes('%%EOF')
    return ext === '.docx' && isWordPackage(data)
  }
  switch (ext) {
    case '.jpeg': case '.jpg': return data.length >= 4 && data[0] === 255 && data[1] === 216 && data[2] === 255
    case '.png': return data.length >= 33 && data.subarray(0, 8).toString('hex') === '89504e470d0a1a0a' && data.toString('ascii', 12, 16) === 'IHDR'
    case '.webp': return data.length >= 20 && data.toString('ascii', 0, 4) === 'RIFF' && data.toString('ascii', 8, 12) === 'WEBP' && /^VP8[ LX]$/.test(data.toString('ascii', 12, 16))
    case '.heic': case '.heif': return isHeif(data)
    default: return false
  }
}

export type Attachment = { group: string; name: string; data: Buffer; sha256: string }

export async function readUploads(form: FormData) {
  const result: Attachment[] = []
  let total = 0
  for (const [group, entry] of form.entries()) {
    if (typeof entry === 'string') continue
    if (!entry.name && !entry.size) continue
    if (group !== 'photos' && group !== 'documents') throw new FormError(422, 'Unbekanntes Dateifeld.')
    if (result.length >= 10) throw new FormError(422, 'Bitte wählen Sie insgesamt höchstens zehn Dateien aus.', group)
    if (!entry.size || entry.size > maxFile) throw new FormError(422, 'Bitte wählen Sie eine nicht leere Datei mit höchstens 15 MB aus.', group)
    total += entry.size
    if (total > maxTotal) throw new FormError(422, 'Die Dateien dürfen zusammen höchstens 35 MB groß sein.', group)
    const original = path.win32.basename(entry.name).normalize('NFC')
    const ext = path.extname(original).toLowerCase()
    const stem = original.slice(0, original.length - ext.length).replace(/[^\p{L}\p{N}\p{M} ._()+-]/gu, '_').replace(/^[\s.]+|[\s.]+$/g, '')
    // Bound UTF-8 bytes as well as character count for common filesystems' 255-byte name limit.
    const short = Array.from(stem).slice(0, 55).join('') || 'Datei'
    const data = Buffer.from(await entry.arrayBuffer())
    if (!validFormat(group, ext, data)) {
      throw new FormError(422, group === 'photos' ? 'Bitte wählen Sie Originalfotos im Format JPG, PNG, WebP, HEIC oder HEIF.' : 'Bitte wählen Sie ein PDF oder ein Word-Dokument im Format DOCX.', group)
    }
    result.push({ group, name: short + ext, data, sha256: createHash('sha256').update(data).digest('hex') })
  }
  return result
}

async function ensurePrivateDirectory() {
  const parent = path.dirname(privateDirectory)
  if (await realpath(parent) !== parent || !(await lstat(parent)).isDirectory()) throw Error('Storage unavailable')
  await mkdir(privateDirectory, {mode: 0o700}).catch((e: NodeJS.ErrnoException) => { if (e.code !== 'EEXIST') throw e })
  const info = await lstat(privateDirectory)
  if (!info.isDirectory() || (info.mode & 0o077) !== 0 || await realpath(privateDirectory) !== privateDirectory) throw Error('Storage unavailable')
}

async function writePrivate(file: string, data: Buffer | string) {
  const handle = await open(file, 'wx', 0o600)
  try { await handle.writeFile(data); await handle.sync() } finally { await handle.close() }
}

export async function probeStorage() {
  await ensurePrivateDirectory()
  const folder = path.join(privateDirectory, '.probe-' + randomUUID())
  await mkdir(folder, {mode: 0o700})
  try { await writePrivate(path.join(folder, 'probe'), '') }
  finally { await rm(folder, {recursive: true, force: true}) }
}

type Answers = { name: string; email: string; bereich: string; antworten: { frage: string; antwort: string }[] }

export async function saveSubmission(token: string, answers: Answers, files: Attachment[]) {
  await ensurePrivateDirectory()
  const listed = files.map((f, index) => ({
    art: f.group === 'photos' ? 'Foto' : 'Dokument',
    datei: 'Dateien/' + String(index + 1).padStart(2, '0') + '-' + f.name,
    bytes: f.data.length,
    sha256: f.sha256,
  }))
  const id = createHash('sha256').update(JSON.stringify([token, answers, listed])).digest('hex').slice(0, 32)
  const manifest = JSON.stringify({ eingegangen: new Date().toISOString(), ...answers, dateien: listed }, null, 2)
  const units = Math.max(1, Math.ceil((65536 + Buffer.byteLength(manifest) + files.reduce((n, f) => n + f.data.length, 0)) / MiB))
  const destination = path.join(privateDirectory, 'Eingang-' + id + '-' + units + 'MiB')
  const temporary = path.join(privateDirectory, '.neu-' + randomUUID() + '-' + units + 'MiB')
  // Directory names reserve space across app workers before any content is written.
  // Removing a received folder releases its quota without a separate counter.
  await mkdir(temporary, {mode: 0o700})
  try {
    const entries = await readdir(privateDirectory, {withFileTypes: true})
    if (entries.some(e => e.isDirectory() && e.name === path.basename(destination))) return
    const occupied = entries.reduce((sum, e) => {
      const match = /^(?:Eingang-[a-f0-9]{32}|\.neu-[a-f0-9-]{36})-(\d+)MiB$/.exec(e.name)
      return sum + (e.isDirectory() && match ? Number(match[1]) : e.isFile() && e.name.endsWith('.json') ? 1 : 0)
    }, 0)
    if (occupied > 1024) throw new FormError(507, 'Der private Projektordner ist voll. Bitte kontaktieren Sie Yasin Tepe, damit er Platz freigeben kann.')
    if (listed.length) await mkdir(path.join(temporary, 'Dateien'), {mode: 0o700})
    for (let i = 0; i < files.length; i++) await writePrivate(path.join(temporary, listed[i].datei), files[i].data)
    await writePrivate(path.join(temporary, 'antworten.json'), manifest)
    await rename(temporary, destination).catch((e: NodeJS.ErrnoException) => {
      if (e.code !== 'EEXIST' && e.code !== 'ENOTEMPTY') throw e
    })
  } finally { await rm(temporary, {recursive: true, force: true}) }
}
