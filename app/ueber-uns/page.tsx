import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, MapPin, Quote } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Über NEON – Wer wir sind',
  description:
    'NEON Webdesign & KI baut Websites und digitale Anfragewege für lokale Betriebe in Baden-Württemberg. Persönlich, transparent und zum Festpreis.',
  alternates: {
    canonical: '/ueber-uns',
  },
}

const values = [
  {
    title: 'Klarheit über alles',
    description:
      'Keine Fachbegriffe, kein Wirrwarr, keine versteckten Kosten. Wir kommunizieren klar und ehrlich – immer.',
  },
  {
    title: 'Qualität, nicht Quantität',
    description:
      'Wir nehmen uns Zeit für jedes Projekt. Lieber weniger Kunden, dafür jeder mit voller Aufmerksamkeit.',
  },
  {
    title: 'Langfristige Beziehungen',
    description:
      'Unser Ziel ist keine einmalige Transaktion – wir wollen der Agentur-Partner sein, dem Sie langfristig vertrauen.',
  },
  {
    title: 'Ergebnisse, die zählen',
    description:
      'Eine schöne Website ist schön. Aber ein Auftritt, der Anfragen sauber aufnimmt und Zeit spart – das ist unser Ziel.',
  },
]

export default function UeberUnsPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-dark-bg section-pad py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Wer wir sind
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-off-white leading-tight tracking-tight mb-6 text-balance">
              Hinter NEON steckt{' '}
              <span className="text-neon">echte Überzeugung.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              NEON Webdesign & KI ist mehr als ein Dienstleister. Wir bauen für lokale
              Unternehmen Websites und Anfragewege, die im Alltag wirklich helfen.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-pad bg-off-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Brand / Identity Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden bg-dark-bg border border-dark-border p-8 md:p-10 shadow-xl">
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-neon/10 blur-3xl"
                />
                <div className="relative z-10 flex flex-col h-full min-h-[340px]">
                  <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 w-fit mb-8">
                    <MapPin size={12} className="text-neon" aria-hidden="true" />
                    <span className="text-white/80 font-medium text-xs">Baden-Württemberg</span>
                  </div>

                  <Quote size={28} className="text-neon mb-4" aria-hidden="true" />
                  <p className="text-off-white text-lg md:text-xl leading-snug font-medium mb-8 text-balance">
                    Ein guter Online-Auftritt soll nicht nur gut aussehen. Er soll Arbeit abnehmen.
                  </p>

                  <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Ansatz</p>
                      <p className="text-off-white font-semibold text-sm">Persönlich, transparent</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Fokus</p>
                      <p className="text-off-white font-semibold text-sm">Lokale Betriebe</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-7">
              <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-3">
                Zur Person
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark leading-tight tracking-tight mb-1">
                Yasin Tepe
              </h2>
              <p className="text-neon-dim font-semibold text-base mb-6">Gründer von NEON Webdesign & KI</p>

              <div className="space-y-4 text-text-muted text-base leading-relaxed mb-6 max-w-xl">
                <p>
                  NEON Webdesign & KI habe ich mit einer klaren Überzeugung gegründet: Jedes lokale
                  Unternehmen – unabhängig von Größe oder Branche – verdient einen professionellen
                  Online-Auftritt, der Anfragen klarer macht.
                </p>
                <p>
                  Was mich täglich antreibt: Ich begegne Unternehmern, die in ihrem Fachgebiet
                  exzellent sind – online jedoch kaum wahrgenommen werden oder zu viel Zeit mit
                  Rückfragen, Terminen und Nachfassen verlieren. Genau das möchte ich ändern.
                </p>
                <p>
                  Mein Anspruch ist klar: Keine Fachbegriffe, keine versteckten Kosten, kein
                  anonymer Support. Sie erhalten mich als persönlichen Ansprechpartner – jemanden,
                  der Ihr Projekt von Anfang an begleitet, die Abläufe versteht und mit
                  konsequentem Fokus betreut.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {['Persönlich', 'Transparent', 'Engagiert', 'Lokal'].map((val) => (
                  <span key={val} className="bg-warm-gray border border-border-light text-text-dark text-xs font-medium px-3 py-1.5 rounded-full">
                    {val}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Link
                  href="/termin"
                  className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm"
                >
                  Gespräch starten
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  href="#mission"
                  className="inline-flex items-center gap-2 text-text-muted font-medium hover:text-text-dark transition-colors duration-200 cursor-pointer group text-sm py-3"
                >
                  Mehr über NEON
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="section-pad bg-dark-bg py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Unsere Mission
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-off-white leading-tight tracking-tight mb-5 text-balance">
              Lokale Unternehmen digital entlasten.
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Wir wollen die erste Anlaufstelle für lokale Unternehmen sein, wenn Website,
              Anfrageaufnahme und wiederkehrende Arbeit besser zusammenspielen sollen –
              persönlich, vertrauenswürdig und ergebnisorientiert.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-neon/20 transition-colors duration-300 cursor-default">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 size={18} className="text-neon shrink-0 mt-0.5" aria-hidden="true" />
                  <h3 className="text-off-white font-semibold text-base">{v.title}</h3>
                </div>
                <p className="text-white/40 text-sm leading-relaxed pl-7">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why young agency is an advantage */}
      <section className="section-pad bg-warm-gray py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Der NEON-Vorteil
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark leading-tight tracking-tight mb-6 text-balance">
              Warum eine junge Agentur Ihr Vorteil sein kann.
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              Erfahrene Agenturen haben oft starre Prozesse, lange Reaktionszeiten und hohe
              Overheadkosten. Bei NEON ist das anders.
            </p>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              Wir arbeiten schlank, modern und fokussiert. Kein aufgeblähtes Agenturmodell,
              kein anonymes Callcenter. Sie bekommen echtes Engagement, frische Ideen und einen
              Partner, dem Ihr Projekt wirklich wichtig ist.
            </p>
            <Link
              href="/termin"
              className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3.5 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer"
            >
              Unverbindlich kennenlernen
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
