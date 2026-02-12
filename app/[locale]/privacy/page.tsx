'use client'

import { useTranslations } from 'next-intl'

export default function PrivacyPage() {
  const t = useTranslations('Privacy')

  return (
    <section className="py-20 bg-white">
      <div className="section-container max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-8">
          {t('title')}
        </h1>
        <div className="prose prose-lg text-neutral-700 space-y-6">
          <div>
            <h2 className="font-heading text-xl font-bold text-primary-900 mb-2">
              {t('introTitle')}
            </h2>
            <p>{t('introText')}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-primary-900 mb-2">
              {t('collectionTitle')}
            </h2>
            <p>{t('collectionText')}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-primary-900 mb-2">
              {t('cookiesTitle')}
            </h2>
            <p>{t('cookiesText')}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-primary-900 mb-2">
              {t('analyticsTitle')}
            </h2>
            <p>{t('analyticsText')}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-primary-900 mb-2">
              {t('rightsTitle')}
            </h2>
            <p>{t('rightsText')}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-primary-900 mb-2">
              {t('contactTitle')}
            </h2>
            <p>{t('contactText')}</p>
            <p>
              E-Mail:{' '}
              <a href="mailto:info@reiki-practice.ch" className="text-primary-600 hover:underline">
                info@reiki-practice.ch
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
