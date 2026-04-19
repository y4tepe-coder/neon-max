/**
 * ONE-TIME SETUP — run once, save WEBSITE_AGENT_ID to .env.local
 *
 * Prerequisites:
 *   ANTHROPIC_API_KEY + ENVIRONMENT_ID must be set in .env.local
 *
 * Run with:
 *   npm run setup-website-agent
 */
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

async function setup() {
  console.log('🚀 Setting up Website Analysis Agent...\n')

  console.log('🤖 Creating website analysis agent...')
  const agent = await client.beta.agents.create({
    name: 'Website-Analyse-Agent',
    model: 'claude-haiku-4-5-20251001',
    system: `Du analysierst Unternehmens-Websites für eine KI-Agentur, um neue Leads einzuschätzen.
Wenn du eine URL erhältst, rufe die Website ab und antworte NUR mit einem validen JSON-Objekt (kein Markdown, kein Text davor oder danach):
{"standort": "...", "branche": "...", "groesse": "...", "beschreibung": "...", "rueckmeldung": "..."}

Felder:
- standort: Stadt oder Region des Unternehmens (z.B. "Stuttgart", "Bayern", "unbekannt")
- branche: Was das Unternehmen macht, in einem kurzen Satz (z.B. "Elektriker für Privat- und Gewerbekunden")
- groesse: Geschätzte Größe basierend auf Website-Hinweisen: "Solo", "Klein (< 10 MA)", "Mittel (10–50 MA)", "Groß (50+ MA)" oder "unbekannt"
- beschreibung: 2–3 Sätze, die erklären, was das Unternehmen konkret anbietet, wer die Zielkunden sind und welche Auffälligkeiten (z.B. veraltete Website, manuelle Kontaktformulare, kein Chat, keine Terminbuchung) auf KI-Automatisierungspotenzial hindeuten.
- rueckmeldung: Ein fertiger Entwurf für eine persönliche Antwort-E-Mail (2–4 Sätze, Du-Form, auf Deutsch) an die Kontaktperson. Bezug auf ihre Branche und einen konkreten KI-Automatisierungs-Ansatz, der zu ihrem Unternehmen passt. Keine Anrede mit Platzhaltern – der Name wird separat ergänzt. Beginne direkt mit dem Inhalt.

Wenn du die Website nicht abrufen kannst, setze alle Felder auf "unbekannt" bzw. formuliere rueckmeldung so, dass du zuerst nach mehr Kontext fragst.
Antworte ausschließlich mit dem JSON. Keine Erklärungen.`,
    tools: [
      {
        type: 'agent_toolset_20260401',
        default_config: { enabled: true },
      },
    ],
  })
  console.log(`✅ Agent created: ${agent.id}\n`)

  console.log('━'.repeat(60))
  console.log('\n📋 Füge diese Zeile in deine .env.local ein:\n')
  console.log(`WEBSITE_AGENT_ID=${agent.id}`)
  console.log('\n' + '━'.repeat(60))
}

setup().catch((err) => {
  console.error('❌ Setup fehlgeschlagen:', err.message)
  process.exit(1)
})
