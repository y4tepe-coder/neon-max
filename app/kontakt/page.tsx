import type { Metadata } from 'next'
import ContactForm from '@/components/home/ContactForm'

export const metadata: Metadata = {
  title: 'Kontakt – NEON Agentur',
  description:
    'Nehmen Sie Kontakt mit NEON Agentur auf. Kostenloses Erstgespräch, keine Verpflichtung – wir antworten innerhalb von 24 Stunden.',
}

export default function KontaktPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-dark-bg py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Kontakt
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-off-white leading-tight tracking-tight mb-5 text-balance">
              Lassen Sie uns{' '}
              <span className="text-neon">sprechen.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              Erzählen Sie uns von Ihrem Projekt. Wir antworten innerhalb von 24 Stunden –
              ohne Verkaufsdruck, auf Augenhöhe.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  )
}
