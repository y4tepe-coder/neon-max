'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { User, MessageSquare, Clock } from 'lucide-react'

const reasons = [
  {
    icon: User,
    title: 'Persönliche Betreuung',
    description:
      'Kein anonymes Support-System, kein Ticket-Portal. Sie haben immer einen direkten Ansprechpartner – und der kennt Ihr Projekt.',
  },
  {
    icon: MessageSquare,
    title: 'Klare Kommunikation',
    description:
      'Kein Fachjargon, keine undurchsichtigen Angebote. Wir erklären alles verständlich – und Sie wissen immer, was gerade passiert.',
  },
  {
    icon: Clock,
    title: 'Alles aus einer Hand',
    description:
      'Setup, Betreuung, Erweiterungen – alles bei NEON. Sie müssen nicht zwischen drei Dienstleistern koordinieren.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
}

export default function WhyNeon() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad bg-dark-bg" aria-labelledby="why-heading">
      <div className="container-xl">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
            Warum NEON
          </p>
          <h2
            id="why-heading"
            className="heading-section text-off-white mb-5 text-balance"
          >
            Was NEON von anderen unterscheidet.
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Es gibt viele Anbieter. Aber nicht alle kümmern sich wirklich.
            Wir schon.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                className="group bg-dark-card border border-dark-border rounded-2xl p-6
                           hover:border-neon/30 transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center mb-5
                                group-hover:bg-neon/20 transition-colors duration-200">
                  <Icon size={18} className="text-neon" aria-hidden="true" />
                </div>
                <h3 className="text-off-white font-semibold text-base mb-2.5">
                  {reason.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
