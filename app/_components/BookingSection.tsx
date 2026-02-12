'use client'

import { useTranslations } from 'next-intl'
import { InlineWidget } from 'react-calendly'
import ScrollReveal from './ScrollReveal'

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || ''

export default function BookingSection() {
  const t = useTranslations('Booking')

  if (!CALENDLY_URL) return null

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <InlineWidget
              url={CALENDLY_URL}
              styles={{ height: '700px', minWidth: '320px' }}
              pageSettings={{
                primaryColor: '4a90a4',
                textColor: '1a1a1a',
                backgroundColor: 'ffffff',
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
