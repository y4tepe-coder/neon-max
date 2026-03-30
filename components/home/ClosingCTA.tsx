'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Calendar, Mail } from 'lucide-react'
import { HandWrittenTitle } from '@/components/ui/hand-writing-text'

export default function ClosingCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad bg-dark-bg overflow-hidden relative" aria-label="Abschluss – Jetzt starten">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(197,247,79,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197,247,79,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C5F74F 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="container-xl relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 rounded-full px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-neon" aria-hidden="true" />
            <span className="text-neon/80 text-sm font-medium">
              Kostenloses Erstgespräch möglich
            </span>
          </span>

          <HandWrittenTitle
            title="Bereit für Ihre neue Website?"
            subtitle="Lassen Sie uns in einem kurzen Gespräch herausfinden, was Ihre Website braucht – und wie wir das gemeinsam umsetzen."
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 -mt-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 bg-neon text-text-dark font-semibold px-7 py-4 rounded-full
                         hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
            >
              <Calendar size={18} aria-hidden="true" />
              Erstgespräch starten
            </Link>
            <Link
              href="mailto:hallo@neon-agentur.de"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-7 py-4 rounded-full
                         hover:border-neon hover:text-neon transition-all duration-200 cursor-pointer text-base"
            >
              <Mail size={18} aria-hidden="true" />
              E-Mail schreiben
            </Link>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              'Kostenlos & unverbindlich',
              'Antwort innerhalb von 24h',
              'Persönliche Beratung',
            ].map((item) => (
              <span key={item} className="text-white/30 text-sm flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neon/40" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
