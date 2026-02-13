'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('LanguageSwitcher')

  const switchLocale = (newLocale: (typeof routing.locales)[number]) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-2 py-1 text-xs rounded transition-colors ${locale === loc
              ? 'bg-primary-600 text-white'
              : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
            }`}
          aria-label={t(loc)}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
