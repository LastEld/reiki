import Hero from '../_components/Hero'
import AboutSection from '../_components/AboutSection'
import HowItWorksSection from '../_components/HowItWorksSection'
import BenefitsSection from '../_components/BenefitsSection'
import TrustSection from '../_components/TrustSection'
import PricingSection from '../_components/PricingSection'
import FAQSection from '../_components/FAQSection'
import BookingSection from '../_components/BookingSection'
import ContactSection from '../_components/ContactSection'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Reiki Healing Practice',
    description:
      'Professional Reiki healing and energy work sessions for stress relief, emotional balance, and holistic wellness',
    image: '/opengraph-image',
    telephone: '+41-XX-XXX-XX-XX',
    email: 'info@reiki-practice.ch',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Zürich',
      addressCountry: 'CH',
    },
    openingHours: 'Mo-Sa 10:00-20:00',
    sameAs: [],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      <AboutSection />
      <HowItWorksSection />
      <BenefitsSection />
      <TrustSection />
      <PricingSection />
      <FAQSection />
      <BookingSection />
      <ContactSection />
    </>
  )
}
