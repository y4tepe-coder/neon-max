'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'Was kostet eine Website?',
    answer:
      'Das hängt von Ihren Anforderungen ab. Grundsätzlich unterscheiden wir zwischen dem einmaligen Setup (Erstellung) und der laufenden monatlichen Betreuung. Konkrete Preise besprechen wir immer transparent im Erstgespräch – keine Überraschungen.',
  },
  {
    question: 'Was ist der Unterschied zwischen Setup und Betreuung?',
    answer:
      'Das Setup ist die einmalige Erstellung Ihrer Website – das Gestalten, Bauen und Veröffentlichen. Die Betreuung ist das laufende Modell danach: Hosting, technische Pflege, Sicherheit, kleinere Änderungen und Support. Beides zusammen ergibt eine vollständige Lösung.',
  },
  {
    question: 'Muss ich mich selbst um Hosting oder Technik kümmern?',
    answer:
      'Nein. Hosting, Domain-Einrichtung, technische Konfiguration und alles Technische übernehmen wir für Sie. Sie müssen sich um nichts kümmern – das ist der Kern unserer Betreuung.',
  },
  {
    question: 'Kann ich später Änderungen machen lassen?',
    answer:
      'Ja, das ist ein fester Bestandteil unseres Betreuungsmodells. Kleinere Textänderungen, neue Bilder oder Anpassungen sind enthalten. Für größere Erweiterungen sprechen wir das kurz ab.',
  },
  {
    question: 'Ist die Website mobil optimiert?',
    answer:
      'Selbstverständlich. Alle Websites, die wir bauen, sind vollständig für Smartphones und Tablets optimiert. Heute greifen die meisten Menschen mobil auf Websites zu – das hat höchste Priorität.',
  },
  {
    question: 'Wie schnell kann eine Website online gehen?',
    answer:
      'Das hängt vom Umfang und der Verfügbarkeit der Inhalte ab. Einfachere Projekte können innerhalb von 2–4 Wochen live gehen. Wir besprechen einen realistischen Zeitplan im Erstgespräch.',
  },
  {
    question: 'Bietet ihr auch Terminbuchung oder Chatfunktionen an?',
    answer:
      'Ja, als optionale Erweiterung. Online-Terminbuchung, Chat-Funktionen und weitere smarte Erweiterungen können nach dem Launch jederzeit hinzugefügt werden – wenn Sie es brauchen.',
  },
  {
    question: 'Wie läuft die Zusammenarbeit genau ab?',
    answer:
      'Wir starten mit einem kurzen Erstgespräch, klären Ihre Ziele und den Umfang, setzen die Website um – und Sie sehen den Fortschritt laufend. Nach dem Launch betreuen wir Ihre Website weiter. Kein komplizierter Prozess, keine langen Wartezeiten.',
  },
  {
    question: 'Kann die Website später noch erweitert werden?',
    answer:
      'Ja. Wir bauen Ihre Website so, dass sie problemlos wachsen kann. Neue Seiten, Funktionen oder Erweiterungen können jederzeit ergänzt werden.',
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
        <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-warm-gray flex items-center justify-center">
          {isOpen ? (
            <Minus size={14} className="text-neon-dim" aria-hidden="true" />
          ) : (
            <Plus size={14} className="text-text-muted" aria-hidden="true" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-text-muted text-sm leading-relaxed pb-5 pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
