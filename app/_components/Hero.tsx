'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import CTAButton from './CTAButton'

export default function Hero() {
  const t = useTranslations('Hero')

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center overflow-hidden"
    >
      <Image
        src="/images/hero-bg.jpg"
        alt="Peaceful mountain landscape at sunrise representing balance and inner peace through Reiki healing"
        fill
        priority
        className="object-cover"
        sizes="100vw"
        quality={85}
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="section-container relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-6 text-balance">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl">
            {t('subtitle')}
          </p>
          <CTAButton variant="hero" text={t('cta')} targetId="pricing" />
        </div>
      </div>
    </section>
  )
}
