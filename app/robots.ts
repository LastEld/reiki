import type { MetadataRoute } from 'next'
import { practiceProfile } from '@/lib/practice'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${practiceProfile.siteUrl}/sitemap.xml`,
  }
}
