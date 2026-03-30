'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Monitor, SearchX, Settings2, Clock, TrendingDown, UserX, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const problems = [
  {
    icon: Monitor,
    color: 'bg-orange-50 text-orange-500',
    title: 'Veraltetes Design',
    description:
      'Ihre Website sieht aus wie vor zehn Jahren – und Kunden bemerken das sofort. Ein erster Eindruck zählt.',
  },
  {
    icon: SearchX,
    color: 'bg-blue-50 text-blue-500',
    title: 'Kaum online auffindbar',
    description:
      'Wenn Kunden nach Ihnen suchen, finden sie Sie nicht. Oder schlimmer: Sie finden Ihre Konkurrenz.',
  },
  {
    icon: Settings2,
    color: 'bg-purple-50 text-purple-500',
    title: 'Änderungen sind kompliziert',
    description:
      'Jede kleine Anpassung kostet Zeit, Geld oder Nerven. Wer ist überhaupt noch für Ihre Website zuständig?',
  },
  {
    icon: Clock,
    color: 'bg-amber-50 text-amber-500',
    title: 'Keine Zeit für Pflege',
    description:
      'Sie führen ein Unternehmen – da bleibt keine Zeit, sich auch noch um die Website zu kümmern.',
  },
  {
    icon: TrendingDown,
    color: 'bg-red-50 text-red-500',
    title: 'Unprofessioneller Eindruck',
    description:
      'Eine schlecht wirkende Website schadet Ihrem Ruf. Potenzielle Kunden springen ab, bevor sie anfragen.',
  },
  {
    icon: UserX,
    color: 'bg-slate-100 text-slate-500',
    title: 'Kein klarer Ansprechpartner',
    description:
      'Sie wissen nicht, an wen Sie sich wenden sollen – und haben das Gefühl, allein gelassen zu werden.',
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
            Die häufigsten Probleme
          </p>
          <h2 id="problem-heading" className="heading-section text-text-dark mb-5 text-balance">
            Kommt Ihnen das bekannt vor?
          </h2>
          <p className="text-body text-balance">
            Viele lokale Unternehmen kämpfen mit denselben Themen – obwohl die Lösung
            eigentlich ganz einfach sein sollte.
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
              Wir übernehmen alles – von der Erstellung bis zur laufenden Betreuung. Klar
              strukturiert, ohne versteckte Kosten, auf Augenhöhe.
            </p>
          </div>
          <Link
            href="/kontakt"
            className="shrink-0 inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3 rounded-full
                       hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm whitespace-nowrap"
          >
            Jetzt anfragen
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
