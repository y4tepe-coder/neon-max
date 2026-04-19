import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic()

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params

  const body = await request.json()
  const message: string = body.message

  if (!message?.trim()) {
    return NextResponse.json({ error: 'Nachricht darf nicht leer sein.' }, { status: 400 })
  }

  try {
    await client.beta.sessions.events.send(sessionId, {
      events: [
        {
          type: 'user.message',
          content: [{ type: 'text', text: message.trim() }],
        },
      ],
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unbekannter Fehler'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
