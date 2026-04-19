import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

// ─── Types ────────────────────────────────────────────────────────────────────

interface LeadData {
  url: string
  companyName: string
  contact: { name: string; email: string }
  answers: Record<string, string>
  score?: number
  resultLevel?: string
}

interface WebsiteAnalysis {
  standort: string
  branche: string
  groesse: string
}

// ─── Email notification ───────────────────────────────────────────────────────

async function sendLeadEmail(data: LeadData) {
  const { NOTIFY_EMAIL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_EMAIL) return

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
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
    from: `"NEON Agentur" <${SMTP_USER}>`,
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

// ─── Website analysis via Managed Agent ──────────────────────────────────────

async function analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
  const fallback: WebsiteAnalysis = { standort: '–', branche: '–', groesse: '–' }

  const websiteAgentId = process.env.WEBSITE_AGENT_ID
  const environmentId = process.env.ENVIRONMENT_ID
  if (!websiteAgentId || !environmentId) return fallback

  try {
    const session = await anthropic.beta.sessions.create({
      agent: websiteAgentId,
      environment_id: environmentId,
    })

    const stream = await anthropic.beta.sessions.events.stream(session.id)

    await anthropic.beta.sessions.events.send(session.id, {
      events: [{ type: 'user.message', content: [{ type: 'text', text: url }] }],
    })

    let responseText = ''
    for await (const event of stream) {
      if ((event as { type: string }).type === 'agent.message') {
        const e = event as { content: Array<{ type: string; text: string }> }
        responseText += e.content.filter((b) => b.type === 'text').map((b) => b.text).join('')
      }
      if ((event as { type: string }).type === 'session.status_idle') break
      if ((event as { type: string }).type === 'session.status_terminated') break
    }

    // Extract JSON even if agent wraps it in markdown code fences
    const jsonMatch = responseText.match(/\{[\s\S]*?\}/)
    if (jsonMatch) return { ...fallback, ...JSON.parse(jsonMatch[0]) }
  } catch {
    // analysis is best-effort — never block Slack notification
  }

  return fallback
}

// ─── Slack notification ───────────────────────────────────────────────────────

async function sendSlackNotification(data: LeadData, analysis: WebsiteAnalysis) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return

  const siteDisplay = data.url
    ? data.url.startsWith('http') ? data.url : `https://${data.url}`
    : '–'

  const text = [
    `🔔 *Neue KI-Bedarfsanalyse*`,
    `*Website:* <${siteDisplay}|${data.url || '–'}>`,
    `*Unternehmen:* ${data.companyName || '–'}`,
    `*Name:* ${data.contact.name || '–'}   |   *E-Mail:* ${data.contact.email || '–'}`,
    ``,
    `📊 *Website-Analyse:*`,
    `• Standort: ${analysis.standort}`,
    `• Branche: ${analysis.branche}`,
    `• Größe: ${analysis.groesse}`,
  ].join('\n')

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
}

// ─── Background analysis + Slack ─────────────────────────────────────────────

async function analyzeAndNotify(data: LeadData) {
  const analysis = await analyzeWebsite(data.url)
  await sendSlackNotification(data, analysis)
}

// ─── POST – save lead + notify ────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const data: LeadData = await request.json()

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

    // Fire-and-forget — don't block the response
    sendLeadEmail(data).catch(() => {})
    analyzeAndNotify(data).catch(() => {})

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
