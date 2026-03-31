import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'

const footerLinks = [
  {
    title: 'Leistungen',
    links: [
      { href: '/leistungen#setup', label: 'Website-Setup' },
      { href: '/leistungen#betreuung', label: 'Website-Betreuung' },
      { href: '/leistungen#erweiterungen', label: 'Smarte Erweiterungen' },
    ],
  },
  {
    title: 'Agentur',
    links: [
      { href: '/ueber-uns', label: 'Über NEON' },
      { href: '/fuer-wen', label: 'Für wen' },
      { href: '/kontakt', label: 'Kontakt' },
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      { href: '/impressum', label: 'Impressum' },
      { href: '/datenschutz', label: 'Datenschutz' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-dark-bg text-off-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16 border-b border-dark-border">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-bold text-off-white">NEON</span>
              <span className="text-2xl font-bold text-neon">.</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Moderne Websites für lokale Unternehmen – erstellt und betreut von NEON Agentur aus Baden-Württemberg.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@neon-bw.de"
                className="flex items-center gap-2.5 text-white/50 hover:text-neon transition-colors duration-200 text-sm cursor-pointer"
              >
                <Mail size={15} />
                info@neon-bw.de
              </a>
              <div className="flex items-center gap-2.5 text-white/50 text-sm">
                <MapPin size={15} />
                Baden-Württemberg, Deutschland
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                {group.title}
              </p>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Ländle-Spruch */}
        <div className="py-8 border-b border-dark-border text-center">
          <p className="text-2xl md:text-3xl font-bold tracking-tight text-white/80">
            Gemacht mit <span className="text-neon">Herz</span> im Ländle.
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} NEON Agentur. Alle Rechte vorbehalten.
          </p>
          <p className="text-white/20 text-sm">neon-bw.de</p>
        </div>
      </div>
    </footer>
  )
}
