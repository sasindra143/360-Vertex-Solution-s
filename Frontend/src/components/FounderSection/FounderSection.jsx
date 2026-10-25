import { useNavigate } from "react-router-dom";
import "./FounderSection.css";

const FOUNDER_PHOTO_URL = "https://res.cloudinary.com/dvknx0hpm/image/upload/v1789818578/WhatsApp_Image_2026-09-19_at_10.44.11-removebg-preview_vzg736.png";

export default function FounderSection() {
  const navigate = useNavigate();

  const skills = ["Java", "Spring Boot", "React", "Node.js", "JavaScript", "Python", "MySQL", "AI & ML", "Digital Marketing", "SEO", "Automation"];

  return (
    <section className="founder-home-section section-padding" id="founder-home">
      <div className="container">
        <div className="founder-home-grid">
          {/* PHOTO */}
          <div className="founder-photo-wrap">
            <div className="founder-photo-bg" />
            <img
              src={FOUNDER_PHOTO_URL}
              alt="Sasindra - Founder of 360° Vertex Solutions"
              className="founder-photo"
            />
            <div className="founder-photo-ring" />
          </div>

          {/* CONTENT */}
          <div className="founder-home-content">
            <span className="section-label">Meet the Founder</span>
            <h2 className="section-title">
              <span className="gradient-text">Sasindra</span>
            </h2>
            <p className="founder-home-role">Founder & Full Stack Developer</p>
            <p className="founder-home-desc">
              I'm Sasindra, a Full Stack Developer and the Founder of 360° Vertex Solutions.
              My vision is to combine technology, education, digital growth, and AI to create
              practical solutions for people and businesses.
            </p>
            <p className="founder-home-desc">
              360° Vertex Solutions was built to bridge the gap between learning and real-world
              technology impact — helping students, professionals, startups, and businesses move
              forward in their digital journey.
            </p>
            <div className="founder-skills">
              {skills.map((s, i) => (
                <span key={i} className="skill-chip">{s}</span>
              ))}
            </div>
            <button className="btn-primary" onClick={() => navigate("/founder")}>
              Read My Full Story →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
