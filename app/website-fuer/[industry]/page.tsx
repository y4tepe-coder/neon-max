import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, Globe, Shield, Search, Plus, Minus } from 'lucide-react'
import { industries } from '@/lib/seo-data'

type Props = { params: Promise<{ industry: string }> }

export async function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry: slug } = await params
  const industry = industries.find((i) => i.slug === slug)
  if (!industry) return {}
  return {
    title: `Website für ${industry.plural} – Professionell & Modern | NEON Agentur`,
    description: `Professionelle Website für ${industry.plural}: ${industry.description}. NEON Agentur erstellt und betreut Ihre Branchenwebsite – ab 399 € einmalig.`,
    alternates: { canonical: `/website-fuer/${industry.slug}` },
  }
}

const needIcons = [CheckCircle2, Globe, Shield, Search]

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

export default async function IndustryPage({ params }: Props) {
  const { industry: slug } = await params
  const industry = industries.find((i) => i.slug === slug)
  if (!industry) notFound()

  const faqs = [
    {
      question: `Was kostet eine Website für ${industry.plural}?`,
      answer: `Unser Komplettpaket für ${industry.plural} kostet einmalig ab 399 € für die Erstellung plus 79 € pro Monat für laufende Betreuung, Hosting und Support. Keine versteckten Kosten, keine Mindestlaufzeit.`,
    },
    {
      question: `Wie lange dauert die Erstellung einer Website für ${industry.name}?`,
      answer: `Bei schneller Bereitstellung Ihrer Inhalte können einfachere Projekte innerhalb von 2–4 Wochen live gehen. Den genauen Zeitplan klären wir im kostenlosen Erstgespräch.`,
    },
    {
      question: `Welche Inhalte brauche ich als ${industry.name} für meine Website?`,
      answer: `Wir begleiten Sie durch den gesamten Prozess. Typisch für ${industry.plural} sind: Leistungsübersicht, Kontaktmöglichkeiten, Öffnungszeiten und Fotos. Wir beraten Sie, was für Ihre Branche am wichtigsten ist.`,
    },
    {
      question: `Kann NEON auch meine bestehende Website als ${industry.name} modernisieren?`,
      answer: `Ja. Wir schauen uns Ihre bestehende Website an und entscheiden gemeinsam, ob ein Relaunch oder eine Überarbeitung sinnvoller ist. In vielen Fällen ist ein kompletter Neustart die günstigere und bessere Lösung.`,
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
                Webdesign · {industry.plural}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-off-white leading-[1.1] tracking-tight mb-6">
              Website für {industry.plural} –{' '}
              <span className="text-neon">Modern, professionell & gefunden.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/55 leading-relaxed max-w-2xl mb-10">
              {industry.description}. NEON Agentur baut Ihre Website – und betreut sie dauerhaft.
              Kein Aufwand für Sie, faire Preise, persönlicher Service.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 bg-neon text-text-dark font-semibold px-7 py-4 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
            >
              Kostenloses Erstgespräch
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Needs Section */}
      <section className="section-pad bg-warm-gray" aria-labelledby={`needs-${industry.slug}`}>
        <div className="container-xl">
          <div className="max-w-2xl mb-14">
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Branchenanforderungen
            </p>
            <h2 id={`needs-${industry.slug}`} className="heading-section text-text-dark mb-5 text-balance">
              Was eine gute Website für {industry.plural} braucht
            </h2>
            <p className="text-body">
              Jede Branche hat andere Anforderungen. Wir kennen die Bedürfnisse
              von {industry.plural} und setzen genau das um, was wirklich zählt.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {industry.needs.map((need, i) => {
              const Icon = needIcons[i % needIcons.length]
              return (
                <div key={need} className="bg-white rounded-2xl p-6 border border-border-light card-hover cursor-default flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-neon-dim" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-dark mb-1.5 text-base">{need}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      Ein wichtiges Element für {industry.plural}, das Vertrauen schafft und Kunden überzeugt.
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* NEON Services Section */}
      <section className="section-pad bg-off-white" aria-labelledby={`services-${industry.slug}`}>
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Leistungen
            </p>
            <h2 id={`services-${industry.slug}`} className="heading-section text-text-dark mb-5 text-balance">
              NEON erstellt Ihre Website als {industry.name}
            </h2>
            <p className="text-body text-center">
              Alles aus einer Hand – von der Konzeption bis zur laufenden Betreuung.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Globe,
                tag: 'Design',
                title: 'Individuelles Design',
                description: `Ihr Auftritt als ${industry.name} wird individuell gestaltet – kein Template, kein Copy-Paste. Design, das zu Ihrer Branche und Ihren Kunden passt.`,
                features: ['Einzigartiges Layout', 'Markengerecht umgesetzt', 'Mobiloptimiert', 'Schnelle Ladezeiten'],
                dark: true,
              },
              {
                icon: Shield,
                tag: 'Betreuung',
                title: 'Laufende Betreuung',
                description: `Als ${industry.name} haben Sie Wichtigeres zu tun, als sich um Ihre Website zu kümmern. Wir übernehmen Hosting, Updates, Sicherheit und Änderungen.`,
                features: ['Hosting & Technik', 'Sicherheitsupdates', '1 Änderung/Monat inkl.', 'Direkter Ansprechpartner'],
                dark: true,
              },
              {
                icon: Search,
                tag: 'SEO',
                title: 'SEO-Grundoptimierung',
                description: `Damit Sie als ${industry.name} lokal bei Google gefunden werden. Wir optimieren die technischen Grundlagen, damit Ihre Kunden Sie finden.`,
                features: ['Technisches SEO', 'Lokale Sichtbarkeit', 'Google-konforme Struktur', 'Schnelle Ladezeiten'],
                dark: false,
              },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.title}
                  className={`rounded-2xl p-7 flex flex-col border ${
                    s.dark ? 'bg-dark-bg border-dark-border' : 'bg-white border-border-light'
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

      {/* FAQ Section */}
      <section className="section-pad bg-warm-gray" aria-labelledby={`faq-${industry.slug}`}>
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
                Häufige Fragen
              </p>
              <h2 id={`faq-${industry.slug}`} className="heading-section text-text-dark mb-5 text-balance">
                Fragen zur Website für {industry.plural}
              </h2>
              <p className="text-body">
                Die wichtigsten Fragen von {industry.plural} – direkt und ehrlich beantwortet.
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
            Website für Ihr {industry.name}-Unternehmen – jetzt starten
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Lassen Sie uns in einem kurzen Gespräch herausfinden, was Ihre Website als {industry.name} braucht.
            Kostenlos, unverbindlich, persönlich.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center gap-2 bg-neon text-text-dark font-semibold px-8 py-4 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
          >
            Kostenloses Erstgespräch vereinbaren
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
