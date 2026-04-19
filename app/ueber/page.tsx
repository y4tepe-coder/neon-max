import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Über NEON BW — KI-Agentur Stuttgart & BW',
  description:
    'NEON BW: KI-Automation und Websites aus Baden-Württemberg. Gegründet mit der Mission, KMU und lokalen Betrieben echte KI-Systeme zugänglich zu machen.',
  alternates: {
    canonical: '/ueber',
  },
}

const values = [
  {
    title: 'Klarheit über alles',
    description:
      'Keine Fachbegriffe, kein Wirrwarr, keine versteckten Kosten. Wir kommunizieren klar und ehrlich – immer.',
  },
  {
    title: 'Ergebnisse statt Features',
    description:
      'Wir bauen, was wirkt – nicht was beeindruckt. KI ist das Werkzeug, Ihr Betrieb ist das Ziel.',
  },
  {
    title: 'DSGVO by default',
    description:
      'Self-hosted, Server in Deutschland, ohne Wenn und Aber. Datenschutz ist keine Option – er ist Standard.',
  },
  {
    title: 'Langfristige Partnerschaft',
    description:
      'Keine einmalige Transaktion. Wir bleiben an Ihrer Seite – mit Monitoring, Updates und persönlichem Ansprechpartner.',
  },
]

export default function UeberPage() {
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
              Hinter NEON BW steckt{' '}
              <span className="text-neon">echte Überzeugung.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
              NEON BW ist eine KI-Agentur für KMU und lokale Betriebe in Baden-Württemberg.
              Kein Buzzword-Bingo, kein Paket von der Stange – nur was wirklich hilft.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-pad bg-off-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            {/* Photo */}
            <div className="relative flex-shrink-0 mx-auto lg:mx-0">
              <div className="w-64 md:w-80 rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                <Image
                  src="/yasin.png"
                  alt="Yasin Tepe – Gründer von NEON BW"
                  width={400}
                  height={533}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl px-4 py-3 shadow-lg border border-border-light">
                <p className="text-xs text-text-muted font-medium">Gegründet in</p>
                <p className="text-text-dark font-bold text-sm">Baden-Württemberg</p>
                <div className="mt-1.5 w-full h-0.5 bg-neon rounded-full" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 pt-2">
              <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-3">
                Zur Person
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark leading-tight tracking-tight mb-1">
                Yasin Tepe
              </h2>
              <p className="text-neon-dim font-semibold text-base mb-6">Gründer von NEON BW</p>

              <div className="space-y-4 text-text-muted text-base leading-relaxed mb-6 max-w-xl">
                <p>
                  NEON BW habe ich gegründet, weil ich täglich Betriebe erlebe, die in ihrem
                  Fachgebiet exzellent sind – aber digitale Abläufe haben, die Zeit und Geld kosten.
                </p>
                <p>
                  KI-Systeme sollten nicht nur Großkonzernen vorbehalten sein.
                  Wir machen sie zugänglich – verständlich erklärt, DSGVO-konform umgesetzt,
                  mit Festpreis und persönlichem Ansprechpartner.
                </p>
                <p>
                  KI ist das Werkzeug. Ergebnisse sind das Ziel.
                  Kein Technik-Bingo, kein Angebot von der Stange – nur was wirklich hilft.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {['KI-Strategie', 'Prozessdenken', 'Festpreis', 'Lokal in BW'].map((val) => (
                  <span key={val} className="bg-warm-gray border border-border-light text-text-dark text-xs font-medium px-3 py-1.5 rounded-full">
                    {val}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer text-sm"
                >
                  Gespräch starten
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  href="#mission"
                  className="inline-flex items-center gap-2 text-text-muted font-medium hover:text-text-dark transition-colors duration-200 cursor-pointer group text-sm py-3"
                >
                  Mehr über NEON BW
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
              KI-Systeme für Betriebe, die keine KI-Abteilung haben.
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Wir wollen die erste Anlaufstelle für KMU und lokale Betriebe in BW sein, wenn es
              um KI-Automation geht – persönlich, DSGVO-konform, mit Festpreis und ohne
              Vendor-Lock-in.
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

      {/* Approach */}
      <section className="section-pad bg-warm-gray py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-neon-dim text-sm font-semibold uppercase tracking-widest mb-4">
              Unser Ansatz
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark leading-tight tracking-tight mb-6 text-balance">
              Analyse zuerst. Dann Empfehlung. Dann Festpreis.
            </h2>
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              Wir bauen kein Paket von der Stange. Wir verstehen zuerst, was Ihr Betrieb
              braucht – und empfehlen dann, was wirklich hilft.
            </p>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              Kein Overrun, kein Überraschungs-Invoice. Was vereinbart ist, wird gebaut –
              zum Preis, der vereinbart ist.
            </p>
            <Link
              href="/prozess"
              className="inline-flex items-center gap-2 bg-neon text-text-dark font-semibold px-6 py-3.5 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer"
            >
              Unser Prozess im Detail
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
