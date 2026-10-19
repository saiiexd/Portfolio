import type { Metadata, Viewport } from 'next'
import { Syne, Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.scss'
import { SITE_CONFIG } from '@/lib/constants'
import Navigation from '@/components/organisms/Navigation/Navigation'
import Footer from '@/components/organisms/Footer/Footer'
import PageTransition from '@/components/providers/PageTransition'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import CustomCursor from '@/components/atoms/CustomCursor/CustomCursor'
import StudioPreloader from '@/components/molecules/StudioPreloader/StudioPreloader'

// ── Fonts ─────────────────────────────────────────────────────────────────────

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.author,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
}

export const viewport: Viewport = {
  themeColor: '#111111',
  colorScheme: 'light dark',
}

// ── Root Layout ────────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* Minimal Studio Preloader */}
        <StudioPreloader />

        {/* Dynamic Context Cursor */}
        <CustomCursor />

        {/* Skip to main content — accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <SmoothScrollProvider>
          <Navigation />

          <PageTransition>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </PageTransition>

          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
