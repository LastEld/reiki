'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useHasMounted } from '../_hooks/useHasMounted'
import { submitContactForm } from '../actions/contact'
import ScrollReveal from './ScrollReveal'
import { ContactForm } from './ContactForm'
import { ContactInfo } from './ContactInfo'
import SpotlightCard from '@/components/ui/spotlight-card'

export default function ContactSection() {
  const t = useTranslations('Contact')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const mounted = useHasMounted()

  const onSubmit = async (data: { name: string; email: string; phone?: string; message: string }) => {
    setStatus('loading')
    try {
      const result = await submitContactForm(data)
      if (result.success) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-spacing-section bg-[var(--surface-paper)] relative">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-spacing-lg">
            <h2 className="font-heading text-4xl md:text-6xl font-black text-primary-900 mb-6 tracking-tighter">
              {t('title')}
            </h2>
            <p className="text-neutral-500 text-xl max-w-2xl mx-auto font-light tracking-tight">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-spacing-lg max-w-6xl mx-auto">
          <ScrollReveal direction="left">
            <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.15)" className="glass-panel rounded-editorial-lg premium-shadow p-8 md:p-10 border border-neutral-100 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {mounted && status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 bg-[oklch(0.95_0.05_130)] rounded-editorial-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <CheckCircle2 className="text-[oklch(0.6_0.2_130)] w-10 h-10" />
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-primary-900 mb-3">
                      {t('successTitle')}
                    </h3>
                    <p className="text-neutral-600 mb-spacing-md max-w-md mx-auto">{t('successMessage')}</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-8 py-3 rounded-editorial-md bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                    >
                      {t('sendAnother')}
                    </button>
                  </motion.div>
                ) : (
                  <ContactForm onSubmit={onSubmit} status={status} />
                )}
              </AnimatePresence>
            </SpotlightCard>
          </ScrollReveal>

          <ContactInfo />
        </div>
      </div>
    </section>
  )
}
