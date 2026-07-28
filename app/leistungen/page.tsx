import type { Metadata } from 'next'
import { CheckCircle2, ArrowRight, Globe2, Zap, BrainCircuit, Headset, Nfc } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Leistungen — NEON Webdesign & KI · Website-Agentur Stuttgart & BW',
  description:
    'Websites ab 990 €, Anfragefluss ab 1.490 €, Ablauf-Automation ab 2.990 €, Chatbot & Telefonhilfe ab 1.990 €. Kostenlose Analyse zuerst.',
  alternates: {
    canonical: '/leistungen',
  },
}

const services = [
  {
    id: 'websites',
    icon: Globe2,
    label: 'Website',
    price: 'ab 990 €',
    headline: 'Ihr digitaler Erstkontakt – klar, schnell und in 14 Tagen live.',
    description:
      'Eine mobiloptimierte, schnelle Website ist das Fundament. Sie erklärt, was Sie tun, schafft Vertrauen und fragt die richtigen Informationen ab, bevor das erste Gespräch stattfindet.',
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
    label: 'Anfragefluss',
    price: 'ab 1.490 €',
    headline: 'Anfragen qualifizieren, Daten übergeben, Kunden benachrichtigen.',
    description:
      'Wiederkehrende Abläufe laufen sauberer. Ihr Team konzentriert sich auf die Arbeit am Kunden – nicht auf Copy-Paste, doppelte Rückfragen und manuelle Datenpflege.',
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
    label: 'Ablauf-Automation',
    price: 'ab 2.990 €',
    headline: 'Automatisierung direkt in Ihre bestehenden Abläufe gebaut.',
    description:
      'Keine Insellösung, kein Vendor-Lock-in. Wir integrieren Automatisierung und KI-Bausteine in das, was Sie bereits nutzen – und nur dort, wo es Ihren Betrieb wirklich entlastet.',
    features: [
      'Analyse Ihrer bestehenden Prozesse',
      'Maßgeschneiderte Ablauf-Logik',
      'Integration in bestehende Systeme',
      'Kein Vendor-Lock-in',
      'Self-hosted & DSGVO-konform',
      'Technische Dokumentation & Übergabe',
    ],
  },
  {
    id: 'chatbot',
    icon: Headset,
    label: 'Chatbot & Telefonhilfe',
    price: 'ab 1.990 €',
    headline: 'Ein Assistent nimmt Erstanfragen auf – auch außerhalb der Öffnungszeiten.',
    description:
      'Kunden stellen Fragen abends, am Wochenende oder wenn niemand ans Telefon kann. Ein Assistent nimmt Erstanfragen auf, sortiert sie vor und leitet nur das weiter, was wirklich Aufmerksamkeit braucht.',
    features: [
      'Chatbot für Website oder Messaging-Kanal',
      'Telefonhilfe optional verfügbar',
      'Anfragen-Qualifizierung und Weiterleitung',
      'Terminbuchung oder Rückruf-Wunsch',
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
              Vier Bausteine.{' '}
              <span className="text-neon">Ein klarer Ablauf.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              Website, Anfragefluss, Ablauf-Automation und Assistenz – je nach Bedarf,
              immer mit kostenloser Analyse zuerst, immer zum Festpreis.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#cfd4c2] bg-neon">
        <div className="mx-auto grid max-w-7xl items-center gap-7 px-6 py-8 lg:grid-cols-[auto_1fr_auto] lg:px-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-text-dark text-neon">
            <Nfc size={22} aria-hidden="true" />
          </span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#415300]">
              Eigenes Produkt · Einführungspreis
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-[#142000]">
              5 NFC-Schlüsselanhänger + 5 digitale Visitenkarten für 99,99 €
            </h2>
            <p className="mt-1 text-sm leading-6 text-[#344400]">
              Ohne App, mit QR-Fallback, persönlicher Einrichtung und Live-Konfigurator.
            </p>
          </div>
          <Link
            href="/nfc-visitenkarte"
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-text-dark px-6 text-sm font-black text-white"
          >
            NFC-Paket ansehen
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
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
                    href="/termin"
                    className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold
                               px-6 py-3 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm"
                  >
                    Kostenlos prüfen lassen
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
            Zuerst Analyse – dann Festpreis.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Wir verstehen Ihre Abläufe, bevor wir etwas empfehlen. Kostenlose Analyse,
            kein Verkaufsdruck, konkrete Empfehlung.
          </p>
          <Link
            href="/termin"
            className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-7 py-4 rounded-full
                       hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
          >
            Website kostenlos prüfen lassen
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <p className="text-white/30 text-sm mt-5">
            Festpreis steht fest, bevor gebaut wird – wir klären den Umfang im Gespräch.
          </p>
        </div>
      </section>
    </div>
  )
}
