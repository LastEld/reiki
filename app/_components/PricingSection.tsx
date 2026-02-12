import CTAButton from './CTAButton'

export default function PricingSection() {
  const pricingTiers = [
    {
      name: 'Single Session',
      price: '3,500 RUB',
      duration: '60 minutes',
      featured: false,
      features: [
        'Full Reiki session',
        'Pre-session consultation',
        'Post-session guidance',
      ],
    },
    {
      name: 'Course of 3 Sessions',
      price: '9,000 RUB',
      badge: 'Best Value',
      savings: 'Save 15%',
      duration: '60 minutes each',
      featured: true,
      features: [
        'Everything in Single Session',
        'Personalized treatment plan',
        'Progress tracking between sessions',
        'Priority scheduling',
      ],
    },
    {
      name: 'Intensive Program',
      price: '15,000 RUB',
      duration: '5 sessions + follow-up',
      featured: false,
      features: [
        'Everything in Course of 3',
        'Extended initial assessment',
        'Customized healing protocol',
        'Email support between sessions',
        'Follow-up consultation',
      ],
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Pricing & Services
          </h2>
          <p className="text-neutral-600 text-lg">
            Choose the option that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl shadow-md p-8 ${
                tier.featured
                  ? 'ring-2 ring-accent-500 shadow-xl scale-105 md:scale-110'
                  : 'bg-white'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent-500 text-white rounded-full px-3 py-1 text-sm font-medium shadow-md">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="font-heading text-2xl font-bold text-primary-900 mb-2">
                  {tier.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-primary-700">
                    {tier.price}
                  </span>
                </div>
                {tier.savings && (
                  <p className="text-accent-600 font-medium text-sm mb-1">
                    {tier.savings}
                  </p>
                )}
                <p className="text-neutral-500 text-sm">{tier.duration}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary-500 mr-2 mt-0.5">✓</span>
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <CTAButton
                  text="Book Now"
                  variant={tier.featured ? 'hero' : 'primary'}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-neutral-500 text-center">
          All prices include consultation. Package sessions can be used within 3
          months.
        </p>
      </div>
    </section>
  )
}
