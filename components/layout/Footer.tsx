import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = [
  {
    title: 'Leistungen',
    links: [
      { href: '/leistungen',                 label: 'Alle Leistungen' },
      { href: '/leistungen#websites',         label: 'Websites' },
      { href: '/leistungen#automatisierung',  label: 'System-Automatisierung' },
      { href: '/leistungen#ki-integration',   label: 'KI-Integration' },
      { href: '/leistungen#chatbot',          label: 'Chatbot & Voice' },
    ],
  },
  {
    title: 'Agentur',
    links: [
      { href: '/ueber-uns',     label: 'Über NEON' },
      { href: '/#zeit-sparen',  label: 'Wo KI Zeit spart' },
      { href: '/termin',        label: 'Kostenlose Analyse' },
      { href: '/kontakt',       label: 'Kontakt' },
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      { href: '/impressum',   label: 'Impressum' },
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
              <span className="text-xs font-semibold uppercase tracking-widest text-neon/50 ml-1">BW</span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs mb-6">
              Websites mit KI im Hintergrund – aus Baden-Württemberg, persönlich,
              Festpreis und DSGVO-konform.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@neon-bw.de"
                className="flex items-center gap-2.5 text-white/55 hover:text-neon transition-colors duration-200 text-sm cursor-pointer"
              >
                <Mail size={15} />
                hello@neon-bw.de
              </a>
              <a
                href="tel:+4917620170133"
                className="flex items-center gap-2.5 text-white/55 hover:text-neon transition-colors duration-200 text-sm cursor-pointer"
              >
                <Phone size={15} />
                0176 20 17 01 33
              </a>
              <div className="flex items-center gap-2.5 text-white/55 text-sm">
                <MapPin size={15} />
                Region Stuttgart, Baden-Württemberg
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-4">
                {group.title}
              </p>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 hover:text-white transition-colors duration-200"
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
          <p className="text-white/35 text-sm">
            © {new Date().getFullYear()} NEON Webdesign & KI. Alle Rechte vorbehalten.
          </p>
          <p className="text-white/25 text-sm">neon-bw.de</p>
        </div>
      </div>
    </footer>
  )
}
