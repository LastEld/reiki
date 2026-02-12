'use client'

import { useTranslations } from 'next-intl'
import ScrollReveal from './ScrollReveal'

export default function HowItWorksSection() {
  const t = useTranslations('HowItWorks')

  const steps = [
    { number: 1, title: t('step1Title'), description: t('step1Desc') },
    { number: 2, title: t('step2Title'), description: t('step2Desc') },
    { number: 3, title: t('step3Title'), description: t('step3Desc') },
    { number: 4, title: t('step4Title'), description: t('step4Desc') },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-surface-white">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              {t('title')}
            </h2>
            <p className="max-w-3xl mx-auto text-neutral-600 text-lg">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <ScrollReveal key={step.number} delay={step.number * 0.1}>
              <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg hover:border-primary-300 transition-all duration-200 h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-500 text-white font-bold text-xl mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold text-lg text-primary-900 mb-2">{step.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
