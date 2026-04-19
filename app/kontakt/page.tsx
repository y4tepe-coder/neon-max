import type { Metadata } from 'next'
import ContactForm from '@/components/home/ContactForm'

export const metadata: Metadata = {
  title: 'Kontakt — Neon BW · KI-Agentur Stuttgart & BW',
  description:
    'Bedarfsanalyse starten: Beschreiben Sie kurz Ihr Unternehmen – wir antworten innerhalb von 24h. Kostenlos, unverbindlich, kein Verkaufsdruck.',
  alternates: {
    canonical: '/kontakt',
  },
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
              Bedarfsanalyse{' '}
              <span className="text-neon">starten.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              Beschreiben Sie kurz Ihr Unternehmen und wo der Schuh drückt –
              wir antworten innerhalb von 24h.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  )
}
