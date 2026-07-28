export interface NfcProfile {
  slug: string
  firstName: string
  lastName: string
  displayName: string
  initials: string
  role: string
  company: string
  bio: string
  email: string
  phone: {
    display: string
    international: string
  }
  website: {
    label: string
    href: string
  }
  whatsappHref: string
  region: string
  profileImage?: string
  coverImage: string
}

export const nfcProfiles = {
  'yasin-tepe': {
    slug: 'yasin-tepe',
    firstName: 'Yasin',
    lastName: 'Tepe',
    displayName: 'Yasin Tepe',
    initials: 'YT',
    role: 'Gründer',
    company: 'NEON BW',
    bio: 'Websites, digitale Anfragewege und NFC-Visitenkarten für Unternehmen in Baden-Württemberg.',
    email: 'hello@neon-bw.de',
    phone: {
      display: '+49 176 20170133',
      international: '+4917620170133',
    },
    website: {
      label: 'neon-bw.de',
      href: 'https://neon-bw.de',
    },
    whatsappHref: 'https://wa.me/4917620170133',
    region: 'Region Stuttgart',
    profileImage: undefined,
    coverImage: '/ueber-hero.jpg',
  },
} satisfies Record<string, NfcProfile>

export type NfcProfileSlug = keyof typeof nfcProfiles

export function getNfcProfile(slug: string): NfcProfile | undefined {
  if (!Object.prototype.hasOwnProperty.call(nfcProfiles, slug)) {
    return undefined
  }

  return nfcProfiles[slug as NfcProfileSlug]
}
