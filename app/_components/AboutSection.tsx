'use client'

import { useTranslations } from 'next-intl'
import ScrollReveal from './ScrollReveal'

export default function AboutSection() {
  const t = useTranslations('About')

  return (
    <section id="about" className="py-20 bg-surface-cream">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <ScrollReveal direction="left" className="lg:col-span-3">
            <article>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                {t('title')}
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-neutral-700">
                <p>
                  {t.rich('p1', {
                    strong: (chunks) => <strong className="font-semibold text-primary-900">{chunks}</strong>,
                  })}
                </p>
                <p>{t('p2')}</p>
                <p>{t('p3')}</p>
              </div>
            </article>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-2 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary-200 via-primary-300 to-accent-400 opacity-30 blur-2xl" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
