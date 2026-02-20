import './global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ardha.xyz'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Ardha Yosef',
    template: '%s | Ardha Yosef',
  },
  description: 'Personal website of Ardha Yosef.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Ardha Yosef',
    description: 'Personal website of Ardha Yosef.',
    url: baseUrl,
    siteName: 'Ardha Yosef',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased max-w-xl mx-6 mt-12 lg:mx-auto">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2"
          style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}
        >
          Skip to main content
        </a>
        <main id="main-content" className="flex-auto min-w-0 mt-8 flex flex-col">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
