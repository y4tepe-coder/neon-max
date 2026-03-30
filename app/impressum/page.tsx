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

          <div className="space-y-8 text-text-muted">

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">Angaben gemäß § 5 TMG</h2>
              <p>Yasin Tepe</p>
              <p>NEON Agentur</p>
              <p>Flattigstraße 12</p>
              <p>77771 Klein-Velden</p>
              <p>Deutschland</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">Kontakt</h2>
              <p>Telefon: +49 176 20170133</p>
              <p>
                E-Mail:{' '}
                <a href="mailto:hallo@neon-bw.de" className="text-neon-dim hover:underline">
                  hallo@neon-bw.de
                </a>
              </p>
              <p>Website: www.neon-bw.de</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">Hinweis zur Gewerbeanmeldung</h2>
              <p>
                Die gewerbliche Tätigkeit befindet sich aktuell in der Gründungsphase.
                Eine Steuernummer wird nach erfolgter Gewerbeanmeldung ergänzt.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV</h2>
              <p>Yasin Tepe</p>
              <p>Flattigstraße 12</p>
              <p>77771 Klein-Velden</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">Haftungsausschluss</h2>
              <p className="leading-relaxed">
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir
                jedoch keine Gewähr. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für
                eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">Urheberrecht</h2>
              <p className="leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
