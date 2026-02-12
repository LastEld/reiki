'use client'

import { useTranslations } from 'next-intl'
import ScrollReveal from './ScrollReveal'

export default function BenefitsSection() {
  const t = useTranslations('Benefits')

  const benefits = [
    { icon: '🧘', title: t('stressTitle'), description: t('stressDesc') },
    { icon: '💚', title: t('emotionalTitle'), description: t('emotionalDesc') },
    { icon: '😴', title: t('sleepTitle'), description: t('sleepDesc') },
    { icon: '✨', title: t('painTitle'), description: t('painDesc') },
    { icon: '🧠', title: t('clarityTitle'), description: t('clarityDesc') },
    { icon: '⚡', title: t('energyTitle'), description: t('energyDesc') },
  ]

  return (
    <section id="benefits" className="py-20 bg-surface-cream">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              {t('title')}
            </h2>
            <p className="max-w-3xl mx-auto text-neutral-600 text-lg">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow duration-200 h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-2xl mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-lg text-primary-900 mb-2">{benefit.title}</h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <p className="text-sm text-neutral-500 italic text-center mt-8">{t('disclaimer')}</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
