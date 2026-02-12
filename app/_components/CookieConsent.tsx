'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const t = useTranslations('Cookie')

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      })
    }
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl border border-neutral-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-neutral-700 text-sm">{t('message')}</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={decline}
              className="px-4 py-2 text-sm rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              {t('decline')}
            </button>
            <button
              onClick={accept}
              className="px-4 py-2 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              {t('accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
