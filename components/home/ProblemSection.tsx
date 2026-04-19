'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { MessageSquare, RefreshCw, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const problems = [
  {
    icon: MessageSquare,
    color: 'bg-orange-50 text-orange-500',
    title: 'Anfragen gehen verloren',
    description:
      'Interessenten schreiben nachts oder am Wochenende – und bekommen keine Antwort. Der nächste Anbieter ist nur einen Klick entfernt.',
  },
  {
    icon: RefreshCw,
    color: 'bg-lime-50 text-lime-600',
    title: 'Routinearbeit frisst Zeit',
    description:
      'Terminerinnerungen, Nachfassmails, Datenpflege – dieselben Handgriffe, immer wieder. Das kostet Stunden, die im Kerngeschäft fehlen.',
  },
  {
    icon: Calendar,
    color: 'bg-amber-50 text-amber-500',
    title: 'Termine und Folgeaufgaben fallen durch',
    description:
      'Ein Kunde bucht nicht nach, eine Erinnerung kommt zu spät – Umsatz, der sich hätte vermeiden lassen.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
}

export default function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad bg-warm-gray" aria-labelledby="problem-heading">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="max-w-2xl mb-14"
        >
          <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
            Bekannte Herausforderungen
          </p>
          <h2 id="problem-heading" className="heading-section text-text-dark mb-5 text-balance">
            Was viele Betriebe bremst.
          </h2>
          <p className="text-body text-balance">
            Unabhängig von Branche und Größe – viele KMU kämpfen mit denselben
            Themen. Und oft liegt die Lösung näher, als man denkt.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {problems.map((problem) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={problem.title}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 border border-border-light card-hover cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${problem.color}`}>
                  <Icon size={18} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-text-dark mb-2 text-base">{problem.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{problem.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 p-5 md:p-6 bg-dark-bg rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="hidden md:block w-1 min-h-[40px] bg-neon rounded-full shrink-0" aria-hidden="true" />
            <p className="text-white/70 text-base md:text-lg text-center md:text-left leading-relaxed">
              <span className="text-neon font-semibold">Genau hier setzt NEON an.</span>{' '}
              Wir analysieren Ihre Abläufe – kostenlos – und zeigen Ihnen,
              was ein System übernehmen kann.
            </p>
          </div>
          <Link
            href="/kontakt"
            className="shrink-0 inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3 rounded-full
                       hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm whitespace-nowrap"
          >
            Bedarfsanalyse starten
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
