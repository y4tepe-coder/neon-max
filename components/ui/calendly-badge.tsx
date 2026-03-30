'use client'

import Script from 'next/script'

type CalendlyWindow = Window & {
  Calendly?: {
    initBadgeWidget: (opts: {
      url: string
      text: string
      color: string
      textColor: string
    }) => void
  }
}

export function CalendlyBadge() {
  return (
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="lazyOnload"
      onLoad={() => {
        const w = window as CalendlyWindow
        w.Calendly?.initBadgeWidget({
          url: 'https://calendly.com/y4tepe/30min',
          text: 'Termin buchen',
          color: '#C5F74F',
          textColor: '#1A1A1A',
        })
      }}
    />
  )
}
