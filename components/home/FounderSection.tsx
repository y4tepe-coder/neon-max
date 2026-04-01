'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import Image from 'next/image'
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
          className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start"
        >
          {/* Left: Photo + overlapping badge */}
          <div className="relative flex-shrink-0 mx-auto lg:mx-0">
            {/* Photo */}
            <div className="w-56 md:w-64 rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
              <Image
                src="/yasin.png"
                alt="Yasin Tepe – Gründer von NEON Agentur"
                width={320}
                height={427}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
            {/* Floating location badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl px-4 py-3 shadow-lg border border-border-light">
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-neon-dim" aria-hidden="true" />
                <span className="text-text-dark font-semibold text-xs">Baden-Württemberg</span>
              </div>
              <div className="mt-1.5 w-full h-0.5 bg-neon rounded-full" />
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-1 pt-2">
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-3">
              Wer steckt dahinter
            </p>
            <h2
              id="founder-heading"
              className="text-3xl md:text-4xl font-bold text-text-dark leading-tight tracking-tight mb-2"
            >
              Yasin Tepe
            </h2>
            <p className="text-neon-dim font-semibold text-base mb-5">Gründer von NEON Agentur</p>

            <p className="text-text-muted text-base leading-relaxed mb-5 max-w-lg">
              Ich baue moderne Websites für lokale Unternehmen – und betreue sie dauerhaft. Kein
              Fachjargon, keine Überraschungen. Persönlich, direkt und auf Augenhöhe.
            </p>

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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
