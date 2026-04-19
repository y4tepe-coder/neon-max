import type { Metadata } from 'next'
import { DM_Sans, Caveat } from 'next/font/google'
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

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://neon-bw.de'),
  title: {
    default: 'NEON BW — KI-Agentur für KMU in Baden-Württemberg',
    template: '%s — Neon BW · KI-Agentur Stuttgart & BW',
  },
  description:
    'KI-Automation und Websites aus Baden-Württemberg. Wir analysieren Ihre Abläufe und bauen Systeme, die Routine übernehmen, Anfragen qualifizieren und Termine organisieren. Festpreis. DSGVO-konform.',
  keywords: [
    'KI Agentur Stuttgart',
    'KI Agentur BW',
    'Prozessautomatisierung Handwerk',
    'KI Beratung Mittelstand',
    'KI Automatisierung Baden-Württemberg',
    'Chatbot Handwerk',
    'KI Integration Steuerberater',
    'Automatisierung Kanzlei',
  ],
  authors: [{ name: 'NEON BW' }],
  openGraph: {
    title: 'NEON BW — KI-Agentur für KMU in Baden-Württemberg',
    description:
      'KI-Automation und Websites aus BW. Festpreis, DSGVO-konform, persönlicher Ansprechpartner. Kostenlose Bedarfsanalyse.',
    type: 'website',
    locale: 'de_DE',
    url: 'https://neon-bw.de',
    siteName: 'NEON BW',
    images: [
      {
        url: '/yasin.png',
        width: 1200,
        height: 630,
        alt: 'NEON BW – KI-Agentur für lokale Unternehmen in Baden-Württemberg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEON BW — KI-Agentur für KMU in Baden-Württemberg',
    description:
      'KI-Automation und Websites aus BW. Festpreis, DSGVO-konform, persönlicher Ansprechpartner.',
    images: ['/yasin.png'],
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
      name: 'NEON BW',
      url: 'https://neon-bw.de',
      email: 'info@neon-bw.de',
      description:
        'NEON BW ist eine KI-Agentur aus Baden-Württemberg. Wir automatisieren Geschäftsprozesse und bauen KI-Systeme für KMU, Handwerk, Kanzleien und Steuerberater.',
      knowsAbout: [
        'KI-Automatisierung',
        'Prozessautomatisierung',
        'KI-Integration',
        'Chatbot-Entwicklung',
        'Voice-Agent',
        'Website-Entwicklung',
        'Local SEO',
      ],
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
      name: 'NEON BW',
      url: 'https://neon-bw.de',
      email: 'info@neon-bw.de',
      description:
        'KI-Agentur aus Baden-Württemberg. Websites ab 499 €, System-Automatisierung ab 1.490 €, KI-Integration ab 2.990 €, Chatbot & Voice-Agent ab 1.990 €. Festpreis, DSGVO-konform.',
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
      parentOrganization: { '@id': 'https://neon-bw.de/#organization' },
    },
    {
      '@type': 'Service',
      name: 'Website-Entwicklung',
      provider: { '@id': 'https://neon-bw.de/#organization' },
      description: 'Mobiloptimierte Website mit Local SEO – ab 499 € einmalig.',
      offers: { '@type': 'Offer', price: '499', priceCurrency: 'EUR' },
    },
    {
      '@type': 'Service',
      name: 'System-Automatisierung',
      provider: { '@id': 'https://neon-bw.de/#organization' },
      description: 'Automatisierte Geschäftsprozesse: Anfragen qualifizieren, Daten übergeben, Kunden benachrichtigen – ab 1.490 €.',
      offers: { '@type': 'Offer', price: '1490', priceCurrency: 'EUR' },
    },
    {
      '@type': 'Service',
      name: 'Custom KI-Integration',
      provider: { '@id': 'https://neon-bw.de/#organization' },
      description: 'KI direkt in bestehende Abläufe integriert – kein Vendor-Lock-in, DSGVO-konform, ab 2.990 €.',
      offers: { '@type': 'Offer', price: '2990', priceCurrency: 'EUR' },
    },
    {
      '@type': 'Service',
      name: 'KI-Chatbot & Voice-Agent',
      provider: { '@id': 'https://neon-bw.de/#organization' },
      description: 'KI-Assistent für 24/7-Anfragenqualifizierung und Terminbuchung – ab 1.990 €.',
      offers: { '@type': 'Offer', price: '1990', priceCurrency: 'EUR' },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://neon-bw.de/#website',
      url: 'https://neon-bw.de',
      name: 'NEON BW',
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
    <html lang="de" className={`${dmSans.variable} ${caveat.variable}`}>
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
