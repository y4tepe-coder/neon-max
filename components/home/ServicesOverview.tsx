'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Globe2, Zap, MapPin, Headset, ArrowRight, type LucideIcon } from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────────────────

interface Service {
  icon: LucideIcon
  title: string
  text: string
  accent?: boolean
}

const services: Service[] = [
  {
    icon: Globe2,
    title: 'Moderne Website',
    text: 'Mobiloptimiert, blitzschnell, Local SEO – damit Sie gefunden werden.',
  },
  {
    icon: Zap,
    title: 'KI-Automatisierung',
    text: 'Anfragen automatisch qualifizieren, ins CRM eintragen, Kunden sofort benachrichtigen.',
    accent: true,
  },
  {
    icon: MapPin,
    title: 'Local SEO',
    text: 'Wenn jemand in LE nach Ihrem Service sucht – erscheinen Sie ganz oben.',
  },
  {
    icon: Headset,
    title: 'Rundum-Betreuung',
    text: 'Updates, Hosting, Änderungen – alles inklusive. Kein technischer Aufwand für Sie.',
  },
]

// ─── Card ──────────────────────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative rounded-2xl p-7 border transition-all duration-300"
      style={{
        background:   '#141e00',
        borderColor:  'rgba(197,247,79,0.3)',
      }}
      // Inline hover via Framer whileHover keeps it type-safe
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(197,247,79,0.55), 0 0 28px rgba(197,247,79,0.08)',
        }}
        aria-hidden="true"
      />

      {/* Accent card: subtle indigo gradient tint */}
      {service.accent && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(197,247,79,0.08) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 flex flex-col gap-5">
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
          style={{ background: 'rgba(197,247,79,0.15)' }}
          aria-hidden="true"
        >
          <Icon
            size={22}
            style={{ color: '#C5F74F' }}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h3
            className="text-lg font-semibold leading-snug"
            style={{ color: '#F8FAFC' }}
          >
            {service.title}

            {/* KI badge on the accent card */}
            {service.accent && (
              <span
                className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider align-middle"
                style={{
                  background:  'rgba(204,255,0,0.12)',
                  color:       '#CCFF00',
                  border:      '1px solid rgba(204,255,0,0.25)',
                }}
              >
                Neu
              </span>
            )}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'rgba(248,250,252,0.55)' }}
          >
            {service.text}
          </p>
        </div>

        {/* Arrow link */}
        <div
          className="flex items-center gap-1.5 text-xs font-semibold mt-auto pt-1 transition-colors duration-200"
          style={{ color: 'rgba(197,247,79,0.7)' }}
        >
          Mehr erfahren
          <ArrowRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────

export default function ServicesOverview() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section
      id="leistungen"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: '#0A1400' }}
      aria-labelledby="services-heading"
    >
      {/* Subtle section separator gradient */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(197,247,79,0.4), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ─────────────────────────────────────────────────── */}
        <div ref={headingRef} className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest border mb-6"
            style={{
              background:   'rgba(197,247,79,0.09)',
              borderColor:  'rgba(197,247,79,0.3)',
              color:        '#C5F74F',
            }}
          >
            Was wir für Sie tun
          </motion.span>

          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight"
            style={{ color: '#F8FAFC' }}
          >
            Alles aus einer Hand –{' '}
            <span
              className="relative inline-block"
              style={{ color: '#C5F74F' }}
            >
              ohne Aufwand für Sie.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-4 text-base md:text-lg max-w-xl mx-auto"
            style={{ color: 'rgba(248,250,252,0.5)' }}
          >
            Von der Website bis zur Automatisierung – wir liefern ein System, das für Sie arbeitet.
          </motion.p>
        </div>

        {/* ── 2×2 Card Grid ───────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: 'rgba(248,250,252,0.35)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(248,250,252,0.7)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,250,252,0.35)')}
          >
            Vollständige Leistungsübersicht
            <ArrowRight size={14} />
          </Link>
        </motion.div>

      </div>

      {/* Subtle section separator gradient bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(197,247,79,0.2), transparent)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
