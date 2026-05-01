'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Inbox, FolderOpen, MessageSquareText, CalendarClock } from 'lucide-react'

const cards = [
  {
    icon: Inbox,
    title: 'Anfragen aufnehmen',
    text:
      'Formulare, E-Mails und Telefonnotizen landen sortiert an einem Ort – mit den richtigen Pflichtangaben, ohne Rückruf-Schleifen.',
  },
  {
    icon: FolderOpen,
    title: 'Informationen sortieren',
    text:
      'Wichtige Punkte werden automatisch markiert, dem richtigen Vorgang zugeordnet und in Ihre Tools übergeben.',
  },
  {
    icon: MessageSquareText,
    title: 'Rückfragen vorbereiten',
    text:
      'Standardfragen werden vorab geklärt oder als sauberer Vorschlag formuliert – Sie geben nur noch frei.',
  },
  {
    icon: CalendarClock,
    title: 'Termine erleichtern',
    text:
      'Verfügbarkeiten, Erinnerungen und Bestätigungen laufen ruhig im Hintergrund – statt Tabelle und Telefon.',
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

export default function ZeitSparen() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="zeit-sparen"
      className="section-pad bg-off-white"
      aria-labelledby="zeit-sparen-heading"
    >
      <div className="container-xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12 md:mb-14"
        >
          <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
            Was im Hintergrund passiert
          </p>
          <h2
            id="zeit-sparen-heading"
            className="heading-section text-text-dark mb-5 text-balance"
          >
            Wo KI Ihnen Zeit zurückholt.
          </h2>
          <p className="text-body">
            Nicht als Spielerei, sondern als ruhiges System im Hintergrund.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {cards.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 border border-border-light"
            >
              <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center mb-4">
                <Icon size={18} className="text-neon-dim" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-text-dark mb-2 text-base">{title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
