import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Für wen – NEON Agentur',
  description:
    'NEON Agentur richtet sich an lokale Dienstleister, Handwerker, kleine Unternehmen und Betriebe in Baden-Württemberg, die professionell online auftreten wollen.',
}

const targetGroups = [
  {
    title: 'Handwerk & Gewerbe',
    examples: ['Elektriker', 'Maler & Lackierer', 'Sanitär & Heizung', 'Schreiner', 'Kfz-Werkstätten', 'Bauunternehmen'],
    description:
      'Ihr Handwerk ist Ihr Aushängeschild – Ihre Website sollte es ebenfalls sein. Wir helfen Ihnen, online professionell aufzutreten und mehr Anfragen zu bekommen.',
  },
  {
    title: 'Dienstleister & Berater',
    examples: ['Steuerberater', 'Versicherungen', 'Coaches', 'Berater', 'Freelancer', 'Büros'],
    description:
      'Kompetenz und Vertrauen sind Ihr Kapital. Eine professionelle Website vermittelt genau das – und überzeugt potenzielle Kunden, bevor Sie das erste Wort sagen.',
  },
  {
    title: 'Gesundheit & Wellness',
    examples: ['Friseure', 'Kosmetikstudios', 'Massagepraxen', 'Fitnessstudios', 'Yogastudios', 'Therapeuten'],
    description:
      'Ihr Angebot verdient einen Auftritt, der Wohlgefühl und Professionalität vermittelt – mit einfacher Terminbuchung und klarer Darstellung Ihrer Leistungen.',
  },
  {
    title: 'Gastronomie & Einzelhandel',
    examples: ['Restaurants', 'Cafés', 'Bäckereien', 'Einzelhandel', 'Boutiquen', 'Feinkost'],
    description:
      'Bevor ein Gast kommt, schaut er auf Ihre Website. Wir sorgen dafür, dass der erste Eindruck stimmt – mit aktuellen Infos, Öffnungszeiten und Atmosphäre.',
  },
]

const goodFit = [
  'Sie haben noch keine Website oder eine deutlich veraltete',
  'Sie wollen mehr Anfragen und Kunden über das Internet',
  'Sie haben keine Zeit oder Lust, sich selbst um Technik zu kümmern',
  'Ihnen ist ein persönlicher Ansprechpartner wichtig',
  'Sie suchen eine faire, transparente Zusammenarbeit',
  'Ihr Unternehmen hat 0–30 Mitarbeitende',
  'Sie sind in Baden-Württemberg oder Umgebung ansässig',
]

const badFit = [
  'Sie suchen ausschließlich die billigste Lösung ohne Qualität',
  'Sie möchten einen komplexen Online-Shop mit hunderten Produkten',
  'Sie brauchen eine große Enterprise-Plattform',
  'Sie wollen die Arbeit zu 100% selbst umsetzen',
]

export default function FuerWenPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-dark-bg section-pad py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Für wen NEON gemacht ist
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-off-white leading-tight tracking-tight mb-6 text-balance">
              Genau für Unternehmen{' '}
              <span className="text-neon">wie Ihres.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              NEON richtet sich an lokale Unternehmen, die professionell online auftreten wollen –
              ohne technischen Aufwand und ohne versteckte Kosten.
            </p>
          </div>
        </div>
      </section>

      {/* Target groups */}
      <section className="section-pad bg-off-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Unsere Zielgruppen
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark leading-tight tracking-tight mb-5 text-balance">
              Wer unsere Kunden sind.
            </h2>
            <p className="text-text-muted text-lg leading-relaxed">
              Wir arbeiten am liebsten mit lokalen Unternehmen zusammen, die wissen, was sie tun –
              und die einen verlässlichen Partner für den digitalen Auftritt suchen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {targetGroups.map((group) => (
              <div
                key={group.title}
                className="bg-white rounded-2xl p-7 border border-border-light hover:border-neon/20 transition-colors duration-300 cursor-default"
              >
                <h3 className="text-text-dark font-bold text-lg mb-3">{group.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-5">
                  {group.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.examples.map((ex) => (
                    <span
                      key={ex}
                      className="bg-warm-gray text-text-muted text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fit / Not fit */}
      <section className="section-pad bg-warm-gray py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Passt das?
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark leading-tight tracking-tight mb-5 text-balance">
              Ist NEON das Richtige für Sie?
            </h2>
            <p className="text-text-muted text-lg leading-relaxed">
              Ehrlichkeit ist uns wichtig. Deshalb sagen wir Ihnen klar, wann wir die richtige
              Wahl sind – und wann vielleicht nicht.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Good fit */}
            <div className="bg-white rounded-2xl p-7 border border-border-light">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 size={20} className="text-neon" aria-hidden="true" />
                <h3 className="text-text-dark font-bold text-lg">Gut geeignet, wenn...</h3>
              </div>
              <ul className="space-y-3.5">
                {goodFit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon shrink-0 mt-1.5" aria-hidden="true" />
                    <span className="text-text-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bad fit */}
            <div className="bg-white rounded-2xl p-7 border border-border-light">
              <div className="flex items-center gap-2 mb-6">
                <XCircle size={20} className="text-red-400" aria-hidden="true" />
                <h3 className="text-text-dark font-bold text-lg">Weniger geeignet, wenn...</h3>
              </div>
              <ul className="space-y-3.5">
                {badFit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-300 shrink-0 mt-1.5" aria-hidden="true" />
                    <span className="text-text-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-dark-bg py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
            Passt das zu Ihnen?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-off-white leading-tight tracking-tight mb-5 text-balance">
            Lassen Sie uns kurz sprechen.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Wenn Sie sich in einer der Zielgruppen wiedererkennen, sind wir wahrscheinlich
            die richtige Wahl. Sprechen wir in einem kurzen, kostenlosen Gespräch darüber.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-7 py-4 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
          >
            Kostenloses Erstgespräch
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
