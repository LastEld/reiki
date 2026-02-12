export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: 'Consultation',
      description:
        'We begin with a brief discussion of your goals, health history, and what you can expect from the session.',
    },
    {
      number: 2,
      title: 'Preparation',
      description:
        'You relax fully clothed on a comfortable treatment table in a peaceful, calming environment.',
    },
    {
      number: 3,
      title: 'Energy Work',
      description:
        'Gentle hand placement on or above the body channels healing energy to areas of tension and imbalance.',
    },
    {
      number: 4,
      title: 'Integration',
      description:
        'Time to absorb the experience, followed by a brief discussion of sensations and next steps.',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-surface-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            How a Session Works
          </h2>
          <p className="max-w-3xl mx-auto text-neutral-600 text-lg">
            Each Reiki session is a journey of relaxation and restoration. Here&apos;s
            what you can expect during your visit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg hover:border-primary-300 transition-all duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-500 text-white font-bold text-xl mb-4">
                {step.number}
              </div>
              <h3 className="font-semibold text-lg text-primary-900 mb-2">
                {step.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
