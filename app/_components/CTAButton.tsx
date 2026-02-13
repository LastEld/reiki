'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useHasMounted } from '../_hooks/useHasMounted'
import { cn } from '@/lib/utils'

interface CTAButtonProps {
  text?: string
  targetId?: string
  variant?: 'primary' | 'header' | 'hero'
  className?: string
}

export default function CTAButton({
  text,
  targetId = 'pricing',
  variant = 'primary',
  className = '',
}: CTAButtonProps) {
  const t = useTranslations('Header')
  const defaultText = text || t('cta')
  const mounted = useHasMounted()

  const handleClick = () => {
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const variantStyles = {
    hero: 'px-8 py-4 text-lg rounded-lg bg-accent-500 text-white shadow-lg',
    primary: 'px-6 py-3 rounded-lg bg-accent-500 text-white',
    header: 'px-4 py-2 text-sm rounded-md bg-accent-500 text-white',
  }

  if (!mounted) {
    return (
      <button
        onClick={handleClick}
        className={cn(variantStyles[variant], 'font-medium', className)}
      >
        {defaultText}
      </button>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: '#d97706' }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={cn(
        variantStyles[variant],
        'font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 transition-colors duration-200',
        className,
      )}
    >
      {defaultText}
    </motion.button>
  )
}
