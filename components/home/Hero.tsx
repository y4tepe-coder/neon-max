'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
})

const badges = [
  'Lokal in BW',
  'Self-hosted & DSGVO',
  'Ab 499 €',
  'Erste 2 Kunden kostenfrei',
] as const

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0A1400' }}
      aria-label="Hero Bereich"
    >
      {/* Neon radial glow – right side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 70% at 85% 50%, rgba(197,247,79,0.13) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle top-left glow */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl"
        style={{ background: 'rgba(197,247,79,0.05)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 pb-24">

        {/* Badge */}
        <motion.div {...fadeUp(0)}>
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest border mb-10"
            style={{
              background:  'rgba(197,247,79,0.08)',
              borderColor: 'rgba(197,247,79,0.25)',
              color:       '#C5F74F',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#C5F74F' }}
              aria-hidden="true"
            />
            KI-AUTOMATION UND WEBSITES AUS BW
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-bold leading-[1.08] tracking-tight"
          style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: '#F8FAFC' }}
        >
          Weniger Aufwand.
          <br />
          Mehr Ergebnisse.
          <br />
          <span style={{ color: '#C5F74F' }}>Mit KI.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.2)}
          className="mt-7 text-lg md:text-xl leading-relaxed max-w-2xl"
          style={{ color: 'rgba(248,250,252,0.55)' }}
        >
          Wir analysieren Ihre Abläufe – und bauen Ihnen das System, das Routine
          übernimmt, Anfragen qualifiziert und Termine organisiert.
          Festpreis. DSGVO-konform. In BW.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/kontakt"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-base font-bold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
            style={{
              background: '#C5F74F',
              color:      '#111111',
              boxShadow:  '0 4px 28px rgba(197,247,79,0.3)',
            }}
          >
            Kostenlose Bedarfsanalyse
            <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/leistungen"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold border transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              borderColor: 'rgba(248,250,252,0.2)',
              color:       'rgba(248,250,252,0.75)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(197,247,79,0.5)'
              e.currentTarget.style.color = '#C5F74F'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(248,250,252,0.2)'
              e.currentTarget.style.color = 'rgba(248,250,252,0.75)'
            }}
          >
            Leistungen ansehen
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3"
          role="list"
          aria-label="Leistungsmerkmale"
        >
          {badges.map((label) => (
            <div
              key={label}
              role="listitem"
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: 'rgba(248,250,252,0.45)' }}
            >
              <CheckCircle2 size={14} style={{ color: '#C5F74F' }} aria-hidden="true" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 mx-auto"
          style={{ background: 'linear-gradient(to bottom, rgba(197,247,79,0.4), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
