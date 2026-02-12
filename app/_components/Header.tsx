'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import CTAButton from './CTAButton'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = useTranslations('Header')

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#how-it-works', label: t('howItWorks') },
    { href: '#benefits', label: t('benefits') },
    { href: '#pricing', label: t('pricing') },
    { href: '#faq', label: t('faq') },
    { href: '#contact', label: t('contact') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <nav
        className="section-container flex items-center justify-between py-4"
        aria-label="Main navigation"
      >
        <div className="font-heading text-2xl font-bold text-primary-800">Reiki Practice</div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-neutral-700 hover:text-primary-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <CTAButton variant="header" />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="section-container pb-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-neutral-700 hover:text-primary-600 transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <LanguageSwitcher />
            <CTAButton variant="primary" />
          </div>
        </div>
      </div>
    </header>
  )
}
