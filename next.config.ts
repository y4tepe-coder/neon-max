import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: '/webdesign/:city',
        destination: '/',
        permanent: true,
      },
      {
        source: '/website-fuer/:industry',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/',
        permanent: true,
      },
      // Old removed routes → home, so existing inbound links don't 404
      { source: '/branchen',          destination: '/',          permanent: true },
      { source: '/branchen/:slug*',   destination: '/',          permanent: true },
      { source: '/preise',            destination: '/leistungen', permanent: true },
      { source: '/prozess',           destination: '/',          permanent: true },
      { source: '/portfolio',         destination: '/',          permanent: true },
      { source: '/cases',             destination: '/',          permanent: true },
      // /ueber was the old slug; canonical page lives at /ueber-uns
      { source: '/ueber',             destination: '/ueber-uns', permanent: true },
    ]
  },
}

export default nextConfig
