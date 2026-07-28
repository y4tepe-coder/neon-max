'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Globe2, Cpu, Workflow, LifeBuoy, ArrowRight, Nfc, type LucideIcon } from 'lucide-react'

interface Service {
  icon: LucideIcon
  title: string
  text: string
}

const services: Service[] = [
  {
    icon: Globe2,
    title: 'Website als Eingang',
    text:
      'Ein schneller, glaubwürdiger erster Eindruck mit Formularen, die die wichtigsten Angaben direkt sauber abfragen.',
  },
  {
    icon: Cpu,
    title: 'Sortieren & vorbereiten',
    text:
      'Anfragen zusammenfassen, wichtige Punkte markieren, Standardrückfragen vorbereiten – ruhig im Hintergrund.',
  },
  {
    icon: Workflow,
    title: 'Anfrage- & Terminfluss',
    text:
      'Von der ersten Nachricht bis zum bestätigten Termin: ein Ablauf statt Zettelwirtschaft, mit Erinnerung und Übergabe in Ihre Tools.',
  },
  {
    icon: LifeBuoy,
    title: 'Betreuung & Optimierung',
    text:
      'Kein Set-and-forget. Wir schauen mit, justieren nach echten Anfragen nach – persönlicher Ansprechpartner aus BW.',
  },
]

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
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(197,247,79,0.55), 0 0 28px rgba(197,247,79,0.08)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-5">
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

        <div className="flex flex-col gap-2">
          <h3
            className="text-lg font-semibold leading-snug"
            style={{ color: '#F8FAFC' }}
          >
            {service.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'rgba(248,250,252,0.6)' }}
          >
            {service.text}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

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
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(197,247,79,0.4), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

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
            Was wir bauen
          </motion.span>

          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight"
            style={{ color: '#F8FAFC' }}
          >
            Ein System, das für Sie{' '}
            <span
              className="relative inline-block"
              style={{ color: '#C5F74F' }}
            >
              mitarbeitet.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-4 text-base md:text-lg max-w-xl mx-auto"
            style={{ color: 'rgba(248,250,252,0.55)' }}
          >
            Vier Bausteine, die zusammen einen Ablauf ergeben. Nicht mehr Tools,
            sondern weniger manuelle Nacharbeit.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-6 grid overflow-hidden border border-neon/35 bg-[#C5F74F] md:grid-cols-[1fr_auto]"
        >
          <div className="flex gap-5 p-6 sm:p-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#142000] text-neon">
              <Nfc size={23} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#425500]">
                Neues Produkt für kleine Teams
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-[#142000]">
                Digitale Visitenkarten am Schlüsselbund.
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#344400]">
                5 NFC-Anhänger, 5 persönliche Profile und Einrichtung durch NEON – als
                Einführungspaket für 99,99 €.
              </p>
            </div>
          </div>
          <Link
            href="/nfc-visitenkarte"
            className="group flex min-h-16 items-center justify-center gap-3 border-t border-[#142000]/20 bg-[#142000] px-8 text-sm font-black text-white md:border-l md:border-t-0"
          >
            Paket ansehen
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

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
            style={{ color: 'rgba(248,250,252,0.4)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(248,250,252,0.75)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(248,250,252,0.4)')}
          >
            Alle Leistungen im Detail
            <ArrowRight size={14} />
          </Link>
        </motion.div>

      </div>

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
