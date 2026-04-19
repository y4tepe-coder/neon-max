import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Unser Prozess — Neon BW · KI-Agentur Stuttgart & BW',
  description:
    'Bedarfsanalyse → Empfehlung → Festpreis → Umsetzung → Betreuung. Kein Overrun, kein Überraschungs-Invoice. Fünf Schritte, ein Partner.',
  alternates: {
    canonical: '/prozess',
  },
}

const steps = [
  {
    number: '01',
    name: 'Bedarfsanalyse',
    duration: 'ca. 30 Minuten · kostenlos',
    description:
      'Im ersten Gespräch verstehen wir Ihre Abläufe, Engpässe und Ziele. Wir fragen nach: Wie gehen Anfragen ein? Wo entsteht manuelle Arbeit? Was läuft gut – und was kostet Zeit? Kein Verkaufsgespräch, kein Angebotsdruck.',
    result: 'Klares Bild Ihrer Situation und Ihres Potenzials.',
  },
  {
    number: '02',
    name: 'Konkrete Empfehlung',
    duration: 'innerhalb 48h · schriftlich',
    description:
      'Sie erhalten eine schriftliche Empfehlung: welches System den größten Hebel hat, welche Leistung dafür nötig ist und wie lange die Umsetzung dauert. Keine Buzzwords, kein Paket von der Stange.',
    result: 'Ein konkreter Vorschlag, dem Sie zustimmen – oder nicht.',
  },
  {
    number: '03',
    name: 'Festpreis-Angebot',
    duration: 'nach Empfehlung',
    description:
      'Nach Ihrer Zustimmung erhalten Sie ein verbindliches Festpreis-Angebot. Was drin steht, wird gebaut – zum Preis, der vereinbart ist. Kein Overrun, kein Überraschungs-Invoice.',
    result: 'Klarer Vertrag, klarer Umfang, klarer Preis.',
  },
  {
    number: '04',
    name: 'Umsetzung',
    duration: '14 Tage (Website) · 2–6 Wochen (KI)',
    description:
      'Wir bauen und testen das System. Sie bleiben informiert, ohne selbst Hand anlegen zu müssen. Iterationen und Feedback sind Teil des Prozesses – kein abruptes "Fertig, hier ist Ihr Passwort".',
    result: 'Ein System, das funktioniert – getestet vor dem Launch.',
  },
  {
    number: '05',
    name: 'Betreuung',
    duration: 'dauerhaft · monatlicher Retainer',
    description:
      'Wir bleiben an Ihrer Seite: Monitoring, Updates, Anpassungen, neue Ideen. Persönlicher Ansprechpartner, direkte Kommunikation – keine Ticket-Warteschlange.',
    result: 'Ein System, das langfristig läuft und wächst.',
  },
]

export default function ProzessPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-dark-bg section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Unser Prozess
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-off-white leading-tight tracking-tight mb-6 text-balance">
              Fünf Schritte.{' '}
              <span className="text-neon">Kein Blindflug.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              Wir analysieren zuerst, empfehlen dann – und bauen erst, wenn Sie zustimmen.
              Festpreis, klarer Zeitplan, persönliche Betreuung.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="flex flex-col md:flex-row gap-6 md:gap-10"
              >
                {/* Number */}
                <div className="flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl"
                    style={{ background: 'rgba(197,247,79,0.12)', color: '#C5F74F' }}
                  >
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px h-12 bg-border-light ml-8 mt-2" aria-hidden="true" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-xl md:text-2xl font-bold text-text-dark">
                      {step.name}
                    </h2>
                    <span className="text-xs font-medium text-text-muted bg-warm-gray border border-border-light px-3 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-text-muted text-base leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <div className="flex items-start gap-2 text-sm font-medium text-neon-dim">
                    <ArrowRight size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                    {step.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
            Schritt 1 starten
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-off-white leading-tight tracking-tight mb-5 text-balance">
            Bedarfsanalyse – kostenlos & unverbindlich.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            30 Minuten. Wir verstehen Ihre Abläufe. Sie erhalten eine konkrete Empfehlung –
            ohne Verpflichtung.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-7 py-4 rounded-full
                       hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
          >
            Jetzt Bedarfsanalyse starten
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
