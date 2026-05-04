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
    default: 'NEON Webdesign & KI – Klare Anfragewege für lokale Betriebe',
    template: '%s – NEON Webdesign & KI',
  },
  description:
    'NEON baut Websites und digitale Anfragewege für lokale Betriebe in Baden-Württemberg. Anfragen aufnehmen, Informationen sortieren, Rückfragen vorbereiten und Termine erleichtern – Festpreis vor Start, DSGVO-konform, lokal aus Region Stuttgart / LE / Filderstadt.',
  keywords: [
    'Website Agentur Stuttgart',
    'KI Webdesign Baden-Württemberg',
    'Anfragen automatisieren Mittelstand',
    'Digitale Anfragewege',
    'Website Leinfelden-Echterdingen',
    'Website Filderstadt',
    'Zeit sparen im Betrieb',
    'KI Webagentur BW',
  ],
  authors: [{ name: 'NEON Webdesign & KI' }],
  openGraph: {
    title: 'NEON Webdesign & KI – Klare Anfragewege für lokale Betriebe',
    description:
      'Websites und digitale Anfragewege aus Baden-Württemberg. Anfragen aufnehmen, sortieren, Rückfragen vorbereiten, Termine erleichtern. Festpreis vor Start.',
    type: 'website',
    locale: 'de_DE',
    url: 'https://neon-bw.de',
    siteName: 'NEON Webdesign & KI',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'NEON Webdesign & KI – Websites und Anfragewege aus Baden-Württemberg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEON Webdesign & KI – Klare Anfragewege für lokale Betriebe',
    description:
      'Websites und digitale Anfragewege aus Baden-Württemberg. Festpreis vor Start, DSGVO-konform, persönlich erreichbar.',
    images: ['/icon-512.png'],
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
      name: 'NEON Webdesign & KI',
      url: 'https://neon-bw.de',
      email: 'hello@neon-bw.de',
      description:
        'NEON Webdesign & KI baut Websites und digitale Anfragewege für lokale Unternehmen aus Baden-Württemberg. Anfragen aufnehmen, Informationen sortieren, Rückfragen vorbereiten und Termine erleichtern – damit Inhaberinnen und Inhaber Zeit zurückbekommen.',
      knowsAbout: [
        'Website-Entwicklung',
        'Digitale Anfragewege',
        'Anfrageaufnahme',
        'Termin-Automatisierung',
        'Prozess-Automatisierung',
        'Verantwortliche KI-Nutzung',
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
      name: 'NEON Webdesign & KI',
      url: 'https://neon-bw.de',
      email: 'hello@neon-bw.de',
      description:
        'Websites und digitale Anfragewege aus Region Stuttgart / Leinfelden-Echterdingen / Filderstadt. Festpreis vor Start, DSGVO-konform, persönlich erreichbar.',
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Baden-Württemberg',
        addressCountry: 'DE',
      },
      areaServed: [
        { '@type': 'City', name: 'Stuttgart' },
        { '@type': 'City', name: 'Leinfelden-Echterdingen' },
        { '@type': 'City', name: 'Filderstadt' },
        { '@type': 'City', name: 'Esslingen' },
        { '@type': 'City', name: 'Reutlingen' },
        { '@type': 'City', name: 'Tübingen' },
        { '@type': 'State', name: 'Baden-Württemberg' },
      ],
      parentOrganization: { '@id': 'https://neon-bw.de/#organization' },
    },
    {
      '@type': 'Service',
      name: 'Website-Entwicklung',
      provider: { '@id': 'https://neon-bw.de/#organization' },
      description: 'Mobiloptimierte Website mit Local SEO und klarer Anfrageaufnahme – ab 990 € einmalig.',
      offers: { '@type': 'Offer', price: '990', priceCurrency: 'EUR' },
    },
    {
      '@type': 'Service',
      name: 'Anfragefluss-Automatisierung',
      provider: { '@id': 'https://neon-bw.de/#organization' },
      description: 'Automatisierte Geschäftsprozesse: Anfragen qualifizieren, Daten übergeben, Kunden benachrichtigen – ab 1.490 €.',
      offers: { '@type': 'Offer', price: '1490', priceCurrency: 'EUR' },
    },
    {
      '@type': 'Service',
      name: 'Ablauf-Automation',
      provider: { '@id': 'https://neon-bw.de/#organization' },
      description: 'Automatisierung und KI-Bausteine direkt in bestehende Abläufe integriert – kein Vendor-Lock-in, DSGVO-konform, ab 2.990 €.',
      offers: { '@type': 'Offer', price: '2990', priceCurrency: 'EUR' },
    },
    {
      '@type': 'Service',
      name: 'Chatbot & Telefonhilfe',
      provider: { '@id': 'https://neon-bw.de/#organization' },
      description: 'Assistent für Anfragequalifizierung, Rückfragen und Terminbuchung – ab 1.990 €.',
      offers: { '@type': 'Offer', price: '1990', priceCurrency: 'EUR' },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://neon-bw.de/#website',
      url: 'https://neon-bw.de',
      name: 'NEON Webdesign & KI',
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
