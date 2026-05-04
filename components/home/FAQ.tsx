'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'Was bringt mir das konkret im Alltag?',
    answer:
      'Weniger Nachfassen, weniger Sucherei, weniger Hin und Her. Anfragen werden sauber aufgenommen, wichtige Punkte sortiert, Standardrückfragen vorbereitet und Termine bestätigt. Sie entscheiden am Ende nur noch das, was wirklich Ihre Entscheidung braucht.',
  },
  {
    question: 'Was kostet das Ganze?',
    answer:
      'Wir nennen den Festpreis vor Projektstart, nicht erst auf der Rechnung. In der kostenlosen Analyse klären wir Umfang und Aufwand und Sie bekommen eine klare Range, bevor irgendetwas gebaut wird.',
  },
  {
    question: 'Wie läuft die kostenlose Analyse ab?',
    answer:
      'Kostenlos, ohne Verpflichtung, in rund 30 Minuten. Wir schauen auf Ihre Website und auf den Weg der Anfrage: Wo kommt sie rein, wer sortiert sie, wo bleibt Arbeit liegen? Danach bekommen Sie 2-3 konkrete Hebel – auch wenn NEON nicht passt.',
  },
  {
    question: 'Wie schnell kann das live sein?',
    answer:
      'Eine klare Website ist meist in rund 14 Tagen live. Zusätzliche Bausteine für Anfrageaufnahme, Terminfluss oder Assistenz kommen je nach Umfang in 2–6 Wochen dazu. Den Zeitplan halten wir vor Start fest.',
  },
  {
    question: 'Ist das DSGVO-konform?',
    answer:
      'Ja. Wir hosten in Deutschland und arbeiten möglichst self-hosted. Daten bleiben dort, wo sie hingehören, alles wird sauber dokumentiert.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border-light last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left cursor-pointer
                   hover:text-neon-dim transition-colors duration-200
                   focus-visible:outline-none focus-visible:text-neon-dim"
        aria-expanded={isOpen}
      >
        <span className="text-text-dark font-semibold text-base leading-snug">{question}</span>
        <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-warm-gray flex items-center justify-center transition-colors duration-200">
          {isOpen ? (
            <Minus size={14} className="text-neon-dim" aria-hidden="true" />
          ) : (
            <Plus size={14} className="text-text-muted" aria-hidden="true" />
          )}
        </span>
      </button>

      {/* CSS grid trick: no JS-driven height animation → no lag */}
      <div
        className="grid transition-all duration-200 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="text-text-muted text-sm leading-relaxed pb-5 pr-8">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad bg-off-white" aria-labelledby="faq-heading">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Häufige Fragen
            </p>
            <h2
              id="faq-heading"
              className="heading-section text-text-dark mb-5 text-balance"
            >
              Direkte Antworten.
            </h2>
            <p className="text-body">
              Kein Kleingedrucktes, kein Vertriebsdruck. Erst verstehen, dann entscheiden.
            </p>
            <p className="mt-4 text-text-muted text-sm">
              Noch mehr Fragen?{' '}
              <a
                href="mailto:hello@neon-bw.de"
                className="text-neon-dim font-semibold hover:underline cursor-pointer"
              >
                hello@neon-bw.de
              </a>
            </p>
          </motion.div>

          {/* Right FAQ list */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl px-6 py-2 border border-border-light">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
