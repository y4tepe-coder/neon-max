import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum – NEON Agentur',
  robots: { index: false },
}

export default function ImpressumPage() {
  return (
    <div className="pt-16">
      <section className="py-24 md:py-32 bg-off-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text-dark mb-8">Impressum</h1>
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold text-text-dark mt-6 mb-3">Angaben gemäß § 5 TMG</h2>
            <p className="text-text-muted mb-4">
              [Ihre vollständigen Angaben hier einfügen: Name, Anschrift, Kontakt]
            </p>
            <h2 className="text-xl font-semibold text-text-dark mt-6 mb-3">Kontakt</h2>
            <p className="text-text-muted mb-4">
              E-Mail: hallo@neon-agentur.de
            </p>
            <p className="text-text-muted text-sm italic mt-8">
              Bitte fügen Sie hier Ihre vollständigen Impressum-Angaben ein.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
