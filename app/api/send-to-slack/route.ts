import { NextResponse } from 'next/server'
import { analyzeWebsite } from '@/lib/analyze-website'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: Request) {
  try {
    const { website, company, name, email } = await request.json()

    const webhookUrl = process.env.SLACK_WEBHOOK_URL
    if (!webhookUrl) return NextResponse.json({ success: true })

    const timestamp = new Date().toLocaleString('de-DE', {
      timeZone: 'Europe/Berlin',
      dateStyle: 'short',
      timeStyle: 'short',
    })

    const analysis = await analyzeWebsite(website)

    const siteDisplay = website
      ? website.startsWith('http') ? website : `https://${website}`
      : '–'

    const text = [
      '🔔 *Neue Anfrage zur KI-Bedarfsanalyse*',
      '',
      `*Website:* <${siteDisplay}|${website}>`,
      `*Unternehmen:* ${company || '–'}`,
      `*Name:* ${name}`,
      `*E-Mail:* ${email}`,
      `*Zeit:* ${timestamp}`,
      '',
      '📊 *Unternehmens-Analyse:*',
      `• Standort: ${analysis.standort}`,
      `• Branche: ${analysis.branche}`,
      `• Größe: ${analysis.groesse}`,
    ].join('\n')

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })

    if (!res.ok) {
      console.error('Slack webhook error:', res.status)
      return NextResponse.json({ success: false }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('send-to-slack error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
