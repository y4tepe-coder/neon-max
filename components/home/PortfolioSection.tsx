'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'

type Project = {
  id: number
  name: string
  category: string
  description: string
  tags: string[]
  demo: boolean
  href?: string
  /** subtle, code-native mockup colors – per project for variety */
  accent: { from: string; to: string; hint: string }
}

const projects: Project[] = [
  {
    id: 1,
    name: 'EnVT Energieberatung',
    category: 'Energieberatung',
    description:
      'DENA-gelistete Energieberatung mit Calendly-Terminbuchung, Energiespar-Rechner und DSGVO-konformem Anfrageformular für Sanierungsfahrpläne und Förderanträge.',
    tags: ['Website', 'Terminbuchung', 'Energie-Rechner'],
    demo: false,
    href: 'https://lavender-oryx-218223.hostingersite.com',
    accent: { from: '#0e2a18', to: '#0a1a0f', hint: '#7BCBA0' },
  },
  {
    id: 2,
    name: 'Kanzlei Mustermann',
    category: 'Kanzlei',
    description:
      'Demo: Mandantenanfrage mit DSGVO-Checkbox, automatischer Eingangsbestätigung und sortierter Übergabe ins Postfach.',
    tags: ['Anfrage', 'DSGVO', 'Übergabe'],
    demo: true,
    accent: { from: '#1a1c2e', to: '#0e1020', hint: '#A4B4F5' },
  },
  {
    id: 3,
    name: 'Handwerks-Betrieb',
    category: 'Handwerk',
    description:
      'Demo: Terminanfrage über die Website, Rückfrage automatisch vorbereitet, Bestätigung und Erinnerung laufen im Hintergrund.',
    tags: ['Termin', 'Erinnerung', 'Routine'],
    demo: true,
    accent: { from: '#2a1d10', to: '#1c130a', hint: '#F0B97D' },
  },
  {
    id: 4,
    name: 'Steuerberater-Kanzlei',
    category: 'Steuerberatung',
    description:
      'Demo: Mandanten-Onboarding über klare Formulare, automatische Dokumenten-Checkliste und sortierte Ablage je Mandat.',
    tags: ['Onboarding', 'Sortierung', 'Vorlagen'],
    demo: true,
    accent: { from: '#1f1426', to: '#130a18', hint: '#C5A6E8' },
  },
]

function ProjectMockup({ project }: { project: Project }) {
  const { accent, name, demo } = project

  return (
    <div
      className="relative aspect-video overflow-hidden flex items-end p-5"
      style={{
        background: `linear-gradient(135deg, ${accent.from} 0%, ${accent.to} 100%)`,
      }}
      aria-hidden="true"
    >
      {/* Faux browser chrome */}
      <div className="absolute top-3 left-3 right-3 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <div className="ml-3 flex-1 h-5 rounded-md bg-white/[0.06] flex items-center px-2.5">
          <span className="text-[9px] text-white/35 font-mono tracking-wide truncate">
            {project.href?.replace(/^https?:\/\//, '') ?? `${name.toLowerCase().replace(/\s+/g, '-')}.demo`}
          </span>
        </div>
      </div>

      {/* Layout skeleton */}
      <div className="absolute inset-x-5 top-12 bottom-16 flex flex-col gap-3">
        <div className="h-2 rounded-full bg-white/15 w-1/2" />
        <div className="h-2 rounded-full bg-white/10 w-2/3" />
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="h-10 rounded-lg bg-white/[0.06]" />
          <div className="h-10 rounded-lg bg-white/[0.06]" />
          <div className="h-10 rounded-lg bg-white/[0.06]" />
        </div>
      </div>

      {/* Action chip in mockup */}
      <div
        className="absolute bottom-4 left-5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
        style={{
          background: `${accent.hint}26`,
          color: accent.hint,
          border: `1px solid ${accent.hint}40`,
        }}
      >
        <span className="w-1 h-1 rounded-full" style={{ background: accent.hint }} />
        {demo ? 'Demo-Layout' : 'Live-System'}
      </div>

      {/* Status badge top-right (live vs demo) */}
      <div className="absolute top-3 right-3">
        {demo ? (
          <span className="bg-neon/15 border border-neon/40 text-neon text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Demo
          </span>
        ) : (
          <span className="flex items-center gap-1 bg-neon text-text-dark text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-text-dark animate-pulse" />
            Live
          </span>
        )}
      </div>
    </div>
  )
}

export default function PortfolioSection() {
  return (
    <section className="bg-warm-gray py-24 md:py-32" aria-labelledby="portfolio-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-neon-dim mb-4">
            Projekte & Demos
          </span>
          <h2
            id="portfolio-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-text-dark leading-tight mb-5"
          >
            Ein Live-Projekt. Drei klar gekennzeichnete Demos.
          </h2>
          <p className="text-text-muted text-lg max-w-xl leading-relaxed">
            Demos zeigen die Bauweise – nicht erfundene Kunden. Echte Projekte
            kommen Stück für Stück dazu.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const CardTag = project.href ? motion.a : motion.div
            const linkProps = project.href
              ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
              : {}
            return (
              <CardTag
                key={project.id}
                {...linkProps}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                className={`group block bg-white rounded-2xl overflow-hidden border border-border-light transition-all duration-300 ${
                  project.href
                    ? 'hover:border-neon/60 hover:shadow-[0_20px_50px_-12px_rgba(200,255,0,0.35)] hover:-translate-y-1 cursor-pointer'
                    : 'hover:border-border-light/80'
                }`}
              >
                <ProjectMockup project={project} />

                {/* Hover overlay link icon (only on real link cards) */}
                {project.href && (
                  <div className="relative">
                    <div className="absolute -top-12 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="flex items-center gap-1 bg-neon text-text-dark text-xs font-bold px-2.5 py-1 rounded-full">
                        <ExternalLink size={11} />
                        Ansehen
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-neon-dim mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-text-dark mb-2 group-hover:text-neon-dim transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-warm-gray text-text-muted border border-border-light group-hover:bg-neon/10 group-hover:border-neon/30 group-hover:text-neon-dim transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardTag>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
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
