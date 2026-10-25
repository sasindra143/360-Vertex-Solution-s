import { useNavigate } from "react-router-dom";
import { Cpu } from "lucide-react";

export default function AboutHeroSection() {
  const navigate = useNavigate();

  return (
    <section className="about-hero">
      <div className="about-hero-bg">
        <div className="about-hero-grid" />
        <div className="about-orb about-orb-1" />
        <div className="about-orb about-orb-2" />
      </div>

      <div className="container about-hero-container">
        <div className="about-hero-content">
          <span className="about-eyebrow">ABOUT 360° VERTEX SOLUTIONS</span>
          <h1 className="about-hero-title">
            Technology. <br />
            Talent. <br />
            <span className="gradient-text">Growth. Innovation.</span>
          </h1>
          <p className="about-hero-desc">
            360° Vertex Solutions is a technology-driven company focused on helping students, 
            professionals, startups and businesses learn, build, launch and grow through 
            practical technology and digital solutions.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => navigate("/solutions")}>Explore Our Solutions</button>
            <button className="btn-secondary" onClick={() => navigate("/contact")}>Talk to Us</button>
          </div>
        </div>

        <div className="about-hero-visual">
          <div className="about-visual-node">
            <Cpu size={48} color="#00c6ff" />
          </div>
          <div className="about-visual-ring about-visual-ring-1" />
          <div className="about-visual-ring about-visual-ring-2" />
        </div>
      </div>
    </section>
  );
}
