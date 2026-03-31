import type { Metadata } from 'next'
import { Wrench, Shield, Zap, CheckCircle2, ArrowRight, Info } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Leistungen & Preise – NEON Agentur',
  description:
    'Website-Komplettpaket für lokale Unternehmen: 399 € einmalig + 79 € / Monat. Erstellung und laufende Betreuung aus einer Hand. Keine versteckten Kosten.',
}

const setupFeatures = [
  'Modernes, individuelles Design',
  'Für alle Geräte optimiert',
  'Klare Seitenstruktur & Navigation',
  'Professionelle Inhaltsaufbereitung',
  'Kontaktformular & Kontaktseite',
  'SEO-Grundeinrichtung',
  'Technische Einrichtung & Konfiguration',
  'Domain & Veröffentlichung',
  'Übergabe & persönliche Einweisung',
]

const betreuungFeatures = [
  'Hosting & technischer Betrieb',
  'SSL-Zertifikat & Sicherheit',
  'Regelmäßige Updates & Wartung',
  '1 Inhaltsänderung pro Monat inklusive',
  'Schneller E-Mail-Support',
  'Persönlicher Ansprechpartner',
  'Keine Überraschungskosten',
]

const trustPoints = [
  'Keine versteckten Kosten',
  'Klare Preisstruktur',
  'Transparente Zusammenarbeit',
  'Zusätze nur nach Absprache',
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
      'Ermöglichen Sie schnelle Kontaktaufnahme über einen Chat oder Kontakt-Button auf Ihrer Website.',
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
              Ein Paket.{' '}
              <span className="text-neon">Alles drin.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              Wir bieten kein Baukastensystem und keine versteckten Extras. Unser Modell ist
              bewusst einfach: Sie bekommen eine professionelle Website – und wir sorgen dafür,
              dass sie dauerhaft läuft.
            </p>
          </div>
        </div>
      </section>

      {/* Main Package */}
      <section id="paket" className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Package card */}
          <div className="bg-white rounded-3xl border border-border-light overflow-hidden shadow-xl mb-8">

            {/* Header with pricing */}
            <div className="bg-dark-bg px-8 md:px-12 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 rounded-full px-3.5 py-1.5 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon" aria-hidden="true" />
                  <span className="text-neon/80 text-xs font-semibold uppercase tracking-widest">
                    Das Komplettpaket
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-off-white leading-tight tracking-tight mb-2">
                  Website-Komplettpaket
                </h2>
                <p className="text-white/50 text-base">
                  Erstellt und betreut – aus einer Hand.
                </p>
              </div>

              {/* Pricing */}
              <div className="flex items-end gap-5 shrink-0">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-off-white leading-none">399 €</div>
                  <div className="text-white/40 text-sm mt-1 font-medium">einmalig</div>
                </div>
                <div className="text-white/25 text-3xl font-light mb-2">+</div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-neon leading-none">79 €</div>
                  <div className="text-neon/50 text-sm mt-1 font-medium">pro Monat</div>
                </div>
              </div>
            </div>

            {/* Content: Setup + Betreuung */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Setup */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border-light">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-warm-gray flex items-center justify-center">
                    <Wrench size={13} className="text-text-muted" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                    Einmalig · Setup
                  </span>
                </div>

                <h3 className="text-xl font-bold text-text-dark mb-1 mt-4">
                  Ihre Website wird erstellt.
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  Wir bauen Ihre Website von Grund auf – modern, individuell und auf Ihr
                  Unternehmen zugeschnitten. Bis zum Livegang kümmern wir uns um alles.
                </p>

                <ul className="space-y-3">
                  {setupFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-neon-dim shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-text-dark text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Betreuung */}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-neon/10 flex items-center justify-center">
                    <Shield size={13} className="text-neon" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-neon/60">
                    Monatlich · Betreuung
                  </span>
                </div>

                <h3 className="text-xl font-bold text-text-dark mb-1 mt-4">
                  Ihre Website wird betreut.
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  Eine Website braucht laufende Pflege. Hosting, Sicherheit, Updates und
                  Anpassungen – das übernehmen wir. Sie haben immer einen Ansprechpartner.
                </p>

                <ul className="space-y-3">
                  {betreuungFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-neon shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-text-dark text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA + Trust strip */}
            <div className="px-8 md:px-12 py-6 bg-warm-gray border-t border-border-light flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {trustPoints.map((point) => (
                  <span key={point} className="text-text-muted text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-neon-dim shrink-0" aria-hidden="true" />
                    {point}
                  </span>
                ))}
              </div>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3.5 rounded-full
                           hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm shrink-0"
              >
                Paket anfragen
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Why this model */}
          <div className="bg-dark-bg rounded-2xl p-8 md:p-10 mb-6">
            <div className="max-w-3xl">
              <p className="text-neon/60 text-xs font-semibold uppercase tracking-widest mb-3">
                Warum dieses Modell?
              </p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
                Viele Agenturen bauen eine Website – und übergeben sie dann. Was danach passiert,
                ist Ihre Sorge. Wir machen das anders.
              </p>
              <p className="text-white/50 text-base leading-relaxed">
                Unser Modell trennt bewusst zwei Dinge:{' '}
                <span className="text-white/70 font-semibold">Setup = Erstellen</span>{' '}
                und{' '}
                <span className="text-neon font-semibold">Betreuung = Betreiben</span>.
                {' '}So wissen Sie von Anfang an, was einmalig anfällt und was monatlich läuft –
                ohne Überraschungen, ohne versteckte Kosten.
              </p>
            </div>
          </div>

          {/* Standalone note */}
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
              Das Komplettpaket deckt alles ab, was Sie für einen professionellen Start brauchen.
              Wenn Sie mehr möchten, können wir Ihre Website jederzeit gezielt erweitern –
              nur nach Absprache, nur was wirklich Sinn ergibt.
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
            Alle Erweiterungen sind auf Anfrage und werden individuell kalkuliert.
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
