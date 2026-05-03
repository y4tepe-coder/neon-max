'use client'

import { useRef } from 'react'
import Script from 'next/script'
import { Calendar } from 'lucide-react'

type CalendlyWindow = Window & {
  Calendly?: {
    initPopupWidget: (opts: { url: string }) => void
  }
}

const CALENDLY_URL = 'https://calendly.com/y4tepe/30min'

export function CalendlyBadge() {
  const loadedRef = useRef(false)

  const openPopup = () => {
    const w = window as CalendlyWindow
    w.Calendly?.initPopupWidget({ url: CALENDLY_URL })
  }

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          loadedRef.current = true
        }}
      />
      <button
        type="button"
        onClick={openPopup}
        aria-label="Kostenlose Analyse buchen"
        className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 overflow-hidden
                   rounded-full bg-neon px-5 py-3 text-sm font-semibold text-text-dark
                   shadow-[0_8px_24px_rgba(197,247,79,0.35)]
                   transition-all duration-300 ease-out
                   hover:shadow-[0_10px_32px_rgba(197,247,79,0.55)] hover:-translate-y-0.5
                   active:scale-95 cursor-pointer"
      >
        <Calendar size={16} strokeWidth={2.5} className="shrink-0" />
        <span className="relative z-10">Kostenlose Analyse</span>
        {/* Shine sweep — plays on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2
                     bg-gradient-to-r from-transparent via-white/70 to-transparent
                     opacity-0 group-hover:opacity-100 group-hover:animate-shine"
        />
      </button>
    </>
  )
}
