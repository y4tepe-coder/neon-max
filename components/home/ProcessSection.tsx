'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { AnimatedRoadmap, type Milestone } from '@/components/ui/animated-roadmap'
import { BookingModal } from '@/components/ui/booking-modal'

const milestones: Milestone[] = [
  {
    id: 1,
    name: 'Bedarfsanalyse',
    status: 'complete',
    position: { top: '80%', left: '7.5%' },
    description:
      'Kostenloses 30-Min.-Gespräch: Wir verstehen Ihre Abläufe, Engpässe und Ziele – ohne Verpflichtung.',
    tooltipSide: 'top',
    tooltipAlign: 'right',
  },
  {
    id: 2,
    name: 'Empfehlung',
    status: 'complete',
    position: { top: '16%', left: '22.5%' },
    description:
      'Sie erhalten eine konkrete schriftliche Empfehlung: welches System, welchen Hebel, welchen Aufwand.',
    tooltipSide: 'bottom',
    tooltipAlign: 'right',
  },
  {
    id: 3,
    name: 'Festpreis-Angebot',
    status: 'in-progress',
    position: { top: '56%', left: '43.75%' },
    description:
      'Klares Angebot, klarer Umfang – was vereinbart ist, wird gebaut. Kein Overrun, kein Überraschungs-Invoice.',
    tooltipSide: 'top',
    tooltipAlign: 'center',
  },
  {
    id: 4,
    name: 'Umsetzung',
    status: 'pending',
    position: { top: '9.5%', left: '63.75%' },
    description:
      'Wir bauen und testen das System – Sie bleiben informiert, ohne technischen Aufwand.',
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
      'Wir bleiben an Ihrer Seite: Monitoring, Updates, Anpassungen – dauerhaft mit persönlichem Ansprechpartner.',
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
              Analyse zuerst. Dann Ergebnis.
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Kein Paket von der Stange. Verstehen, empfehlen, umsetzen, betreuen.
            </p>
          </motion.div>

          {/* Mobile: vertical step list */}
          <div className="lg:hidden mt-10 flex flex-col gap-0">
            {milestones.map((m, i) => {
              const targetOpacity = 1 - i * 0.175
              const isLast = i === milestones.length - 1
              const dotDelay = 0.3 + i * 0.45
              const lineDelay = dotDelay + 0.25

              return (
                <div key={m.id} className="flex gap-4">
                  {/* Dot + line column */}
                  <div className="flex flex-col items-center">
                    {/* Dot: dark → neon */}
                    <motion.div
                      className="w-4 h-4 rounded-full shrink-0 mt-1"
                      initial={{
                        backgroundColor: 'rgba(197,247,79,0.08)',
                        boxShadow: 'none',
                        scale: 0.6,
                      }}
                      animate={isInView ? {
                        backgroundColor: `rgba(197,247,79,${targetOpacity})`,
                        boxShadow: `0 0 18px rgba(197,247,79,${targetOpacity * 0.7}), 0 0 6px rgba(197,247,79,${targetOpacity * 0.4})`,
                        scale: 1,
                      } : {}}
                      transition={{ duration: 0.5, delay: dotDelay, ease: [0.34, 1.56, 0.64, 1] }}
                    />
                    {/* Line: grows downward */}
                    {!isLast && (
                      <motion.div
                        className="w-px mt-1"
                        style={{ minHeight: '2.5rem' }}
                        initial={{ scaleY: 0, originY: 0, background: `linear-gradient(to bottom, rgba(197,247,79,${targetOpacity * 0.4}), rgba(197,247,79,0.05))` }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 0.35, delay: lineDelay, ease: 'easeIn' }}
                      />
                    )}
                  </div>

                  {/* Content fades in with dot */}
                  <motion.div
                    className={`pb-8 ${isLast ? 'pb-0' : ''}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: dotDelay + 0.1 }}
                  >
                    <motion.p
                      className="text-[11px] font-bold uppercase tracking-widest mb-1"
                      initial={{ color: 'rgba(197,247,79,0.2)' }}
                      animate={isInView ? { color: `rgba(197,247,79,${targetOpacity})` } : {}}
                      transition={{ duration: 0.4, delay: dotDelay }}
                    >
                      Schritt {m.id}
                    </motion.p>
                    <h3 className="text-off-white font-bold text-base mb-1">{m.name}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{m.description}</p>
                  </motion.div>
                </div>
              )
            })}
          </div>

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
