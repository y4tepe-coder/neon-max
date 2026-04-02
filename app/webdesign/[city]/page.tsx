import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, SearchX, Monitor, TrendingDown, Globe, Shield, User, Plus, Minus } from 'lucide-react'
import { cities } from '@/lib/seo-data'

type Props = { params: Promise<{ city: string }> }

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params
  const city = cities.find((c) => c.slug === slug)
  if (!city) return {}
  return {
    title: `Webdesign ${city.name} – Moderne Websites für lokale Unternehmen | NEON Agentur`,
    description: `Professionelles Webdesign in ${city.name} (${city.region}). NEON Agentur erstellt und betreut moderne Websites für lokale Unternehmen – ab 399 € einmalig + 79 €/Monat.`,
    alternates: { canonical: `/webdesign/${city.slug}` },
  }
}

const problems = [
  {
    icon: SearchX,
    color: 'bg-blue-50 text-blue-500',
    title: 'Nicht bei Google auffindbar',
    description: 'Wer lokal sucht, findet Sie nicht – und landet stattdessen bei der Konkurrenz. Ohne moderne Website verlieren Sie täglich potenzielle Kunden.',
  },
  {
    icon: Monitor,
    color: 'bg-orange-50 text-orange-500',
    title: 'Veraltetes Design verliert Kunden',
    description: 'Ein erster Eindruck entscheidet in Sekunden. Eine veraltete Website signalisiert: hier kümmert sich niemand. Das kostet Vertrauen und Aufträge.',
  },
  {
    icon: TrendingDown,
    color: 'bg-red-50 text-red-500',
    title: 'Konkurrenz ist bereits online sichtbar',
    description: 'Während Sie noch warten, gewinnen Mitbewerber täglich neue Kunden über Google. Wer jetzt handelt, sichert sich einen klaren Vorteil.',
  },
]

const whyPoints = [
  'Regional verwurzelt in Baden-Württemberg',
  'Faire Preise – keine versteckten Kosten',
  'Keine langen Verträge – monatlich kündbar',
  'Persönlich & auf Augenhöhe',
]

function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="bg-white rounded-2xl px-6 py-2 border border-border-light">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-border-light last:border-0">
          <summary className="w-full flex items-start justify-between gap-4 py-5 text-left cursor-pointer list-none hover:text-neon-dim transition-colors duration-200">
            <span className="text-text-dark font-semibold text-base leading-snug">{item.question}</span>
            <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-warm-gray flex items-center justify-center">
              <Plus size={14} className="text-text-muted group-open:hidden" aria-hidden="true" />
              <Minus size={14} className="text-neon-dim hidden group-open:block" aria-hidden="true" />
            </span>
          </summary>
          <p className="text-text-muted text-sm leading-relaxed pb-5 pr-8">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params
  const city = cities.find((c) => c.slug === slug)
  if (!city) notFound()

  const faqs = [
    {
      question: `Was kostet eine Website für ein Unternehmen in ${city.name}?`,
      answer: `Unser Komplettpaket für Unternehmen in ${city.name} besteht aus einem einmaligen Setup-Preis ab 399 € und einer monatlichen Betreuungspauschale von 79 €. Keine versteckten Kosten, keine langen Vertragslaufzeiten – transparente Preise von Anfang an.`,
    },
    {
      question: `Wie lange dauert die Erstellung einer Website in ${city.region}?`,
      answer: `Bei schneller Bereitstellung der Inhalte können einfachere Projekte innerhalb von 2–4 Wochen live gehen. Den genauen Zeitplan klären wir im kostenlosen Erstgespräch – damit Ihre Website in ${city.name} so schnell wie möglich online ist.`,
    },
    {
      question: `Betreut NEON Agentur auch Unternehmen aus ${city.name} persönlich?`,
      answer: `Ja, absolut. Wir sind in Baden-Württemberg zu Hause und betreuen Unternehmen aus ${city.name} und der gesamten Region ${city.region} persönlich. Kein anonymes Ticket-System – Sie haben immer einen direkten Ansprechpartner.`,
    },
    {
      question: `Welche Branchen in ${city.name} profitieren am meisten von einer neuen Website?`,
      answer: `Grundsätzlich jedes lokale Unternehmen in ${city.name} profitiert von einer professionellen Website. Besonders nachgefragt sind wir von Handwerksbetrieben, Dienstleistern, Arztpraxen, Restaurants und Einzelhändlern in ${city.region}.`,
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-dark-bg pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(197,247,79,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,247,79,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C5F74F 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="container-xl relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" aria-hidden="true" />
              <span className="text-white/70 text-sm font-medium">
                Webdesign · {city.region}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-off-white leading-[1.1] tracking-tight mb-6">
              Webdesign {city.name} –{' '}
              <span className="text-neon">Ihre neue Website.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/55 leading-relaxed max-w-2xl mb-10">
              {city.uniqueContent}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 bg-neon text-text-dark font-semibold px-7 py-4 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
              >
                Kostenloses Erstgespräch
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/leistungen"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-7 py-4 rounded-full hover:border-neon hover:text-neon transition-all duration-200 cursor-pointer text-base"
              >
                Leistungen ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-pad bg-warm-gray" aria-labelledby={`problems-${city.slug}`}>
        <div className="container-xl">
          <div className="max-w-2xl mb-14">
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Die häufigsten Probleme
            </p>
            <h2 id={`problems-${city.slug}`} className="heading-section text-text-dark mb-5 text-balance">
              Warum lokale Unternehmen in {city.name} eine moderne Website brauchen
            </h2>
            <p className="text-body">
              Viele Betriebe in {city.region} kämpfen mit denselben Herausforderungen –
              dabei ist die Lösung einfacher als gedacht.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {problems.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="bg-white rounded-2xl p-6 border border-border-light card-hover cursor-default">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${p.color}`}>
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-text-dark mb-2 text-base">{p.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{p.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-pad bg-off-white" aria-labelledby={`services-${city.slug}`}>
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Leistungen & Preise
            </p>
            <h2 id={`services-${city.slug}`} className="heading-section text-text-dark mb-5 text-balance">
              Was NEON Agentur für Ihr Unternehmen in {city.name} macht
            </h2>
            <p className="text-body text-center">
              Alles aus einer Hand – Erstellung und Betreuung, klar kalkulierbar.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Globe,
                tag: 'Einmalig',
                price: '399 €',
                title: 'Website-Erstellung',
                description: `Wir entwickeln Ihre individuelle Website für ${city.name} – modernes Design, mobiloptimiert, schnell und suchmaschinenfreundlich.`,
                features: ['Individuelles Design', 'Mobiloptimiert', 'Kontaktformular', 'Livegang & Veröffentlichung'],
                dark: true,
              },
              {
                icon: Shield,
                tag: 'Monatlich',
                price: '79 €',
                title: 'Laufende Betreuung',
                description: 'Hosting, Sicherheit, Updates und persönlicher Support inklusive. Sie müssen sich um nichts kümmern.',
                features: ['Hosting & Betrieb', 'Sicherheit & Updates', '1 Änderung/Monat inkl.', 'Direkter Ansprechpartner'],
                dark: true,
              },
              {
                icon: User,
                tag: 'Immer',
                price: null,
                title: 'Persönlicher Ansprechpartner',
                description: `Kein Ticket-System, kein Callcenter. Sie haben immer eine direkte Ansprechperson für Ihr Projekt in ${city.region}.`,
                features: ['Direkte Erreichbarkeit', 'Schnelle Reaktionszeiten', 'Persönliche Beratung', 'Auf Augenhöhe'],
                dark: false,
              },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.title}
                  className={`rounded-2xl p-7 flex flex-col border ${
                    s.dark
                      ? 'bg-dark-bg border-dark-border'
                      : 'bg-white border-border-light'
                  }`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.dark ? 'bg-neon/10' : 'bg-warm-gray'}`}>
                      <Icon size={18} className={s.dark ? 'text-neon' : 'text-text-dark'} aria-hidden="true" />
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-widest ${s.dark ? 'text-white/30' : 'text-text-muted'}`}>
                      {s.tag}
                    </span>
                  </div>
                  {s.price && (
                    <div className={`text-3xl font-black mb-1 ${s.dark ? 'text-neon' : 'text-text-dark'}`}>
                      {s.price}
                    </div>
                  )}
                  <h3 className={`text-lg font-bold mb-2 ${s.dark ? 'text-off-white' : 'text-text-dark'}`}>
                    {s.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-5 ${s.dark ? 'text-white/40' : 'text-text-muted'}`}>
                    {s.description}
                  </p>
                  <ul className="space-y-2 mt-auto">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <CheckCircle2 size={14} className={s.dark ? 'text-neon/70 shrink-0' : 'text-neon-dim shrink-0'} aria-hidden="true" />
                        <span className={`text-sm ${s.dark ? 'text-white/55' : 'text-text-muted'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why NEON Section */}
      <section className="section-pad bg-dark-bg" aria-labelledby={`why-${city.slug}`}>
        <div className="container-xl">
          <div className="max-w-2xl mb-14">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Warum NEON
            </p>
            <h2 id={`why-${city.slug}`} className="heading-section text-off-white mb-5 text-balance">
              Warum Unternehmen aus {city.region} auf NEON vertrauen
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Es gibt viele Anbieter für Webdesign in {city.name}. Aber nicht alle kümmern sich wirklich.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyPoints.map((point) => (
              <div
                key={point}
                className="bg-dark-card border border-dark-border rounded-2xl p-6 flex items-center gap-4 hover:border-neon/30 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-neon/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} className="text-neon" aria-hidden="true" />
                </div>
                <span className="text-off-white font-semibold text-base">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-pad bg-off-white" aria-labelledby={`faq-${city.slug}`}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
                Häufige Fragen
              </p>
              <h2 id={`faq-${city.slug}`} className="heading-section text-text-dark mb-5 text-balance">
                Fragen zu Webdesign in {city.name}
              </h2>
              <p className="text-body">
                Alles, was lokale Unternehmen aus {city.region} wissen wollen –
                direkt beantwortet.
              </p>
              <p className="mt-4 text-text-muted text-sm">
                Noch mehr Fragen?{' '}
                <Link href="/kontakt" className="text-neon-dim font-semibold hover:underline cursor-pointer">
                  Schreiben Sie uns einfach.
                </Link>
              </p>
            </div>
            <div className="lg:col-span-3">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-pad bg-dark-bg overflow-hidden relative" aria-label="Jetzt starten">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(197,247,79,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,247,79,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #C5F74F 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="container-xl relative z-10 text-center">
          <span className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 rounded-full px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-neon" aria-hidden="true" />
            <span className="text-neon/80 text-sm font-medium">Kostenloses Erstgespräch möglich</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-off-white mb-6 text-balance">
            Bereit für Ihre neue Website in {city.name}?
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Lassen Sie uns in einem kurzen Gespräch herausfinden, was Ihre Website braucht.
            Kostenlos, unverbindlich, persönlich.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center gap-2 bg-neon text-text-dark font-semibold px-8 py-4 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
          >
            Jetzt kostenloses Erstgespräch vereinbaren
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-10">
            {['Kostenlos & unverbindlich', 'Antwort innerhalb von 24h', 'Persönliche Beratung'].map((item) => (
              <span key={item} className="text-white/30 text-sm flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neon/40" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
