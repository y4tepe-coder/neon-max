import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import DigitalProfile from '@/components/nfc/DigitalProfile'
import { getNfcProfile, nfcProfiles } from '@/lib/nfc-profiles'

interface DigitalProfilePageProps {
  params: Promise<{
    slug: string
  }>
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#172019',
}

export function generateStaticParams() {
  return Object.keys(nfcProfiles).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: DigitalProfilePageProps): Promise<Metadata> {
  const { slug } = await params
  const profile = getNfcProfile(slug)

  if (!profile) {
    return {
      title: 'Profil nicht gefunden',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: `${profile.displayName} – ${profile.company}`,
    description: `${profile.role} bei ${profile.company}. Direkte Kontaktdaten und digitale Visitenkarte.`,
    alternates: {
      canonical: `/v/${profile.slug}`,
    },
    robots: {
      index: false,
      follow: false,
      noarchive: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
    openGraph: {
      title: `${profile.displayName} – ${profile.company}`,
      description: `${profile.role} bei ${profile.company}`,
      type: 'profile',
      locale: 'de_DE',
      url: `/v/${profile.slug}`,
      images: [
        {
          url: profile.coverImage,
          alt: `${profile.company} – digitale Visitenkarte`,
        },
      ],
    },
  }
}

export default async function DigitalProfilePage({
  params,
}: DigitalProfilePageProps) {
  const { slug } = await params
  const profile = getNfcProfile(slug)

  if (!profile) {
    notFound()
  }

  return <DigitalProfile profile={profile} />
}
