'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'

// ─── Animation helpers ─────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 28 },
  animate:   { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const },
})

const popIn = (delay = 0) => ({
  initial:   { opacity: 0, scale: 0.88, y: 12 },
  animate:   { opacity: 1, scale: 1,    y: 0  },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
})

// ─── Data ──────────────────────────────────────────────────────────────────

const badges = [
  { label: 'Mobil optimiert',    icon: CheckCircle2 },
  { label: 'KI-Automatisierung', icon: Zap          },
  { label: 'Lokal in BW',        icon: CheckCircle2 },
] as const

// ─── Component ─────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-bg-primary overflow-hidden"
      aria-label="Hero Bereich"
    >
      {/* ── Backgrounds ─────────────────────────────────────────────────── */}

      {/* Indigo radial glow – right side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 65% at 80% 50%, rgba(99,102,241,0.18) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Sky blue accent – top left corner */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none blur-3xl"
        style={{ background: 'rgba(56,189,248,0.07)' }}
        aria-hidden="true"
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(99,102,241,0.22) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          maskImage:
            'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content grid ────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left: text ────────────────────────────────────────────── */}
          <div className="flex flex-col">

            {/* Agency badge */}
            <motion.div {...fadeUp(0)}>
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest border"
                style={{
                  background:    'rgba(99,102,241,0.09)',
                  borderColor:   'rgba(99,102,241,0.3)',
                  color:         '#38BDF8',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: '#CCFF00' }}
                  aria-hidden="true"
                />
                KI-Website-Agentur · Baden-Württemberg
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.1)}
              className="mt-7 font-bold leading-[1.07] tracking-tight text-text-primary"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.75rem)' }}
            >
              Mehr Anfragen für{' '}
              <span className="whitespace-nowrap">Handwerker &amp;</span>
              <br />
              Restaurants in{' '}
              <span
                className="relative inline-block"
                style={{ color: '#CCFF00' }}
              >
                Leinfelden.
                {/* subtle underline glow */}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, #CCFF00, transparent)',
                    opacity: 0.5,
                  }}
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...fadeUp(0.2)}
              className="mt-6 text-lg md:text-xl leading-relaxed text-text-soft max-w-lg"
            >
              NEON baut automatisierte Websites, die Kunden bringen –{' '}
              <span className="text-text-primary font-medium">
                nicht nur schön aussehen.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.3)}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/kontakt"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-base font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-95 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #6366F1 0%, #5254CC 100%)',
                  boxShadow: '0 4px 24px rgba(99,102,241,0.35)',
                }}
              >
                Kostenloses Erstgespräch
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="#website-check"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold border transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{
                  borderColor: 'rgba(248,250,252,0.18)',
                  color:       'rgba(248,250,252,0.75)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'
                  e.currentTarget.style.color = '#6366F1'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(248,250,252,0.18)'
                  e.currentTarget.style.color = 'rgba(248,250,252,0.75)'
                }}
              >
                Website analysieren lassen
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              {...fadeUp(0.4)}
              className="mt-10 flex flex-wrap gap-x-7 gap-y-3"
              role="list"
              aria-label="Leistungsmerkmale"
            >
              {badges.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  role="listitem"
                  className="flex items-center gap-2 text-sm font-medium text-text-faint"
                >
                  <Icon size={14} style={{ color: '#6366F1' }} aria-hidden="true" />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: image + floating cards ─────────────────────────── */}
          <motion.div
            {...fadeUp(0.2)}
            className="relative hidden lg:block"
          >
            {/* Glow halo behind image */}
            <div
              className="absolute inset-4 rounded-3xl blur-2xl pointer-events-none"
              style={{ background: 'rgba(99,102,241,0.15)' }}
              aria-hidden="true"
            />

            {/* Image frame */}
            <div
              className="relative rounded-2xl overflow-hidden border"
              style={{
                aspectRatio: '4 / 5',
                borderColor: 'rgba(99,102,241,0.28)',
                background:
                  'linear-gradient(145deg, rgba(99,102,241,0.12) 0%, rgba(56,189,248,0.06) 100%)',
              }}
            >
              {/* Replace src with your actual photo, e.g. /yasin.png */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/yasin.png"
                alt="Yasin Tepe – Gründer NEON BW"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  // Fallback placeholder when image is missing
                  const t = e.currentTarget
                  t.style.display = 'none'
                  const parent = t.parentElement
                  if (parent) {
                    parent.innerHTML = `
                      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;">
                        <div style="width:96px;height:96px;border-radius:50%;background:rgba(99,102,241,0.25);border:2px solid rgba(99,102,241,0.4)"></div>
                        <p style="font-size:13px;color:rgba(248,250,252,0.3);font-family:sans-serif">Foto Yasin Tepe</p>
                      </div>`
                  }
                }}
              />

              {/* Bottom gradient scrim */}
              <div
                className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10,15,30,0.7) 0%, transparent 100%)',
                }}
                aria-hidden="true"
              />
            </div>

            {/* ── Floating card: +340% Anfragen ─────────────────────── */}
            <motion.div
              {...popIn(0.7)}
              className="absolute -left-6 top-[30%] rounded-xl px-4 py-3 border backdrop-blur-md shadow-2xl"
              style={{
                background:  'rgba(10,15,30,0.88)',
                borderColor: 'rgba(99,102,241,0.35)',
              }}
              aria-label="Ergebnis: +340% mehr Anfragen"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
                  style={{ background: 'rgba(99,102,241,0.2)' }}
                  aria-hidden="true"
                >
                  📈
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary leading-none">
                    +340% Anfragen
                  </p>
                  <p className="text-[11px] mt-1 text-text-faint">
                    Ø nach 60 Tagen
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Floating card: Live in 14 Tagen ──────────────────── */}
            <motion.div
              {...popIn(0.85)}
              className="absolute -right-5 bottom-[22%] rounded-xl px-4 py-3 border backdrop-blur-md shadow-2xl"
              style={{
                background:  'rgba(10,15,30,0.88)',
                borderColor: 'rgba(56,189,248,0.3)',
              }}
              aria-label="Umsetzung live in 14 Tagen"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                  style={{ background: '#CCFF00' }}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-bold text-text-primary leading-none">
                    Live in 14 Tagen
                  </p>
                  <p className="text-[11px] mt-1 text-text-faint">
                    Schnelle Umsetzung
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 mx-auto"
          style={{
            background: 'linear-gradient(to bottom, rgba(99,102,241,0.5), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
