'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { AnimatedRoadmap, type Milestone } from '@/components/ui/animated-roadmap'
import { BookingModal } from '@/components/ui/booking-modal'

/**
 * Milestone positions map to SVG path coordinates (viewBox 0 0 800 400, container h-480px):
 *   left % × 8 = SVG x   |   top % × 4 = SVG y
 *
 *   Erstgespräch   → left 7.50% / top 80.00% → SVG (60, 320)
 *   Ziele & Konzept → left 22.50% / top 16.00% → SVG (180, 64)
 *   Umsetzung      → left 43.75% / top 56.00% → SVG (350, 224)
 *   Livegang       → left 63.75% / top  9.50% → SVG (510, 38)
 *   Betreuung      → left 94.75% / top 48.75% → SVG (758, 195)
 */
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
      'Wir bauen Ihre Website – modern, mobil optimiert und auf Ihr Unternehmen zugeschnitten. Sie verfolgen den Fortschritt laufend.',
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
            <p className="text-white/25 text-sm mt-3">
              Fahren Sie mit der Maus über die Schritte, um mehr zu erfahren.
            </p>
          </motion.div>

          {/* Animated roadmap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatedRoadmap milestones={milestonesWithHandlers} />
          </motion.div>
        </div>
      </section>
    </>
  )
}
