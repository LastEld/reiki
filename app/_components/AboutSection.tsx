export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-surface-cream">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left column: Text content */}
          <article className="lg:col-span-3">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              About Reiki
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-neutral-700">
              <p>
                Reiki is a Japanese healing practice that channels universal life
                energy through gentle hand placement. The word Reiki comes from
                two Japanese words: <strong>Rei</strong> (universal) and{' '}
                <strong>Ki</strong> (life energy). Founded by Mikao Usui in the
                early 20th century, Reiki has since been practiced worldwide as a
                complementary approach to wellness and relaxation.
              </p>
              <p>
                During a Reiki session, a trained practitioner places their hands
                lightly on or just above the body, allowing the natural flow of
                energy to support the body&apos;s innate healing processes. Reiki is
                non-invasive, gentle, and deeply relaxing.
              </p>
              <p>
                As a complementary practice, Reiki works alongside conventional
                medical care to promote balance, reduce stress, and support
                overall well-being. It is not a substitute for professional
                medical treatment, but rather a holistic approach to nurturing
                harmony between mind, body, and spirit.
              </p>
            </div>
          </article>

          {/* Right column: Decorative visual element */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary-200 via-primary-300 to-accent-400 opacity-30 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
