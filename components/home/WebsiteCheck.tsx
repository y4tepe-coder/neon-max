'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  ArrowRight, CheckCircle2, ChevronLeft, Globe, Search,
  AlertCircle, AlertTriangle, Phone,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'url' | 'loading' | 'quiz' | 'contact' | 'result'
type ResultLevel = 'critical' | 'medium' | 'good'

type QuizStep = {
  id: number
  question: string
  options: { label: string; value: string }[]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CALENDLY_URL = 'https://calendly.com/y4tepe/30min'
const WHATSAPP_URL =
  'https://wa.me/4917620170133?text=Hallo%2C%20ich%20habe%20den%20Website-Check%20gemacht%20und%20m%C3%B6chte%20mehr%20erfahren.'

// ─── Quiz questions ───────────────────────────────────────────────────────────

const quizSteps: QuizStep[] = [
  {
    id: 1,
    question: 'Wie würden Sie Ihre aktuelle Website beschreiben?',
    options: [
      { label: 'Ich habe noch keine Website', value: 'none' },
      { label: 'Sie wirkt veraltet / nicht mehr zeitgemäß', value: 'outdated' },
      { label: 'Sie sieht okay aus, bringt aber kaum Anfragen', value: 'ok_no_leads' },
      { label: 'Gut – ich will aber mehr daraus machen', value: 'good' },
    ],
  },
  {
    id: 2,
    question: 'Wie sieht Ihre Website auf dem Smartphone aus?',
    options: [
      { label: 'Schlecht – kaum nutzbar auf Handy', value: 'bad' },
      { label: 'Habe ich nie geprüft / weiß ich nicht', value: 'unknown' },
      { label: 'Es geht – aber nicht wirklich optimal', value: 'ok' },
      { label: 'Einwandfrei – funktioniert gut auf Handy', value: 'good' },
    ],
  },
  {
    id: 3,
    question: 'Wie gut werden Sie bei Google gefunden?',
    options: [
      { label: 'Kaum – wir tauchen so gut wie nicht auf', value: 'not_found' },
      { label: 'Nur wenn jemand unseren Namen sucht', value: 'name_only' },
      { label: 'Manchmal – für einige Suchbegriffe', value: 'partial' },
      { label: 'Gut – wir ranken für unsere Branche', value: 'found' },
    ],
  },
  {
    id: 4,
    question: 'Wie schnell lädt Ihre Website?',
    options: [
      { label: 'Langsam – spürbar über 5 Sekunden', value: 'slow' },
      { label: 'Ich weiß es nicht / habe es nie gemessen', value: 'unknown' },
      { label: 'Mittel – 3 bis 5 Sekunden', value: 'medium' },
      { label: 'Schnell – unter 3 Sekunden', value: 'fast' },
    ],
  },
  {
    id: 5,
    question: 'Wie läuft die Pflege und Aktualisierung Ihrer Website?',
    options: [
      { label: 'Gar nicht – seit Monaten unverändert', value: 'none' },
      { label: 'Ich weiß nicht, wer überhaupt zuständig ist', value: 'unknown' },
      { label: 'Gelegentlich – aber aufwändig und teuer', value: 'difficult' },
      { label: 'Regelmäßig – wir haben eine Betreuung', value: 'managed' },
    ],
  },
  {
    id: 6,
    question: 'Was soll Ihre Website in Zukunft vor allem leisten?',
    options: [
      { label: 'Mehr Anfragen und neue Kunden gewinnen', value: 'leads' },
      { label: 'Professioneller wirken als die Konkurrenz', value: 'image' },
      { label: 'Besser bei Google gefunden werden', value: 'seo' },
      { label: 'Alles davon – ein kompletter Neustart', value: 'all' },
    ],
  },
]

// ─── Scoring ──────────────────────────────────────────────────────────────────

const SCORE_MAP: Record<number, Record<string, number>> = {
  1: { none: 0, outdated: 0, ok_no_leads: 1, good: 2 },
  2: { bad: 0, unknown: 0, ok: 1, good: 2 },
  3: { not_found: 0, name_only: 1, partial: 1, found: 2 },
  4: { slow: 0, unknown: 0, medium: 1, fast: 2 },
  5: { none: 0, unknown: 0, difficult: 1, managed: 2 },
}

function computeScore(answers: Record<number, string>): number {
  let total = 0
  for (let i = 1; i <= 5; i++) {
    const ans = answers[i]
    if (ans && SCORE_MAP[i]?.[ans] !== undefined) total += SCORE_MAP[i][ans]
  }
  return total // max 10
}

function getResultLevel(score: number): ResultLevel {
  if (score <= 3) return 'critical'
  if (score <= 6) return 'medium'
  return 'good'
}

const RESULT_CONFIG: Record<
  ResultLevel,
  { label: string; barColor: string; textColor: string; bgColor: string; description: string }
> = {
  critical: {
    label: 'Dringend handeln',
    barColor: 'bg-red-500',
    textColor: 'text-red-500',
    bgColor: 'bg-red-50 border border-red-100',
    description:
      'Ihre Website kostet Sie aktiv Kunden. Ein professioneller Neustart würde den Unterschied machen.',
  },
  medium: {
    label: 'Klares Potenzial',
    barColor: 'bg-amber-400',
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-50 border border-amber-100',
    description:
      'Sie haben eine Basis – lassen aber deutliches Potenzial liegen. Mit gezielten Maßnahmen holen Sie mehr heraus.',
  },
  good: {
    label: 'Gute Basis',
    barColor: 'bg-green-500',
    textColor: 'text-green-600',
    bgColor: 'bg-green-50 border border-green-100',
    description:
      'Solide Ausgangslage. Mit gezielten Optimierungen können Sie Ihre Website noch wirkungsvoller machen.',
  },
}

const ISSUE_MAP: Record<number, Record<string, string>> = {
  1: {
    none: 'Keine Website – Sie sind für potenzielle Kunden online nicht existent',
    outdated: 'Veraltetes Design schreckt Besucher ab – erster Eindruck zählt',
    ok_no_leads: 'Website konvertiert nicht – Besucher kommen, fragen aber nicht an',
  },
  2: {
    bad: 'Mobile Darstellung mangelhaft – über 70 % der Nutzer kommen vom Handy',
    unknown: 'Mobile-Performance unbekannt – ein unsichtbares, aber kritisches Risiko',
  },
  3: {
    not_found: 'Keine Google-Sichtbarkeit – Kunden suchen, finden Sie aber nicht',
    name_only: 'Nur unter eigenem Namen auffindbar – kein organischer Neukunden-Traffic',
  },
  4: {
    slow: 'Ladezeit zu lang – 53 % der Besucher verlassen Seiten nach mehr als 3 Sekunden',
    unknown: 'Ladezeit unbekannt – möglicherweise ein stiller Conversion-Killer',
  },
  5: {
    none: 'Website seit Langem nicht aktualisiert – technisches und inhaltliches Risiko',
    unknown: 'Kein klarer Ansprechpartner – Probleme werden nicht zeitnah behoben',
    difficult: 'Betreuung aufwändig und teuer – das muss nicht so sein',
  },
}

function getIssues(answers: Record<number, string>): string[] {
  const issues: string[] = []
  for (let i = 1; i <= 5; i++) {
    const ans = answers[i]
    if (ans && ISSUE_MAP[i]?.[ans]) issues.push(ISSUE_MAP[i][ans])
  }
  return issues.slice(0, 4)
}

const GOAL_MESSAGE: Record<string, string> = {
  leads: 'Mehr Anfragen & Neukunden – wir bauen auf Conversion optimierte Websites.',
  image: 'Professioneller Auftritt – Design, das Vertrauen schafft und überzeugt.',
  seo: 'Bessere Google-Sichtbarkeit – SEO-Grundlage ist bei uns immer inklusive.',
  all: 'Kompletter Neustart – genau das ist unser Kerngeschäft bei NEON.',
}

// ─── Calendly window type ─────────────────────────────────────────────────────

type CalendlyWindow = Window & {
  Calendly?: { initPopupWidget: (opts: { url: string }) => void }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LoadingDot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="inline-block w-2 h-2 rounded-full bg-neon"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 0.7, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

// ─── Main component ────────────────────────────────────────────────────────────

export default function WebsiteCheck() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [phase, setPhase] = useState<Phase>('url')
  const [url, setUrl] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [contact, setContact] = useState({ name: '', email: '' })
  const [direction, setDirection] = useState(1)
  const [loadingText, setLoadingText] = useState('Website wird analysiert…')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (phase !== 'loading') return
    const messages = [
      'Website wird analysiert…',
      'Mobile-Darstellung wird geprüft…',
      'SEO-Basis wird bewertet…',
      'Ladezeiten werden gemessen…',
      'Ergebnis wird vorbereitet…',
    ]
    let i = 0
    const interval = setInterval(() => {
      i = (i + 1) % messages.length
      setLoadingText(messages[i])
    }, 700)
    const timeout = setTimeout(() => {
      clearInterval(interval)
      setPhase('quiz')
    }, 3500)
    return () => { clearInterval(interval); clearTimeout(timeout) }
  }, [phase])

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPhase('loading')
  }

  const handleChoice = (value: string) => {
    const newAnswers = { ...answers, [currentStep + 1]: value }
    setAnswers(newAnswers)
    setDirection(1)
    if (currentStep < quizSteps.length - 1) {
      setTimeout(() => setCurrentStep((s) => s + 1), 240)
    } else {
      setTimeout(() => setPhase('contact'), 240)
    }
  }

  const handleBack = () => {
    setDirection(-1)
    if (currentStep === 0) {
      setPhase('url')
      setCurrentStep(0)
    } else {
      setCurrentStep((s) => s - 1)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const score = computeScore(answers)
    const resultLevel = getResultLevel(score)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.trim(),
          companyName: companyName.trim(),
          contact,
          answers,
          score,
          resultLevel,
        }),
      })
    } catch { /* silent */ }
    setSubmitting(false)
    setPhase('result')
  }

  function openCalendly() {
    const w = window as CalendlyWindow
    if (w.Calendly) w.Calendly.initPopupWidget({ url: CALENDLY_URL })
    else window.open(CALENDLY_URL, '_blank')
  }

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 36 : -36 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -36 : 36 }),
  }

  const quizProgress = ((currentStep + 1) / quizSteps.length) * 100

  // Computed result values
  const score = computeScore(answers)
  const resultLevel = getResultLevel(score)
  const resultConfig = RESULT_CONFIG[resultLevel]
  const issues = getIssues(answers)
  const goalMessage = GOAL_MESSAGE[answers[6]] ?? ''

  return (
    <section
      id="website-check"
      className="section-pad bg-dark-bg overflow-hidden"
      aria-labelledby="check-heading"
    >
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left copy */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Kostenloser Website-Check
            </p>
            <h2 id="check-heading" className="heading-section text-off-white mb-5 text-balance">
              Wie steht es um Ihren Online-Auftritt?
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              6 kurze Fragen – und Sie wissen genau, wo Ihre Website steht und was konkret verbessert werden kann.
            </p>
            <div className="space-y-3.5">
              {[
                'Kostenlos & unverbindlich',
                'Sofortiges Ergebnis – keine Wartezeit',
                'Konkrete Handlungsempfehlungen',
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 size={17} className="text-neon shrink-0" aria-hidden="true" />
                  <span className="text-white/60 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ minHeight: 420 }}>

              {/* ── Phase: URL input ── */}
              {phase === 'url' && (
                <motion.div key="url" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-7 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
                      <Search size={18} className="text-neon-dim" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-text-dark font-bold text-lg leading-tight">Website prüfen lassen</h3>
                      <p className="text-text-muted text-xs">Kostenlos & unverbindlich</p>
                    </div>
                  </div>
                  <form onSubmit={handleUrlSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="check-url" className="block text-sm font-medium text-text-dark mb-1.5">
                        Aktuelle Website-URL
                      </label>
                      <div className="relative">
                        <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted/50" aria-hidden="true" />
                        <input
                          id="check-url"
                          type="text"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="www.ihre-website.de"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light text-text-dark text-sm
                                     placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-neon
                                     focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <p className="text-xs text-text-muted/50 mt-1.5">
                        Noch keine Website? Einfach leer lassen und weiter.
                      </p>
                    </div>
                    <div>
                      <label htmlFor="check-company" className="block text-sm font-medium text-text-dark mb-1.5">
                        Ihr Unternehmen <span className="text-text-muted/50 font-normal">(optional)</span>
                      </label>
                      <input
                        id="check-company"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Musterfirma GmbH"
                        className="w-full px-4 py-3 rounded-xl border border-border-light text-text-dark text-sm
                                   placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-neon
                                   focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-neon text-text-dark font-semibold
                                 px-6 py-3.5 rounded-xl hover:bg-neon-dim transition-all duration-200 cursor-pointer mt-1"
                    >
                      Website jetzt prüfen lassen
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                    <p className="text-center text-xs text-text-muted/50">Kein Spam. Keine Verpflichtung.</p>
                  </form>
                </motion.div>
              )}

              {/* ── Phase: Loading ── */}
              {phase === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center p-10 text-center"
                  style={{ minHeight: 420 }}
                >
                  <div className="relative w-20 h-20 mb-8">
                    <div className="absolute inset-0 rounded-full border-2 border-neon/20" />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-transparent border-t-neon"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe size={24} className="text-neon/60" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex gap-1.5 mb-5">
                    <LoadingDot delay={0} />
                    <LoadingDot delay={0.15} />
                    <LoadingDot delay={0.3} />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingText}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="text-text-dark font-semibold text-base"
                    >
                      {loadingText}
                    </motion.p>
                  </AnimatePresence>
                  {url && (
                    <p className="text-text-muted text-xs mt-2 font-mono truncate max-w-[220px]">{url}</p>
                  )}
                </motion.div>
              )}

              {/* ── Phase: Quiz ── */}
              {phase === 'quiz' && (
                <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-7 md:p-8">
                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-text-muted font-medium">
                        Frage {currentStep + 1} von {quizSteps.length}
                      </span>
                      <span className="text-xs text-neon-dim font-semibold">
                        {Math.round(quizProgress)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-warm-gray rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-neon rounded-full"
                        animate={{ width: `${quizProgress}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div style={{ minHeight: 280 }}>
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentStep}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                      >
                        <h3 className="text-text-dark font-bold text-base md:text-lg mb-5 text-balance">
                          {quizSteps[currentStep].question}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {quizSteps[currentStep].options.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => handleChoice(opt.value)}
                              className="text-left p-3.5 rounded-xl border-2 border-border-light
                                         hover:border-neon hover:bg-neon/5 transition-all duration-200
                                         text-text-dark text-sm font-medium cursor-pointer
                                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={handleBack}
                    className="mt-3 flex items-center gap-1.5 text-text-muted text-xs hover:text-text-dark
                               transition-colors duration-200 cursor-pointer"
                  >
                    <ChevronLeft size={14} aria-hidden="true" />
                    Zurück
                  </button>
                </motion.div>
              )}

              {/* ── Phase: Contact ── */}
              {phase === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: 36 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="p-7 md:p-8"
                >
                  <div className="mb-6">
                    <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center mb-4">
                      <CheckCircle2 size={18} className="text-neon-dim" aria-hidden="true" />
                    </div>
                    <h3 className="text-text-dark font-bold text-lg mb-1">Fast fertig!</h3>
                    <p className="text-text-muted text-sm">
                      Wohin sollen wir Ihr persönliches Ergebnis schicken?
                    </p>
                  </div>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="c-name" className="block text-sm font-medium text-text-dark mb-1.5">
                        Ihr Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        required
                        placeholder="Max Mustermann"
                        value={contact.name}
                        onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border-light text-text-dark text-sm
                                   placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-neon
                                   focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="block text-sm font-medium text-text-dark mb-1.5">
                        E-Mail-Adresse <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        required
                        placeholder="name@unternehmen.de"
                        value={contact.email}
                        onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border-light text-text-dark text-sm
                                   placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-neon
                                   focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 bg-neon text-text-dark font-semibold
                                 px-6 py-3.5 rounded-xl hover:bg-neon-dim transition-all duration-200 cursor-pointer
                                 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Wird gespeichert…' : 'Mein Ergebnis anzeigen'}
                      {!submitting && <ArrowRight size={16} aria-hidden="true" />}
                    </button>
                    <p className="text-center text-xs text-text-muted/50">Kein Spam. Keine Verpflichtung.</p>
                  </form>
                </motion.div>
              )}

              {/* ── Phase: Result ── */}
              {phase === 'result' && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="p-7 md:p-8"
                >
                  {/* Score header */}
                  <div className={`rounded-xl p-4 mb-5 ${resultConfig.bgColor}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-bold ${resultConfig.textColor}`}>
                        {resultLevel === 'critical' && <AlertCircle size={14} className="inline mr-1" aria-hidden="true" />}
                        {resultLevel === 'medium' && <AlertTriangle size={14} className="inline mr-1" aria-hidden="true" />}
                        {resultLevel === 'good' && <CheckCircle2 size={14} className="inline mr-1" aria-hidden="true" />}
                        {resultConfig.label}
                      </span>
                      <span className={`text-sm font-bold ${resultConfig.textColor}`}>
                        {score}/10
                      </span>
                    </div>
                    {/* Score bar */}
                    <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${resultConfig.barColor}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(score / 10) * 100}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                      />
                    </div>
                    <p className="text-xs text-text-muted mt-2 leading-snug">{resultConfig.description}</p>
                  </div>

                  {/* Issues */}
                  {issues.length > 0 && (
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2.5">
                        Identifizierte Schwachstellen
                      </p>
                      <ul className="space-y-2">
                        {issues.map((issue) => (
                          <li key={issue} className="flex items-start gap-2.5 text-sm text-text-dark">
                            <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Goal message */}
                  {goalMessage && (
                    <div className="bg-neon/8 border border-neon/20 rounded-xl px-4 py-3 mb-5 text-sm text-text-dark">
                      <span className="font-semibold text-neon-dim">Ihr Ziel: </span>
                      {goalMessage}
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="space-y-2.5">
                    <button
                      onClick={openCalendly}
                      className="w-full flex items-center justify-center gap-2 bg-neon text-text-dark font-semibold
                                 px-5 py-3.5 rounded-xl hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm"
                    >
                      <Phone size={15} aria-hidden="true" />
                      Kostenloses Erstgespräch buchen
                    </button>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 border border-border-light text-text-dark
                                 font-medium px-5 py-3 rounded-xl hover:border-[#25D366]/40 hover:bg-[#25D366]/5
                                 transition-all duration-200 cursor-pointer text-sm"
                    >
                      <WhatsAppIcon />
                      Per WhatsApp anfragen
                    </a>
                  </div>
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
