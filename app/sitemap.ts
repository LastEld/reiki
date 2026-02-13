import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { practiceProfile } from '@/lib/practice'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = practiceProfile.siteUrl

  const pages = ['', '/impressum', '/privacy']

  const entries: MetadataRoute.Sitemap = []

  for (const page of pages) {
    const alternates: Record<string, string> = {}
    for (const locale of routing.locales) {
      const prefix = `/${locale}`
      alternates[locale] = `${baseUrl}${prefix}${page}`
    }

    entries.push({
      url: `${baseUrl}/de${page}`,
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
