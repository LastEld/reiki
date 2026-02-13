import Hero from '../_components/Hero'
import AboutSection from '../_components/AboutSection'
import HowItWorksSection from '../_components/HowItWorksSection'
import BenefitsSection from '../_components/BenefitsSection'
import TrustSection from '../_components/TrustSection'
import PricingSection from '../_components/PricingSection'
import FAQSection from '../_components/FAQSection'
import BookingSection from '../_components/BookingSection'
import ContactSection from '../_components/ContactSection'
import { practiceAddressLine, practiceProfile } from '@/lib/practice'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: practiceProfile.businessName,
    description:
      'Private Reiki sessions for stress relief, emotional balance, and holistic well-being.',
    url: practiceProfile.siteUrl,
    image: '/opengraph-image',
    telephone: practiceProfile.contact.phoneDisplay,
    email: practiceProfile.contact.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: practiceProfile.contact.street,
      postalCode: practiceProfile.contact.postalCode,
      addressLocality: practiceProfile.contact.city,
      addressCountry: practiceProfile.contact.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: practiceProfile.contact.latitude,
      longitude: practiceProfile.contact.longitude,
    },
    openingHours: practiceProfile.openingHours.schema,
    sameAs: practiceProfile.socialUrls,
    areaServed: {
      '@type': 'City',
      name: practiceProfile.contact.city,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: practiceProfile.contact.phoneDisplay,
      email: practiceProfile.contact.email,
      contactType: 'customer service',
    },
    location: {
      '@type': 'Place',
      name: practiceAddressLine,
      address: {
        '@type': 'PostalAddress',
        streetAddress: practiceProfile.contact.street,
        postalCode: practiceProfile.contact.postalCode,
        addressLocality: practiceProfile.contact.city,
        addressCountry: practiceProfile.contact.countryCode,
      },
    },
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
