import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Steuerberater — Neon BW · KI-Agentur Stuttgart & BW',
  description:
    'KI-Automation für Steuerberater: Automatische Dokumentenanforderung, Erinnerungsflows, Mandanten-Onboarding. DSGVO-konform, self-hosted, Festpreis.',
  alternates: {
    canonical: '/branchen/steuerberater',
  },
}

const pains = [
  {
    title: 'Unterlagen kommen zu spät',
    description:
      'Mandanten vergessen Fristen, liefern unvollständige Unterlagen oder melden sich erst kurz vor dem Abgabetermin. Manuelle Nachfassaktionen kosten täglich wertvolle Zeit.',
  },
  {
    title: 'Manuelles Nachfassen frisst Kapazitäten',
    description:
      'E-Mails schreiben, anrufen, erinnern – für jeden Mandanten, immer wieder. Das sind Stunden, die für inhaltliche Beratung fehlen.',
  },
  {
    title: 'Onboarding neuer Mandanten ist aufwändig',
    description:
      'Stammdatenerfassung, Vollmachten, Erstunterlagen – alles manuell. Dabei lässt sich dieser Prozess vollständig automatisieren und DSGVO-konform gestalten.',
  },
]

const solutions = [
  'Automatisierte Dokumentenanforderung mit Fristensteuerung',
  'Erinnerungsflows per E-Mail – bis alle Unterlagen eingegangen sind',
  'DSGVO-konformes Mandanten-Onboarding-System',
  'Automatische Bestätigungen und Statusmeldungen an Mandanten',
  'Professionelle Website mit Kontaktformular und DSGVO-Checkbox',
  'Self-hosted – keine Drittanbieter mit Zugriff auf Mandantendaten',
]

const examples = [
  'Einzelkanzleien',
  'Kanzlei-Verbünde',
  'Jahresabschluss',
  'Lohnbuchhaltung',
  'Einkommensteuer',
  'Unternehmensberatung',
  'Existenzgründerberatung',
]

export default function SteuerberaterPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-dark-bg section-pad">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Steuerberater
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-off-white leading-tight tracking-tight mb-6 text-balance">
              Unterlagen pünktlich.{' '}
              <span className="text-neon">Automatisch.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              Steuerberater verlieren täglich Stunden mit Nachfassaktionen und manuellem
              Dokumentenmanagement. Wir bauen Systeme, die das erledigen – damit Sie sich
              auf die Beratung konzentrieren können.
            </p>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Was viele Kanzleien bremst
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark leading-tight tracking-tight mb-4 text-balance">
              Bekannte Probleme in der Steuerberatung.
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
                Unterlagen kommen automatisch – Sie müssen nicht mehr nachfassen.
              </h2>
              <p className="text-text-muted text-base leading-relaxed mb-8">
                Wir analysieren Ihre Kanzlei-Abläufe und bauen Ihnen ein System, das
                Mandanten automatisch an ausstehende Unterlagen erinnert, Fristen steuert
                und Onboarding-Prozesse standardisiert – DSGVO-konform, self-hosted,
                ohne Drittanbieter mit Datenzugriff.
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
                Was wir für Steuerberater umsetzen
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
              Für Kanzleien, die Beratung in den Vordergrund stellen – nicht Nachfass-E-Mails.
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
            Kostenlose Bedarfsanalyse: Wir verstehen Ihre Abläufe und zeigen Ihnen,
            wie ein DSGVO-konformes Automatisierungssystem konkret aussehen kann.
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
