const journeySteps = [
  { icon: "📚", label: "Learn", desc: "Skill Development" },
  { icon: "💻", label: "Build", desc: "Technology Solutions" },
  { icon: "🚀", label: "Launch", desc: "Digital Presence" },
  { icon: "📈", label: "Grow", desc: "Marketing + AI + Automation" }
];

export default function WhatWeDoJourneySection() {
  return (
    <section className="what-we-do section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">From Learning to <span className="gradient-text">Digital Transformation</span></h2>
        </div>

        <div className="journey-container">
          {journeySteps.map((step, i) => (
            <div key={i} className="journey-step">
              <div className="j-icon">{step.icon}</div>
              <div className="j-label">{step.label}</div>
              <div className="j-desc">{step.desc}</div>
            </div>
          ))}
        </div>

        <p className="journey-explanation">
          We guide individuals through learning and career readiness, while partnering with 
          businesses to build, launch, and scale their digital products.
        </p>
      </div>
    </section>
  );
}
