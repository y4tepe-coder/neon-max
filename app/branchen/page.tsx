import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Wrench, Scale, Calculator } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Branchen — Neon BW · KI-Agentur Stuttgart & BW',
  description:
    'KI-Automation für Handwerk, Anwaltskanzleien und Steuerberater in Baden-Württemberg. Maßgeschneiderte Systeme statt Paketware.',
  alternates: {
    canonical: '/branchen',
  },
}

const industries = [
  {
    icon: Wrench,
    title: 'Handwerk & Gewerbe',
    description:
      'Anfragen über Telefon, WhatsApp, E-Mail – und dazwischen gehen Aufträge verloren. Wir bauen Ihnen das System, das Anfragen automatisch qualifiziert, Termine bucht und Ihre Website als ersten Eindruck professionell macht.',
    href: '/branchen/handwerk',
    examples: ['Elektriker', 'Sanitär & Heizung', 'Maler & Lackierer', 'Schreiner', 'Kfz-Werkstätten'],
  },
  {
    icon: Scale,
    title: 'Anwaltskanzleien',
    description:
      'Mandantenanfragen außerhalb der Bürozeiten, manuelle Dokumentensammlung, Terminabsprachen per E-Mail-Kette. Wir bauen DSGVO-konforme KI-Systeme, die Mandanten onboarden und Anfragen strukturieren.',
    href: '/branchen/kanzleien',
    examples: ['Strafrecht', 'Familienrecht', 'Arbeitsrecht', 'Mietrecht', 'Erbrecht'],
  },
  {
    icon: Calculator,
    title: 'Steuerberater',
    description:
      'Mandanten liefern Unterlagen zu spät, manuelle Nachfassaktionen fressen Zeit. Wir automatisieren Dokumentenanforderung und Erinnerungsflows – DSGVO-konform, self-hosted, zuverlässig.',
    href: '/branchen/steuerberater',
    examples: ['Einzelkanzleien', 'Kanzlei-Verbünde', 'Jahresabschluss', 'Lohnbuchhaltung', 'Beratung'],
  },
]

export default function BranchenPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-dark-bg section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Für wen wir bauen
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-off-white leading-tight tracking-tight mb-6 text-balance">
              Handwerk. Kanzleien.{' '}
              <span className="text-neon">Steuerberater.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              Wir kennen die Abläufe dieser Branchen – und wissen, welche KI-Systeme
              wirklich helfen. Kein Paket von der Stange.
            </p>
          </div>
        </div>
      </section>

      {/* Industry cards */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industries.map((industry) => {
              const Icon = industry.icon
              return (
                <div
                  key={industry.title}
                  className="bg-white rounded-2xl p-7 border border-border-light hover:border-neon/30 transition-colors duration-300 flex flex-col"
                >
                  <div className="w-11 h-11 rounded-xl bg-neon/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-neon-dim" aria-hidden="true" />
                  </div>
                  <h2 className="text-text-dark font-bold text-xl mb-3">{industry.title}</h2>
                  <p className="text-text-muted text-sm leading-relaxed mb-5 flex-1">
                    {industry.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {industry.examples.map((ex) => (
                      <span
                        key={ex}
                        className="bg-warm-gray text-text-muted text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={industry.href}
                    className="inline-flex items-center gap-2 text-neon-dim font-semibold text-sm hover:text-text-dark transition-colors duration-200"
                  >
                    Mehr erfahren
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
            Ihre Branche nicht dabei?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-off-white leading-tight tracking-tight mb-5 text-balance">
            Wir arbeiten branchenoffen – sprechen Sie uns an.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            In Phase 2 erweitern wir auf den Mittelstand in BW (20–250 Mitarbeitende).
            Wenn Sie sich angesprochen fühlen – melden Sie sich jetzt.
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
