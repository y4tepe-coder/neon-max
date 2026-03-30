'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone } from 'lucide-react'

// TODO: Ersetze mit deinem echten öffentlichen Calendly-Link
// z.B. https://calendly.com/dein-name/erstgespraech
const CALENDLY_URL = 'https://calendly.com/y4tepe/30min'
const WHATSAPP_URL =
  'https://wa.me/4917620170133?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20neue%20Website.'

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

interface BookingModalProps {
  open: boolean
  onClose: () => void
}

type CalendlyWindow = Window & {
  Calendly?: { initPopupWidget: (opts: { url: string }) => void }
}

export function BookingModal({ open, onClose }: BookingModalProps) {
  function openCalendly() {
    const w = window as CalendlyWindow
    if (w.Calendly) {
      w.Calendly.initPopupWidget({ url: CALENDLY_URL })
    } else {
      window.open(CALENDLY_URL, '_blank')
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.34, 1.2, 0.64, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 pointer-events-auto">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3
                    id="booking-modal-title"
                    className="text-lg font-bold text-text-dark"
                  >
                    Wie möchten Sie loslegen?
                  </h3>
                  <p className="text-text-muted text-sm mt-1">
                    Wählen Sie, was für Sie passt.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-warm-gray transition-colors cursor-pointer"
                  aria-label="Schließen"
                >
                  <X size={16} className="text-text-muted" aria-hidden="true" />
                </button>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {/* Calendly option */}
                <button
                  type="button"
                  onClick={openCalendly}
                  className="w-full text-left p-4 rounded-xl border-2 border-neon bg-neon/5 hover:bg-neon/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-neon flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={15} className="text-text-dark" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-dark text-sm">
                        Erstgespräch per Telefon buchen
                      </p>
                      <p className="text-text-muted text-xs mt-0.5">
                        Ca. 30 Minuten – kostenlos &amp; unverbindlich
                      </p>
                    </div>
                  </div>
                </button>

                {/* WhatsApp option */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="w-full text-left p-4 rounded-xl border border-warm-gray hover:border-[#25D366]/40 bg-white hover:bg-[#25D366]/5 transition-colors cursor-pointer flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <WhatsAppIcon />
                  </div>
                  <div>
                    <p className="font-semibold text-text-dark text-sm">
                      WhatsApp schreiben
                    </p>
                    <p className="text-text-muted text-xs mt-0.5">
                      Schnelle, direkte Nachricht
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
