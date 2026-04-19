import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Portfolio — Neon BW · KI-Agentur Stuttgart & BW',
  description:
    'Demo-Sites und Beispielprojekte: Websites und KI-Systeme für Handwerk, Kanzleien und Steuerberater in Baden-Württemberg.',
  alternates: {
    canonical: '/portfolio',
  },
}

const projects = [
  {
    id: 1,
    name: 'Kanzlei Mustermann – Demo',
    category: 'Kanzlei',
    description:
      'Demo-Website mit Mandantenanfrage-Formular, DSGVO-Checkbox und automatischer Weiterleitung ins Postfach.',
    tags: ['Website', 'KI-Formular', 'DSGVO'],
    demo: true,
    comingSoon: false,
  },
  {
    id: 2,
    name: 'Handwerk-Betrieb – Demo',
    category: 'Handwerk',
    description:
      'Demo-Website mit integrierter Terminbuchung und automatischer Auftragsbestätigung per Nachricht.',
    tags: ['Website', 'Terminbuchung', 'Automatisierung'],
    demo: true,
    comingSoon: false,
  },
  {
    id: 3,
    name: 'Steuerberater-Kanzlei – Demo',
    category: 'Steuerberatung',
    description:
      'Demo mit Mandanten-Onboarding-Flow und automatischer Dokumentenanforderung.',
    tags: ['Website', 'Onboarding', 'KI-Assistent'],
    demo: true,
    comingSoon: false,
  },
  {
    id: 4,
    name: 'KI-Chatbot Demo',
    category: 'KI-System',
    description:
      'Chatbot-Integration für eine Kanzlei-Website: Mandantenanfragen qualifizieren, Termine buchen, rund um die Uhr erreichbar.',
    tags: ['KI-Chatbot', 'Terminbuchung', 'DSGVO'],
    demo: true,
    comingSoon: true,
  },
  {
    id: 5,
    name: 'Anfragen-Automatisierung Demo',
    category: 'Automatisierung',
    description:
      'Vollständiger Automatisierungs-Flow für Handwerksbetriebe: Anfrage → Qualifizierung → Benachrichtigung → Kalender.',
    tags: ['System-Automatisierung', 'Handwerk', 'CRM'],
    demo: true,
    comingSoon: true,
  },
  {
    id: 6,
    name: 'Voice-Agent Demo',
    category: 'KI-System',
    description:
      'Sprachbasierter KI-Assistent für telefonische Erstanfragen: Verfügbarkeit prüfen, Termin buchen, Daten strukturiert übergeben.',
    tags: ['Voice-Agent', 'Telefon-KI', 'Automatisierung'],
    demo: true,
    comingSoon: true,
  },
]

export default function PortfolioPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-dark-bg section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Portfolio
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-off-white leading-tight tracking-tight mb-6 text-balance">
              Beispielprojekte.{' '}
              <span className="text-neon">Klar als Demo gekennzeichnet.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              Alle gezeigten Projekte sind aktuell Demo-Sites – so sieht die Qualität aus.
              Echte Kundenprojekte folgen nach Phase 1.
            </p>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="bg-off-white py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-start gap-3 bg-neon/8 rounded-xl px-5 py-4 border border-neon/20">
            <Info size={15} className="text-neon-dim shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-text-dark text-sm leading-relaxed">
              <span className="font-semibold text-neon-dim">Alle Projekte sind Demo-Sites –</span>{' '}
              erstellt, um die Qualität und Möglichkeiten zu zeigen. Echte Kundenprojekte mit
              messbaren Ergebnissen folgen nach den ersten abgeschlossenen Projekten.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-border-light overflow-hidden flex flex-col"
              >
                {/* Image placeholder */}
                <div className="relative bg-warm-gray h-48 flex items-center justify-center">
                  <span className="text-text-muted/40 text-sm font-medium">Vorschau folgt</span>
                  <div className="absolute top-3 left-3 flex gap-2">
                    {project.demo && (
                      <span className="bg-neon/20 border border-neon/30 text-neon-dim text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Demo
                      </span>
                    )}
                    {project.comingSoon && (
                      <span className="bg-white/80 border border-border-light text-text-muted text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-white border border-border-light text-text-muted text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-text-dark font-bold text-lg mb-2">{project.name}</h2>
                  <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-warm-gray text-text-muted text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
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
            Ihr Projekt als Nächstes?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-off-white leading-tight tracking-tight mb-5 text-balance">
            Starten Sie mit einer kostenlosen Bedarfsanalyse.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Wir analysieren Ihre Abläufe – kostenlos und unverbindlich – und zeigen Ihnen,
            welches System den größten Hebel hat.
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
