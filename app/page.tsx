import Hero from './_components/Hero'
import AboutSection from './_components/AboutSection'
import HowItWorksSection from './_components/HowItWorksSection'
import BenefitsSection from './_components/BenefitsSection'
import TrustSection from './_components/TrustSection'
import PricingSection from './_components/PricingSection'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Reiki Healing Practice',
    description:
      'Professional Reiki healing and energy work sessions for stress relief, emotional balance, and holistic wellness',
    image: '/opengraph-image',
    telephone: '+7-XXX-XXX-XX-XX',
    email: 'info@reiki-practice.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Moscow',
      addressCountry: 'RU',
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
      <div id="contact" />
    </>
  )
}
