'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from '@/components/icons'
import { useHasMounted } from '../_hooks/useHasMounted'
import CTAButton from './CTAButton'
import LanguageSwitcher from './LanguageSwitcher'
import { practiceProfile } from '@/lib/practice'
import { Link } from '@/i18n/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mounted = useHasMounted()
  const t = useTranslations('Header')

  // Guard for client-side rendering if the component relies heavily on client-only APIs
  // For a header, it's usually rendered on both server and client,
  // but specific client-only elements (like AnimatePresence) are already guarded.
  // If the entire component should only render on the client, uncomment the line below:
  // if (!mounted) return null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#how-it-works', label: t('howItWorks') },
    { href: '#pricing', label: t('pricing') },
    { href: '#faq', label: t('faq') },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[oklch(0.99_0.005_40_/_0.8)] backdrop-blur-md shadow-sm py-spacing-xs' : 'bg-transparent py-spacing-sm'
        }`}
    >
      <div className="section-container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-spacing-xs group">
          <div className="w-10 h-10 bg-accent-500 rounded-editorial-sm flex items-center justify-center text-primary-50 font-serif font-bold text-xl group-hover:scale-105 transition-transform duration-500">
            {practiceProfile.brandName.charAt(0)}
          </div>
          <span className="font-heading font-black text-xl text-primary-900 tracking-tight uppercase">{practiceProfile.brandName}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-spacing-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-neutral-600 hover:text-primary-600 font-medium transition-colors relative group px-1"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <LanguageSwitcher />
          <CTAButton text={t('cta')} variant="primary" />
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-primary-900 hover:bg-primary-50 rounded-editorial-md transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mounted && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-neutral-100 overflow-hidden"
          >
            <div className="section-container py-spacing-md flex flex-col gap-spacing-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-neutral-700 hover:text-primary-600 transition-colors py-2 text-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-50">
                <LanguageSwitcher />
                <CTAButton text={t('cta')} variant="primary" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
