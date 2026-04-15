import type { Metadata } from 'next'
import { CheckCircle2, ArrowRight, Zap, Star, Info } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Leistungen & Preise – NEON Agentur',
  description:
    'Starter ab 500 € + 50 €/Monat, Business ab 850 € + 89 €/Monat, Premium ab 1.750 € + 139 €/Monat. Webdesign & Betreuung für lokale Unternehmen in Baden-Württemberg.',
  alternates: {
    canonical: '/leistungen',
  },
}

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: '50 €',
    setupPrice: '500 €',
    description: 'Professioneller Einstieg für lokale Unternehmen.',
    features: [
      'Moderne One-Pager Website',
      'Local SEO Grundsetup',
      'Smartes Kontaktformular',
      'Hosting & Wartung',
    ],
    highlighted: false,
    badge: null,
  },
  {
    id: 'business',
    name: 'Business',
    monthlyPrice: '89 €',
    setupPrice: '850 €',
    description: 'Für Unternehmen, die wachsen wollen.',
    features: [
      'Multi-Page Website (bis 5 Seiten)',
      'Erweitertes Local SEO',
      'Automatisierte Terminbuchung',
      'WhatsApp/E-Mail-Erinnerungen',
      'Hosting & Wartung',
    ],
    highlighted: true,
    badge: 'Am beliebtesten',
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: '139 €',
    setupPrice: '1.750 €',
    description: 'Maximale Reichweite & Automatisierung.',
    features: [
      'Umfassende Website (bis 10 Seiten)',
      'KI-Chatbot für 24/7 Support',
      'KI-Telefonassistent (optional)',
      'Alle Automatisierungen',
      'Priorisierter Support',
      'Hosting & Wartung',
    ],
    highlighted: false,
    badge: null,
  },
]

const erweiterungen = [
  {
    title: 'Online-Terminbuchung',
    description:
      'Lassen Sie Kunden direkt über Ihre Website Termine buchen – automatisch, ohne Telefonkette.',
  },
  {
    title: 'Chat & Kontaktfunktionen',
    description:
      'Schnelle Kontaktaufnahme über einen Chat oder Kontakt-Button direkt auf Ihrer Website.',
  },
  {
    title: 'Smarte Formulare',
    description:
      'Intelligente Anfrage- und Kontaktformulare, die Ihnen vorqualifizierte Leads liefern.',
  },
  {
    title: 'Lokale SEO-Erweiterung',
    description:
      'Erweiterte Maßnahmen, damit Sie lokal noch besser gefunden werden – bei Google Maps und Co.',
  },
  {
    title: 'Automatisierungen',
    description:
      'Einfache Automatisierungen, die Ihnen Arbeit abnehmen – wie automatische Bestätigungsmails.',
  },
  {
    title: 'Individuelle Wünsche',
    description:
      'Haben Sie eine spezifische Anforderung? Wir besprechen gern, was möglich ist.',
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
              Leistungen & Preise
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-off-white leading-tight tracking-tight mb-6 text-balance">
              Drei Pakete.{' '}
              <span className="text-neon">Ein Ansprechpartner.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              Kein Baukastensystem, keine versteckten Extras. Wählen Sie das Paket, das zu Ihrem
              Unternehmen passt – wir übernehmen Erstellung und Betreuung aus einer Hand.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section id="pakete" className="py-20 md:py-28 bg-off-white">
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
                {/* Bestseller badge */}
                {pkg.badge && (
                  <div className="absolute top-0 inset-x-0 flex justify-center">
                    <span className="inline-flex items-center gap-1.5 bg-neon text-text-dark text-xs font-bold px-4 py-1.5 rounded-b-xl tracking-wide">
                      <Star size={11} fill="currentColor" aria-hidden="true" />
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className={`flex flex-col flex-1 p-7 ${pkg.badge ? 'pt-11' : ''}`}>
                  {/* Package label + description */}
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${pkg.highlighted ? 'text-neon/70' : 'text-white/30'}`}>
                    {pkg.name}
                  </p>
                  <p className="text-white/40 text-sm mb-6 leading-relaxed">{pkg.description}</p>

                  {/* Pricing */}
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

                  {/* Divider */}
                  <div className={`h-px w-full mb-6 ${pkg.highlighted ? 'bg-neon/15' : 'bg-dark-border'}`} />

                  {/* Features */}
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

                  {/* CTA */}
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

          {/* Info note */}
          <div className="flex items-start gap-3 bg-warm-gray rounded-xl px-5 py-4 border border-border-light">
            <Info size={15} className="text-text-muted shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-text-muted text-sm leading-relaxed">
              <span className="text-text-dark font-medium">Reine Website-Übergabe möglich –</span>{' '}
              ohne laufende Betreuung. Auf Anfrage und zu einem höheren Einmalpreis. Sprechen Sie uns an.
            </p>
          </div>
        </div>
      </section>

      {/* Optionale Erweiterungen */}
      <section id="erweiterungen" className="py-20 md:py-28 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 bg-white border border-border-light rounded-full px-4 py-2 mb-6">
              <Zap size={15} className="text-neon-dim" aria-hidden="true" />
              <span className="text-text-muted text-sm font-medium">Optional</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark leading-tight tracking-tight mb-4 text-balance">
              Optionale Erweiterungen
            </h2>
            <p className="text-neon-dim font-semibold text-lg mb-4">
              Mehr, wenn Sie es brauchen.
            </p>
            <p className="text-text-muted text-base leading-relaxed">
              Jedes Paket kann jederzeit gezielt erweitert werden – nur nach Absprache, nur was
              wirklich Sinn ergibt. Keine Standardlösung von der Stange.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {erweiterungen.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 border border-border-light hover:border-neon/30 transition-colors duration-300 cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-neon/10 flex items-center justify-center mb-4">
                  <Zap size={15} className="text-neon-dim" aria-hidden="true" />
                </div>
                <h3 className="text-text-dark font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <p className="text-text-muted text-sm mt-8 text-center">
            Alle Erweiterungen auf Anfrage und individuell kalkuliert.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
            Nächster Schritt
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark leading-tight tracking-tight mb-5 text-balance">
            Bereit für Ihre neue Website?
          </h2>
          <p className="text-text-muted text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Kontaktieren Sie uns – kostenlos und unverbindlich. Wir besprechen Ihr Projekt
            und klären alle Fragen persönlich.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-7 py-4 rounded-full
                       hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
          >
            Jetzt anfragen
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
