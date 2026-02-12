export default function BenefitsSection() {
  const benefits = [
    {
      icon: '🧘',
      title: 'Stress Relief',
      description:
        'Reiki promotes deep relaxation, helping release tension and reduce the physical and emotional effects of stress.',
    },
    {
      icon: '💚',
      title: 'Emotional Balance',
      description:
        'Sessions can help process difficult emotions, creating a sense of calm and emotional stability.',
    },
    {
      icon: '😴',
      title: 'Better Sleep',
      description:
        'Many clients report improved sleep quality and easier ability to relax before bedtime.',
    },
    {
      icon: '✨',
      title: 'Pain Management',
      description:
        "Reiki may help reduce discomfort and support the body's natural pain management processes.",
    },
    {
      icon: '🧠',
      title: 'Mental Clarity',
      description:
        'Experience clearer thinking, improved focus, and a greater sense of presence and awareness.',
    },
    {
      icon: '⚡',
      title: 'Energy Restoration',
      description:
        "Feel revitalized as Reiki helps restore the natural flow and balance of your body's energy.",
    },
  ]

  return (
    <section id="benefits" className="py-20 bg-surface-cream">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Benefits & Effects
          </h2>
          <p className="max-w-3xl mx-auto text-neutral-600 text-lg">
            Reiki sessions can bring a wide range of positive effects. While
            individual experiences vary, here are some of the most commonly
            reported benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-2xl mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-lg text-primary-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-neutral-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-neutral-500 italic text-center mt-8">
          Results vary by individual. Reiki is a complementary practice and
          should not replace professional medical advice.
        </p>
      </div>
    </section>
  )
}
