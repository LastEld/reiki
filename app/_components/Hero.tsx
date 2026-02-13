'use client'

import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { useHasMounted } from '../_hooks/useHasMounted'
import CTAButton from './CTAButton'
import Galaxy from '@/components/ui/galaxy'
import SpotlightCard from '@/components/ui/spotlight-card'
import SplitText from '@/components/ui/split-text'

export default function Hero() {
  const t = useTranslations('Hero')
  const mounted = useHasMounted()
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse movement for magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Explosive springs for magnetic glass - Hardened for responsiveness
  const springConfig = { damping: 30, stiffness: 600, mass: 0.5 }
  const glassX = useSpring(mouseX, springConfig)
  const glassY = useSpring(mouseY, springConfig)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Scroll transforms - Depth of Field Hardening with early return optimization
  const opacity = useTransform(scrollYProgress, (latest) => {
    if (latest > 0.7) return 0
    return latest <= 0.6 ? 1 - (latest / 0.6) : 0
  })
  const blur = useTransform(scrollYProgress, (latest) => {
    if (latest > 0.7) return "blur(30px)"
    return latest <= 0.3 ? `blur(${latest * 100}px)` : "blur(30px)"
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 15
    const y = (e.clientY - top - height / 2) / 15
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  if (!mounted) {
    return (
      <section ref={containerRef} id="hero" className="relative h-screen flex items-center overflow-hidden bg-black">
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-8xl text-white mb-6 font-black tracking-tighter">
              {t('title')}
            </h1>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen flex items-center overflow-hidden bg-black"
    >
      {/* React Bits: Galaxy Background */}
      <div className="absolute inset-0 z-0">
        <Galaxy
          speed={0.5}
          density={1.5}
          glowIntensity={0.5}
          rotationSpeed={0.05}
          hueShift={140} // Soft teal/gold shift
          transparent={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </div>

      <motion.div
        style={{ opacity, x: glassX, y: glassY, filter: blur }}
        className="section-container relative z-10"
      >
        <SpotlightCard
          className="max-w-4xl p-1 md:p-1 !bg-transparent !border-white/5 overflow-visible"
          spotlightColor="rgba(212, 175, 55, 0.15)" // Subtle Gold Spotlight
        >
          <div className="p-10 md:p-16 rounded-editorial-lg glass-panel premium-shadow border-white/10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 inline-block"
            >
              <span className="px-5 py-2 rounded-editorial-full bg-primary-100/10 text-primary-100 border border-primary-100/20 text-xs font-bold tracking-[0.2em] uppercase">
                {t('atelierLabel')}
              </span>
            </motion.div>

            {/* React Bits: SplitText Typography */}
            <SplitText
              text={t('title')}
              className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-8 text-balance leading-[0.85] font-black tracking-[-0.05em]"
              delay={40}
              duration={1.2}
              ease="expo.out"
              threshold={0.1}
              textAlign="left"
            />

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xl md:text-3xl text-white/70 mb-12 leading-tight max-w-2xl font-light tracking-tight"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <CTAButton variant="hero" text={t('cta')} targetId="pricing" className="!px-12 !py-5 !text-lg !rounded-editorial-md" />
              <button className="px-10 py-5 rounded-editorial-md border border-white/10 text-white font-bold hover:bg-white/5 transition-all uppercase tracking-widest text-sm">
                {t('methodology')}
              </button>
            </motion.div>
          </div>
        </SpotlightCard>
      </motion.div>

      {/* Scroll Indicator - Editorial */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-12 hidden md:block"
      >
        <div className="flex items-center gap-4 group">
          <div className="h-[1px] w-12 bg-white/20 group-hover:w-20 transition-all duration-500" />
          <span className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-bold">{t('scrollToBreathe')}</span>
        </div>
      </motion.div>
    </section>
  )
}
