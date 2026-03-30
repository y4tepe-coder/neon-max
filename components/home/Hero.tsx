'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { GradientWave } from '@/components/ui/gradient-wave'

const trustPoints = [
  'Mobil optimiert',
  'Inklusive Betreuung',
  'Schnelle Umsetzung',
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center bg-dark-bg overflow-hidden"
      aria-label="Hero Bereich"
    >
      {/* Animated WebGL gradient background */}
      <GradientWave
        colors={['#0a0a0a', '#0e1502', '#1a2e04', '#4a7a10', '#0a0a0a']}
        shadowPower={7}
        darkenTop={false}
        noiseFrequency={[0.00012, 0.00025]}
        deform={{ incline: 0.25, noiseAmp: 90, noiseFlow: 1.0, noiseSeed: 8 }}
      />

      {/* Text-protection overlay: darkens content side for readability */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(105deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.65) 40%, rgba(10,10,10,0.2) 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-[11] opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" aria-hidden="true" />
            <span className="text-white/70 text-sm font-medium">
              Webdesign Agentur · Baden-Württemberg
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold text-off-white leading-[1.05] tracking-tight mb-6 text-balance"
          >
            Ihre neue Website.{' '}
            <span className="text-neon">Professionell.</span>
            <br />
            Modern. Betreut.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/55 leading-relaxed max-w-2xl mb-10"
          >
            NEON Agentur baut moderne Websites für lokale Unternehmen – und sorgt dafür, dass
            alles reibungslos läuft. Kein technischer Aufwand für Sie, kein komplizierter Prozess.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 bg-neon text-text-dark font-semibold px-7 py-4 rounded-full
                         hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
            >
              Projekt anfragen
              <ArrowRight size={18} />
            </Link>
            <Link
              href="#website-check"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-7 py-4 rounded-full
                         hover:border-neon hover:text-neon transition-all duration-200 cursor-pointer text-base"
            >
              Website prüfen lassen
            </Link>
          </motion.div>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-x-6 gap-y-2"
          >
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2 text-white/70 text-sm">
                <CheckCircle2 size={14} className="text-neon" aria-hidden="true" />
                {point}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
