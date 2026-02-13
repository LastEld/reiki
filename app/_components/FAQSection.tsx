'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useHasMounted } from '../_hooks/useHasMounted'
import ScrollReveal from './ScrollReveal'
import { FAQItem } from './FAQItem'
import SplitText from '@/components/ui/split-text'

export default function FAQSection() {
  const t = useTranslations('FAQ')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const mounted = useHasMounted()

  const faqs = [
    { question: t('q1'), answer: t('a1') },
    { question: t('q2'), answer: t('a2') },
    { question: t('q3'), answer: t('a3') },
    { question: t('q4'), answer: t('a4') },
    { question: t('q5'), answer: t('a5') },
    { question: t('q6'), answer: t('a6') },
    { question: t('q7'), answer: t('a7') },
  ]

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-spacing-xl bg-[var(--surface-cream)] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 aura-bg opacity-10" />
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-spacing-lg">
            <SplitText
              text={t('title')}
              className="font-heading text-4xl md:text-6xl font-black text-primary-900 mb-8 uppercase tracking-tighter"
              delay={30}
              duration={1}
              tag="h2"
              textAlign="center"
            />
            <p className="text-primary-900/40 text-xl max-w-2xl mx-auto italic font-serif leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto space-y-spacing-sm">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.05} direction="none">
              <FAQItem
                faq={faq}
                index={index}
                openIndex={openIndex}
                toggle={toggle}
                mounted={mounted}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
