'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function FounderSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad bg-warm-gray" aria-labelledby="founder-heading">
      <div className="container-xl">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-dark-bg max-w-md mx-auto lg:mx-0">
              {/* Placeholder for founder photo */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div
                  className="w-24 h-24 rounded-full bg-dark-card border-2 border-neon/30 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <circle cx="20" cy="14" r="7" fill="#C5F74F" fillOpacity="0.3" />
                    <path
                      d="M4 36c0-8.837 7.163-16 16-16s16 7.163 16 16"
                      stroke="#C5F74F"
                      strokeOpacity="0.3"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-white/20 text-xs text-center px-6">
                  Foto kommt hier rein
                </p>
              </div>

              {/* Decorative neon border accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon to-transparent opacity-60"
                aria-hidden="true"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-4 -right-4 md:right-4 bg-white rounded-xl p-4 shadow-lg border border-border-light"
              aria-hidden="true"
            >
              <p className="text-xs text-text-muted font-medium">Gegründet in</p>
              <p className="text-text-dark font-bold text-sm">Baden-Württemberg</p>
              <div className="mt-1.5 w-full h-0.5 bg-neon rounded-full" />
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Wer steckt dahinter
            </p>
            <h2
              id="founder-heading"
              className="heading-section text-text-dark mb-6 text-balance"
            >
              Hi, ich bin Yasin.
            </h2>

            <div className="space-y-4 text-text-muted text-base leading-relaxed mb-8">
              <p>
                Ich habe NEON Agentur gegründet, weil ich überzeugt bin, dass jedes lokale
                Unternehmen einen professionellen Online-Auftritt verdient – unabhängig von Größe
                oder Budget.
              </p>
              <p>
                Was mich antreibt: Ich sehe täglich Unternehmer, die handwerklich großartig sind,
                aber online kaum sichtbar. Das möchte ich ändern. Mit modernen Websites, die
                wirklich funktionieren – und mit echter Betreuung dahinter.
              </p>
              <p>
                Bei NEON gibt es keine anonymen Support-Tickets und keine versteckten Kosten. Sie
                haben mich als direkten Ansprechpartner – jemanden, der Ihr Projekt kennt und
                sich wirklich kümmert.
              </p>
            </div>

            {/* Values */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {['Modern', 'Persönlich', 'Transparent', 'Engagiert', 'Lokal'].map((val) => (
                <span
                  key={val}
                  className="bg-white border border-border-light text-text-dark text-sm font-medium px-3.5 py-1.5 rounded-full"
                >
                  {val}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3.5 rounded-full
                           hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm"
              >
                <Calendar size={15} aria-hidden="true" />
                Kostenloses Erstgespräch buchen
              </Link>
              <Link
                href="/ueber-uns"
                className="inline-flex items-center gap-2 text-text-muted font-medium hover:text-text-dark transition-colors duration-200 cursor-pointer group text-sm py-3.5"
              >
                Mehr über NEON erfahren
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
