import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic()

export async function POST() {
  const agentId = process.env.AGENT_ID
  const environmentId = process.env.ENVIRONMENT_ID

  if (!agentId || !environmentId) {
    return NextResponse.json(
      {
        error:
          'Agent nicht konfiguriert. Bitte zuerst das Setup-Script ausführen: npx tsx scripts/setup-agent.ts',
      },
      { status: 500 }
    )
  }

  try {
    const session = await client.beta.sessions.create({
      agent: agentId,
      environment_id: environmentId,
      title: `Gehalts-Recherche ${new Date().toISOString()}`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unbekannter Fehler'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
