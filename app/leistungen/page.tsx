import type { Metadata } from 'next'
import { CheckCircle2, ArrowRight, Globe2, Zap, BrainCircuit, Headset } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Leistungen — Neon BW · KI-Agentur Stuttgart & BW',
  description:
    'Websites ab 499 €, System-Automatisierung ab 1.490 €, Custom KI-Integration ab 2.990 €, Chatbot & Voice-Agent ab 1.990 €. Kostenlose Bedarfsanalyse zuerst.',
  alternates: {
    canonical: '/leistungen',
  },
}

const services = [
  {
    id: 'websites',
    icon: Globe2,
    label: 'Website',
    price: 'ab 499 €',
    headline: 'Ihr digitaler Erstkontakt – fertig in 14 Tagen.',
    description:
      'Eine mobiloptimierte, schnelle Website ist das Fundament. Ohne sie verlieren Sie Interessenten, bevor das erste Gespräch stattfindet.',
    features: [
      'Mobiloptimiert & blitzschnell',
      'Local SEO Grundsetup',
      'Kontaktformular mit DSGVO-Checkbox',
      'Hosting auf Servern in Deutschland',
      'Monatliche Betreuung & Updates',
      'In 14 Tagen live',
    ],
  },
  {
    id: 'automatisierung',
    icon: Zap,
    label: 'System-Automatisierung',
    price: 'ab 1.490 €',
    headline: 'Anfragen qualifizieren, Daten übergeben, Kunden benachrichtigen – automatisch.',
    description:
      'Wiederkehrende Abläufe laufen von selbst. Ihr Team konzentriert sich auf das, was wirklich zählt – nicht auf Copy-Paste und manuelle Datenpflege.',
    features: [
      'Anfragen-Qualifizierung und Weiterleitung',
      'Automatische Bestätigungen und Erinnerungen',
      'CRM- und Kalender-Integration',
      'Self-hosted – keine Drittanbieter-Daten',
      'DSGVO-konform, Server in Deutschland',
      'Monatliches Monitoring inklusive',
    ],
  },
  {
    id: 'ki-integration',
    icon: BrainCircuit,
    label: 'Custom KI-Integration',
    price: 'ab 2.990 €',
    headline: 'KI direkt in Ihre bestehenden Abläufe gebaut.',
    description:
      'Keine Insellösung, kein Vendor-Lock-in. Wir integrieren KI-Funktionen in das, was Sie bereits nutzen – und bauen genau das, was Ihren Betrieb voranbringt.',
    features: [
      'Analyse Ihrer bestehenden Prozesse',
      'Maßgeschneiderte KI-Logik',
      'Integration in bestehende Systeme',
      'Kein Vendor-Lock-in',
      'Self-hosted & DSGVO-konform',
      'Technische Dokumentation & Übergabe',
    ],
  },
  {
    id: 'chatbot',
    icon: Headset,
    label: 'Chatbot & Voice-Agent',
    price: 'ab 1.990 €',
    headline: 'Ihr KI-Assistent antwortet – auch nachts und am Wochenende.',
    description:
      'Kunden stellen Fragen außerhalb Ihrer Öffnungszeiten. Ein KI-Assistent qualifiziert Anfragen, bucht Termine und gibt erste Antworten – zuverlässig, rund um die Uhr.',
    features: [
      'Chatbot für Website oder Messaging-Kanal',
      'Voice-Agent optional verfügbar',
      'Anfragen-Qualifizierung und Weiterleitung',
      'Automatische Terminbuchung',
      'Self-hosted & DSGVO-konform',
      'Monatliches Monitoring inklusive',
    ],
  },
]

export default function LeistungenPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-dark-bg section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Was wir bauen
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-off-white leading-tight tracking-tight mb-6 text-balance">
              Vier Leistungen.{' '}
              <span className="text-neon">Einer für alles.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              Website, System-Automatisierung, KI-Integration, Chatbot & Voice – je nach Bedarf,
              immer mit kostenloser Bedarfsanalyse zuerst, immer zum Festpreis.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Service Sections */}
      {services.map((service, i) => {
        const Icon = service.icon
        const isEven = i % 2 === 0
        return (
          <section
            key={service.id}
            id={service.id}
            className={`py-20 md:py-28 ${isEven ? 'bg-off-white' : 'bg-warm-gray'}`}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text side */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
                      <Icon size={20} className="text-neon-dim" aria-hidden="true" />
                    </div>
                    <span className="text-neon-dim text-sm font-semibold uppercase tracking-widest">
                      {service.label}
                    </span>
                  </div>
                  <p className="text-neon-dim font-bold text-lg mb-3">{service.price} einmalig + Retainer</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-text-dark leading-tight tracking-tight mb-5 text-balance">
                    {service.headline}
                  </h2>
                  <p className="text-text-muted text-base leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold
                               px-6 py-3 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm"
                  >
                    Bedarfsanalyse starten
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>

                {/* Feature list */}
                <div className="bg-white rounded-2xl p-7 border border-border-light">
                  <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-5">
                    Leistungsumfang
                  </p>
                  <ul className="space-y-3.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle2
                          size={16}
                          className="text-neon shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-text-dark text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
            Nächster Schritt
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-off-white leading-tight tracking-tight mb-5 text-balance">
            Zuerst Bedarfsanalyse – dann Festpreis.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Wir verstehen Ihre Abläufe, bevor wir etwas empfehlen. Kostenloses Erstgespräch,
            kein Verkaufsdruck, konkrete Empfehlung.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-7 py-4 rounded-full
                       hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
          >
            Kostenlose Bedarfsanalyse starten
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <p className="text-white/30 text-sm mt-5">
            Alle Preise transparent auf{' '}
            <Link href="/preise" className="text-neon/60 hover:text-neon underline transition-colors duration-200">
              /preise
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
