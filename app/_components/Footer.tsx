'use client'

import { useTranslations } from 'next-intl'
import { useHasMounted } from '../_hooks/useHasMounted'
import { Link } from '@/i18n/navigation'

export default function Footer() {
  const t = useTranslations('Footer')
  const h = useTranslations('Header')
  const c = useTranslations('Contact')
  const mounted = useHasMounted()

  if (!mounted) return <footer className="bg-neutral-50 py-12" />
  const currentYear = new Date().getFullYear()

  const links = [
    { href: '#about', label: h('about') },
    { href: '#how-it-works', label: h('howItWorks') },
    { href: '#benefits', label: h('benefits') },
    { href: '#pricing', label: h('pricing') },
    { href: '#faq', label: h('faq') },
    { href: '#contact', label: h('contact') },
  ]

  return (
    <footer className="bg-neutral-900 text-neutral-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />

      <div className="section-container py-spacing-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-spacing-lg mb-spacing-lg">
          <div className="md:col-span-12 lg:col-span-5">
            <h3 className="font-heading text-4xl font-black mb-spacing-sm text-white uppercase tracking-tighter">{t('brandName')}</h3>
            <p className="text-neutral-400 mb-spacing-md max-w-sm leading-relaxed text-lg font-serif italic opacity-70">{t('tagline')}</p>
          </div>

          <div className="md:col-span-6 lg:col-span-3">
            <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-500 mb-spacing-sm">{t('quickLinks')}</h4>
            <nav className="flex flex-col gap-spacing-sm">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-neutral-400 hover:text-white transition-all duration-200 flex items-center gap-2 hover:translate-x-1"
                >
                  <span className="w-1 h-1 bg-accent-400 rounded-full" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-6 lg:col-span-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-500 mb-6">{t('contact')}</h4>
            <div className="flex flex-col gap-6 text-neutral-400">
              <a href={`tel:${c('phoneValue').replace(/\s/g, '')}`} className="group flex items-center gap-4 hover:text-white transition-colors">
                <span className="w-10 h-10 rounded-editorial-md bg-neutral-800 flex items-center justify-center group-hover:bg-primary-900 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </span>
                <span className="text-lg">{c('phoneValue')}</span>
              </a>
              <a href={`mailto:${c('emailValue')}`} className="group flex items-center gap-spacing-sm hover:text-white transition-colors">
                <span className="w-10 h-10 rounded-editorial-md bg-neutral-800 flex items-center justify-center group-hover:bg-primary-900 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <span className="text-lg text-balance">{c('emailValue')}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 py-spacing-md flex flex-col md:flex-row justify-between items-center gap-spacing-md">
          <p className="text-neutral-500 text-sm" suppressHydrationWarning>
            &copy; {currentYear} Reiki Practice. {t('allRightsReserved') || 'All rights reserved.'}
          </p>
          <div className="flex gap-spacing-md">
            <Link href="/impressum" className="text-neutral-500 text-sm hover:text-white transition-colors">
              {t('impressum')}
            </Link>
            <Link href="/privacy" className="text-neutral-500 text-sm hover:text-white transition-colors">
              {t('privacy')}
            </Link>
          </div>
        </div>

        <div className="mt-spacing-md">
          <p className="text-neutral-600 text-xs text-center leading-relaxed">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  )
}
