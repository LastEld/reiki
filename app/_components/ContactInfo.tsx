'use client'

import { useTranslations } from 'next-intl'
import ScrollReveal from './ScrollReveal'

export function ContactInfo() {
    const t = useTranslations('Contact')

    return (
        <div className="space-y-10 flex flex-col justify-center">
            <ScrollReveal direction="right" delay={0.2}>
                <div className="space-y-10">
                    <div>
                        <h3 className="font-heading text-2xl font-bold text-primary-900 mb-6">{t('contactInfo')}</h3>
                        <div className="space-y-5">
                            <a href={`tel:${t('phoneValue').replace(/\s/g, '')}`} className="flex items-center gap-5 text-neutral-700 hover:text-primary-600 transition-all group">
                                <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-editorial-md bg-[oklch(0.95_0.02_40_/_0.5)] group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </span>
                                <span className="font-medium text-lg">{t('phoneValue')}</span>
                            </a>

                            <a href={`mailto:${t('emailValue')}`} className="flex items-center gap-5 text-neutral-700 hover:text-primary-600 transition-all group">
                                <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-editorial-md bg-[oklch(0.95_0.02_40_/_0.5)] group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <span className="font-medium text-lg text-balance">{t('emailValue')}</span>
                            </a>

                            <div className="flex items-start gap-5 text-neutral-700 group">
                                <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-editorial-md bg-[oklch(0.95_0.02_40_/_0.5)]">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                <span className="font-medium text-lg">{t('location')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-100">
                        <h3 className="font-heading text-xl font-bold text-primary-900 mb-4">{t('hours')}</h3>
                        <div className="space-y-2 text-neutral-600 font-light">
                            <div className="flex justify-between max-w-sm">
                                <span>{t('monFri')}</span>
                                <span className="font-medium">09:00 - 19:00</span>
                            </div>
                            <div className="flex justify-between max-w-sm">
                                <span>{t('saturday')}</span>
                                <span className="font-medium">10:00 - 16:00</span>
                            </div>
                            <div className="flex justify-between max-w-sm">
                                <span>{t('sunday')}</span>
                                <span className="text-accent-500 font-medium">{t('closed')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    )
}
