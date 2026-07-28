import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  ContactRound,
  Nfc,
  PackageCheck,
  Palette,
  QrCode,
  RefreshCcw,
  ShieldCheck,
  Smartphone,
  UserRoundCheck,
} from 'lucide-react'
import NfcConfigurator from '@/components/nfc/NfcConfigurator'

export const metadata: Metadata = {
  title: 'NFC-Schlüsselanhänger als digitale Visitenkarte für Unternehmen',
  description:
    '5 NFC-Schlüsselanhänger und 5 digitale Visitenkarten im Firmenlook ab 99,99 €. Ohne App, mit QR-Fallback, Kontakt-Download und persönlicher Einrichtung durch NEON BW.',
  keywords: [
    'NFC Schlüsselanhänger Unternehmen',
    'digitale Visitenkarte NFC',
    'NFC Visitenkarte Baden-Württemberg',
    'NFC Schlüsselanhänger mit Logo',
    'digitale Visitenkarte für Mitarbeiter',
  ],
  alternates: {
    canonical: '/nfc-visitenkarte',
  },
  openGraph: {
    title: 'NFC-Schlüsselanhänger für Unternehmen – NEON BW',
    description:
      '5 Anhänger, 5 persönliche Profile, Einrichtung inklusive. Ab 99,99 € als günstiges Starterpaket.',
    url: '/nfc-visitenkarte',
    type: 'website',
  },
}

const included = [
  '5 NFC-Schlüsselanhänger im einheitlichen Firmenlook',
  '5 persönliche digitale Visitenkarten',
  'Telefon, E-Mail, WhatsApp, Website und Social Links',
  'Kontakt speichern als vCard',
  'Individueller QR-Code als Fallback',
  'Einrichtung und eine Freigaberunde durch NEON',
  'Änderungen an Kontaktdaten im ersten Jahr inklusive',
]

const steps = [
  {
    number: '01',
    icon: Palette,
    title: 'Zusammenstellen',
    text: 'Logo, Firmenfarbe und Kontaktdaten eingeben. Die Profilseite entsteht direkt in der Vorschau.',
  },
  {
    number: '02',
    icon: UserRoundCheck,
    title: 'Freigeben',
    text: 'NEON prüft die Daten und schickt eine klare Freigabeansicht. Erst danach wird produziert.',
  },
  {
    number: '03',
    icon: PackageCheck,
    title: 'Verteilen',
    text: 'Anhänger ans Team geben. Smartphone dranhalten – das persönliche Profil öffnet sich ohne App.',
  },
]

const audiences = [
  ['Handwerk & Service', 'Für Monteure, Techniker und Inhaber beim Termin vor Ort.'],
  ['Immobilien & Beratung', 'Kontakt nach Besichtigung oder Beratung sofort im Handy speichern.'],
  ['Außendienst & Vertrieb', 'Für kleine Teams, Messen, Netzwerktreffen und Kundentermine.'],
  ['Empfang & Fahrzeuge', 'Ein Profil für Schlüsselbund, Übergabe, Probefahrt oder Servicekontakt.'],
]

const faqs = [
  {
    question: 'Braucht der Empfänger eine App?',
    answer:
      'Nein. Der Anhänger öffnet eine normale, mobil optimierte Internetseite. Moderne Smartphones lesen NFC direkt; zusätzlich führt ein QR-Code zum selben Profil.',
  },
  {
    question: 'Muss der Anhänger neu produziert werden, wenn sich eine Nummer ändert?',
    answer:
      'Nein. Auf dem NFC-Chip liegt nur die Profiladresse. Telefonnummer, Rolle, Links oder Texte können auf der Profilseite geändert werden, ohne den Anhänger auszutauschen.',
  },
  {
    question: 'Ist das 99,99-€-Paket für einen einzelnen Anhänger?',
    answer:
      'Nein. Der Einführungspreis gilt für fünf Anhänger und fünf persönliche Profile. Dadurch ist das Paket für kleine Unternehmen günstiger als viele einzeln verkaufte Komplettlösungen.',
  },
  {
    question: 'Gibt es ein Abo?',
    answer:
      'Es gibt keine automatische Verlängerung. Die Profilseiten bleiben erreichbar. Wer nach dem ersten Jahr laufende Änderungen und Pflege für bis zu fünf Profile möchte, kann das optional für 29,90 € pro Jahr buchen.',
  },
  {
    question: 'Wie schnell ist das Paket fertig?',
    answer:
      'Nach vollständigen Daten und Designfreigabe planen wir in der Regel 7 bis 10 Werktage ein. Den verbindlichen Termin bestätigen wir vor dem Auftrag.',
  },
  {
    question: 'Kann jedes Teammitglied ein eigenes Profil bekommen?',
    answer:
      'Ja. Name, Rolle, Telefon, E-Mail, Foto und Links können je Person unterschiedlich sein; Farben, Logo und Aufbau bleiben im einheitlichen Firmenlook.',
  },
]

function ProductMockup() {
  return (
    <div className="relative mx-auto min-h-[470px] w-full max-w-[620px]" aria-label="Darstellung von NFC-Anhänger und digitaler Visitenkarte">
      <div className="absolute left-0 top-10 h-[330px] w-[330px] rounded-full border border-white/[0.09] sm:left-8" />
      <div className="absolute left-[38px] top-[94px] z-20 rotate-[-9deg] sm:left-[68px]">
        <div className="absolute left-1/2 top-[-54px] h-16 w-16 -translate-x-1/2 rounded-full border-[10px] border-[#2c2c28] bg-transparent" />
        <div className="relative flex h-[210px] w-[210px] items-center justify-center rounded-full border border-white/10 bg-[#1c1c19] shadow-[0_35px_80px_rgba(0,0,0,0.5)] sm:h-[235px] sm:w-[235px]">
          <div className="absolute inset-3 rounded-full border border-white/[0.06]" />
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#C5F74F] text-[#142000]">
              <Nfc size={27} strokeWidth={2.4} />
            </div>
            <p className="text-[25px] font-black tracking-[-0.05em] text-white">
              NEON<span className="text-[#C5F74F]">.</span>
            </p>
            <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/65">
              Tap to connect
            </p>
          </div>
          <div className="absolute bottom-7 rounded-full border border-white/10 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-white/60">
            Ø ca. 36 mm
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-30 w-[245px] rotate-[4deg] rounded-[34px] border-[6px] border-[#101010] bg-[#f6f4ec] shadow-[0_35px_100px_rgba(0,0,0,0.55)] sm:right-5 sm:w-[270px]">
        <div className="relative h-28 overflow-hidden rounded-t-[27px] bg-[#C5F74F]">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_36%,rgba(20,32,0,0.11)_36%,rgba(20,32,0,0.11)_54%,transparent_54%)]" />
          <p className="absolute left-5 top-5 text-xs font-black tracking-tight text-[#142000]">
            MUSTERBETRIEB<span className="opacity-50">.</span>
          </p>
        </div>
        <div className="relative px-5 pb-5">
          <div className="-mt-8 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#f6f4ec] bg-[#151515] text-lg font-black text-white">
            AS
          </div>
          <p className="mt-3 text-[10px] font-black uppercase tracking-[0.14em] text-black/45">
            Kundenberatung
          </p>
          <p className="mt-1 text-xl font-black tracking-[-0.04em] text-[#141414]">
            Anna Schneider
          </p>
          <div className="mt-4 flex gap-2">
            {[PhoneIcon, MailIcon, WebIcon].map((Icon, index) => (
              <span
                key={index}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#293200]"
              >
                <Icon />
              </span>
            ))}
          </div>
          <div className="mt-4 flex h-10 items-center justify-center gap-2 rounded-full bg-[#C5F74F] text-[10px] font-black uppercase tracking-[0.08em] text-[#142000]">
            <ContactRound size={13} />
            Kontakt speichern
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-0 z-10 max-w-[220px] border-l border-[#C5F74F] pl-4 text-[11px] leading-5 text-white/60 sm:left-5">
        Produktdarstellung auf Basis des aktuellen 36-mm-Entwurfs. Farbe und Aufdruck werden vor
        der Produktion freigegeben.
      </div>
    </div>
  )
}

function PhoneIcon() {
  return <Smartphone size={14} />
}

function MailIcon() {
  return <ContactRound size={14} />
}

function WebIcon() {
  return <QrCode size={14} />
}

export default function NfcVisitenkartePage() {
  return (
    <div className="overflow-x-hidden bg-[#f3f1e9] text-[#151515]">
      <section className="relative overflow-hidden bg-[#11110f] pb-20 pt-32 text-white md:pb-28 md:pt-40">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
            backgroundSize: '54px 54px',
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute right-[-15%] top-[-20%] h-[650px] w-[650px] rounded-full bg-[#C5F74F]/10 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="border border-[#C5F74F]/35 bg-[#C5F74F]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#C5F74F]">
                Einführungspaket
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-white/60">
                Für kleine Unternehmen und Teams
              </span>
            </div>

            <h1 className="max-w-[760px] font-serif text-[clamp(3.2rem,7.5vw,6.9rem)] leading-[0.88] tracking-[-0.055em] text-[#f5f2e8]">
              Die Visitenkarte, die am Schlüsselbund bleibt.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/55 md:text-lg md:leading-8">
              Fünf NFC-Schlüsselanhänger, fünf persönliche Profilseiten und die komplette
              Einrichtung. Smartphone dranhalten, Kontakt öffnen und direkt speichern – ohne App.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#konfigurator"
                className="group inline-flex min-h-14 items-center justify-center gap-3 bg-[#C5F74F] px-7 text-sm font-black text-[#142000] transition-colors hover:bg-[#d5ff72]"
              >
                Eigene Karte zusammenstellen
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/v/yasin-tepe"
                target="_blank"
                className="inline-flex min-h-14 items-center justify-center gap-3 border border-white/15 px-7 text-sm font-bold text-white/75 transition-colors hover:border-white/40 hover:text-white"
              >
                Live-Beispiel öffnen
                <Smartphone size={16} />
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-x-5 gap-y-4 border-t border-white/10 pt-6 sm:grid-cols-4">
              {[
                ['5', 'Anhänger'],
                ['5', 'Profile'],
                ['0', 'App-Zwang'],
                ['99,99 €', 'Paketpreis'],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-lg font-black text-[#C5F74F]">{value}</p>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <ProductMockup />
        </div>
      </section>

      <section className="border-b border-[#d8d5cb] bg-[#f3f1e9] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 border-b border-[#cbc8bd] pb-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#737169]">
                Der Ablauf / 03 Schritte
              </p>
            </div>
            <h2 className="font-serif text-4xl leading-[1.03] tracking-[-0.035em] text-[#151515] sm:text-5xl md:text-6xl">
              Kein Shop-Baukasten. Ein klarer Weg bis zum fertigen Anhänger.
            </h2>
          </div>

          <div className="grid md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <article
                  key={step.number}
                  className={`relative py-10 md:px-8 md:py-12 ${
                    index > 0 ? 'border-t border-[#cbc8bd] md:border-l md:border-t-0' : ''
                  }`}
                >
                  <div className="mb-12 flex items-center justify-between">
                    <span className="font-serif text-4xl text-[#9b988e]">{step.number}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171717] text-[#C5F74F]">
                      <Icon size={19} />
                    </span>
                  </div>
                  <h3 className="text-xl font-black tracking-[-0.025em] text-[#171717]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#696861]">{step.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <NfcConfigurator />

      <section className="bg-[#151513] py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-[#C5F74F]">
                5er Starter / 99,99 €
              </p>
              <h2 className="max-w-xl font-serif text-4xl leading-[1.03] tracking-[-0.035em] text-[#f4f1e7] sm:text-5xl md:text-6xl">
                Klein anfangen. Professionell auftreten.
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-7 text-white/50">
                Das Paket ist bewusst ein günstiger Einstieg für kleine Teams. Kein
                Großauftrag, keine Software-Schulung und kein automatisches Abo.
              </p>
              <Link
                href="#konfigurator"
                className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#C5F74F]"
              >
                Paket konfigurieren
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="border border-white/12 bg-white/[0.035]">
              <div className="flex flex-wrap items-end justify-between gap-5 border-b border-white/12 p-6 sm:p-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-white/60">
                    Einführungspreis
                  </p>
                  <p className="mt-2 text-4xl font-black tracking-[-0.045em] text-white">99,99 €</p>
                </div>
                <p className="max-w-[220px] text-right text-xs leading-5 text-white/60">
                  Paketpreis für Unternehmen. Versand wird vor Auftrag transparent bestätigt.
                </p>
              </div>
              <ul className="grid gap-x-8 gap-y-4 p-6 sm:grid-cols-2 sm:p-8">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/68">
                    <Check size={15} className="mt-1 shrink-0 text-[#C5F74F]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="grid border-t border-white/12 sm:grid-cols-3">
                {[
                  ['10er Team', '179,90 €'],
                  ['Weiteres Profil', 'ab 14,90 €'],
                  ['Pflege ab Jahr 2', 'optional 29,90 €/Jahr'],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className={`p-5 ${index > 0 ? 'border-t border-white/12 sm:border-l sm:border-t-0' : ''}`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-white/60">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-black text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8d5cb] bg-[#f3f1e9] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#737169]">
                Gemacht für echten Kundenkontakt
              </p>
              <h2 className="font-serif text-4xl leading-[1.04] tracking-[-0.035em] text-[#151515] sm:text-5xl">
                Dort dabei, wo Visitenkarten fehlen.
              </h2>
            </div>
            <div className="grid border-l border-t border-[#cbc8bd] sm:grid-cols-2">
              {audiences.map(([title, text]) => (
                <article key={title} className="border-b border-r border-[#cbc8bd] p-6 sm:p-8">
                  <h3 className="text-lg font-black tracking-[-0.025em] text-[#171717]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#696861]">{text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {[
              [RefreshCcw, 'Daten später ändern', 'Neue Nummer oder neue Rolle – ohne neuen Chip.'],
              [QrCode, 'QR als Rückfallebene', 'Auch erreichbar, wenn NFC am Gerät deaktiviert ist.'],
              [ShieldCheck, 'Keine Tracking-Pflicht', 'Das Basisprofil funktioniert ohne Marketing-Cookies.'],
            ].map(([Icon, title, text]) => {
              const FeatureIcon = Icon as typeof RefreshCcw
              return (
                <div key={title as string} className="flex gap-4 border border-[#cbc8bd] bg-white/45 p-5">
                  <FeatureIcon size={20} className="mt-0.5 shrink-0 text-[#333d13]" />
                  <div>
                    <p className="text-sm font-black text-[#171717]">{title as string}</p>
                    <p className="mt-1 text-xs leading-5 text-[#716f68]">{text as string}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#eeece4] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#737169]">
              Fragen vor der Anfrage
            </p>
            <h2 className="font-serif text-4xl tracking-[-0.035em] text-[#151515] sm:text-5xl">
              Kurz beantwortet.
            </h2>
          </div>
          <div className="border-t border-[#c8c5bb]">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group border-b border-[#c8c5bb]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left text-base font-black text-[#171717] marker:content-none">
                  <span className="flex items-center gap-4">
                    <span className="font-serif text-lg font-normal text-[#9a978e]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {faq.question}
                  </span>
                  <span className="text-xl font-normal transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-7 pl-10 text-sm leading-7 text-[#67665f]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#C5F74F] py-16 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#314000]">
              Noch keine fertigen Daten nötig
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-[1.03] tracking-[-0.035em] text-[#142000] md:text-5xl">
              Erst ausprobieren. Dann gemeinsam sauber machen.
            </h2>
          </div>
          <Link
            href="#konfigurator"
            className="group inline-flex min-h-14 shrink-0 items-center gap-3 bg-[#142000] px-7 text-sm font-black text-white"
          >
            Konfigurator starten
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  )
}
