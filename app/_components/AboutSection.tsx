'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useHasMounted } from '../_hooks/useHasMounted'


export default function AboutSection() {
  const t = useTranslations('About')
  const mounted = useHasMounted()
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const auraOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.4, 0.4, 0.1])
  const auraScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2])

  if (!mounted) {
    return (
      <section ref={sectionRef} id="about" className="relative py-spacing-section overflow-hidden bg-[var(--surface-cream)]">
        <div className="section-container relative z-10">
          <div className="h-96" /> {/* Placeholder */}
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="about" className="relative py-spacing-section overflow-hidden bg-[var(--surface-cream)]">
      {/* Scroll-triggered Aura Flare */}
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
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] relative rounded-editorial-lg overflow-hidden glass-panel premium-shadow p-4 border-black/5">
              <div className="absolute inset-0 bg-accent-500/5" />
              <div className="relative h-full w-full rounded-editorial-md overflow-hidden bg-gradient-to-br from-primary-100 via-primary-200/60 to-accent-100">
                {/* TODO: Replace with actual image at /images/about-reiki.jpg */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center opacity-30">
                    <div className="text-8xl mb-4">&#x2727;</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-spacing-sm flex items-center gap-4">
              <div className="h-[1px] w-12 bg-accent-500" />
              <span className="text-accent-500 text-xs font-bold uppercase tracking-[0.4em]">{t('philosophyLabel')}</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black mb-spacing-md leading-[0.8] text-primary-900 tracking-tighter uppercase">
              {t('title')}
            </h2>
            <div className="space-y-10 text-xl text-primary-900/80 leading-relaxed font-light font-serif">
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
              <div className="pt-spacing-md flex items-start gap-8 p-10 rounded-editorial-lg glass-panel border-black/5">
                <div className="w-16 h-16 rounded-editorial-full bg-accent-400/5 flex items-center justify-center flex-shrink-0 border border-accent-400/10">
                  <span className="text-3xl">𓁺</span>
                </div>
                <div>
                  <h4 className="font-heading font-black text-primary-900 mb-2 uppercase tracking-[0.2em] text-sm">{t('stillnessTitle')}</h4>
                  <p className="text-sm text-primary-900/40 font-sans tracking-wide">{t('stillnessDesc')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
