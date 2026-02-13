import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['de', 'fr', 'en', 'ru', 'it'],
  defaultLocale: 'de',
  localePrefix: 'as-needed',
})
