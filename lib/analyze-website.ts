import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

export interface WebsiteAnalysis {
  standort: string
  branche: string
  groesse: string
  beschreibung: string
  rueckmeldung: string
}

export async function analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
  const fallback: WebsiteAnalysis = {
    standort: '–',
    branche: '–',
    groesse: '–',
    beschreibung: '–',
    rueckmeldung: '–',
  }

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

    const jsonMatch = responseText.match(/\{[\s\S]*?\}/)
    if (jsonMatch) return { ...fallback, ...JSON.parse(jsonMatch[0]) }
  } catch {
    // best-effort — never block caller
  }

  return fallback
}
