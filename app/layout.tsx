import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CalendlyBadge } from '@/components/ui/calendly-badge'
import { ScrollProgress } from '@/components/ui/scroll-progress'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://neon-bw.de'),
  title: {
    default: 'NEON Agentur – Moderne Websites für lokale Unternehmen',
    template: '%s | NEON Agentur',
  },
  description:
    'NEON Agentur gestaltet professionelle, moderne Websites für lokale Unternehmen – inklusive laufender Betreuung. Einfach, klar und auf Augenhöhe.',
  keywords: [
    'Webdesign',
    'Website Erstellung',
    'Website Betreuung',
    'Baden-Württemberg',
    'lokale Unternehmen',
    'Agentur',
    'moderne Website',
    'Webdesign Agentur',
  ],
  authors: [{ name: 'NEON Agentur' }],
  openGraph: {
    title: 'NEON Agentur – Moderne Websites für lokale Unternehmen',
    description:
      'Wir erstellen und betreuen moderne Websites für lokale Unternehmen. Professionell, klar und persönlich.',
    type: 'website',
    locale: 'de_DE',
    url: 'https://neon-bw.de',
    siteName: 'NEON Agentur',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: '/',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://neon-bw.de/#organization',
      name: 'NEON Agentur',
      url: 'https://neon-bw.de',
      email: 'info@neon-bw.de',
      description:
        'NEON Agentur gestaltet professionelle, moderne Websites für lokale Unternehmen in Baden-Württemberg.',
      areaServed: {
        '@type': 'State',
        name: 'Baden-Württemberg',
      },
      founder: {
        '@type': 'Person',
        name: 'Yasin Tepe',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://neon-bw.de/#localbusiness',
      name: 'NEON Agentur',
      url: 'https://neon-bw.de',
      email: 'info@neon-bw.de',
      description:
        'Webdesign und Website-Erstellung für lokale Unternehmen in Baden-Württemberg. Modernes Design, laufende Betreuung, faire Preise.',
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Baden-Württemberg',
        addressCountry: 'DE',
      },
      areaServed: [
        { '@type': 'City', name: 'Stuttgart' },
        { '@type': 'City', name: 'Heilbronn' },
        { '@type': 'City', name: 'Karlsruhe' },
        { '@type': 'City', name: 'Mannheim' },
        { '@type': 'City', name: 'Tübingen' },
        { '@type': 'City', name: 'Reutlingen' },
        { '@type': 'State', name: 'Baden-Württemberg' },
      ],
      knowsAbout: ['Webdesign', 'Website Erstellung', 'Website Betreuung'],
      parentOrganization: { '@id': 'https://neon-bw.de/#organization' },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://neon-bw.de/#website',
      url: 'https://neon-bw.de',
      name: 'NEON Agentur',
      publisher: { '@id': 'https://neon-bw.de/#organization' },
      inLanguage: 'de-DE',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={dmSans.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://assets.calendly.com/assets/external/widget.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CalendlyBadge />
      </body>
    </html>
  )
}
