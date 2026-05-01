'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center"
        >
          {/* Image */}
          <div className="md:col-span-4">
            <div className="relative w-44 h-44 md:w-full md:max-w-[260px] md:aspect-square rounded-2xl overflow-hidden border border-border-light bg-white shadow-sm">
              <Image
                src="/yasin.png"
                alt="Yasin Tepe – Gründer von NEON Webdesign & KI"
                fill
                sizes="(max-width: 768px) 176px, 260px"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>

          {/* Text */}
          <div className="md:col-span-8 max-w-2xl">
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
                <span className="text-text-dark font-semibold text-xs">Region Stuttgart / LE</span>
              </div>
            </div>

            <p className="text-neon-dim font-semibold text-base mb-5">NEON Webdesign & KI</p>

            <div className="space-y-4 text-text-muted text-base leading-relaxed mb-6">
              <p>
                Ich baue Websites mit KI im Hintergrund für Inhaberinnen und Inhaber
                aus der Region – aus Leinfelden-Echterdingen, Filderstadt, Stuttgart
                und Umgebung.
              </p>
              <p>
                Wenig Bling, viel Ruhe im Postfach. Ich erkläre offen, was Sinn ergibt
                und was nicht – und was am Ende stehen bleibt, soll Ihnen Zeit zurückgeben.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-7">
              {['Lokal in BW', 'Persönlich erreichbar', 'Festpreis vor Start', 'DSGVO & self-hosted'].map((val) => (
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
                href="/termin"
                className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3 rounded-full
                           hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm"
              >
                30-Minuten-Gespräch buchen
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link
                href="/ueber-uns"
                className="inline-flex items-center gap-2 text-text-muted font-medium hover:text-text-dark transition-colors duration-200 cursor-pointer group text-sm py-3"
              >
                Mehr über NEON
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
