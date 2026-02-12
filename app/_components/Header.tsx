import CTAButton from './CTAButton'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <nav
        className="section-container flex items-center justify-between py-4"
        aria-label="Main navigation"
      >
        <div className="font-heading text-2xl font-bold text-primary-800">Reiki Practice</div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#about"
            className="text-neutral-700 hover:text-primary-600 transition-colors"
          >
            About
          </a>
          <a
            href="#how-it-works"
            className="text-neutral-700 hover:text-primary-600 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#benefits"
            className="text-neutral-700 hover:text-primary-600 transition-colors"
          >
            Benefits
          </a>
          <a
            href="#pricing"
            className="text-neutral-700 hover:text-primary-600 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="text-neutral-700 hover:text-primary-600 transition-colors"
          >
            Contact
          </a>
        </div>

        <CTAButton variant="header" />
      </nav>
    </header>
  )
}
