'use client'

interface CTAButtonProps {
  text?: string
  targetId?: string
  variant?: 'primary' | 'header' | 'hero'
}

export default function CTAButton({
  text = 'Schedule Consultation',
  targetId = 'pricing',
  variant = 'primary',
}: CTAButtonProps) {
  const handleClick = () => {
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const variantStyles = {
    hero: 'px-8 py-4 text-lg rounded-lg bg-accent-500 text-white hover:bg-accent-600 hover:scale-105 transition-all duration-200 shadow-lg',
    primary:
      'px-6 py-3 rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors duration-200',
    header:
      'px-4 py-2 text-sm rounded-md bg-accent-500 text-white hover:bg-accent-600 transition-colors duration-200',
  }

  return (
    <button
      onClick={handleClick}
      className={`${variantStyles[variant]} font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2`}
    >
      {text}
    </button>
  )
}
