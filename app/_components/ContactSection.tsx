'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { submitContactForm } from '../actions/contact'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const t = useTranslations('Contact')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await submitContactForm(data)
      if (result.success) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-colors'

  return (
    <section id="contact" className="py-20 bg-surface-cream">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-8">
            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-3xl">&#10003;</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary-900 mb-2">
                  {t('successTitle')}
                </h3>
                <p className="text-neutral-600 mb-6">{t('successMessage')}</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  {t('sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t('nameLabel')} *
                  </label>
                  <input id="name" type="text" {...register('name')} className={inputClass} placeholder={t('namePlaceholder')} />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{t('nameError')}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t('emailLabel')} *
                  </label>
                  <input id="email" type="email" {...register('email')} className={inputClass} placeholder={t('emailPlaceholder')} />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{t('emailError')}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t('phoneLabel')} <span className="text-neutral-400">{t('phoneOptional')}</span>
                  </label>
                  <input id="phone" type="tel" {...register('phone')} className={inputClass} placeholder={t('phonePlaceholder')} />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    {t('messageLabel')} *
                  </label>
                  <textarea id="message" rows={4} {...register('message')} className={`${inputClass} resize-none`} placeholder={t('messagePlaceholder')} />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{t('messageError')}</p>}
                </div>

                {submitStatus === 'error' && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                    <p className="text-sm text-red-700">{t('errorMessage')}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-lg bg-accent-500 text-white font-medium hover:bg-accent-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
                >
                  {isSubmitting ? t('sending') : t('send')}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-xl font-bold text-primary-900 mb-4">{t('contactInfo')}</h3>
              <div className="space-y-4">
                <a href="tel:+41XXXXXXXXX" className="flex items-center gap-3 text-neutral-700 hover:text-primary-600 transition-colors group">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 group-hover:bg-primary-200 transition-colors">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  +41 XX XXX XX XX
                </a>

                <a href="mailto:info@reiki-practice.ch" className="flex items-center gap-3 text-neutral-700 hover:text-primary-600 transition-colors group">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 group-hover:bg-primary-200 transition-colors">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  info@reiki-practice.ch
                </a>

                <div className="flex items-center gap-3 text-neutral-700">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  {t('location')}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold text-primary-900 mb-4">{t('hours')}</h3>
              <div className="space-y-2 text-neutral-700">
                <div className="flex justify-between">
                  <span>{t('monFri')}</span>
                  <span className="font-medium">10:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('saturday')}</span>
                  <span className="font-medium">10:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('sunday')}</span>
                  <span className="text-neutral-400">{t('closed')}</span>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 rounded-xl p-6">
              <h3 className="font-semibold text-primary-900 mb-2">{t('firstTimeTitle')}</h3>
              <p className="text-neutral-600 text-sm">{t('firstTimeDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
