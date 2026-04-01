'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'Was kostet eine Website?',
    answer:
      'Unser Komplettpaket besteht aus einem einmaligen Setup-Preis und einer monatlichen Betreuungspauschale. Die genauen Konditionen besprechen wir transparent im Erstgespräch – keine versteckten Kosten.',
  },
  {
    question: 'Muss ich mich selbst um Hosting oder Technik kümmern?',
    answer:
      'Nein. Domain-Einrichtung, Hosting, technische Konfiguration und Sicherheit übernehmen wir vollständig. Sie kümmern sich um Ihr Unternehmen – wir um alles Technische.',
  },
  {
    question: 'Wie schnell kann eine Website online gehen?',
    answer:
      'Bei zügiger Bereitstellung der Inhalte können einfachere Projekte innerhalb von 2–4 Wochen live gehen. Den genauen Zeitplan klären wir im Erstgespräch.',
  },
  {
    question: 'Bietet ihr auch Terminbuchung oder Chatfunktionen an?',
    answer:
      'Ja, als optionale Erweiterung. Online-Terminbuchung, Live-Chat und weitere smarte Funktionen können jederzeit nach dem Launch ergänzt werden – wenn Sie es brauchen.',
  },
  {
    question: 'Kann die Website später noch erweitert werden?',
    answer:
      'Ja. Wir bauen Ihre Website so, dass sie problemlos mitwachsen kann. Neue Seiten, Funktionen oder Integrationen können jederzeit ergänzt werden.',
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
              Alles klar beantwortet.
            </h2>
            <p className="text-body">
              Wir wollen, dass Sie informiert entscheiden. Hier finden Sie Antworten auf die
              häufigsten Fragen.
            </p>
            <p className="mt-4 text-text-muted text-sm">
              Noch mehr Fragen?{' '}
              <a
                href="/kontakt"
                className="text-neon-dim font-semibold hover:underline cursor-pointer"
              >
                Schreiben Sie uns einfach.
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
