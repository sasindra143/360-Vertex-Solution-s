const values = [
  { num: "01", title: "Practicality", desc: "Build solutions that solve real problems." },
  { num: "02", title: "Innovation", desc: "Continuously explore modern technologies." },
  { num: "03", title: "Learning", desc: "Keep improving skills and knowledge." },
  { num: "04", title: "Quality", desc: "Focus on reliable and professional outcomes." },
  { num: "05", title: "Transparency", desc: "Communicate clearly and work responsibly." },
  { num: "06", title: "Growth", desc: "Create long-term value for people and businesses." }
];

export default function OurValuesSection() {
  return (
    <section className="our-values section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">What We <span className="gradient-text">Believe In</span></h2>
        </div>
        
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-card">
              <div className="value-num">{v.num}</div>
              <div className="value-content">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
