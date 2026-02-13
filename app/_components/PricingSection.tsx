'use client'

import { useTranslations } from 'next-intl'
import { useHasMounted } from '../_hooks/useHasMounted'
import ScrollReveal from './ScrollReveal'
import { PricingCard } from './PricingCard'

export default function PricingSection() {
  const t = useTranslations('Pricing')
  const mounted = useHasMounted()

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
    <section id="pricing" className="py-spacing-xl bg-[var(--surface-paper)] relative overflow-hidden">
      <div className="absolute top-0 right-0 aura-bg opacity-10" />
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-spacing-lg">
            <h2 className="font-heading text-4xl md:text-6xl font-black text-primary-900 mb-6 tracking-tighter">
              {t('title')}
            </h2>
            <p className="text-neutral-500 text-xl max-w-2xl mx-auto font-light tracking-tight">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-spacing-md mb-spacing-md items-stretch pt-spacing-md">
          {pricingTiers.map((tier, index) => (
            <ScrollReveal key={index} delay={index * 0.12} className="h-full">
              <PricingCard tier={tier} mounted={mounted} t={t} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-spacing-md text-center">
            <p className="text-sm text-neutral-400 font-serif italic">{t('note')}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
