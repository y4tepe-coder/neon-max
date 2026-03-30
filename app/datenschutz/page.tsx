import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutz – NEON Agentur',
  robots: { index: false },
}

export default function DatenschutzPage() {
  return (
    <div className="pt-16">
      <section className="py-24 md:py-32 bg-off-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text-dark mb-8">Datenschutzerklärung</h1>
          <div className="prose prose-slate max-w-none">
            <p className="text-text-muted mb-4">
              Diese Seite befindet sich noch in Bearbeitung. Bitte fügen Sie hier Ihre
              vollständige Datenschutzerklärung gemäß DSGVO ein.
            </p>
            <p className="text-text-muted text-sm italic mt-8">
              Hinweis: Eine rechtskonforme Datenschutzerklärung ist Pflicht. Bitte lassen Sie
              diese von einem Rechtsanwalt oder über einen Generator (z.B. Datenschutz-Generator.de)
              erstellen.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
