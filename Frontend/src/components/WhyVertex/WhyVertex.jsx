import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WhyVertex.css";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: "🎯", title: "Practical Solutions", desc: "Every solution we build is focused on real-world requirements, not theoretical concepts." },
  { icon: "💡", title: "Innovative Thinking", desc: "We combine modern technology with creative problem-solving to deliver unique outcomes." },
  { icon: "🔧", title: "End-to-End Delivery", desc: "From planning and design to development, launch, and ongoing support — we do it all." },
  { icon: "🤖", title: "AI Ready", desc: "We build with the latest AI capabilities — chatbots, agents, automation, and LLMs." },
  { icon: "📚", title: "Knowledge-Driven", desc: "Our team continuously learns and applies the latest technologies and best practices." },
  { icon: "🤝", title: "Long-Term Partnership", desc: "We focus on building sustainable relationships rather than delivering one-off projects." }
];

export default function WhyVertex() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".why-card", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const navigate = useNavigate();

  return (
    <section className="why-section section-padding" ref={sectionRef} id="why-vertex">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Why Us</span>
          <h2 className="section-title">Why Work <span className="gradient-text">With Us?</span></h2>
          <p className="section-subtitle">We go beyond services — we build long-term partnerships focused on your growth.</p>
        </div>
        <div className="why-grid">
          {benefits.map((b, i) => (
            <div key={i} className="why-card glass-card">
              <span className="why-icon">{b.icon}</span>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
        <div className="why-cta-row">
          <button className="btn-primary" onClick={() => navigate("/contact")}>Work With Us</button>
          <button className="btn-secondary" onClick={() => navigate("/about")}>Learn Our Story</button>
        </div>
      </div>
    </section>
  );
}
