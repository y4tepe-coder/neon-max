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

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

    // In development without SMTP configured: just log and return success
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.log('[Contact Form – Dev Mode]')
      console.log(`  Von:      ${name} <${email}>`)
      console.log(`  Nachricht: ${message}`)
      return NextResponse.json({ success: true })
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    await transporter.sendMail({
      from: `"NEON Kontaktformular" <${SMTP_USER}>`,
      to: SMTP_USER, // info@neon-bw.de sendet an sich selbst
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
    return NextResponse.json(
      { error: 'Fehler beim Senden. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    )
  }
}
