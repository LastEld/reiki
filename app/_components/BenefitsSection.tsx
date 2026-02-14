'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Heart, Zap, Shield, Sparkles, Wind, Moon, IconComponent } from '@/components/icons'
import { useHasMounted } from '../_hooks/useHasMounted'
import TiltedCard from '@/components/ui/tilted-card'

const BenefitCard = ({ title, description, icon: Icon, index }: { title: string, description: string, icon: IconComponent, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <TiltedCard
        altText={title}
        captionText={title}
        containerHeight="280px"
        containerWidth="100%"
        imageHeight="280px"
        imageWidth="100%"
        rotateAmplitude={12}
        scaleOnHover={1.05}
        showTooltip={false}
        displayOverlayContent={true}
        overlayContent={
          <div className="p-spacing-md h-full w-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-accent-500/5 flex items-center justify-center mb-spacing-md border border-accent-500/10">
              <Icon className="w-8 h-8 text-accent-500 opacity-60" />
            </div>
            <h3 className="text-2xl font-black text-primary-900 mb-spacing-xs tracking-tighter uppercase">{title}</h3>
            <p className="text-primary-900/80 leading-relaxed font-light font-serif text-balance line-clamp-4 text-adaptive">{description}</p>
          </div>
        }
      />
    </motion.div>
  )
}

export default function BenefitsSection() {
  const t = useTranslations('Benefits')
  const mounted = useHasMounted()

  const benefits = [
    { title: t('benefit1.title'), description: t('benefit1.desc'), icon: Heart },
    { title: t('benefit2.title'), description: t('benefit2.desc'), icon: Zap },
    { title: t('benefit3.title'), description: t('benefit3.desc'), icon: Shield },
    { title: t('benefit4.title'), description: t('benefit4.desc'), icon: Sparkles },
    { title: t('benefit5.title'), description: t('benefit5.desc'), icon: Wind },
    { title: t('benefit6.title'), description: t('benefit6.desc'), icon: Moon }
  ]

  if (!mounted) return <section id="benefits" className="py-spacing-xl" />

  return (
    <section id="benefits" className="py-spacing-section bg-[var(--surface-cream)] relative overflow-hidden">
      {/* Background Energy Flares */}
      <div className="absolute top-0 right-0 aura-bg w-[100vw] h-[100vw] opacity-20" />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mb-spacing-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-spacing-sm flex items-center gap-spacing-sm"
          >
            <div className="h-[2px] w-12 bg-accent-500" />
            <span className="text-accent-500 text-xs font-black uppercase tracking-[0.3em]">{t('benefitsLabel')}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-primary-900 mb-spacing-md tracking-tighter leading-[0.8] uppercase"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-primary-900/60 font-light max-w-2xl leading-tight italic font-serif"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-spacing-md auto-rows-fr">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
