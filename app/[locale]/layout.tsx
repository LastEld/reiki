import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '../_components/Header'
import Footer from '../_components/Footer'
import CookieConsent from '../_components/CookieConsent'
import Analytics from '../_components/Analytics'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const localeMetadata: Record<string, { title: string; description: string; keywords: string[] }> = {
  de: {
    title: 'Reiki Behandlung Zürich | Energieheilung & innere Balance',
    description:
      'Professionelle Reiki-Sitzungen in Zürich. Zertifizierter Reiki-Praktiker hilft Ihnen, Stress abzubauen, Balance wiederherzustellen und Ihr Wohlbefinden zu fördern.',
    keywords: [
      'Reiki Zürich',
      'Reiki Behandlung',
      'Energieheilung',
      'Stressabbau',
      'ganzheitliche Gesundheit',
      'Reiki Therapie Schweiz',
    ],
  },
  fr: {
    title: 'Séance Reiki Zürich | Guérison énergétique & équilibre intérieur',
    description:
      'Séances de Reiki professionnelles à Zürich. Praticien certifié pour réduire le stress, restaurer l\'équilibre et favoriser votre bien-être.',
    keywords: [
      'Reiki Zürich',
      'séance Reiki',
      'guérison énergétique',
      'réduction du stress',
      'bien-être holistique',
      'Reiki Suisse',
    ],
  },
  en: {
    title: 'Reiki Healing Zürich | Energy Healing & Inner Balance',
    description:
      'Professional Reiki healing sessions in Zürich, Switzerland. Certified practitioner helping you release stress, restore balance, and promote wellness.',
    keywords: [
      'Reiki Zürich',
      'Reiki healing',
      'energy healing',
      'stress relief',
      'holistic wellness',
      'Reiki Switzerland',
    ],
  },
  ru: {
    title: 'Рейки Цюрих | Энергетическое исцеление и внутренний баланс',
    description:
      'Профессиональные сеансы Рейки в Цюрихе, Швейцария. Сертифицированный практик поможет снять стресс, восстановить баланс и улучшить самочувствие.',
    keywords: [
      'Рейки Цюрих',
      'сеансы Рейки',
      'энергетическое исцеление',
      'снятие стресса',
      'холистическое здоровье',
      'Рейки Швейцария',
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

  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000'

  const alternates: Record<string, string> = {}
  for (const loc of routing.locales) {
    const prefix = loc === routing.defaultLocale ? '' : `/${loc}`
    alternates[loc] = `${baseUrl}${prefix}`
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: alternates[locale],
      languages: alternates,
    },
    openGraph: {
      type: 'website',
      locale: locale,
      title: meta.title,
      description: meta.description,
      images: ['/opengraph-image.jpg'],
    },
  }
}

type Props = {
  children: React.ReactNode
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
      <Analytics />
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
    </NextIntlClientProvider>
  )
}
