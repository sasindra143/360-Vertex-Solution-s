const purposes = [
  { num: "01", title: "Learn", desc: "Practical technology education and skill development." },
  { num: "02", title: "Build", desc: "Projects, websites, applications and digital products." },
  { num: "03", title: "Launch", desc: "Career opportunities, businesses, brands and digital products." },
  { num: "04", title: "Grow", desc: "Marketing, automation, AI and continuous improvement." }
];

export default function OurPurposeSection() {
  return (
    <section className="our-purpose section-padding">
      <div className="container">
        <div className="purpose-problem">
          <h2 className="section-title">Why <span className="gradient-text">360° Vertex Solutions?</span></h2>
          <p>
            Technology is evolving rapidly, but access to practical learning, career support, digital expertise and AI solutions can still be fragmented.
          </p>
          <div className="purpose-response">
            Our goal is to bring these capabilities together through one connected ecosystem.
          </div>
        </div>

        <div className="purpose-grid">
          {purposes.map((p, i) => (
            <div key={i} className="purpose-card glass-card">
              <div className="purpose-num">{p.num}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
