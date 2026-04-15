'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Star } from 'lucide-react'

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: '50 €',
    setupPrice: '500 €',
    description: 'Professioneller Einstieg für lokale Unternehmen.',
    features: [
      'Moderne One-Pager Website',
      'Local SEO Grundsetup',
      'Smartes Kontaktformular',
      'Hosting & Wartung',
    ],
    highlighted: false,
    badge: null,
  },
  {
    id: 'business',
    name: 'Business',
    monthlyPrice: '89 €',
    setupPrice: '850 €',
    description: 'Für Unternehmen, die wachsen wollen.',
    features: [
      'Multi-Page Website (bis 5 Seiten)',
      'Erweitertes Local SEO',
      'Automatisierte Terminbuchung',
      'WhatsApp/E-Mail-Erinnerungen',
      'Hosting & Wartung',
    ],
    highlighted: true,
    badge: 'Am beliebtesten',
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: '139 €',
    setupPrice: '1.750 €',
    description: 'Maximale Reichweite & Automatisierung.',
    features: [
      'Umfassende Website (bis 10 Seiten)',
      'KI-Chatbot für 24/7 Support',
      'KI-Telefonassistent (optional)',
      'Alle Automatisierungen',
      'Priorisierter Support',
      'Hosting & Wartung',
    ],
    highlighted: false,
    badge: null,
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
            Das richtige Paket für Ihr Unternehmen
          </h2>
          <p className="text-body text-center">
            Transparent kalkuliert, ohne versteckte Kosten – von der Erstellung bis zur laufenden Betreuung.
          </p>
        </motion.div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className={`relative flex flex-col rounded-2xl overflow-hidden ${
                pkg.highlighted
                  ? 'bg-dark-bg border-2 border-neon/50 shadow-[0_0_60px_rgba(197,247,79,0.12)]'
                  : 'bg-dark-bg border border-dark-border'
              }`}
            >
              {/* Bestseller badge */}
              {pkg.badge && (
                <div className="absolute top-0 inset-x-0 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 bg-neon text-text-dark text-xs font-bold px-4 py-1.5 rounded-b-xl tracking-wide">
                    <Star size={11} fill="currentColor" aria-hidden="true" />
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className={`flex flex-col flex-1 p-7 ${pkg.badge ? 'pt-11' : ''}`}>
                {/* Package label + description */}
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${pkg.highlighted ? 'text-neon/70' : 'text-white/30'}`}>
                  {pkg.name}
                </p>
                <p className="text-white/40 text-sm mb-6 leading-relaxed">{pkg.description}</p>

                {/* Pricing */}
                <div className="mb-1.5">
                  <div className={`text-4xl font-black leading-none tabular-nums ${pkg.highlighted ? 'text-neon' : 'text-off-white'}`}>
                    {pkg.monthlyPrice}
                    <span className={`text-sm font-semibold ml-1.5 ${pkg.highlighted ? 'text-neon/50' : 'text-white/30'}`}>
                      / Monat
                    </span>
                  </div>
                  <p className="text-white/35 text-sm mt-2">
                    + {pkg.setupPrice} <span className="text-white/20">einmalig</span>
                  </p>
                </div>
                <p className="text-white/20 text-xs mb-7">12 Monate Mindestlaufzeit</p>

                {/* Divider */}
                <div className={`h-px w-full mb-6 ${pkg.highlighted ? 'bg-neon/15' : 'bg-dark-border'}`} />

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={15}
                        className={`shrink-0 mt-0.5 ${pkg.highlighted ? 'text-neon' : 'text-neon/45'}`}
                        aria-hidden="true"
                      />
                      <span className="text-white/60 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/kontakt"
                  className={`block w-full text-center font-semibold px-5 py-3 rounded-full text-sm transition-all duration-200 cursor-pointer ${
                    pkg.highlighted
                      ? 'bg-neon text-text-dark hover:bg-neon-dim'
                      : 'border border-white/15 text-white/60 hover:border-white/30 hover:text-white/90'
                  }`}
                >
                  {pkg.name} anfragen
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-text-muted text-sm mt-8"
        >
          Alle Pakete inkl. Hosting & Wartung. Keine versteckten Kosten.{' '}
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-1 text-neon-dim hover:text-text-dark font-medium transition-colors duration-200"
          >
            Vollständige Leistungsübersicht
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
