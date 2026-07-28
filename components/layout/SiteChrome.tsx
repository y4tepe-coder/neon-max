'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { CalendlyBadge } from '@/components/ui/calendly-badge'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isDigitalProfile = pathname.startsWith('/v/')
  const isNfcProduct = pathname === '/nfc-visitenkarte'

  if (isDigitalProfile) {
    return <main>{children}</main>
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
      {!isNfcProduct && <CalendlyBadge />}
    </>
  )
}
