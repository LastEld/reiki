'use client'

import { motion, AnimatePresence } from 'framer-motion'
import SpotlightCard from '@/components/ui/spotlight-card'

interface FAQItemProps {
    faq: {
        question: string
        answer: string
    }
    index: number
    openIndex: number | null
    toggle: (index: number) => void
    mounted: boolean
}

export function FAQItem({ faq, index, openIndex, toggle, mounted }: FAQItemProps) {
    const isOpen = openIndex === index

    return (
        <SpotlightCard
            spotlightColor="rgba(212, 175, 55, 0.14)"
            className="glass-panel border-none rounded-editorial-md overflow-hidden transition-all duration-500 premium-shadow hover:bg-white/40 !p-0 !bg-transparent"
        >
            <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-neutral-50/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset group"
                aria-expanded={isOpen}
            >
                <span className={`text-xl font-bold pr-6 transition-all duration-500 ${isOpen ? 'text-primary-700 scale-[1.02]' : 'text-primary-900 group-hover:text-primary-700'}`}>
                    {faq.question}
                </span>
                {mounted ? (
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.2 : 1 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-6 h-6 flex items-center justify-center rounded-full border transition-colors duration-500 ${isOpen ? 'border-primary-500 bg-primary-500 text-white' : 'border-neutral-200 text-neutral-400 group-hover:border-primary-300 group-hover:text-primary-500'}`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </motion.div>
                ) : (
                    <div className="w-6 h-6 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                )}
            </button>

            <AnimatePresence initial={false}>
                {mounted && isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="px-8 pb-8 text-primary-900/60 leading-relaxed font-serif text-lg border-t border-black/5 pt-6">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {!mounted && isOpen && (
                <div className="px-8 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-50 pt-3">
                    {faq.answer}
                </div>
            )}
        </SpotlightCard>
    )
}
