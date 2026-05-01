'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { value: '14',    unit: 'Tage',    label: 'bis zur fertigen Website' },
  { value: '30',    unit: 'Min',     label: 'Bedarfsanalyse, kostenfrei' },
  { value: '100',   unit: '%',       label: 'Festpreis vor Projektstart' },
  { value: 'BW',    unit: '',        label: 'lokal aus Region Stuttgart / LE' },
]

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad bg-dark-bg" aria-labelledby="stats-heading">
      <div className="container-xl">
        <motion.p
          ref={ref}
          id="stats-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-12 text-center"
        >
          In Zahlen
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span
                  className="text-5xl md:text-6xl font-black tabular-nums leading-none"
                  style={{ color: '#C5F74F' }}
                >
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-xl md:text-2xl font-bold text-neon/60 ml-1">
                    {stat.unit}
                  </span>
                )}
              </div>
              <p className="text-white/40 text-sm leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
