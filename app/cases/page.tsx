import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Case Studies — Neon BW · KI-Agentur Stuttgart & BW',
  description:
    'Echte Ergebnisse, echter Kontext. Case Studies folgen nach den ersten Kundenprojekten – kein Erfundenes, nur Reales.',
  alternates: {
    canonical: '/cases',
  },
}

export default function CasesPage() {
  return (
    <div className="pt-16">
      <section className="bg-dark-bg min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Case Studies
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-off-white leading-tight tracking-tight mb-6 text-balance">
              Kommt bald.{' '}
              <span className="text-neon">Echte Zahlen.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-xl mb-4">
              Echte Kunden, echte Ergebnisse. Wir veröffentlichen hier Case Studies,
              sobald die ersten Projekte abgeschlossen sind – kein Erfundenes, nur Reales.
            </p>
            <p className="text-white/30 text-base leading-relaxed max-w-xl mb-10">
              In Phase 1 arbeiten wir mit den ersten 2 Kunden kostenfrei zusammen,
              um echte Referenzen und messbare Ergebnisse zu schaffen.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-7 py-4 rounded-full
                         hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
            >
              Jetzt Bedarfsanalyse starten
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
