import Image from 'next/image'
import CTAButton from './CTAButton'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Hero background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Peaceful mountain landscape at sunrise representing balance and inner peace through Reiki healing"
        fill
        priority
        className="object-cover"
        sizes="100vw"
        quality={85}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero content */}
      <div className="section-container relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-6 text-balance">
            Find Balance and Inner Peace Through Reiki Healing
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl">
            Professional energy healing sessions to help you release stress,
            restore harmony, and reconnect with your inner well-being
          </p>
          <CTAButton variant="hero" text="Schedule Consultation" targetId="pricing" />
        </div>
      </div>
    </section>
  )
}
