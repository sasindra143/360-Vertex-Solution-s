import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Ecosystem.css";

gsap.registerPlugin(ScrollTrigger);

const divisions = [
  {
    icon: "🎓",
    name: "Vertex Academy",
    tagline: "Learn. Skill. Excel.",
    desc: "Practical, career-focused technology education for students, freshers, and professionals.",
    services: ["Java Full Stack", "Python Full Stack", "AI & ML", "Data Science", "Cloud & DevOps"],
    color: "#0072ff",
    path: "/academy"
  },
  {
    icon: "💼",
    name: "Vertex Career Solutions",
    tagline: "From Learning to Employment.",
    desc: "End-to-end career support to help you land your dream role in the tech industry.",
    services: ["ATS Resume", "LinkedIn Optimization", "Portfolio", "Mock Interviews", "Career Guidance"],
    color: "#00c6ff",
    path: "/career"
  },
  {
    icon: "💻",
    name: "Vertex Digital Services",
    tagline: "Ideas Into Digital Products.",
    desc: "Full-spectrum web development, software engineering, and UI/UX for modern businesses.",
    services: ["Website Development", "E-Commerce", "Full Stack", "UI/UX", "Branding"],
    color: "#8e2de2",
    path: "/services"
  },
  {
    icon: "📈",
    name: "Vertex Growth Marketing",
    tagline: "Get Seen. Get Discovered. Grow.",
    desc: "Data-driven digital marketing strategies to generate leads and drive measurable business growth.",
    services: ["SEO", "Google Ads", "Meta Ads", "Social Media", "Lead Generation"],
    color: "#ff6b35",
    path: "/growth"
  },
  {
    icon: "🤖",
    name: "Vertex AI & Automation",
    tagline: "Build Smarter With AI.",
    desc: "Cutting-edge AI agents, chatbots, workflow automation and CRM systems for intelligent businesses.",
    services: ["AI Chatbots", "AI Agents", "RAG", "CRM Automation", "WhatsApp Bot"],
    color: "#00d4aa",
    path: "/ai"
  },
  {
    icon: "🎥",
    name: "Vertex Media & Creative",
    tagline: "Content That Converts.",
    desc: "High-quality reels, videos, photography, graphics, and brand creative content.",
    services: ["Reels & Shorts", "Video Editing", "Photography", "Social Creatives", "Brand Videos"],
    color: "#ff007f",
    path: "/media"
  }
];

export default function Ecosystem() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".eco-card", { opacity: 0, y: 60, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="eco-section section-padding" ref={sectionRef} id="ecosystem">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Ecosystem</span>
          <h2 className="section-title">The <span className="gradient-text">360° Vertex</span> Ecosystem</h2>
          <p className="section-subtitle">One integrated ecosystem. Six powerful divisions. Infinite possibilities.</p>
        </div>
        <div className="eco-grid">
          {divisions.map((d, i) => (
            <div
              key={i}
              className="eco-card glass-card"
              style={{ "--eco-color": d.color }}
            >
              <div className="eco-top">
                <div className="eco-icon" style={{ background: `${d.color}18`, border: `1px solid ${d.color}35` }}>
                  {d.icon}
                </div>
                <div className="eco-badge" style={{ color: d.color, borderColor: `${d.color}30`, background: `${d.color}10` }}>
                  {d.tagline}
                </div>
              </div>
              <h3>{d.name}</h3>
              <p>{d.desc}</p>
              <div className="eco-services">
                {d.services.map((s, j) => (
                  <span key={j} className="eco-service-chip">{s}</span>
                ))}
              </div>
              <button className="eco-explore" onClick={() => navigate(d.path)} style={{ color: d.color }}>
                Explore {d.name.split(" ").pop()} <span>→</span>
              </button>
              <div className="eco-glow" style={{ background: `radial-gradient(circle, ${d.color}20, transparent 70%)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
