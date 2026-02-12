import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000'

  const pages = ['', '/impressum', '/privacy']

  const entries: MetadataRoute.Sitemap = []

  for (const page of pages) {
    const alternates: Record<string, string> = {}
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
      alternates[locale] = `${baseUrl}${prefix}${page}`
    }

    entries.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: page === '' ? 1 : 0.5,
      alternates: {
        languages: alternates,
      },
    })
  }

  return entries
}
