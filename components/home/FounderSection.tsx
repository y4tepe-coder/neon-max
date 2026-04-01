'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function FounderSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad bg-warm-gray" aria-labelledby="founder-heading">
      <div className="container-xl">
        {/* Overlapping card layout */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-0"
        >
          {/* Photo */}
          <div className="w-52 h-52 md:w-60 md:h-72 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl">
            <Image
              src="/yasin.png"
              alt="Yasin Tepe – Gründer von NEON Agentur"
              width={320}
              height={400}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>

          {/* Text card overlapping */}
          <div className="md:ml-[-28px] md:mt-6 z-10 bg-white rounded-2xl shadow-xl border border-border-light p-7 max-w-lg w-full">
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Wer steckt dahinter
            </p>
            <h2
              id="founder-heading"
              className="heading-section text-text-dark mb-6 text-balance"
            >
              Hi, ich bin Yasin.
            </h2>

            <div className="space-y-4 text-text-muted text-base leading-relaxed mb-8">
              <p>
                NEON Agentur habe ich gegründet, weil ich überzeugt bin: Jedes lokale Unternehmen
                verdient einen professionellen, zeitgemäßen Online-Auftritt – unabhängig von
                Größe oder Branche.
              </p>
              <p>
                Was mich täglich antreibt: Ich begegne Unternehmern, die in ihrem Fachgebiet
                exzellent sind – online jedoch kaum sichtbar. Das möchte ich ändern. Mit Websites,
                die nachhaltig wirken – und mit verlässlicher Betreuung, die dauerhaft trägt.
              </p>
              <p>
                Bei NEON gibt es keine anonymen Support-Tickets, keine versteckten Kosten. Sie
                erhalten mich als persönlichen Ansprechpartner – jemanden, der Ihr Projekt von
                Beginn an begleitet, fundiert kennt und mit echtem Engagement betreut.
              </p>
            </div>

            {/* Values */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {['Modern', 'Persönlich', 'Transparent', 'Engagiert', 'Lokal'].map((val) => (
                <span
                  key={val}
                  className="bg-white border border-border-light text-text-dark text-sm font-medium px-3.5 py-1.5 rounded-full"
                >
                  {val}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3.5 rounded-full
                           hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm"
              >
                <Calendar size={15} aria-hidden="true" />
                Kostenloses Erstgespräch buchen
              </Link>
              <Link
                href="/ueber-uns"
                className="inline-flex items-center gap-2 text-text-muted font-medium hover:text-text-dark transition-colors duration-200 cursor-pointer group text-sm py-3.5"
              >
                Mehr über NEON erfahren
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
