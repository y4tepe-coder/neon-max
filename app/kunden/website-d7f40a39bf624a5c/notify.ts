import { execFile } from 'node:child_process'
import { constants } from 'node:fs'
import { access, readFile, readdir, rename, stat, utimes } from 'node:fs/promises'
import path from 'node:path'

// This is the sendmail_path configured by Hostinger for neon-bw.de. The host sets
// the envelope sender. The recipient cannot be supplied or overridden by a visitor.
const sendmail = '/usr/sbin/hsendmail'
const recipient = 'y4tepe@gmail.com'
export const pendingName = 'eingangshinweis-offen.json'
const sendingName = 'eingangshinweis-in-bearbeitung.json'
const receiptPattern = /^Eingang-([a-f0-9]{32})-\d+MiB$/
export type ReceiptNotice = { received: string; project: string; replyEmail: string; files: number }

export async function notificationReady() {
  try { await access(sendmail, constants.X_OK); return true } catch { return false }
}

function compose(folder: string, notice: ReceiptNotice) {
  const id = receiptPattern.exec(folder)?.[1]
  if (!id) throw new Error('Invalid receipt reference')
  const project = notice.project.replace(/[\x00-\x1f\x7f]/g, ' ').trim().slice(0, 300)
  const date = new Date(notice.received)
  const body = [
    'Eine neue Abgabe liegt im NEON-BW-Kundenportal bereit.', '',
    ...(project ? ['Projekt: ' + project] : []), 'E-Mail für Rückfragen: ' + notice.replyEmail,
    'Eingang: ' + date.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' }) + ' (Berlin)',
    'Dateien: ' + notice.files, '',
    'Öffnen Sie https://hpanel.hostinger.com/ und wählen Sie bei neon-bw.de den Dateimanager und anschließend „Alle Hosting-Dateien“.',
    'Ordner: domains/neon-bw.de/.neon-kundenbogen/' + folder,
    'Die Angaben stehen in antworten.json, hochgeladene Originale unter Dateien/.',
  ].join('\n')
  const headers = [
    'To: ' + recipient,
    'Date: ' + date.toUTCString(),
    'Message-ID: <kundenportal-' + id + '@neon-bw.de>',
    'Subject: =?UTF-8?B?' + Buffer.from('NEON BW · Kundenportal').toString('base64') + '?= - neuer Eingang',
    'MIME-Version: 1.0', 'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: base64',
  ]
  if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/.test(notice.replyEmail)) headers.push('Reply-To: ' + notice.replyEmail)
  const encoded = Buffer.from(body).toString('base64').match(/.{1,76}/g) || []
  return [...headers, '', ...encoded, ''].join('\r\n')
}

function handToHost(message: string): Promise<'accepted' | 'retry' | 'unknown'> {
  return new Promise(resolve => {
    const child = execFile(sendmail, ['-t'], { timeout: 5000, killSignal: 'SIGKILL', maxBuffer: 16_384 }, err => {
      if (!err) resolve('accepted')
      else if (err.killed || err.signal || err.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER') resolve('unknown')
      else resolve('retry')
    })
    // A broken pipe also leads to the child process exit handled above.
    child.stdin?.on('error', () => {})
    child.stdin?.end(message)
  })
}

async function deliver(folder: string) {
  const pending = path.join(folder, pendingName)
  const sending = path.join(folder, sendingName)
  // Only one worker can claim this receipt. An interrupted or uncertain send stays
  // separate for reconciliation so an already accepted message is never re-sent.
  try { await rename(pending, sending) } catch { return }
  const notice: ReceiptNotice = JSON.parse(await readFile(sending, 'utf8'))
  const result = await handToHost(compose(path.basename(folder), notice))
  if (result === 'retry') {
    const now = new Date()
    await utimes(sending, now, now)
    await rename(sending, pending)
  } else {
    await rename(sending, path.join(folder, result === 'accepted' ? 'eingangshinweis-angenommen.json' : 'eingangshinweis-pruefen.json'))
  }
}

let nextRetryScan = 0
export async function notifyAfterReceipt(folder: string) {
  try {
    if (!await notificationReady()) return
    await deliver(folder)
    const now = Date.now()
    if (now < nextRetryScan) return
    nextRetryScan = now + 5 * 60_000
    const root = path.dirname(folder)
    for (const entry of await readdir(root, { withFileTypes: true })) {
      if (!entry.isDirectory() || !receiptPattern.test(entry.name) || entry.name === path.basename(folder)) continue
      const other = path.join(root, entry.name)
      const marker = await stat(path.join(other, pendingName)).catch(() => undefined)
      if (marker && marker.mtimeMs < now - 5 * 60_000) { await deliver(other); break }
    }
  } catch {
    // The intake is already committed to private storage. Notification failure must
    // never report a failed submission or expose customer data in shared logs.
  }
}
