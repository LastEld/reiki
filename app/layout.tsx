import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from './_components/Header'
import Footer from './_components/Footer'

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
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000',
  ),
  title: {
    default: 'Reiki Healing | Find Balance and Inner Peace',
    template: '%s | Reiki Healing',
  },
  description:
    'Experience professional Reiki healing sessions with a certified practitioner. Restore balance, reduce stress, and promote wellness through gentle energy healing. Book your consultation today.',
  keywords: [
    'reiki',
    'healing',
    'energy healing',
    'wellness',
    'meditation',
    'stress relief',
    'holistic health',
  ],
  openGraph: {
    type: 'website',
    title: 'Reiki Healing | Find Balance and Inner Peace',
    description:
      'Experience professional Reiki healing sessions with a certified practitioner. Restore balance, reduce stress, and promote wellness through gentle energy healing.',
    images: ['/opengraph-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reiki Healing | Find Balance and Inner Peace',
    description:
      'Experience professional Reiki healing sessions with a certified practitioner. Restore balance, reduce stress, and promote wellness.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
