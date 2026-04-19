import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Handwerk & Gewerbe — Neon BW · KI-Agentur Stuttgart & BW',
  description:
    'KI-Automation für Handwerksbetriebe: Anfragen automatisch qualifizieren, Termine buchen, Kunden benachrichtigen. DSGVO-konform, self-hosted, Festpreis.',
  alternates: {
    canonical: '/branchen/handwerk',
  },
}

const pains = [
  {
    title: 'Anfragen gehen verloren',
    description:
      'Interessenten rufen an, während Sie auf der Baustelle sind. WhatsApp-Nachrichten kommen rein, wenn Sie keine Hand frei haben. Bis Sie zurückrufen – hat der nächste Betrieb schon zugesagt.',
  },
  {
    title: 'Terminplanung kostet unnötig Zeit',
    description:
      'Hin- und Her-Telefonate, doppelte Buchungen, vergessene Bestätigungen. Dabei könnten Kunden ihren Termin selbst buchen – vollautomatisch, rund um die Uhr.',
  },
  {
    title: 'Manuelle Routinen fressen Stunden',
    description:
      'Bestätigungen tippen, Erinnerungen verschicken, Kundendaten pflegen – dieselben Handgriffe, immer wieder. Das ist Zeit, die auf der Baustelle fehlt.',
  },
]

const solutions = [
  'Automatische Anfragen-Qualifizierung (Kontaktformular, WhatsApp, Telefon)',
  'Online-Terminbuchung – Kunden buchen selbst, Sie werden benachrichtigt',
  'Automatische Bestätigungen und Erinnerungen per Nachricht',
  'Professionelle Website mit Local SEO – in 14 Tagen live',
  'Anbindung an Ihr bestehendes Kalender-System',
  'Self-hosted & DSGVO-konform – Server in Deutschland',
]

const examples = [
  'Elektriker & Elektroinstallation',
  'Sanitär, Heizung & Klima',
  'Maler & Lackierer',
  'Schreiner & Tischler',
  'Kfz-Werkstätten',
  'Dachdecker',
  'Fliesenleger',
  'Gartenbau & Landschaftspflege',
]

export default function HandwerkPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-dark-bg section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Handwerk & Gewerbe
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-off-white leading-tight tracking-tight mb-6 text-balance">
              Mehr Aufträge.{' '}
              <span className="text-neon">Weniger Verwaltung.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              Handwerksbetriebe verlieren täglich Aufträge – nicht weil ihre Arbeit nicht überzeugt,
              sondern weil Anfragen nicht schnell genug beantwortet werden. Wir ändern das.
            </p>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Was viele Betriebe bremst
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark leading-tight tracking-tight mb-4 text-balance">
              Bekannte Probleme im Handwerk.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pains.map((pain) => (
              <div
                key={pain.title}
                className="bg-white rounded-2xl p-7 border border-border-light"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-5">
                  <AlertCircle size={20} className="text-orange-500" aria-hidden="true" />
                </div>
                <h3 className="text-text-dark font-bold text-lg mb-3">{pain.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 md:py-28 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
                Was wir bauen
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark leading-tight tracking-tight mb-5 text-balance">
                Ihr Betrieb läuft – auch wenn Sie gerade nicht ans Telefon gehen können.
              </h2>
              <p className="text-text-muted text-base leading-relaxed mb-8">
                Wir analysieren Ihre konkreten Abläufe und bauen Ihnen ein System, das
                Anfragen automatisch entgegennimmt, qualifiziert und weiterleitet –
                DSGVO-konform, self-hosted, mit Festpreis.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold
                           px-6 py-3 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm"
              >
                Kostenlose Bedarfsanalyse starten
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-border-light">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-5">
                Was wir für Handwerksbetriebe umsetzen
              </p>
              <ul className="space-y-3.5">
                {solutions.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="text-neon shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-text-dark text-sm">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Für wen genau
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark leading-tight tracking-tight text-balance">
              Für Betriebe, die gute Arbeit leisten – und besser gefunden werden wollen.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {examples.map((ex) => (
              <span
                key={ex}
                className="bg-white border border-border-light text-text-dark text-sm font-medium px-4 py-2 rounded-full"
              >
                {ex}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
            Nächster Schritt
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-off-white leading-tight tracking-tight mb-5 text-balance">
            30 Minuten – und Sie wissen, was möglich ist.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Kostenlose Bedarfsanalyse: Wir verstehen Ihre Abläufe und zeigen Ihnen konkret,
            wo ein System den größten Unterschied macht.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-7 py-4 rounded-full
                       hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
          >
            Bedarfsanalyse starten
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
