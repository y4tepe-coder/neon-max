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
  title: 'NEON Agentur – Moderne Websites für lokale Unternehmen',
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
  ],
  authors: [{ name: 'NEON Agentur' }],
  openGraph: {
    title: 'NEON Agentur – Moderne Websites für lokale Unternehmen',
    description:
      'Wir erstellen und betreuen moderne Websites für lokale Unternehmen. Professionell, klar und persönlich.',
    type: 'website',
    locale: 'de_DE',
  },
  robots: {
    index: true,
    follow: true,
  },
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
