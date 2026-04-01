import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Alle Felder sind erforderlich.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 })
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: 'Nachricht zu lang.' }, { status: 400 })
    }

    const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars')
      return NextResponse.json({ error: 'E-Mail-Konfiguration fehlt.' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    })

    await transporter.sendMail({
      from: `"NEON Kontaktformular" <${GMAIL_USER}>`,
      to: 'info@neon-bw.de',
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#111;border-bottom:2px solid #C5F74F;padding-bottom:8px">
            Neue Kontaktanfrage
          </h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>E-Mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p style="margin-top:16px"><strong>Nachricht:</strong></p>
          <p style="background:#f5f5f5;padding:12px;border-radius:8px;white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Fehler beim Senden. Bitte versuchen Sie es später erneut.' }, { status: 500 })
  }
}
