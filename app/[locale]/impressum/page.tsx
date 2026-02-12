'use client'

import { useTranslations } from 'next-intl'

export default function ImpressumPage() {
  const t = useTranslations('Impressum')

  return (
    <section className="py-20 bg-white">
      <div className="section-container max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-8">
          {t('title')}
        </h1>
        <div className="prose prose-lg text-neutral-700 space-y-6">
          <div>
            <h2 className="font-heading text-xl font-bold text-primary-900 mb-2">
              {t('operatorTitle')}
            </h2>
            <p>Reiki Practice</p>
            <p>Oleg</p>
            <p>Zürich, Switzerland</p>
            <p>
              E-Mail:{' '}
              <a href="mailto:info@reiki-practice.ch" className="text-primary-600 hover:underline">
                info@reiki-practice.ch
              </a>
            </p>
            <p>Tel: +41 XX XXX XX XX</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-primary-900 mb-2">
              {t('disclaimerTitle')}
            </h2>
            <p>{t('disclaimerText')}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-primary-900 mb-2">
              {t('liabilityTitle')}
            </h2>
            <p>{t('liabilityText')}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-primary-900 mb-2">
              {t('copyrightTitle')}
            </h2>
            <p>{t('copyrightText')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
