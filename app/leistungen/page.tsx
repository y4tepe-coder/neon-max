import type { Metadata } from 'next'
import { Wrench, Shield, Zap, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Leistungen – NEON Agentur',
  description:
    'Website-Setup, Betreuung und smarte Erweiterungen für lokale Unternehmen. Alles aus einer Hand, klar strukturiert.',
}

const setupFeatures = [
  'Modernes, individuelles Design',
  'Mobil- und tabletoptimiert',
  'Klare Seitenstruktur & Navigation',
  'Professionelle Inhaltsaufbereitung',
  'Kontaktformular & Kontaktseite',
  'SEO-Basis-Optimierung',
  'Google Business Anbindung (optional)',
  'Technische Grundeinrichtung',
  'Domaineinrichtung & Veröffentlichung',
  'Übergabe & Einweisung',
]

const betreuungFeatures = [
  'Hosting & technischer Betrieb',
  'SSL-Zertifikat & Sicherheit',
  'Regelmäßige Updates & Wartung',
  'Kleinere Textänderungen inklusive',
  'Schneller E-Mail-Support',
  'Monatliches Statusupdate',
  'Persönlicher Ansprechpartner',
  'Keine Überraschungskosten',
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
      'Ermöglichen Sie schnelle Kontaktaufnahme über einen Chat oder WhatsApp-Button auf Ihrer Website.',
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
      'Einfache Automatisierungen, die Ihnen Arbeit abnehmen – wie automatische Bestätigungsmails oder Benachrichtigungen.',
  },
  {
    title: 'Weitere auf Anfrage',
    description:
      'Haben Sie eine spezifische Anforderung? Wir besprechen gern, was möglich ist.',
  },
]

export default function LeistungenPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-dark-bg section-pad">
        <div className="container-xl max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Was wir anbieten
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-off-white leading-tight tracking-tight mb-6 text-balance">
              Unsere Leistungen.{' '}
              <span className="text-neon">Klar und strukturiert.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              Wir bieten Ihnen alles, was Sie für einen professionellen Online-Auftritt brauchen –
              von der Erstellung bis zur laufenden Betreuung. Einfach, transparent und ohne Umwege.
            </p>
          </div>
        </div>
      </section>

      {/* Setup */}
      <section id="setup" className="section-pad bg-off-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-warm-gray border border-border-light rounded-full px-4 py-2 mb-6">
                <Wrench size={15} className="text-text-muted" aria-hidden="true" />
                <span className="text-text-muted text-sm font-medium">Einmalig</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-text-dark leading-tight tracking-tight mb-4 text-balance">
                Website-Setup
              </h2>
              <p className="text-neon-dim font-semibold text-lg mb-5">
                Ihre Website. Professionell erstellt.
              </p>
              <p className="text-text-muted text-base leading-relaxed mb-6">
                Das Setup ist Ihr Einstieg. Wir erstellen Ihre neue Website von Grund auf –
                modern, individuell und auf Ihr Unternehmen zugeschnitten. Damit Sie online
                professionell auftreten, von Anfang an.
              </p>
              <p className="text-text-muted text-base leading-relaxed mb-8">
                Von der ersten Idee bis zum Livegang kümmern wir uns um alles: Design,
                Struktur, Inhalte, Technik und Veröffentlichung.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3.5 rounded-full
                           hover:bg-neon-dim transition-all duration-200 cursor-pointer"
              >
                Setup anfragen
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-border-light">
              <p className="text-text-muted text-xs font-semibold uppercase tracking-widest mb-5">
                Im Setup enthalten
              </p>
              <ul className="space-y-3.5">
                {setupFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 size={17} className="text-neon shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-text-dark text-sm font-medium">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Betreuung */}
      <section id="betreuung" className="section-pad bg-dark-bg py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="lg:order-2">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
                <Shield size={15} className="text-neon/60" aria-hidden="true" />
                <span className="text-white/50 text-sm font-medium">Monatlich</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-off-white leading-tight tracking-tight mb-4 text-balance">
                Website-Betreuung
              </h2>
              <p className="text-neon font-semibold text-lg mb-5">
                Ihre Website. Immer in guten Händen.
              </p>
              <p className="text-white/50 text-base leading-relaxed mb-6">
                Eine Website braucht laufende Pflege – technische Updates, Hosting, Sicherheit
                und einen Ansprechpartner für Änderungen. Das übernehmen wir.
              </p>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Mit unserem Betreuungsmodell sind Sie nicht allein. Sie haben immer einen
                direkten Ansprechpartner – und Ihre Website läuft zuverlässig.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3.5 rounded-full
                           hover:bg-neon-dim transition-all duration-200 cursor-pointer"
              >
                Betreuung anfragen
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="lg:order-1 bg-dark-card rounded-2xl p-7 border border-dark-border ring-1 ring-neon/20">
              <p className="text-neon/60 text-xs font-semibold uppercase tracking-widest mb-5">
                In der Betreuung enthalten
              </p>
              <ul className="space-y-3.5">
                {betreuungFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 size={17} className="text-neon shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-white/60 text-sm font-medium">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Erweiterungen */}
      <section id="erweiterungen" className="section-pad bg-warm-gray py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 bg-white border border-border-light rounded-full px-4 py-2 mb-6">
              <Zap size={15} className="text-neon-dim" aria-hidden="true" />
              <span className="text-text-muted text-sm font-medium">Optional</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark leading-tight tracking-tight mb-4 text-balance">
              Smarte Erweiterungen
            </h2>
            <p className="text-neon-dim font-semibold text-lg mb-5">
              Mehr Funktionen. Wenn Sie es brauchen.
            </p>
            <p className="text-text-muted text-base leading-relaxed">
              Wenn Sie mehr aus Ihrer Website herausholen möchten, können wir sie jederzeit
              erweitern – mit sinnvollen Funktionen, die echten Mehrwert bieten. Kein Zwang,
              kein Paket-Zwang. Nur was wirklich hilft.
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
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-off-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
            Los geht&apos;s
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark leading-tight tracking-tight mb-5 text-balance">
            Welche Leistung passt zu Ihnen?
          </h2>
          <p className="text-text-muted text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Erzählen Sie uns von Ihrem Projekt – wir beraten Sie kostenlos und
            unverbindlich, welche Leistungen für Sie sinnvoll sind.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-7 py-4 rounded-full
                       hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
          >
            Jetzt Kontakt aufnehmen
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
