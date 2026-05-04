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

const TERMIN_URL = '/termin'
const MAIL_URL = 'mailto:hello@neon-bw.de?subject=Potenzial-Check%20Ergebnis'

// ─── Quiz questions ───────────────────────────────────────────────────────────

const quizSteps: QuizStep[] = [
  {
    id: 1,
    question: 'Wie viele gleichartige Anfragen oder Aufgaben bearbeiten Sie wöchentlich?',
    options: [
      { label: 'Weniger als 5', value: 'none' },
      { label: '5 bis 20', value: 'ok_no_leads' },
      { label: 'Mehr als 20', value: 'good' },
      { label: 'Schwer zu sagen – sehr unterschiedlich', value: 'outdated' },
    ],
  },
  {
    id: 2,
    question: 'Wie viel Zeit kostet manuelle Datenpflege (E-Mail, Tabellen, CRM) pro Woche?',
    options: [
      { label: 'Weniger als 1 Stunde', value: 'good' },
      { label: '1 bis 5 Stunden', value: 'ok' },
      { label: 'Mehr als 5 Stunden', value: 'bad' },
      { label: 'Ich weiß es nicht genau', value: 'unknown' },
    ],
  },
  {
    id: 3,
    question: 'Wie gehen Anfragen von Kunden bei Ihnen ein?',
    options: [
      { label: 'Fast nur telefonisch', value: 'not_found' },
      { label: 'Per E-Mail und Telefon gemischt', value: 'name_only' },
      { label: 'Über Website-Formular oder Chat', value: 'partial' },
      { label: 'Strukturiert – mit System', value: 'found' },
    ],
  },
  {
    id: 4,
    question: 'Wie läuft die Terminplanung in Ihrem Betrieb ab?',
    options: [
      { label: 'Manuell per Telefon oder E-Mail', value: 'slow' },
      { label: 'Wir nutzen einen Kalender, aber kein System', value: 'unknown' },
      { label: 'Halb automatisiert', value: 'medium' },
      { label: 'Vollständig digital organisiert', value: 'fast' },
    ],
  },
  {
    id: 5,
    question: 'Haben Sie eine aktuelle Website?',
    options: [
      { label: 'Nein, noch keine', value: 'none' },
      { label: 'Ja, aber veraltet', value: 'difficult' },
      { label: 'Ja, aktuell und gepflegt', value: 'managed' },
      { label: 'Ich weiß es nicht genau', value: 'unknown' },
    ],
  },
  {
    id: 6,
    question: 'Was wäre für Sie der größte Gewinn?',
    options: [
      { label: 'Mehr Anfragen und neue Kunden', value: 'leads' },
      { label: 'Weniger Routinearbeit im Team', value: 'image' },
      { label: 'Schnellere Reaktion auf Kundenanfragen', value: 'seo' },
      { label: 'Alles davon – ich will ein System', value: 'all' },
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
    label: 'Klar Zeit zu gewinnen',
    barColor: 'bg-neon',
    textColor: 'text-neon-dim',
    bgColor: 'bg-lime-50 border border-lime-200',
    description:
      'Bei Ihnen läuft viel manuell. Schon ein paar gezielte Bausteine könnten wöchentlich Stunden Routinearbeit aus Ihrem Tag holen.',
  },
  medium: {
    label: 'Gutes Entlastungs­potenzial',
    barColor: 'bg-amber-400',
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-50 border border-amber-100',
    description:
      'Sie sind grundsätzlich strukturiert, lassen aber Routine liegen. Punktuelle Bausteine würden Sie und Ihr Team spürbar entlasten.',
  },
  good: {
    label: 'Solide Ausgangslage',
    barColor: 'bg-green-500',
    textColor: 'text-green-600',
    bgColor: 'bg-green-50 border border-green-100',
    description:
      'Ihre Abläufe laufen schon strukturiert. Hier geht es eher um Feinarbeit als um einen großen Umbau.',
  },
}

const ISSUE_MAP: Record<number, Record<string, string>> = {
  1: {
    ok_no_leads: 'Mittleres Anfrageaufkommen – Aufnahme und Sortierung würden spürbar Zeit sparen',
    good: 'Hohes Aufkommen – klarer Hebel für strukturierte Anfrageaufnahme',
  },
  2: {
    bad: 'Mehr als 5 h pro Woche Datenpflege – viel Routine, die ein System übernehmen kann',
    ok: '1–5 h pro Woche Datenpflege – kleine Bausteine entlasten hier sofort',
  },
  3: {
    not_found: 'Nur telefonisch erreichbar – Anfragen außerhalb der Bürozeiten gehen verloren',
    name_only: 'Gemischte Kanäle ohne System – Anfragen rutschen schnell durch',
  },
  4: {
    slow: 'Manuelle Terminplanung – Zeitfresser und fehleranfällig',
    unknown: 'Kein klar definierter Terminfluss – Erinnerungen und Bestätigungen verlieren sich',
  },
  5: {
    none: 'Keine Website – fehlendes Fundament für strukturierte Anfragen',
    difficult: 'Veraltete Website – erster Eindruck und Aufnahme der Anfragen sind schwach',
    unknown: 'Website-Status unklar – Grundlage für saubere Anfrageaufnahme prüfen',
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
  leads: 'Mehr Anfragen ordentlich aufgenommen – Website plus strukturierte Aufnahme im Hintergrund.',
  image: 'Weniger Routinearbeit – genau dafür laufen die Bausteine ruhig im Hintergrund mit.',
  seo: 'Schneller reagieren – Standardrückfragen vorbereiten, statt nochmal hin- und her zu schreiben.',
  all: 'Ein zusammenhängender Ablauf – das ist genau, was wir bauen. Starten Sie mit der kostenlosen Analyse.',
}

// ─── Validation helpers ───────────────────────────────────────────────────────

const FAKE_DOMAINS = ['test', 'abc', 'hallo', 'example', 'foo', 'bar', 'baz', 'asdf', 'qwerty', 'demo', 'dummy']

function normalizeUrl(input: string): string {
  const t = input.trim()
  return /^https?:\/\//i.test(t) ? t : 'https://' + t
}

function validateUrl(input: string): string | null {
  const t = input.trim()
  if (!t) return 'Bitte geben Sie eine gültige Website ein.'
  const withoutProto = t.replace(/^https?:\/\//i, '').split('/')[0]
  const parts = withoutProto.split('.')
  if (parts.length < 2 || parts.some((p) => !p)) return 'Bitte geben Sie eine gültige Website ein.'
  if (FAKE_DOMAINS.includes(parts[0].toLowerCase())) return 'Bitte geben Sie eine gültige Website ein.'
  if (parts[parts.length - 1].length < 2) return 'Bitte geben Sie eine gültige Website ein.'
  try { new URL(t.startsWith('http') ? t : 'https://' + t) } catch { return 'Bitte geben Sie eine gültige Website ein.' }
  return null
}

function validateEmail(input: string): string | null {
  if (!input.trim()) return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.trim())) return 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
  return null
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

// ─── Main component ────────────────────────────────────────────────────────────

export default function WebsiteCheck() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [phase, setPhase] = useState<Phase>('url')
  const [url, setUrl] = useState('')
  const [urlError, setUrlError] = useState('')
  const [noWebsite, setNoWebsite] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [companyError, setCompanyError] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [contact, setContact] = useState({ name: '', email: '' })
  const [emailError, setEmailError] = useState('')
  const [nameError, setNameError] = useState('')
  const [direction, setDirection] = useState(1)
  const [loadingText, setLoadingText] = useState('Antworten werden ausgewertet…')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (phase !== 'loading') return
    const messages = [
      'Antworten werden ausgewertet…',
      'Entlastungspotenzial wird berechnet…',
      'Abläufe werden analysiert…',
      'Empfehlungen werden vorbereitet…',
      'Ergebnis wird finalisiert…',
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

    const urlErr = !noWebsite && url.trim() ? validateUrl(url) : null
    const companyErr = null

    setUrlError(urlErr ?? '')
    setCompanyError(companyErr ?? '')

    if (urlErr || companyErr) return

    if (!noWebsite && url.trim()) {
      const normalized = normalizeUrl(url)
      setUrl(normalized)
    }

    setPhase('loading')
  }

  const submitLead = async (_finalAnswers: Record<number, string>) => {
    setSubmitting(true)
    // Ergebnis wird lokal aus den Antworten berechnet und sofort gezeigt.
    setSubmitting(false)
    setPhase('result')
  }

  const handleChoice = (value: string) => {
    const newAnswers = { ...answers, [currentStep + 1]: value }
    setAnswers(newAnswers)
    setDirection(1)
    if (currentStep < quizSteps.length - 1) {
      setTimeout(() => setCurrentStep((s) => s + 1), 240)
    } else {
      setTimeout(() => submitLead(newAnswers), 240)
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
    setSubmitting(false)
    setPhase('result')
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
      id="potenzial-check"
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
              Kostenloser Potenzial-Check
            </p>
            <h2 id="check-heading" className="heading-section text-off-white mb-5 text-balance">
              Wo geht in Ihrem Betrieb am meisten Zeit verloren?
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-8">
              6 kurze Fragen – und Sie sehen sofort, an welchen Stellen Routinearbeit
              ein System übernehmen könnte. Ohne Tech-Begriffe, ohne Verkaufstext.
            </p>
            <div className="space-y-3.5">
              {[
                'Kostenlos & unverbindlich',
                'Ergebnis direkt im Browser',
                'Konkrete Hinweise, kein Verkaufstext',
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

              {/* ── Phase: Start input ── */}
              {phase === 'url' && (
                <motion.div key="url" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-7 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
                      <Search size={18} className="text-neon-dim" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-text-dark font-bold text-lg leading-tight">Potenzial-Check starten</h3>
                      <p className="text-text-muted text-xs">6 Fragen, konkrete Einschätzung</p>
                    </div>
                  </div>
                  <form onSubmit={handleUrlSubmit} className="space-y-4" noValidate>
                    {/* Website */}
                    <div>
                      <label htmlFor="check-url" className="block text-sm font-medium text-text-dark mb-1.5">
                        Website <span className="text-text-muted/60">(optional)</span>
                      </label>
                      <div className="relative">
                        <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted/50" aria-hidden="true" />
                        <input
                          id="check-url"
                          name="website"
                          type="text"
                          value={url}
                          onChange={(e) => { setUrl(e.target.value); setUrlError(''); if (noWebsite) setNoWebsite(false) }}
                          placeholder="www.ihre-website.de"
                          autoComplete="url"
                          disabled={noWebsite}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-text-dark text-sm
                                     placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-neon
                                     focus:border-transparent transition-all duration-200
                                     disabled:bg-warm-gray disabled:text-text-muted disabled:cursor-not-allowed
                                     ${urlError ? 'border-red-400 ring-1 ring-red-400' : 'border-border-light'}`}
                        />
                      </div>
                      {urlError && <p className="text-xs text-red-500 mt-1.5">{urlError}</p>}
                      <label className="mt-2.5 flex items-center gap-2 text-xs text-text-muted cursor-pointer">
                        <input
                          type="checkbox"
                          checked={noWebsite}
                          onChange={(e) => {
                            setNoWebsite(e.target.checked)
                            setUrlError('')
                            if (e.target.checked) setUrl('')
                          }}
                          className="size-3.5 rounded border-border-light accent-neon"
                        />
                        Ich habe noch keine Website
                      </label>
                    </div>

                    {/* Unternehmen */}
                    <div>
                      <label htmlFor="check-company" className="block text-sm font-medium text-text-dark mb-1.5">
                        Unternehmen <span className="text-text-muted/60">(optional)</span>
                      </label>
                      <input
                        id="check-company"
                        name="company"
                        type="text"
                        value={companyName}
                        onChange={(e) => { setCompanyName(e.target.value); setCompanyError('') }}
                        placeholder="Musterfirma GmbH"
                        autoComplete="organization"
                        className={`w-full px-4 py-3 rounded-xl border text-text-dark text-sm
                                   placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-neon
                                   focus:border-transparent transition-all duration-200
                                   ${companyError ? 'border-red-400 ring-1 ring-red-400' : 'border-border-light'}`}
                      />
                      {companyError && <p className="text-xs text-red-500 mt-1.5">{companyError}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-neon text-text-dark font-semibold
                                 px-6 py-3.5 rounded-xl hover:bg-neon-dim transition-all duration-200 cursor-pointer mt-1"
                    >
                      6 Fragen starten
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                    <p className="text-center text-xs text-text-muted/50">
                      Ergebnis zuerst. Kontakt erst, wenn Sie sprechen möchten.
                    </p>
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
                  {url && !noWebsite && (
                    <p className="text-text-muted text-xs mt-2 font-mono truncate max-w-[220px]">{url}</p>
                  )}
                  {noWebsite && (
                    <p className="text-text-muted text-xs mt-2">Start ohne bestehende Website</p>
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
                        Identifiziertes Potenzial
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
                    <a
                      href={TERMIN_URL}
                      className="w-full flex items-center justify-center gap-2 bg-neon text-text-dark font-semibold
                                 px-5 py-3.5 rounded-xl hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm"
                    >
                      <Phone size={15} aria-hidden="true" />
                      Website kostenlos prüfen lassen
                    </a>
                    <a
                      href={MAIL_URL}
                      className="w-full flex items-center justify-center gap-2 border border-border-light text-text-dark
                                 font-medium px-5 py-3 rounded-xl hover:border-neon/50 hover:bg-neon/5
                                 transition-all duration-200 cursor-pointer text-sm"
                    >
                      hello@neon-bw.de
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
