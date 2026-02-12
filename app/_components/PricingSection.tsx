'use client'

import { useTranslations } from 'next-intl'
import CTAButton from './CTAButton'
import ScrollReveal from './ScrollReveal'

export default function PricingSection() {
  const t = useTranslations('Pricing')

  const pricingTiers = [
    {
      name: t('singleName'),
      price: 'CHF 120',
      duration: t('singleDuration'),
      featured: false,
      features: [t('singleF1'), t('singleF2'), t('singleF3')],
    },
    {
      name: t('courseName'),
      price: 'CHF 306',
      badge: t('courseBadge'),
      savings: t('courseSavings'),
      duration: t('courseDuration'),
      featured: true,
      features: [t('courseF1'), t('courseF2'), t('courseF3'), t('courseF4')],
    },
    {
      name: t('intensiveName'),
      price: 'CHF 510',
      duration: t('intensiveDuration'),
      featured: false,
      features: [t('intensiveF1'), t('intensiveF2'), t('intensiveF3'), t('intensiveF4'), t('intensiveF5')],
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-neutral-600 text-lg">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {pricingTiers.map((tier, index) => (
            <ScrollReveal key={index} delay={index * 0.12}>
              <div
                className={`relative rounded-2xl shadow-md p-8 h-full ${
                  tier.featured ? 'ring-2 ring-accent-500 shadow-xl scale-105 md:scale-110' : 'bg-white'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent-500 text-white rounded-full px-3 py-1 text-sm font-medium shadow-md">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-heading text-2xl font-bold text-primary-900 mb-2">{tier.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-primary-700">{tier.price}</span>
                  </div>
                  {tier.savings && (
                    <p className="text-accent-600 font-medium text-sm mb-1">{tier.savings}</p>
                  )}
                  <p className="text-neutral-500 text-sm">{tier.duration}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary-500 mr-2 mt-0.5">&#10003;</span>
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <CTAButton text={t('bookNow')} variant={tier.featured ? 'hero' : 'primary'} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <p className="text-sm text-neutral-500 text-center">{t('note')}</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
