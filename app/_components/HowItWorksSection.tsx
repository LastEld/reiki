'use client'

import { useTranslations } from 'next-intl'
import ScrollReveal from './ScrollReveal'
import SplitText from '@/components/ui/split-text'
import SpotlightCard from '@/components/ui/spotlight-card'

export default function HowItWorksSection() {
  const t = useTranslations('HowItWorks')

  const steps = [
    { number: 1, title: t('step1Title'), description: t('step1Desc') },
    { number: 2, title: t('step2Title'), description: t('step2Desc') },
    { number: 3, title: t('step3Title'), description: t('step3Desc') },
    { number: 4, title: t('step4Title'), description: t('step4Desc') },
  ]

  return (
    <section id="how-it-works" className="py-spacing-section bg-[var(--surface-paper)]">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-spacing-lg">
            <SplitText
              text={t('title')}
              className="font-heading text-4xl md:text-6xl font-black text-primary-900 mb-6 tracking-tighter uppercase"
              delay={30}
              duration={1}
              tag="h2"
              textAlign="center"
            />
            <p className="max-w-3xl mx-auto text-neutral-500 text-xl font-light tracking-tight">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-spacing-md">
          {steps.map((step) => (
            <ScrollReveal key={step.number} delay={step.number * 0.1}>
              <SpotlightCard
                spotlightColor="rgba(212, 175, 55, 0.14)"
                className="bg-white border border-neutral-100 rounded-editorial-lg p-8 hover:shadow-2xl transition-all duration-500 h-full premium-shadow flex flex-col group !text-inherit"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-editorial-md bg-primary-100 text-primary-700 font-bold text-2xl mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shadow-inner">
                  {step.number}
                </div>
                <h3 className="font-heading text-xl font-bold text-primary-900 mb-3">{step.title}</h3>
                <p className="text-neutral-600 leading-relaxed font-light">{step.description}</p>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
