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
        source: '/blog/:slug',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
