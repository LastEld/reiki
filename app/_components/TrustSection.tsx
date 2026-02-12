'use client'

import { useTranslations } from 'next-intl'
import ScrollReveal from './ScrollReveal'

export default function TrustSection() {
  const t = useTranslations('Trust')

  const qualifications = [t('qual1'), t('qual2'), t('qual3')]

  const trustIndicators = [
    { value: '200+', label: t('sessions') },
    { value: '5+', label: t('experience') },
    { value: 'Master', label: t('certified') },
  ]

  return (
    <section id="trust" className="py-20 bg-surface-cream">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              {t('title')}
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl shadow-md p-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-5xl font-heading font-bold text-primary-600">O</span>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="font-heading text-2xl font-bold text-primary-900 mb-1">
                  {t('name')}
                </h3>
                <p className="text-primary-600 font-medium mb-4">{t('role')}</p>

                <ul className="space-y-2 mb-4">
                  {qualifications.map((qual, index) => (
                    <li key={index} className="flex items-center justify-center md:justify-start">
                      <span className="text-primary-500 mr-2">&#10003;</span>
                      <span className="text-neutral-700">{qual}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-neutral-600 leading-relaxed">{t('bio')}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {trustIndicators.map((indicator, index) => (
            <ScrollReveal key={index} delay={0.2 + index * 0.1}>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-1">{indicator.value}</div>
                <div className="text-neutral-600 text-sm font-medium uppercase tracking-wide">
                  {indicator.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
