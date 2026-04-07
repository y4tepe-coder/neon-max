'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function FounderSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad bg-warm-gray" aria-labelledby="founder-heading">
      <div className="container-xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-3">
            Wer steckt dahinter
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h2
              id="founder-heading"
              className="text-3xl md:text-4xl font-bold text-text-dark leading-tight tracking-tight"
            >
              Yasin Tepe
            </h2>
            <div className="inline-flex items-center gap-1.5 bg-white border border-border-light rounded-xl px-3 py-1.5 shadow-sm">
              <MapPin size={12} className="text-neon-dim" aria-hidden="true" />
              <span className="text-text-dark font-semibold text-xs">Baden-Württemberg</span>
            </div>
          </div>

          <p className="text-neon-dim font-semibold text-base mb-5">Gründer von NEON Agentur</p>

          <div className="space-y-4 text-text-muted text-base leading-relaxed mb-5">
            <p>
              NEON Agentur habe ich gegründet, weil ich täglich Unternehmen begegne, die in
              ihrem Fachgebiet exzellent sind – online jedoch kaum wahrgenommen werden.
            </p>
            <p>
              Mein Anspruch: Kein Fachjargon, keine versteckten Kosten, kein anonymer Support.
              Sie erhalten mich als persönlichen Ansprechpartner – von Anfang bis Ende.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-7">
            {['Persönlich', 'Transparent', 'Engagiert', 'Lokal'].map((val) => (
              <span
                key={val}
                className="bg-white border border-border-light text-text-dark text-xs font-medium px-3 py-1.5 rounded-full"
              >
                {val}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3 rounded-full
                         hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm"
            >
              Gespräch starten
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link
              href="/ueber-uns"
              className="inline-flex items-center gap-2 text-text-muted font-medium hover:text-text-dark transition-colors duration-200 cursor-pointer group text-sm py-3"
            >
              Mehr über NEON erfahren
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
