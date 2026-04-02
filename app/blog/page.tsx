import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { blogPosts } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: 'Blog – Webdesign Tipps & Ratgeber | NEON Agentur',
  description: 'Ratgeber, Tipps und Wissen rund um Webdesign, Websites und Online-Auftritte für lokale Unternehmen – vom NEON Agentur Blog.',
  alternates: { canonical: '/blog' },
}

const categoryColors: Record<string, string> = {
  Ratgeber: 'bg-blue-50 text-blue-600',
  Vergleich: 'bg-purple-50 text-purple-600',
  Grundlagen: 'bg-orange-50 text-orange-600',
  SEO: 'bg-green-50 text-green-700',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPage() {
  return (
    <>
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
              <span className="text-white/70 text-sm font-medium">NEON Agentur · Blog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-off-white leading-[1.1] tracking-tight mb-6">
              Blog –{' '}
              <span className="text-neon">Wissen für lokale Unternehmen.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/55 leading-relaxed max-w-2xl">
              Ehrliche Ratgeber, praktische Tipps und fundiertes Wissen rund um Websites,
              Webdesign und Online-Sichtbarkeit – für Inhaber lokaler Betriebe, die verstehen wollen, was wirklich zählt.
            </p>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="section-pad bg-warm-gray" aria-label="Blog-Artikel">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-border-light p-7 flex flex-col card-hover"
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${
                      categoryColors[post.category] ?? 'bg-warm-gray text-text-muted'
                    }`}
                  >
                    <Tag size={11} className="inline mr-1.5 -mt-0.5" aria-hidden="true" />
                    {post.category}
                  </span>
                  <span className="text-text-muted text-xs flex items-center gap-1.5">
                    <Clock size={12} aria-hidden="true" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-text-dark font-bold text-lg leading-snug mb-3 group-hover:text-neon-dim transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted text-xs">{formatDate(post.date)}</span>
                  <span className="inline-flex items-center gap-1.5 text-neon-dim text-sm font-semibold group-hover:gap-2.5 transition-all duration-200">
                    Lesen
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-dark-bg overflow-hidden relative" aria-label="Kontakt">
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
            Bereit für Ihre neue Website?
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Theorie ist gut – Umsetzung ist besser. Lassen Sie uns gemeinsam Ihren Online-Auftritt auf das nächste Level bringen.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center gap-2 bg-neon text-text-dark font-semibold px-8 py-4 rounded-full hover:bg-neon-dim transition-all duration-200 cursor-pointer text-base"
          >
            Kostenloses Erstgespräch vereinbaren
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
