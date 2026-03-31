'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, Globe, CheckCircle2 } from 'lucide-react'

const setupHighlights = [
  'Modernes, individuelles Design',
  'Für alle Geräte optimiert',
  'Kontaktformular & Seitenstruktur',
  'Livegang & Veröffentlichung',
]

const betreuungHighlights = [
  'Hosting & technischer Betrieb',
  'Sicherheit & Updates',
  '1 Änderung pro Monat inklusive',
  'Persönlicher Ansprechpartner',
]

const addons = [
  {
    icon: Zap,
    tag: 'Auf Anfrage',
    title: 'Optionale Erweiterungen',
    subtitle: 'Mehr, wenn Sie es brauchen.',
    description:
      'Terminbuchung, Chat, smarte Formulare, Automationen – wir erweitern Ihre Website jederzeit um sinnvolle Funktionen. Nur nach Absprache, nur was wirklich hilft.',
    features: ['Online-Terminbuchung', 'Chat & Kontaktfunktionen', 'Einfache Automationen', 'Individuelle Funktionen'],
  },
]

export default function ServicesOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad bg-off-white" id="leistungen" aria-labelledby="services-heading">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
            Leistungen & Preise
          </p>
          <h2 id="services-heading" className="heading-section text-text-dark mb-5 text-balance">
            Ein Paket. Alles drin.
          </h2>
          <p className="text-body text-center">
            Erstellung und Betreuung aus einer Hand – klar kalkulierbar, ohne versteckte Kosten.
          </p>
        </motion.div>

        {/* Komplettpaket – main card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-dark-bg rounded-2xl overflow-hidden mb-6"
        >
          {/* Top: package name + pricing */}
          <div className="px-8 md:px-10 pt-8 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 border-b border-dark-border">
            <div>
              <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 rounded-full px-3.5 py-1.5 mb-3">
                <Globe size={13} className="text-neon" aria-hidden="true" />
                <span className="text-neon/80 text-xs font-semibold uppercase tracking-widest">
                  Komplettpaket
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-off-white leading-tight">
                Website-Komplettpaket
              </h3>
              <p className="text-white/40 text-sm mt-1">Erstellt und betreut – aus einer Hand.</p>
            </div>

            {/* Pricing */}
            <div className="flex items-end gap-4 shrink-0">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-off-white leading-none">399 €</div>
                <div className="text-white/35 text-xs mt-1 font-medium">einmalig</div>
              </div>
              <div className="text-white/20 text-2xl font-light mb-1">+</div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-neon leading-none">79 €</div>
                <div className="text-neon/45 text-xs mt-1 font-medium">pro Monat</div>
              </div>
            </div>
          </div>

          {/* Two columns: Setup + Betreuung */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Setup */}
            <div className="p-8 md:p-10 md:border-r border-dark-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-white/30 text-xs font-semibold uppercase tracking-widest">
                  Setup · Einmalig
                </span>
              </div>
              <p className="text-white/80 font-semibold text-sm mb-4">Ihre Website wird erstellt.</p>
              <ul className="space-y-2.5">
                {setupHighlights.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-neon/70 shrink-0" aria-hidden="true" />
                    <span className="text-white/55 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Betreuung */}
            <div className="p-8 md:p-10 border-t md:border-t-0 border-dark-border">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-neon/50 text-xs font-semibold uppercase tracking-widest">
                  Betreuung · Monatlich
                </span>
              </div>
              <p className="text-white/80 font-semibold text-sm mb-4">Ihre Website wird betreut.</p>
              <ul className="space-y-2.5">
                {betreuungHighlights.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-neon shrink-0" aria-hidden="true" />
                    <span className="text-white/55 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA row */}
          <div className="px-8 md:px-10 py-5 border-t border-dark-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-4">
              {['Keine versteckten Kosten', 'Transparente Preisstruktur', 'Persönliche Beratung'].map((p) => (
                <span key={p} className="text-white/25 text-xs flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-neon/30 shrink-0" aria-hidden="true" />
                  {p}
                </span>
              ))}
            </div>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3 rounded-full
                         hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm shrink-0"
            >
              Paket anfragen
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        {/* Optional extensions card */}
        {addons.map((service, i) => {
          const Icon = service.icon
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-2xl p-7 flex flex-col bg-white border border-border-light hover:border-neon/30 transition-all duration-300 mb-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-warm-gray">
                  <Icon size={18} className="text-text-dark" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  {service.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-1 text-text-dark">{service.title}</h3>
              <p className="text-sm font-semibold mb-3 text-neon-dim">{service.subtitle}</p>
              <p className="text-sm leading-relaxed mb-5 text-text-muted">{service.description}</p>

              <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-auto">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-neon-dim" aria-hidden="true" />
                    <span className="text-sm text-text-muted">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-dark font-medium text-sm transition-colors duration-200 cursor-pointer group"
          >
            Alle Details & vollständige Leistungsliste
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
