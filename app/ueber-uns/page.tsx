import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Über NEON – Wer wir sind',
  description:
    'NEON Agentur – gegründet mit der Mission, lokale Unternehmen professionell und modern online zu bringen. Persönlich, transparent und auf Augenhöhe.',
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
      'Eine schöne Website ist schön. Aber eine Website, die Kunden bringt und professionell wirkt – das ist unser Ziel.',
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
              NEON Agentur ist mehr als ein Dienstleister. Wir sind ein Partner – für lokale
              Unternehmen, die modern auftreten und online wachsen wollen.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-pad bg-off-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Overlapping card layout */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-0">
            {/* Photo */}
            <div className="w-56 h-56 md:w-64 md:h-72 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl">
              <Image
                src="/yasin.png"
                alt="Yasin Tepe – Gründer von NEON Agentur"
                width={320}
                height={400}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>

            {/* Text card overlapping */}
            <div className="md:ml-[-32px] md:mt-8 z-10 bg-white rounded-2xl shadow-xl border border-border-light p-7 md:p-8 max-w-xl w-full">
              <h2 className="text-4xl md:text-5xl font-bold text-text-dark leading-tight tracking-tight mb-6 text-balance">
                Hi, ich bin Yasin –{' '}
                <span className="text-neon-dim">Gründer von NEON.</span>
              </h2>
              <div className="space-y-4 text-text-muted text-base leading-relaxed mb-8">
                <p>
                  NEON Agentur habe ich mit einer klaren Überzeugung gegründet: Jedes lokale
                  Unternehmen – unabhängig von Größe oder Branche – verdient einen professionellen,
                  zeitgemäßen Online-Auftritt.
                </p>
                <p>
                  Was mich täglich antreibt: Ich begegne Unternehmern, die in ihrem Fachgebiet
                  exzellent sind – online jedoch kaum wahrgenommen werden. Genau das möchte ich
                  ändern. Mit Websites, die nachhaltig wirken und von echter Betreuung begleitet
                  werden.
                </p>
                <p>
                  Mein Anspruch ist dabei klar definiert: Keine Fachbegriffe, keine versteckten
                  Kosten, kein anonymer Support. Sie erhalten mich als persönlichen
                  Ansprechpartner – jemanden, der Ihr Projekt von Anfang an begleitet, tiefgehend
                  versteht und mit konsequentem Engagement betreut.
                </p>
                <p>
                  NEON steht für einen modernen, ambitionierten Ansatz. Das ist unser Vorteil für
                  Sie: aktuelle Methoden, klare Strukturen und ein konsequenter Fokus auf
                  messbare Ergebnisse.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 mb-8">
                {['Modern', 'Persönlich', 'Transparent', 'Engagiert', 'Lokal'].map((val) => (
                  <span key={val} className="bg-warm-gray border border-border-light text-text-dark text-sm font-medium px-3.5 py-1.5 rounded-full">
                    {val}
                  </span>
                ))}
              </div>

              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3.5 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer"
              >
                Gespräch starten
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad bg-dark-bg py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-neon/60 text-sm font-semibold uppercase tracking-widest mb-4">
              Unsere Mission
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-off-white leading-tight tracking-tight mb-5 text-balance">
              Lokale Unternehmen online stark machen.
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Wir wollen die erste Anlaufstelle für lokale Unternehmen sein, wenn es um einen
              professionellen, modernen Online-Auftritt geht – persönlich, vertrauenswürdig und
              ergebnisorientiert.
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
              href="/kontakt"
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
