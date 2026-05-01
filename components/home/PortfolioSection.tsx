'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'

type Project = {
  id: number
  name: string
  category: string
  description: string
  tags: string[]
  href: string
}

const projects: Project[] = [
  {
    id: 1,
    name: 'EnVT Energieberatung',
    category: 'Energieberatung',
    description:
      'DENA-gelistete Energieberatung mit Calendly-Terminbuchung, Energiespar-Rechner und DSGVO-konformem Anfrageformular für Sanierungsfahrpläne und Förderanträge.',
    tags: ['Website', 'Terminbuchung', 'Energie-Rechner'],
    href: 'https://lavender-oryx-218223.hostingersite.com',
  },
]

export default function PortfolioSection() {
  const [index, setIndex] = useState(0)
  const project = projects[index]
  const hasMultiple = projects.length > 1

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length)
  const next = () => setIndex((i) => (i + 1) % projects.length)

  return (
    <section className="bg-warm-gray py-24 md:py-32" aria-labelledby="portfolio-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ContainerScroll
          titleComponent={
            <div className="text-left max-w-3xl mx-auto">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-neon-dim mb-4">
                Projekte & Demos
              </span>
              <h2
                id="portfolio-heading"
                className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-dark leading-tight mb-5"
              >
                Live-Projekte aus echter Praxis.
              </h2>
              <p className="text-text-muted text-base md:text-lg leading-relaxed">
                Echte Websites, die heute online sind – direkt im Fenster unten
                live ladbar. Weitere Projekte kommen Stück für Stück dazu.
              </p>
            </div>
          }
        >
          {/* Browser-Chrome */}
          <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-zinc-800 border-b border-zinc-700">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <div className="ml-3 flex-1 h-6 rounded-md bg-zinc-700/60 flex items-center px-3">
              <span className="text-[10px] md:text-xs text-zinc-300 font-mono tracking-wide truncate">
                {project.href.replace(/^https?:\/\//, '')}
              </span>
            </div>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-[10px] font-semibold text-neon hover:text-neon-dim transition-colors"
            >
              <ExternalLink size={11} />
              Öffnen
            </a>
          </div>

          {/* Live-Iframe */}
          <div className="relative h-[calc(100%-2.25rem)] md:h-[calc(100%-2.75rem)] bg-white">
            <iframe
              key={project.id}
              src={project.href}
              title={`Live-Vorschau ${project.name}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
        </ContainerScroll>

        {/* Projekt-Navigation + Meta-Karte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="-mt-8 md:-mt-16 max-w-4xl mx-auto bg-white rounded-2xl border border-border-light shadow-sm p-6 md:p-8"
        >
          <div className="flex items-start gap-4 md:gap-6">
            {/* Prev */}
            <button
              type="button"
              onClick={prev}
              disabled={!hasMultiple}
              aria-label="Vorheriges Projekt"
              className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-border-light flex items-center justify-center text-text-dark hover:bg-text-dark hover:text-off-white hover:border-text-dark transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-text-dark disabled:hover:border-border-light"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Inhalt */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-neon-dim">
                  {project.category}
                </span>
                <span className="flex items-center gap-1.5 bg-neon text-text-dark text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-dark animate-pulse" />
                  Live
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-text-dark mb-2">
                {project.name}
              </h3>
              <p className="text-text-muted text-sm md:text-base leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-warm-gray text-text-muted border border-border-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {hasMultiple && (
                <div className="flex justify-center gap-1.5 mt-5">
                  {projects.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Projekt ${i + 1}: ${p.name}`}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        i === index ? 'w-6 bg-text-dark' : 'w-1.5 bg-border-light hover:bg-text-muted'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={next}
              disabled={!hasMultiple}
              aria-label="Nächstes Projekt"
              className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-border-light flex items-center justify-center text-text-dark hover:bg-text-dark hover:text-off-white hover:border-text-dark transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-text-dark disabled:hover:border-border-light"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted text-sm mb-4">Ihr Projekt könnte hier stehen.</p>
          <a
            href="/termin"
            className="inline-flex items-center gap-2 bg-text-dark text-off-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-text-dark/80 transition-all duration-200"
          >
            30-Minuten-Gespräch buchen
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
