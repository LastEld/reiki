import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { practiceProfile } from '@/lib/practice'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700', '900'],
})

export const metadata: Metadata = {
  metadataBase: new URL(practiceProfile.siteUrl),
  title: {
    default: `${practiceProfile.businessName} | Reiki in ${practiceProfile.contact.city}`,
    template: '%s | Reiki Healing',
  },
  description: `Professional Reiki sessions in ${practiceProfile.contact.city}, ${practiceProfile.contact.country}.`,
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
      <body className={`${inter.variable} ${playfairDisplay.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
