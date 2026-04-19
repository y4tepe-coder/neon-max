'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/branchen',   label: 'Branchen' },
  { href: '/portfolio',  label: 'Portfolio' },
  { href: '/preise',     label: 'Preise' },
  { href: '/ueber',      label: 'Über NEON' },
  { href: '/kontakt',    label: 'Kontakt' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)
      // Switch from dark to light nav after hero section (~100vh)
      setIsDark(scrollY < window.innerHeight * 0.7)
    }

    // Set initial dark state based on page
    const isHomePage = pathname === '/'
    setIsDark(isHomePage && window.scrollY < window.innerHeight * 0.7)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // On non-home pages, always show light nav
  const isHome = pathname === '/'
  const showDark = isHome && isDark && !isScrolled

  return (
    <>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border-light'
            : showDark
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border-light'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-1 group"
              aria-label="NEON BW KI-Agentur – Startseite"
            >
              <span
                className={`text-[26px] font-black tracking-tight leading-none transition-colors duration-300 ${
                  showDark ? 'text-off-white' : 'text-text-dark'
                }`}
              >
                NEON
              </span>
              <span className="text-[26px] font-black tracking-tight leading-none text-neon">.</span>
              <div className="flex flex-col ml-1.5">
                <span
                  className={`text-[10px] font-bold uppercase tracking-[0.15em] leading-none transition-colors duration-300 ${
                    showDark ? 'text-neon/70' : 'text-neon-dim'
                  }`}
                >
                  KI-Agentur
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.12em] leading-none mt-0.5 transition-colors duration-300 ${
                    showDark ? 'text-white/35' : 'text-text-muted/50'
                  }`}
                >
                  BW
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Hauptnavigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? 'text-neon'
                      : showDark
                      ? 'text-white/70 hover:text-white'
                      : 'text-text-muted hover:text-text-dark'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+4917620170133"
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                  showDark ? 'text-white/70 hover:text-white' : 'text-text-muted hover:text-text-dark'
                }`}
                aria-label="Jetzt anrufen"
              >
                <Phone size={15} />
                0176 20 17 01 33
              </a>
              <Link
                href="/kontakt"
                className="bg-neon text-text-dark text-sm font-semibold px-5 py-2.5 rounded-full
                           hover:bg-neon-dim transition-all duration-200 cursor-pointer"
              >
                Bedarfsanalyse starten
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                showDark
                  ? 'text-white/70 hover:text-white hover:bg-white/10'
                  : 'text-text-muted hover:text-text-dark hover:bg-warm-gray'
              }`}
              aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-border-light shadow-lg md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium py-2 border-b border-border-light/50 transition-colors duration-200 ${
                    pathname === link.href ? 'text-neon' : 'text-text-muted hover:text-text-dark'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+4917620170133"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-base font-medium py-2 border-b border-border-light/50 text-text-muted hover:text-text-dark transition-colors duration-200"
              >
                <Phone size={17} />
                0176 20 17 01 33
              </a>
              <Link
                href="/kontakt"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 w-full text-center bg-neon text-text-dark font-semibold px-6 py-3 rounded-full
                           hover:bg-neon-dim transition-all duration-200 cursor-pointer"
              >
                Bedarfsanalyse starten
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
