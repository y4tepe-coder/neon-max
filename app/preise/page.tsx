import type { Metadata } from 'next'
import { CheckCircle2, Star, Info, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Preise — Neon BW · KI-Agentur Stuttgart & BW',
  description:
    'Starter ab 499 €, Business ab 1.990 €, Premium ab 4.490 €. Erste 2 Kunden in Phase 1 kostenfrei. Keine versteckten Kosten, kein Überraschungs-Invoice.',
  alternates: {
    canonical: '/preise',
  },
}

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    setupPrice: '499 €',
    monthlyPrice: '79 €',
    description: 'Professioneller Online-Auftritt für den Einstieg.',
    features: [
      'Moderne Website (bis 5 Seiten)',
      'Local SEO Grundsetup',
      'Kontaktformular mit DSGVO',
      'Hosting & Betreuung',
    ],
    highlighted: false,
    badge: null,
  },
  {
    id: 'business',
    name: 'Business',
    setupPrice: '1.990 €',
    monthlyPrice: '149 €',
    description: 'Website + erste Automatisierung. Für Betriebe, die Abläufe entlasten wollen.',
    features: [
      'Alle Starter-Inhalte',
      'System-Automatisierung (1 Workflow)',
      'Anfragen-Qualifizierung',
      'Automatische Benachrichtigungen',
      'Priorisierter Support',
    ],
    highlighted: true,
    badge: 'Am beliebtesten',
  },
  {
    id: 'premium',
    name: 'Premium',
    setupPrice: '4.490 €',
    monthlyPrice: '249 €',
    description: 'Vollständige KI-Infrastruktur für Ihren Betrieb.',
    features: [
      'Alle Business-Inhalte',
      'KI-Chatbot oder Voice-Agent',
      'Custom KI-Integration',
      'Unbegrenzte Workflows',
      'Monatlicher Strategie-Call',
    ],
    highlighted: false,
    badge: null,
  },
]

const comparisonRows = [
  { label: 'Website',                  starter: true,  business: true,  premium: true },
  { label: 'Local SEO Grundsetup',     starter: true,  business: true,  premium: true },
  { label: 'Hosting & Betreuung',      starter: true,  business: true,  premium: true },
  { label: 'System-Automatisierung',   starter: false, business: true,  premium: true },
  { label: 'Anfragen-Qualifizierung',  starter: false, business: true,  premium: true },
  { label: 'KI-Chatbot / Voice-Agent', starter: false, business: false, premium: true },
  { label: 'Custom KI-Integration',    starter: false, business: false, premium: true },
  { label: 'Monatlicher Strategie-Call', starter: false, business: false, premium: true },
]

export default function PreisePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-dark-bg section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Preise & Pakete
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-off-white leading-tight tracking-tight mb-6 text-balance">
              Drei Pakete.{' '}
              <span className="text-neon">Kein Überraschungs-Invoice.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              Alle Preise offen und transparent. Einmaliger Setup-Preis + monatlicher Retainer.
              Die ersten 2 Kunden in Phase 1 erhalten ihr Paket kostenfrei.
            </p>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl overflow-hidden ${
                  pkg.highlighted
                    ? 'bg-dark-bg border-2 border-neon/50 shadow-[0_0_60px_rgba(197,247,79,0.12)]'
                    : 'bg-dark-bg border border-dark-border'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute top-0 inset-x-0 flex justify-center">
                    <span className="inline-flex items-center gap-1.5 bg-neon text-text-dark text-xs font-bold px-4 py-1.5 rounded-b-xl tracking-wide">
                      <Star size={11} fill="currentColor" aria-hidden="true" />
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className={`flex flex-col flex-1 p-7 ${pkg.badge ? 'pt-11' : ''}`}>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${pkg.highlighted ? 'text-neon/70' : 'text-white/30'}`}>
                    {pkg.name}
                  </p>
                  <p className="text-white/40 text-sm mb-6 leading-relaxed">{pkg.description}</p>

                  <div className="mb-1.5">
                    <div className={`text-4xl font-black leading-none tabular-nums ${pkg.highlighted ? 'text-neon' : 'text-off-white'}`}>
                      {pkg.monthlyPrice}
                      <span className={`text-sm font-semibold ml-1.5 ${pkg.highlighted ? 'text-neon/50' : 'text-white/30'}`}>
                        / Monat
                      </span>
                    </div>
                    <p className="text-white/35 text-sm mt-2">
                      + {pkg.setupPrice} <span className="text-white/20">einmalig</span>
                    </p>
                  </div>
                  <p className="text-white/20 text-xs mb-7">12 Monate Mindestlaufzeit</p>

                  <div className={`h-px w-full mb-6 ${pkg.highlighted ? 'bg-neon/15' : 'bg-dark-border'}`} />

                  <ul className="space-y-3 flex-1 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={15}
                          className={`shrink-0 mt-0.5 ${pkg.highlighted ? 'text-neon' : 'text-neon/45'}`}
                          aria-hidden="true"
                        />
                        <span className="text-white/60 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/kontakt"
                    className={`block w-full text-center font-semibold px-5 py-3 rounded-full text-sm transition-all duration-200 cursor-pointer ${
                      pkg.highlighted
                        ? 'bg-neon text-text-dark hover:bg-neon-dim'
                        : 'border border-white/15 text-white/60 hover:border-white/30 hover:text-white/90'
                    }`}
                  >
                    {pkg.name} anfragen
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* TODO-Hinweis erste 2 Kunden */}
          {/* TODO Yasin: nach Phase-1-Ende diesen Banner entfernen */}
          <div className="flex items-start gap-3 bg-neon/8 rounded-xl px-5 py-4 border border-neon/20 mb-6">
            <Info size={15} className="text-neon-dim shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-text-dark text-sm leading-relaxed">
              <span className="font-semibold text-neon-dim">Erste 2 Kunden in Phase 1 kostenfrei –</span>{' '}
              wir bauen Ihr Paket ohne Setup-Gebühr, damit echte Referenzen entstehen.
              Monatlicher Retainer fällt an. Auf Anfrage.
            </p>
          </div>

          <div className="flex items-start gap-3 bg-warm-gray rounded-xl px-5 py-4 border border-border-light">
            <Info size={15} className="text-text-muted shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-text-muted text-sm leading-relaxed">
              <span className="text-text-dark font-medium">Einzelleistung ohne Retainer möglich –</span>{' '}
              auf Anfrage zu einem höheren Einmalpreis. Sprechen Sie uns an.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 md:py-28 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Vergleich
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark leading-tight tracking-tight mb-4 text-balance">
              Was ist in welchem Paket?
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] bg-white rounded-2xl border border-border-light overflow-hidden">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="text-left text-xs font-semibold uppercase tracking-widest text-text-muted px-6 py-4 w-1/2">
                    Leistung
                  </th>
                  {packages.map((p) => (
                    <th key={p.id} className="text-center text-xs font-bold uppercase tracking-widest px-4 py-4">
                      <span className={p.highlighted ? 'text-neon-dim' : 'text-text-dark'}>
                        {p.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} className={`border-b border-border-light last:border-0 ${i % 2 === 0 ? '' : 'bg-warm-gray/40'}`}>
                    <td className="px-6 py-3.5 text-text-dark text-sm">{row.label}</td>
                    {[row.starter, row.business, row.premium].map((val, j) => (
                      <td key={j} className="text-center px-4 py-3.5">
                        {val
                          ? <CheckCircle2 size={16} className="text-neon mx-auto" aria-label="Inklusive" />
                          : <X size={14} className="text-text-muted/30 mx-auto" aria-label="Nicht inklusive" />
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
            Unsicher, welches Paket passt?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-off-white leading-tight tracking-tight mb-5 text-balance">
            Bedarfsanalyse zuerst – dann Empfehlung.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Wir empfehlen das Paket, das zu Ihrem Betrieb passt – nicht das teuerste.
            Kostenlos und ohne Verpflichtung.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-7 py-4 rounded-full
                       hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
          >
            Kostenlose Bedarfsanalyse starten
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
