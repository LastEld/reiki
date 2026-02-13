'use client'

import { useTranslations } from 'next-intl'
import { InlineWidget } from 'react-calendly'
import ScrollReveal from './ScrollReveal'

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || ''

export default function BookingSection() {
  const t = useTranslations('Booking')

  if (!CALENDLY_URL) return null

  return (
    <section id="booking" className="py-24 md:py-40 bg-primary-100 relative overflow-hidden">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-primary-900 mb-8 uppercase tracking-tighter">
              {t('title')}
            </h2>
            <p className="text-primary-900/40 text-xl max-w-2xl mx-auto italic font-serif">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-4xl mx-auto rounded-sm overflow-hidden shadow-2xl border border-black/5">
            <InlineWidget
              url={CALENDLY_URL}
              styles={{ height: '700px', minWidth: '320px' }}
              pageSettings={{
                primaryColor: '4a0404',
                textColor: '1a1a1a',
                backgroundColor: 'f9f5f1',
                hideLandingPageDetails: true,
                hideEventTypeDetails: false,
                hideGdprBanner: true,
              }}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
