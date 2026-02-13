'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Send, Loader2, AlertCircle } from 'lucide-react'

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    message: z.string().min(10),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
    onSubmit: (data: ContactFormData) => Promise<void>
    status: 'idle' | 'loading' | 'success' | 'error'
}

export function ContactForm({ onSubmit, status }: ContactFormProps) {
    const t = useTranslations('Contact')
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    const inputClass =
        'w-full rounded-editorial-md border border-neutral-200 bg-[oklch(0.99_0.005_0_/_0.3)] px-4 py-3.5 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:ring-4 focus:ring-[var(--color-primary-500)]/10 focus:outline-none transition-all duration-200 outline-none'

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-1">
                    <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-1.5 ml-1">
                        {t('nameLabel')} *
                    </label>
                    <input id="name" type="text" {...register('name')} className={inputClass} placeholder={t('namePlaceholder')} />
                    {errors.name && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">{t('nameError')}</p>}
                </div>

                <div className="sm:col-span-1">
                    <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-1.5 ml-1">
                        {t('emailLabel')} *
                    </label>
                    <input id="email" type="email" {...register('email')} className={inputClass} placeholder={t('emailPlaceholder')} />
                    {errors.email && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">{t('emailError')}</p>}
                </div>
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-1.5 ml-1">
                    {t('phoneLabel')} <span className="text-neutral-400 font-normal">{t('phoneOptional')}</span>
                </label>
                <input id="phone" type="tel" {...register('phone')} className={inputClass} placeholder={t('phonePlaceholder')} />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-1.5 ml-1">
                    {t('messageLabel')} *
                </label>
                <textarea id="message" rows={4} {...register('message')} className={`${inputClass} resize-none`} placeholder={t('messagePlaceholder')} />
                {errors.message && <p className="mt-1.5 text-xs font-medium text-red-500 ml-1">{t('messageError')}</p>}
            </div>

            {status === 'error' && (
                <div className="flex items-center gap-2 text-[oklch(0.6_0.2_20)] text-sm font-medium bg-[oklch(0.95_0.05_20)] p-3 rounded-editorial-md">
                    <AlertCircle size={18} />
                    <span>{t('errorMessage')}</span>
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-8 py-4 rounded-editorial-md bg-accent-500 text-white font-bold text-lg hover:bg-accent-600 transition-all duration-300 shadow-lg hover:shadow-accent-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98] outline-none flex items-center justify-center gap-2"
            >
                {status === 'loading' ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        {t('sending')}
                    </>
                ) : (
                    <>
                        <Send size={20} />
                        {t('send')}
                    </>
                )}
            </button>
        </motion.form>
    )
}
