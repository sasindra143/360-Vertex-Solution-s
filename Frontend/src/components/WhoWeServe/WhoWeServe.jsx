import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WhoWeServe.css";

gsap.registerPlugin(ScrollTrigger);

const segments = [
  {
    emoji: "🎓",
    title: "B.Tech Students",
    desc: "Learn technologies, build real projects, and prepare for your career with structured learning paths.",
    cta: "Explore Web Development",
    path: "/technology/web-development",
    color: "#0072ff"
  },
  {
    emoji: "👨‍💻",
    title: "Freshers & Job Seekers",
    desc: "Build your resume, portfolio, LinkedIn presence, and sharpen your interview skills.",
    cta: "Explore Career Solutions",
    path: "/career",
    color: "#00c6ff"
  },
  {
    emoji: "🧑‍💼",
    title: "IT Professionals",
    desc: "Upskill in modern technologies, AI, cloud, full stack development, and automation.",
    cta: "Explore Technology Services",
    path: "/technology/web-development",
    color: "#8e2de2"
  },
  {
    emoji: "🚀",
    title: "Startups & Entrepreneurs",
    desc: "Build websites, products, branding, digital systems, and AI automation for your vision.",
    cta: "Build Your Idea",
    path: "/services",
    color: "#ff6b35"
  },
  {
    emoji: "🏢",
    title: "Businesses",
    desc: "Strengthen your digital presence, generate qualified leads, and automate your operations.",
    cta: "Grow Your Business",
    path: "/growth",
    color: "#00d4aa"
  }
];

export default function WhoWeServe() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".serve-card", { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="who-section section-padding" ref={sectionRef} id="who-we-serve">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Who We Help</span>
          <h2 className="section-title">Solutions Built <span className="gradient-text">For You</span></h2>
          <p className="section-subtitle">Wherever you are in your journey — we have a solution designed specifically for your needs.</p>
        </div>
        <div className="serve-grid">
          {segments.map((s, i) => (
            <div
              key={i}
              className="serve-card glass-card"
              style={{ "--card-color": s.color }}
            >
              <div className="serve-icon">{s.emoji}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <button
                className="serve-cta"
                onClick={() => navigate(s.path)}
              >
                {s.cta} <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
