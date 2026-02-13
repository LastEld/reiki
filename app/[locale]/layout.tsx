import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Playfair_Display, Inter } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { practiceProfile } from '@/lib/practice'
import Header from '../_components/Header'
import Footer from '../_components/Footer'
import CookieConsent from '../_components/CookieConsent'
import Analytics from '../_components/Analytics'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const localeMetadata: Record<string, { title: string; description: string; keywords: string[] }> = {
  de: {
    title: 'Reiki in Zürich | Energetische Balance und tiefe Entspannung',
    description:
      'Professionelle Reiki-Sitzungen in Zürich für Stressabbau, innere Ruhe und mehr Wohlbefinden.',
    keywords: [
      'Reiki Zürich',
      'Reiki Behandlung',
      'Stressabbau',
      'Energiearbeit',
      'Ganzheitliche Gesundheit',
      'Reiki Schweiz',
    ],
  },
  fr: {
    title: 'Reiki à Zurich | Équilibre intérieur et détente profonde',
    description:
      'Séances professionnelles de Reiki à Zurich pour réduire le stress et retrouver votre équilibre.',
    keywords: [
      'Reiki Zurich',
      'séance Reiki',
      'guérison énergétique',
      'réduction du stress',
      'bien-être holistique',
      'Reiki Suisse',
    ],
  },
  en: {
    title: `Reiki in ${practiceProfile.contact.city} | Calm, Clarity, and Balance`,
    description:
      'Private Reiki sessions to relieve stress, calm the nervous system, and restore emotional balance.',
    keywords: [
      'Reiki Zürich',
      'Reiki session',
      'energy healing',
      'stress relief',
      'holistic wellness',
      'Reiki Switzerland',
    ],
  },
  ru: {
    title: 'Рейки в Цюрихе | Спокойствие, ясность и внутренний баланс',
    description:
      'Индивидуальные сеансы Рейки в Цюрихе для снижения стресса, восстановления энергии и эмоционального равновесия.',
    keywords: [
      'Рейки Цюрих',
      'сеанс Рейки',
      'энергетическая практика',
      'снятие стресса',
      'гармония',
      'Рейки Швейцария',
    ],
  },
  it: {
    title: 'Reiki a Zurigo | Equilibrio interiore e benessere',
    description:
      'Sessioni professionali di Reiki a Zurigo per ridurre lo stress e ristabilire l’equilibrio.',
    keywords: [
      'Reiki Zurigo',
      'sessione Reiki',
      'guarigione energetica',
      'riduzione stress',
      'benessere olistico',
      'Reiki Svizzera',
    ],
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const meta = localeMetadata[locale] || localeMetadata.de

  const baseUrl = practiceProfile.siteUrl
  const alternates: Record<string, string> = {}

  for (const loc of routing.locales) {
    const prefix = `/${loc}`
    alternates[loc] = `${baseUrl}${prefix}`
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: alternates[locale] || `${baseUrl}/`,
      languages: alternates,
    },
    openGraph: {
      type: 'website',
      locale,
      siteName: practiceProfile.businessName,
      url: alternates[locale] || `${baseUrl}/`,
      title: meta.title,
      description: meta.description,
      images: ['/opengraph-image.jpg'],
    },
  }
}

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <NextIntlClientProvider>
      <div lang={locale} className={`${playfair.variable} ${inter.variable} font-sans relative min-h-screen bg-primary-50`}>
        <Analytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </div>
    </NextIntlClientProvider>
  )
}
