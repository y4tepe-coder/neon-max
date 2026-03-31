'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { AnimatedRoadmap, type Milestone } from '@/components/ui/animated-roadmap'
import { BookingModal } from '@/components/ui/booking-modal'

const milestones: Milestone[] = [
  {
    id: 1,
    name: 'Erstgespräch',
    status: 'complete',
    position: { top: '80%', left: '7.5%' },
    description:
      'Kostenloses, unverbindliches Gespräch über Ihr Unternehmen und Ihre Ziele. Ca. 30 Minuten – per Telefon oder Video. Ganz entspannt.',
    tooltipSide: 'top',
    tooltipAlign: 'right',
  },
  {
    id: 2,
    name: 'Ziele & Konzept',
    status: 'complete',
    position: { top: '16%', left: '22.5%' },
    description:
      'Gemeinsam klären wir Struktur, Inhalte, Designrichtung und Zeitplan – verständlich erklärt, ohne Fachbegriffe.',
    tooltipSide: 'bottom',
    tooltipAlign: 'right',
  },
  {
    id: 3,
    name: 'Umsetzung',
    status: 'in-progress',
    position: { top: '56%', left: '43.75%' },
    description:
      'Wir bauen Ihre Website und halten Sie dabei auf dem Laufenden. Sie entscheiden, was gefällt – und was noch angepasst werden soll.',
    tooltipSide: 'top',
    tooltipAlign: 'center',
  },
  {
    id: 4,
    name: 'Livegang',
    status: 'pending',
    position: { top: '9.5%', left: '63.75%' },
    description:
      'Ihre Website geht online – wir kümmern uns um Domain, Hosting und alles Technische. Fertig. Live. Professionell.',
    cta: true,
    tooltipSide: 'bottom',
    tooltipAlign: 'center',
  },
  {
    id: 5,
    name: 'Betreuung',
    status: 'pending',
    position: { top: '48.75%', left: '94.75%' },
    description:
      'Wir bleiben an Ihrer Seite – Hosting, Pflege, Änderungen, Support. Dauerhaft. Mit persönlichem Ansprechpartner.',
    tooltipSide: 'top',
    tooltipAlign: 'left',
  },
]

export default function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [bookingOpen, setBookingOpen] = useState(false)

  const milestonesWithHandlers: Milestone[] = milestones.map((m) =>
    m.cta ? { ...m, onCtaClick: () => setBookingOpen(true) } : m
  )

  return (
    <>
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <section className="section-pad bg-dark-bg overflow-hidden" aria-labelledby="process-heading">
        <div className="container-xl">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-6 md:mb-4"
          >
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              So läuft es ab
            </p>
            <h2
              id="process-heading"
              className="heading-section text-off-white mb-5 text-balance"
            >
              Einfach. Strukturiert. Klar.
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Von der ersten Idee bis zur fertigen Website – und darüber hinaus.
            </p>
          </motion.div>

          {/* Mobile: vertical step list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:hidden mt-10 flex flex-col gap-0"
          >
            {milestones.map((m, i) => {
              const dotOpacity = 1 - i * 0.175
              const isLast = i === milestones.length - 1
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex gap-4"
                >
                  {/* Line + dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-4 h-4 rounded-full shrink-0 mt-1"
                      style={{
                        backgroundColor: `rgba(197,247,79,${dotOpacity})`,
                        boxShadow: `0 0 10px rgba(197,247,79,${dotOpacity * 0.5})`,
                      }}
                    />
                    {!isLast && (
                      <div
                        className="w-px flex-1 mt-1 mb-0"
                        style={{
                          background: `linear-gradient(to bottom, rgba(197,247,79,${dotOpacity * 0.4}), rgba(197,247,79,${dotOpacity * 0.1}))`,
                          minHeight: '2rem',
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                    <p
                      className="text-[11px] font-bold uppercase tracking-widest mb-1"
                      style={{ color: `rgba(197,247,79,${dotOpacity})` }}
                    >
                      Schritt {m.id}
                    </p>
                    <h3 className="text-off-white font-bold text-base mb-1">{m.name}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{m.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Desktop: animated SVG roadmap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <p className="text-white/25 text-sm text-center mb-2">
              Fahren Sie mit der Maus über die Schritte, um mehr zu erfahren.
            </p>
            <AnimatedRoadmap milestones={milestonesWithHandlers} />
          </motion.div>
        </div>
      </section>
    </>
  )
}
