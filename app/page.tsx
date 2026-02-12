import Hero from './_components/Hero'
import AboutSection from './_components/AboutSection'
import HowItWorksSection from './_components/HowItWorksSection'
import BenefitsSection from './_components/BenefitsSection'
import TrustSection from './_components/TrustSection'
import PricingSection from './_components/PricingSection'

export default function Home() {
  return (
    <>
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
