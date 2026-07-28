import { getNfcProfile } from '@/lib/nfc-profiles'

interface VCardRouteContext {
  params: Promise<{
    slug: string
  }>
}

function escapeVCardValue(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
}

export async function GET(_request: Request, { params }: VCardRouteContext) {
  const { slug } = await params
  const profile = getNfcProfile(slug)

  if (!profile) {
    return new Response('Profil nicht gefunden.', {
      status: 404,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  }

  const vCard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N;CHARSET=UTF-8:${escapeVCardValue(profile.lastName)};${escapeVCardValue(profile.firstName)};;;`,
    `FN;CHARSET=UTF-8:${escapeVCardValue(profile.displayName)}`,
    `ORG;CHARSET=UTF-8:${escapeVCardValue(profile.company)}`,
    `TITLE;CHARSET=UTF-8:${escapeVCardValue(profile.role)}`,
    `TEL;TYPE=CELL:${escapeVCardValue(profile.phone.international)}`,
    `EMAIL;TYPE=INTERNET,WORK:${escapeVCardValue(profile.email)}`,
    `URL;TYPE=WORK:${escapeVCardValue(profile.website.href)}`,
    `ADR;CHARSET=UTF-8;TYPE=WORK:;;;${escapeVCardValue(profile.region)};;;Deutschland`,
    'END:VCARD',
    '',
  ].join('\r\n')

  const fileName = `${profile.slug}.vcf`

  return new Response(vCard, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Content-Disposition': `attachment; filename="${fileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
      'Content-Security-Policy': "default-src 'none'",
      'Content-Type': 'text/vcard; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  })
}
