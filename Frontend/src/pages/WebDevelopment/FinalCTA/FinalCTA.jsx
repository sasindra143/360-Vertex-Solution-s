import { Link } from "react-router-dom";
import "./FinalCTA.css";

function FinalCTA() {
  return (
    <section className="final-cta">
      <h2>Ready to Build a Website That Delivers Real Results?</h2>

      <p>
        Get a clear strategy, realistic timeline, and transparent guidance
        before you invest.
      </p>

      <Link to="/web-development/consultation" className="btn primary large">
        Book Free Consultation
      </Link>

      <p className="cta-note">
        No sales pressure. Just honest advice and a clear roadmap.
      </p>
    </section>
  );
}

export default FinalCTA;
