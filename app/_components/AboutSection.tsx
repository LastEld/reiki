'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useHasMounted } from '../_hooks/useHasMounted'
import SplitText from '@/components/ui/split-text'
import SpotlightCard from '@/components/ui/spotlight-card'
import TiltedCard from '@/components/ui/tilted-card'

export default function AboutSection() {
  const t = useTranslations('About')
  const mounted = useHasMounted()
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const auraOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.35, 0.35, 0.1])
  const auraScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2])

  if (!mounted) {
    return (
      <section ref={sectionRef} id="about" className="relative py-spacing-section overflow-hidden bg-[var(--surface-cream)]">
        <div className="section-container relative z-10">
          <div className="h-96" />
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="about" className="relative py-spacing-section overflow-hidden bg-[var(--surface-cream)]">
      <motion.div
        style={{ opacity: auraOpacity, scale: auraScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aura-bg w-[100vw] h-[100vw]"
      />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <TiltedCard
              altText="Reiki ambient visual"
              captionText={t('title')}
              containerHeight="520px"
              containerWidth="100%"
              imageHeight="520px"
              imageWidth="100%"
              rotateAmplitude={10}
              scaleOnHover={1.03}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent
              overlayContent={
                <div className="h-full w-full rounded-editorial-lg overflow-hidden border border-black/5 glass-panel premium-shadow p-4">
                  <div className="relative h-full w-full rounded-editorial-md overflow-hidden bg-gradient-to-br from-primary-100 via-primary-200/60 to-accent-100">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.8),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(212,175,55,0.35),transparent_45%)]" />
                    <div className="absolute inset-0 flex items-end p-8">
                      <p className="text-sm tracking-[0.2em] uppercase text-primary-900/70 font-bold">
                        {t('philosophyLabel')}
                      </p>
                    </div>
                  </div>
                </div>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-spacing-sm flex items-center gap-4">
              <div className="h-[1px] w-12 bg-accent-500" />
              <span className="text-accent-500 text-xs font-bold uppercase tracking-[0.4em]">{t('philosophyLabel')}</span>
            </div>

            <SplitText
              text={t('title')}
              className="text-5xl md:text-7xl font-black mb-spacing-md leading-[0.85] text-primary-900 tracking-tighter uppercase"
              delay={28}
              duration={1}
              tag="h2"
              textAlign="left"
            />

            <div className="space-y-8 text-lg text-primary-900/80 leading-relaxed font-light font-serif">
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>

              <SpotlightCard
                spotlightColor="rgba(212, 175, 55, 0.16)"
                className="!bg-white/80 !border-black/5 p-8 rounded-editorial-lg"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-editorial-full bg-accent-400/10 flex items-center justify-center flex-shrink-0 border border-accent-400/20">
                    <Sparkles className="text-accent-600" size={22} />
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-primary-900 mb-2 uppercase tracking-[0.2em] text-sm">{t('stillnessTitle')}</h4>
                    <p className="text-sm text-primary-900/60 tracking-wide">{t('stillnessDesc')}</p>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
