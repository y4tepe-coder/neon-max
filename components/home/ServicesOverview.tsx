'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, Globe, CheckCircle2 } from 'lucide-react'

const mainFeatures = [
  'Modernes, individuelles Design',
  'Für alle Geräte optimiert',
  'SEO-Basisoptimierung',
  'Kontaktmöglichkeiten',
  'Klare Seitenstruktur',
  'Livegang & Veröffentlichung',
]

const addons = [
  {
    icon: Shield,
    tag: 'Monatlich',
    title: 'Website-Betreuung',
    subtitle: 'Immer in guten Händen.',
    description:
      'Hosting, Sicherheit, Pflege, Änderungen und ein persönlicher Ansprechpartner – alles inklusive. Sie müssen sich um nichts kümmern.',
    features: ['Hosting & technischer Betrieb', 'Sicherheit & Updates', 'Kleinere Änderungen', 'Support & persönlicher Kontakt'],
    highlight: true,
  },
  {
    icon: Zap,
    tag: 'Optional',
    title: 'Smarte Erweiterungen',
    subtitle: 'Mehr, wenn Sie es brauchen.',
    description:
      'Terminbuchung, Chat, Formulare, Automationen – wir erweitern Ihre Website jederzeit um sinnvolle Funktionen.',
    features: ['Online-Terminbuchung', 'Chat & Kontaktfunktionen', 'Einfache Automationen', 'Lokale SEO-Erweiterungen'],
    highlight: false,
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
            Was wir machen
          </p>
          <h2 id="services-heading" className="heading-section text-text-dark mb-5 text-balance">
            Ihre neue Website – erstellt und betreut.
          </h2>
          <p className="text-body text-center">
            Wir bauen nicht nur Websites. Wir sorgen dafür, dass sie laufen.
          </p>
        </motion.div>

        {/* Main service – Website-Erstellung (featured) */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-dark-bg rounded-2xl overflow-hidden mb-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left copy */}
            <div className="p-8 md:p-10">
              <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 rounded-full px-3.5 py-1.5 mb-6">
                <Globe size={13} className="text-neon" aria-hidden="true" />
                <span className="text-neon/80 text-xs font-semibold uppercase tracking-widest">
                  Kernleistung
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-off-white leading-tight mb-3">
                Website-Erstellung
              </h3>
              <p className="text-neon font-semibold text-lg mb-5">
                Ihre Website. Professionell. Von Grund auf neu.
              </p>
              <p className="text-white/50 text-base leading-relaxed mb-8">
                Wir gestalten und bauen Ihre neue Website – modern, individuell und auf Ihr
                Unternehmen zugeschnitten. Klar strukturiert, mobil optimiert und bereit zum
                Start. Kein Baukastensystem, kein Template. Echte Handarbeit.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {mainFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-neon shrink-0" aria-hidden="true" />
                    <span className="text-white/60 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3.5 rounded-full
                           hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm"
              >
                Website anfragen
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            {/* Right visual */}
            <div className="relative hidden lg:flex items-center justify-center p-10 bg-dark-card border-l border-dark-border">
              {/* Browser mockup */}
              <div className="w-full max-w-sm bg-dark-bg rounded-xl overflow-hidden border border-dark-border shadow-2xl">
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-dark-border bg-dark-card">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <div className="ml-3 flex-1 bg-dark-border rounded px-3 py-0.5 text-white/20 text-xs">
                    www.ihr-unternehmen.de
                  </div>
                </div>
                {/* Page preview blocks */}
                <div className="p-4 space-y-3">
                  <div className="h-20 bg-dark-border rounded-lg flex items-center justify-center">
                    <div className="w-16 h-2 bg-neon/30 rounded" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-14 bg-dark-border rounded-lg" />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-dark-border rounded w-3/4" />
                    <div className="h-2 bg-dark-border rounded w-1/2" />
                  </div>
                  <div className="h-8 bg-neon/20 rounded-lg border border-neon/30 flex items-center justify-center">
                    <div className="w-20 h-2 bg-neon/40 rounded" />
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute bottom-8 right-8 bg-neon rounded-xl px-4 py-2 shadow-lg">
                <p className="text-text-dark text-xs font-bold">Live in wenigen Wochen</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add-on services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {addons.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className={`rounded-2xl p-7 flex flex-col cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  service.highlight
                    ? 'bg-dark-bg ring-1 ring-neon/30'
                    : 'bg-white border border-border-light hover:border-neon/30'
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      service.highlight ? 'bg-neon/15' : 'bg-warm-gray'
                    }`}
                  >
                    <Icon
                      size={18}
                      className={service.highlight ? 'text-neon' : 'text-text-dark'}
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold uppercase tracking-widest ${
                      service.highlight ? 'text-neon/60' : 'text-text-muted'
                    }`}
                  >
                    {service.tag}
                  </span>
                </div>

                <h3 className={`text-xl font-bold mb-1 ${service.highlight ? 'text-off-white' : 'text-text-dark'}`}>
                  {service.title}
                </h3>
                <p className={`text-sm font-semibold mb-3 ${service.highlight ? 'text-neon' : 'text-neon-dim'}`}>
                  {service.subtitle}
                </p>
                <p className={`text-sm leading-relaxed mb-5 ${service.highlight ? 'text-white/50' : 'text-text-muted'}`}>
                  {service.description}
                </p>

                <ul className="space-y-2.5 mt-auto">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          service.highlight ? 'bg-neon' : 'bg-neon-dim'
                        }`}
                        aria-hidden="true"
                      />
                      <span className={`text-sm ${service.highlight ? 'text-white/60' : 'text-text-muted'}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-dark font-medium text-sm transition-colors duration-200 cursor-pointer group"
          >
            Alle Leistungen im Detail ansehen
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
