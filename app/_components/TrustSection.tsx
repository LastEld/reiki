export default function TrustSection() {
  const qualifications = [
    'Usui Reiki Level III / Master',
    '5+ years of practice experience',
    'Certified by International Reiki Association',
  ]

  const trustIndicators = [
    { value: '200+', label: 'Sessions' },
    { value: '5 Years', label: 'Experience' },
    { value: 'Master', label: 'Certified' },
  ]

  return (
    <section id="trust" className="py-20 bg-surface-cream">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Your Practitioner
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl shadow-md p-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-5xl font-heading font-bold text-primary-600">
                  O
                </span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="font-heading text-2xl font-bold text-primary-900 mb-1">
                Oleg
              </h3>
              <p className="text-primary-600 font-medium mb-4">
                Certified Reiki Practitioner
              </p>

              <ul className="space-y-2 mb-4">
                {qualifications.map((qual, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-center md:justify-start"
                  >
                    <span className="text-primary-500 mr-2">✓</span>
                    <span className="text-neutral-700">{qual}</span>
                  </li>
                ))}
              </ul>

              <p className="text-neutral-600 leading-relaxed">
                I believe that healing comes from within, and my role is to
                facilitate that natural process. With deep respect for the Reiki
                tradition and a commitment to continuous learning, I create a
                safe, nurturing space for your healing journey.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-1">
                {indicator.value}
              </div>
              <div className="text-neutral-600 text-sm font-medium uppercase tracking-wide">
                {indicator.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
