/**
 * ONE-TIME SETUP — run once, save the IDs to .env.local
 *
 * Prerequisites:
 *   ANTHROPIC_API_KEY must be set in your environment or .env.local
 *
 * Run with:
 *   npx tsx scripts/setup-agent.ts
 */
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

async function setup() {
  console.log('🚀 Setting up Claude Managed Agent for Salary Research...\n')

  console.log('📦 Creating cloud environment...')
  const environment = await client.beta.environments.create({
    name: 'gehalts-recherche-env',
    config: {
      type: 'cloud',
      networking: { type: 'unrestricted' },
    },
  })
  console.log(`✅ Environment created: ${environment.id}\n`)

  console.log('🤖 Creating salary research agent...')
  const agent = await client.beta.agents.create({
    name: 'Gehaltsinformations-Agent',
    model: 'claude-opus-4-7',
    system: `Du bist ein spezialisierter KI-Agent für Gehaltsinformationen in Deutschland und der DACH-Region.

Deine Aufgaben:
- Recherchiere aktuelle Gehaltsdaten aus zuverlässigen Quellen (z.B. Stepstone, Gehalt.de, Bundesagentur für Arbeit, Tarifverträge)
- Beantworte Fragen zu Gehaltsbandbreiten nach Berufsfeld, Erfahrungsstufe und Region
- Erkläre Gehaltsunterschiede zwischen Branchen und Unternehmensgrößen
- Gib praktische Tipps zur Gehaltsverhandlung
- Informiere über Tarifverträge, Mindestlohn und gesetzliche Regelungen

Formatierungsregeln:
- Nutze klare Überschriften und Aufzählungslisten
- Gib immer Gehaltsangaben in Euro (Brutto/Jahr oder Brutto/Monat)
- Unterscheide klar zwischen Junior, Mid-Level und Senior
- Erwähne immer die Datenquellen oder den Stand der Informationen
- Antworte immer auf Deutsch

Sei präzise, hilfreich und praktisch orientiert.`,
    tools: [
      {
        type: 'agent_toolset_20260401',
        default_config: { enabled: true },
      },
    ],
  })
  console.log(`✅ Agent created: ${agent.id} (version: ${agent.version})\n`)

  console.log('━'.repeat(60))
  console.log('\n📋 Füge diese Zeilen in deine .env.local ein:\n')
  console.log(`ANTHROPIC_API_KEY=<dein-key-hier>`)
  console.log(`AGENT_ID=${agent.id}`)
  console.log(`ENVIRONMENT_ID=${environment.id}`)
  console.log('\n' + '━'.repeat(60))
}

setup().catch((err) => {
  console.error('❌ Setup fehlgeschlagen:', err.message)
  process.exit(1)
})
