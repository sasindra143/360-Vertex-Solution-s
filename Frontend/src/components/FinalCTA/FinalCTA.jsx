import { useNavigate } from "react-router-dom";
import { waLink } from "../../config";
import "./FinalCTA.css";

export default function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section className="final-cta-section" id="final-cta">
      <div className="final-cta-bg">
        <div className="fcta-orb fcta-orb-1" />
        <div className="fcta-orb fcta-orb-2" />
        <div className="fcta-grid" />
      </div>
      <div className="container">
        <div className="final-cta-content">
          <span className="section-label">Ready to Start?</span>
          <h2 className="final-cta-title">Have an Idea? <span className="gradient-text">Let's Build It.</span></h2>
          <p className="final-cta-sub">
            Whether you're starting your career, building a business, developing a digital product, 
            or exploring AI — we're ready to help you every step of the way.
          </p>
          <div className="final-cta-btns">
            <button className="btn-primary" onClick={() => navigate("/contact")} id="final-start-journey">
              Start Your Journey
            </button>
            <a
              href={waLink("Hello 360° Vertex Solutions, I would like to discuss my project.")}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              💬 Talk to Our Team
            </a>
          </div>
          <p className="final-cta-note">Free consultation · No commitment required</p>
        </div>
      </div>
    </section>
  );
}
