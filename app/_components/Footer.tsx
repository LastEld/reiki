export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-neutral-100">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Brand and tagline */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-3">Reiki Practice</h3>
            <p className="text-neutral-400 mb-4">
              Professional energy healing sessions to restore balance and promote wellness.
            </p>
            <p className="text-neutral-500 text-sm" suppressHydrationWarning>
              &copy; {currentYear} All rights reserved.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <a href="#about" className="text-neutral-400 hover:text-white transition-colors">
                About
              </a>
              <a
                href="#how-it-works"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                How It Works
              </a>
              <a href="#benefits" className="text-neutral-400 hover:text-white transition-colors">
                Benefits
              </a>
              <a href="#pricing" className="text-neutral-400 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#contact" className="text-neutral-400 hover:text-white transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Column 3: Contact info */}
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <div className="flex flex-col gap-2 text-neutral-400">
              <a href="tel:+41XXXXXXXXX" className="hover:text-white transition-colors">
                +41 XX XXX XX XX
              </a>
              <a href="mailto:info@reiki-practice.ch" className="hover:text-white transition-colors">
                info@reiki-practice.ch
              </a>
            </div>
          </div>
        </div>

        {/* Scientific disclaimer */}
        <div className="border-t border-neutral-800 pt-8">
          <p className="text-neutral-500 text-sm text-center max-w-4xl mx-auto">
            Reiki is a complementary practice and is not a substitute for professional medical
            treatment. Please consult your healthcare provider for medical concerns.
          </p>
        </div>
      </div>
    </footer>
  )
}
