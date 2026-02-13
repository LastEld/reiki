'use client'

import { useTranslations } from 'next-intl'
import { Award, Shield, Heart } from 'lucide-react'
import { useHasMounted } from '../_hooks/useHasMounted'
import ScrollReveal from './ScrollReveal'
import SpotlightCard from '@/components/ui/spotlight-card'

export default function TrustSection() {
  const t = useTranslations('Trust')
  const mounted = useHasMounted()

  if (!mounted) return <div className="py-24 bg-surface-cream" />

  const qualifications = [t('qual1'), t('qual2'), t('qual3')]

  const trustIndicators = [
    { value: t('sessionsCount'), label: t('sessions') },
    { value: t('experienceCount'), label: t('experience') },
    { value: t('certifiedLevel'), label: t('certified') },
  ]

  return (
    <section id="trust" className="py-spacing-section bg-surface-cream overflow-hidden">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-900 mb-4">
              {t('title')}
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-editorial-full opacity-60" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-4xl mx-auto mb-spacing-xl">
            <SpotlightCard spotlightColor="rgba(212, 175, 55, 0.08)" className="flex flex-col md:flex-row items-center gap-10 bg-white border border-neutral-100 rounded-editorial-lg premium-shadow p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
              <div className="flex-shrink-0">
                <div className="w-40 h-40 rounded-editorial-md bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center shadow-inner relative group overflow-hidden floating">
                  <span className="text-7xl font-heading font-bold text-primary-600 transition-transform duration-500 group-hover:scale-110">O</span>
                  <div className="absolute inset-0 bg-primary-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <h3 className="font-heading text-3xl font-bold text-primary-900 mb-1">
                    {t('name')}
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
                    {t('role')}
                  </span>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {qualifications.map((qual, index) => {
                    const Icons = [Award, Shield, Heart]
                    const Icon = Icons[index] || Shield
                    return (
                      <li key={index} className="flex items-center text-neutral-700 text-sm sm:text-base">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center text-accent-600 mr-3">
                          <Icon size={18} />
                        </span>
                        <span>{qual}</span>
                      </li>
                    )
                  })}
                </ul>

                <p className="text-neutral-600 leading-relaxed italic border-l-4 border-primary-200 pl-6 py-2">
                  &ldquo;{t('bio')}&rdquo;
                </p>
              </div>
            </SpotlightCard>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-3xl mx-auto">
          {trustIndicators.map((indicator, index) => (
            <ScrollReveal key={index} delay={0.2 + index * 0.1} direction="up">
              <div className="text-center p-6 rounded-2xl bg-white/50 hover:bg-white transition-colors duration-300">
                <div className="text-5xl font-bold text-primary-600 mb-2">{indicator.value}</div>
                <div className="text-neutral-500 text-xs font-bold uppercase tracking-widest">
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
