'use client'

import { motion } from 'framer-motion'
import { Check } from '@/components/icons'
import CTAButton from './CTAButton'
import SpotlightCard from '@/components/ui/spotlight-card'

interface PricingTier {
    name: string
    price: string
    badge?: string
    savings?: string
    duration: string
    featured: boolean
    features: string[]
}

interface PricingCardProps {
    tier: PricingTier
    mounted: boolean
    t: (key: string) => string
}

export function PricingCard({ tier, mounted, t }: PricingCardProps) {
    if (!mounted) return null

    return (
        <motion.div
            whileHover={{ y: -16, transition: { duration: 0.3, ease: 'easeOut' } }}
            className="h-full"
        >
            <SpotlightCard
                className={`relative rounded-editorial-lg p-8 h-full flex flex-col transition-all duration-500 !bg-transparent !border-none overflow-visible ${tier.featured
                    ? 'ring-2 ring-accent-500 shadow-2xl bg-[var(--surface-cream)] md:scale-105 z-10'
                    : 'glass-panel premium-shadow hover:shadow-2xl'
                    }`}
                spotlightColor={tier.featured ? "rgba(212, 175, 55, 0.25)" : "rgba(255, 255, 255, 0.1)"}
            >
                {tier.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                        <span className="bg-accent-500 text-white rounded-full px-4 py-1 text-sm font-semibold shadow-md whitespace-nowrap uppercase tracking-widest">
                            {tier.badge}
                        </span>
                    </div>
                )}

                <div className="text-center mb-6">
                    <h3 className="font-heading text-2xl font-bold text-primary-900 mb-2">{tier.name}</h3>
                    <div className="mb-2">
                        <span className="text-4xl font-bold text-primary-700">{tier.price}</span>
                    </div>
                    {tier.savings && (
                        <p className="text-accent-500 font-bold text-sm mb-1 uppercase tracking-tighter">{tier.savings}</p>
                    )}
                    <p className="text-neutral-500 text-sm">{tier.duration}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                            <span className="text-accent-500 mr-2 mt-1 shrink-0">
                                <Check size={16} />
                            </span>
                            <span className="text-neutral-700 text-sm leading-relaxed">{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto">
                    <CTAButton text={t('bookNow')} variant={tier.featured ? 'hero' : 'primary'} className="w-full" />
                </div>
            </SpotlightCard>
        </motion.div>
    )
}
