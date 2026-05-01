import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, CheckCircle2, Mail, Phone } from 'lucide-react'

const CALENDLY_EMBED_URL =
  'https://calendly.com/y4tepe/30min?hide_gdpr_banner=1&background_color=F8F7F4&text_color=111111&primary_color=C5F74F'

const trustItems = [
  '30 Minuten',
  'Kostenlos & unverbindlich',
  'Konkrete Empfehlung',
] as const

const agendaItems = [
  'Wo aktuell Anfragen, Rückfragen oder manuelle Arbeit hängen bleiben',
  'Welche Website-, KI- oder Automatisierungs-Lösung wirklich sinnvoll ist',
  'Welche nächsten Schritte realistisch sind, inklusive grober Preisrange',
] as const

export const metadata: Metadata = {
  title: 'Termin buchen — NEON Webdesign & KI',
  description:
    'Kostenloses Erstgespräch mit NEON Webdesign & KI buchen. In 30 Minuten klären wir, welche Website-, KI- oder Automatisierungs-Lösung für Ihr Unternehmen sinnvoll ist.',
  alternates: {
    canonical: '/termin',
  },
}

export default function TerminPage() {
  return (
    <div className="pt-16 bg-off-white">
      <section className="bg-dark-bg py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
                Termin buchen
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-off-white leading-tight tracking-tight mb-6 text-balance">
                Kostenlose Bedarfsanalyse{' '}
                <span className="text-neon">direkt einplanen.</span>
              </h1>
              <p className="text-white/55 text-lg leading-relaxed max-w-2xl">
                Wählen Sie einen passenden Slot. Im Gespräch klären wir kurz und
                konkret, ob eine neue Website, Automatisierung oder KI-Lösung für
                Ihr Unternehmen Sinn ergibt.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                {trustItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                  >
                    <CheckCircle2 size={17} className="text-neon shrink-0" aria-hidden="true" />
                    <span className="text-white/70 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <div>
                  <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-3">
                    Ablauf
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-text-dark leading-tight tracking-tight mb-5 text-balance">
                    Kein Pitch. Erst verstehen, dann empfehlen.
                  </h2>
                  <p className="text-text-muted leading-relaxed">
                    Der Termin ist dafür da, die Situation sauber einzuschätzen.
                    Wenn NEON nicht passt, sagen wir das offen.
                  </p>
                </div>

                <div className="space-y-3">
                  {agendaItems.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neon shrink-0" aria-hidden="true" />
                      <p className="text-text-muted text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-border-light bg-white p-5">
                  <p className="text-sm font-semibold text-text-dark mb-4">
                    Lieber direkt schreiben?
                  </p>
                  <div className="space-y-2">
                    <a
                      href="tel:+4917620170133"
                      className="flex items-center gap-3 text-sm font-medium text-text-muted hover:text-text-dark transition-colors"
                    >
                      <Phone size={16} className="text-neon-dim" aria-hidden="true" />
                      0176 20 17 01 33
                    </a>
                    <a
                      href="mailto:info@neon-bw.de"
                      className="flex items-center gap-3 text-sm font-medium text-text-muted hover:text-text-dark transition-colors"
                    >
                      <Mail size={16} className="text-neon-dim" aria-hidden="true" />
                      info@neon-bw.de
                    </a>
                    <Link
                      href="/kontakt"
                      className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-neon-dim hover:underline"
                    >
                      Kontaktformular öffnen
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-xl shadow-black/5">
                <div className="flex items-center justify-between gap-4 border-b border-border-light px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neon text-text-dark">
                      <Calendar size={18} strokeWidth={2.5} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-dark">NEON Erstgespräch</p>
                      <p className="text-xs text-text-muted">Calendly-Buchung, ca. 30 Minuten</p>
                    </div>
                  </div>
                </div>

                <iframe
                  title="Termin bei NEON Webdesign & KI buchen"
                  src={CALENDLY_EMBED_URL}
                  className="h-[760px] w-full bg-off-white"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
