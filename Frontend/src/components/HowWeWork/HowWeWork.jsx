import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HowWeWork.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Discover", desc: "We learn about your business, goals, target audience, and existing systems." },
  { num: "02", title: "Understand", desc: "We analyse the problem deeply and document every requirement clearly." },
  { num: "03", title: "Strategize", desc: "We create a data-driven strategy tailored to your unique situation and goals." },
  { num: "04", title: "Design", desc: "We craft user-centered designs with premium aesthetics and clear information hierarchy." },
  { num: "05", title: "Build", desc: "We develop your solution using modern, scalable technology and best practices." },
  { num: "06", title: "Launch", desc: "We deploy, test, and ensure everything runs perfectly before going live." },
  { num: "07", title: "Optimize", desc: "We monitor performance, gather data, and continuously improve your solution." }
];

export default function HowWeWork() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".step-card", { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="work-section section-padding" ref={sectionRef} id="how-we-work">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Process</span>
          <h2 className="section-title">From Idea <span className="gradient-text">to Impact</span></h2>
          <p className="section-subtitle">A structured, transparent approach that delivers real results every time.</p>
        </div>
        <div className="work-flow">
          {steps.map((step, i) => (
            <div key={i} className="step-card">
              <div className="step-num">{step.num}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              {i < steps.length - 1 && <div className="step-arrow">↓</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
