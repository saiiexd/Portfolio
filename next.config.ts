import path from 'path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Use standalone output for optimised deployment
  // output: 'export', // Uncomment for fully static export to Vercel/Netlify

  // Image optimisation
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  // Strict mode for catching issues early
  reactStrictMode: true,

  // SCSS support — includePaths allows @use 'tokens' (no relative path) from anywhere
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
