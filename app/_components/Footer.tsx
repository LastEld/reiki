'use client'

import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('Footer')
  const h = useTranslations('Header')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-neutral-100">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-xl font-bold mb-3">Reiki Practice</h3>
            <p className="text-neutral-400 mb-4">{t('tagline')}</p>
            <p className="text-neutral-500 text-sm" suppressHydrationWarning>
              &copy; {currentYear} All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t('quickLinks')}</h4>
            <nav className="flex flex-col gap-2">
              <a href="#about" className="text-neutral-400 hover:text-white transition-colors">
                {h('about')}
              </a>
              <a href="#how-it-works" className="text-neutral-400 hover:text-white transition-colors">
                {h('howItWorks')}
              </a>
              <a href="#benefits" className="text-neutral-400 hover:text-white transition-colors">
                {h('benefits')}
              </a>
              <a href="#pricing" className="text-neutral-400 hover:text-white transition-colors">
                {h('pricing')}
              </a>
              <a href="#faq" className="text-neutral-400 hover:text-white transition-colors">
                {h('faq')}
              </a>
              <a href="#contact" className="text-neutral-400 hover:text-white transition-colors">
                {h('contact')}
              </a>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t('contact')}</h4>
            <div className="flex flex-col gap-2 text-neutral-400">
              <a href="tel:+41XXXXXXXXX" className="hover:text-white transition-colors">
                +41 XX XXX XX XX
              </a>
              <a href="mailto:info@reiki-practice.ch" className="hover:text-white transition-colors">
                info@reiki-practice.ch
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <div className="flex justify-center gap-6 mb-4">
            <a href="/impressum" className="text-neutral-500 text-sm hover:text-white transition-colors">
              {t('impressum')}
            </a>
            <a href="/privacy" className="text-neutral-500 text-sm hover:text-white transition-colors">
              {t('privacy')}
            </a>
          </div>
          <p className="text-neutral-500 text-sm text-center max-w-4xl mx-auto">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  )
}
