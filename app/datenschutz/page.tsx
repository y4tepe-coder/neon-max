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
          <h1 className="text-4xl font-bold text-text-dark mb-2">Datenschutzerklärung</h1>
          <p className="text-text-muted text-sm mb-10">Stand: März 2026</p>

          <div className="space-y-8 text-text-muted">

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">1. Verantwortlicher</h2>
              <p>Yasin Tepe – NEON Agentur</p>
              <p>Flattichstraße 12, 70771 Leinfelden-Echterdingen</p>
              <p>E-Mail: <a href="mailto:info@neon-bw.de" className="text-neon-dim hover:underline">info@neon-bw.de</a></p>
              <p>Telefon: +49 176 20170133</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">2. Allgemeines zur Datenverarbeitung</h2>
              <p className="leading-relaxed">
                Wir verarbeiten personenbezogene Daten grundsätzlich nur, soweit dies zur
                Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und
                Leistungen erforderlich ist. Die Verarbeitung personenbezogener Daten erfolgt
                regelmäßig nur nach Einwilligung des Nutzers. Eine Ausnahme gilt in solchen
                Fällen, in denen eine vorherige Einholung einer Einwilligung aus tatsächlichen
                Gründen nicht möglich ist und die Verarbeitung der Daten durch gesetzliche
                Vorschriften gestattet ist.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">3. Erhobene Daten beim Website-Check</h2>
              <p className="leading-relaxed mb-3">
                Wenn Sie unseren kostenlosen Website-Check nutzen, erheben wir folgende Daten:
              </p>
              <ul className="list-disc list-inside space-y-1 leading-relaxed">
                <li>Ihre Website-URL (optional)</li>
                <li>Name Ihres Unternehmens (optional)</li>
                <li>Ihr Name und Ihre E-Mail-Adresse</li>
                <li>Ihre Antworten auf die Fragen des Checks</li>
                <li>Zeitpunkt der Anfrage</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Diese Daten werden auf unserem Server gespeichert und ausschließlich zur
                Beantwortung Ihrer Anfrage und zur Kontaktaufnahme genutzt. Eine Weitergabe
                an Dritte erfolgt nicht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO
                (Einwilligung) sowie Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">4. Kontaktaufnahme per E-Mail oder WhatsApp</h2>
              <p className="leading-relaxed">
                Wenn Sie uns per E-Mail oder WhatsApp kontaktieren, werden die übermittelten
                Daten (Name, E-Mail-Adresse, Nachrichteninhalt) zum Zweck der Bearbeitung
                Ihrer Anfrage gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung
                weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
                an der Beantwortung von Anfragen).
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">5. Calendly (Terminbuchung)</h2>
              <p className="leading-relaxed">
                Für die Buchung von Terminen nutzen wir Calendly (Calendly LLC, 271 17th St NW,
                Atlanta, GA 30363, USA). Wenn Sie einen Termin über Calendly buchen, werden Ihre
                Daten an Calendly übertragen und dort verarbeitet. Weitere Informationen finden
                Sie in der Datenschutzerklärung von Calendly:{' '}
                <a
                  href="https://calendly.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-dim hover:underline"
                >
                  calendly.com/privacy
                </a>
                . Das Calendly-Widget wird nur bei aktiver Nutzung (Klick auf „Termin buchen")
                geladen.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">6. WhatsApp</h2>
              <p className="leading-relaxed">
                Auf unserer Website binden wir einen Link zu WhatsApp (Meta Platforms Ireland
                Limited, 4 Grand Canal Square, Dublin 2, Irland) ein. Wenn Sie auf den
                WhatsApp-Button klicken, werden Sie zur WhatsApp-App weitergeleitet. Dabei
                werden Daten an Meta übermittelt. Wir haben keinen Einfluss auf die
                Datenverarbeitung durch WhatsApp. Weitere Informationen finden Sie in der
                Datenschutzerklärung von WhatsApp:{' '}
                <a
                  href="https://www.whatsapp.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-dim hover:underline"
                >
                  whatsapp.com/legal/privacy-policy
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">7. Hosting & Server-Logs</h2>
              <p className="leading-relaxed">
                Diese Website wird auf Servern eines Hosting-Anbieters betrieben. Beim Aufruf
                unserer Website werden automatisch Informationen in sogenannten Server-Log-Dateien
                gespeichert, die Ihr Browser automatisch übermittelt. Dies sind: IP-Adresse,
                Datum und Uhrzeit der Anfrage, Browsertyp und -version, Betriebssystem,
                Referrer-URL. Diese Daten werden nicht mit anderen Datenquellen zusammengeführt
                und dienen ausschließlich der Gewährleistung eines störungsfreien Betriebs.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">8. Cookies</h2>
              <p className="leading-relaxed">
                Diese Website verwendet keine Tracking- oder Marketing-Cookies. Es werden
                ausschließlich technisch notwendige Cookies eingesetzt, die für den Betrieb
                der Website erforderlich sind und keine personenbezogenen Daten an Dritte
                übermitteln.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text-dark mb-2">9. Ihre Rechte</h2>
              <p className="leading-relaxed mb-3">
                Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden
                personenbezogenen Daten:
              </p>
              <ul className="list-disc list-inside space-y-1 leading-relaxed">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Zur Geltendmachung Ihrer Rechte wenden Sie sich bitte an:{' '}
                <a href="mailto:info@neon-bw.de" className="text-neon-dim hover:underline">
                  info@neon-bw.de
                </a>
              </p>
              <p className="leading-relaxed mt-3">
                Sie haben außerdem das Recht, sich bei der zuständigen Datenschutz-Aufsichtsbehörde
                zu beschweren. In Baden-Württemberg ist dies der Landesbeauftragte für den
                Datenschutz und die Informationsfreiheit Baden-Württemberg (LfDI BW).
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
