'use client'

const items = [
  'Klare Websites',
  'Anfragen sauber aufnehmen',
  'Informationen vorsortieren',
  'Rückfragen vorbereiten',
  'Termine ohne Hin und Her',
  'Weniger manuelle Nacharbeit',
  'KI nur, wo sie hilft',
  'Lokal in BW',
  'DSGVO & self-hosted',
  'Server in Deutschland',
  'Festpreis vor Start',
  'Persönlich erreichbar',
  '30-Minuten-Analyse',
  'Region Stuttgart · LE · Filderstadt',
]

export function MarqueeBanner() {
  return (
    <div className="relative bg-neon overflow-hidden py-3.5" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {/* Render twice for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 text-text-dark font-semibold text-sm uppercase tracking-widest whitespace-nowrap"
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-text-dark/30 shrink-0" />
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>
    </div>
  )
}
