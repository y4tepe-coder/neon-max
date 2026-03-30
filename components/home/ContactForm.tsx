'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, MapPin, Clock, CheckCircle2, ArrowRight } from 'lucide-react'

// TODO: Ersetze mit deinem echten öffentlichen Calendly-Link
// z.B. https://calendly.com/dein-name/erstgespraech
const CALENDLY_URL = 'https://calendly.com/y4tepe/30min'
const WHATSAPP_URL =
  'https://wa.me/4917620170133?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20neue%20Website.'

type CalendlyWindow = Window & {
  Calendly?: { initPopupWidget: (opts: { url: string }) => void }
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#25D366]" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function ContactOptions() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  function openCalendly() {
    const w = window as CalendlyWindow
    if (w.Calendly) {
      w.Calendly.initPopupWidget({ url: CALENDLY_URL })
    } else {
      window.open(CALENDLY_URL, '_blank')
    }
  }

  return (
    <section className="py-24 md:py-32 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left: info panel */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mb-4">
              Einfach Kontakt aufnehmen.
            </h2>
            <p className="text-text-muted text-base leading-relaxed mb-8">
              Kein kompliziertes Formular. Wählen Sie einfach, wie Sie mit uns in
              Kontakt treten möchten – wir sind schnell für Sie da.
            </p>

            <div className="space-y-5 mb-8">
              {[
                { icon: Clock, label: 'Reaktionszeit', value: 'Antwort innerhalb von 24 Stunden' },
                { icon: MapPin, label: 'Standort', value: 'Baden-Württemberg, Deutschland' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-warm-gray flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-text-dark" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-0.5">
                      {label}
                    </p>
                    <p className="text-text-dark font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-warm-gray rounded-2xl p-5">
              <p className="text-text-dark font-semibold text-sm mb-3">Was Sie erwarten können:</p>
              <div className="space-y-2.5">
                {[
                  'Schnelle, persönliche Rückmeldung',
                  'Kein Verkaufsdruck, keine Verpflichtung',
                  'Ehrliche, transparente Beratung',
                  'Gespräch auf Augenhöhe',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-neon shrink-0" aria-hidden="true" />
                    <span className="text-text-muted text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: contact option cards */}
          <div className="flex flex-col gap-4">
            {/* Calendly card */}
            <motion.button
              type="button"
              onClick={openCalendly}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group w-full text-left p-6 sm:p-7 rounded-2xl bg-dark-bg border border-dark-border
                         hover:border-neon/30 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neon/15 flex items-center justify-center shrink-0">
                  <Calendar size={22} className="text-neon" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-neon/60 uppercase tracking-widest mb-1">
                    Empfohlen
                  </p>
                  <h3 className="text-off-white font-bold text-lg mb-1.5">
                    Erstgespräch buchen
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Ca. 30 Minuten per Telefon – kostenlos, unverbindlich und auf
                    Ihren Zeitplan abgestimmt.
                  </p>
                </div>
              </div>
              <div className="mt-5 inline-flex items-center gap-2 bg-neon text-text-dark font-semibold
                              text-sm px-5 py-2.5 rounded-full group-hover:bg-neon-dim transition-colors duration-200">
                Termin auswählen
                <ArrowRight size={14} aria-hidden="true" />
              </div>
            </motion.button>

            {/* WhatsApp card */}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group w-full p-6 sm:p-7 rounded-2xl bg-white border border-warm-gray
                         hover:border-[#25D366]/40 hover:shadow-xl transition-all duration-300 cursor-pointer
                         hover:-translate-y-1 flex items-start gap-4 no-underline"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <WhatsAppIcon />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-1">
                  Schnell &amp; direkt
                </p>
                <h3 className="text-text-dark font-bold text-lg mb-1.5">
                  WhatsApp schreiben
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Kurze Frage oder direkte Nachricht? Schreiben Sie uns einfach
                  auf WhatsApp – wir antworten schnell.
                </p>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
