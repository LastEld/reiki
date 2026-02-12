import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000',
  ),
  title: {
    default: 'Reiki Healing Zürich | Reiki Behandlung Schweiz',
    template: '%s | Reiki Healing',
  },
  description:
    'Professional Reiki healing sessions in Zürich, Switzerland. Certified practitioner for stress relief, energy healing, and holistic wellness.',
  twitter: {
    card: 'summary_large_image',
  },
}

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
