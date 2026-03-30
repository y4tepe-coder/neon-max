import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

// ─── Email notification ───────────────────────────────────────────────────────

async function sendLeadEmail(data: {
  url: string
  companyName: string
  contact: { name: string; email: string }
  answers: Record<string, string>
  score?: number
  resultLevel?: string
}) {
  const { NOTIFY_EMAIL, GMAIL_USER, GMAIL_APP_PASSWORD } = process.env
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !NOTIFY_EMAIL) return

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  })

  const levelLabels: Record<string, string> = {
    critical: '🔴 Dringend handeln',
    medium: '🟡 Klares Potenzial',
    good: '🟢 Gute Basis',
  }

  const answerLines = Object.entries(data.answers)
    .map(([k, v]) => `  Frage ${k}: ${v}`)
    .join('\n')

  const scoreInfo = data.score !== undefined
    ? `Score: ${data.score}/10 – ${levelLabels[data.resultLevel ?? ''] ?? data.resultLevel}`
    : ''

  await transporter.sendMail({
    from: `"NEON Agentur" <${GMAIL_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `🔔 Neuer Website-Check: ${data.contact.name || 'Unbekannt'} – ${data.url || 'keine URL'}`,
    text: [
      '── Neuer Lead vom Website-Check ──',
      '',
      `Name:        ${data.contact.name}`,
      `E-Mail:      ${data.contact.email}`,
      `Website:     ${data.url || '(keine)'}`,
      `Unternehmen: ${data.companyName || '(nicht angegeben)'}`,
      scoreInfo,
      '',
      'Antworten:',
      answerLines,
      '',
      '──────────────────────────────────',
    ].join('\n'),
  })
}

// ─── POST – save lead + notify ────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const dir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    const filePath = path.join(dir, 'leads.json')
    let leads: unknown[] = []
    if (fs.existsSync(filePath)) {
      try { leads = JSON.parse(fs.readFileSync(filePath, 'utf-8')) } catch { leads = [] }
    }

    const entry = {
      ...data,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') ?? 'unknown',
    }
    leads.push(entry)
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), 'utf-8')

    // Fire-and-forget — don't block the response if email fails
    sendLeadEmail(data).catch(() => {})

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead save error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

// ─── GET – read all leads ─────────────────────────────────────────────────────

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'leads.json')
    if (!fs.existsSync(filePath)) return NextResponse.json([])
    return NextResponse.json(JSON.parse(fs.readFileSync(filePath, 'utf-8')))
  } catch {
    return NextResponse.json([])
  }
}
