'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'Kanzlei Mustermann – Demo',
    category: 'Kanzlei',
    description: 'Demo-Website mit Mandantenanfrage-Formular, DSGVO-Checkbox und automatischer Weiterleitung ins Postfach.',
    tags: ['Website', 'KI-Formular', 'DSGVO'],
    demo: true,
  },
  {
    id: 2,
    name: 'Handwerk-Betrieb – Demo',
    category: 'Handwerk',
    description: 'Demo-Website mit integrierter Terminbuchung und automatischer Auftragsbestätigung per Nachricht.',
    tags: ['Website', 'Terminbuchung', 'Automatisierung'],
    demo: true,
  },
  {
    id: 3,
    name: 'Steuerberater-Kanzlei – Demo',
    category: 'Steuerberatung',
    description: 'Demo mit Mandanten-Onboarding-Flow und automatischer Dokumentenanforderung.',
    tags: ['Website', 'Onboarding', 'KI-Assistent'],
    demo: true,
  },
]

export default function PortfolioSection() {
  return (
    <section className="bg-warm-gray py-24 md:py-32">
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
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-text-dark leading-tight mb-5">
            Beispiel-Projekte und Demo-Sites
          </h2>
          <p className="text-text-muted text-lg max-w-xl leading-relaxed">
            Alle aktuellen Projekte sind Demo-Sites – so sieht die Qualität aus. Echte Kundenprojekte folgen.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-border-light hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-dark-card to-dark-bg flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-30">
                  <div className="w-16 h-1 bg-neon rounded-full" />
                  <div className="w-10 h-1 bg-neon/50 rounded-full" />
                  <div className="w-14 h-1 bg-neon/30 rounded-full" />
                </div>
                <span className="relative z-10 text-white/40 text-sm font-medium">
                  Screenshot folgt
                </span>
                {project.demo && (
                  <div className="absolute top-3 left-3">
                    <span className="flex items-center gap-1 bg-neon/20 border border-neon/40 text-neon text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Demo
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="flex items-center gap-1 bg-neon text-text-dark text-xs font-bold px-2.5 py-1 rounded-full cursor-pointer">
                    <ExternalLink size={11} />
                    Ansehen
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-neon-dim mb-2">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold text-text-dark mb-2">{project.name}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">{project.description}</p>
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
              </div>
            </motion.div>
          ))}
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
            href="/portfolio"
            className="inline-flex items-center gap-2 bg-text-dark text-off-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-text-dark/80 transition-all duration-200"
          >
            Alle Projekte ansehen
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
