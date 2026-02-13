'use client'

import { useTranslations } from 'next-intl'
import { InlineWidget } from 'react-calendly'
import ScrollReveal from './ScrollReveal'
import SplitText from '@/components/ui/split-text'
import SpotlightCard from '@/components/ui/spotlight-card'
import { practiceProfile } from '@/lib/practice'

export default function BookingSection() {
  const t = useTranslations('Booking')
  const calendlyUrl = practiceProfile.calendlyUrl

  if (!calendlyUrl) return null

  return (
    <section id="booking" className="py-24 md:py-40 bg-primary-100 relative overflow-hidden">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <SplitText
              text={t('title')}
              className="font-heading text-5xl md:text-7xl font-black text-primary-900 mb-8 uppercase tracking-tighter"
              delay={30}
              duration={1}
              tag="h2"
              textAlign="center"
            />
            <p className="text-primary-900/40 text-xl max-w-2xl mx-auto italic font-serif">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <SpotlightCard
            spotlightColor="rgba(212, 175, 55, 0.16)"
            className="max-w-4xl mx-auto rounded-sm overflow-hidden shadow-2xl border border-black/5 !bg-white !p-0"
          >
            <InlineWidget
              url={calendlyUrl}
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
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  )
}
