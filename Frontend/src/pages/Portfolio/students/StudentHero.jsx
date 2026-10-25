import { useNavigate } from "react-router-dom";
import "./StudentHero.css";

export default function StudentHero() {
  const navigate = useNavigate(); // 🔥 THIS WAS MISSING

  return (
    <section className="hero">

      {/* Floating UI boxes */}
      <div className="ui-box box-1"></div>
      <div className="ui-box box-2"></div>
      <div className="ui-box box-3"></div>
      <div className="ui-box box-4"></div>

      {/* Background glow */}
      <div className="hero-bg-glow"></div>

      <div className="hero-content">
        <h1 className="hero-title">
          Get Interview Calls <br />
          <span>From Top MNCs</span> <br />
          With Our Portfolio Website
        </h1>

        <p className="hero-desc">
          Show your work the right way with a portfolio that highlights your
          strengths, builds trust, and gets recruiters to take notice —
          all built for you and ready in just <strong>3 days</strong>.
        </p>

        <div className="hero-stats">
          <div>
            <h3>50+</h3>
            <span>PROJECTS COMPLETED</span>
          </div>
          <div>
            <h3>3 Days</h3>
            <span>DELIVERY TIME</span>
          </div>
          <div>
            <h3>100%</h3>
            <span>SATISFACTION RATE</span>
          </div>
        </div>

        {/* ✅ FIXED BUTTON ACTIONS */}
        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => navigate("/portfolio/students/profile")}
          >
            Schedule a Call →
          </button>

          <button
            className="btn-secondary"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact Us
          </button>
        </div>

        <div className="hero-trust">
          <div className="avatars">
            <img src="https://res.cloudinary.com/dvknx0hpm/image/upload/v1747906461/mama_djalmo.jpg" />
            <img src="https://res.cloudinary.com/dvknx0hpm/image/upload/v1760504184/WhatsApp_Image_2025-10-14_at_21.52.00_22e76dad_fz66sf.jpg" />
            <img src="https://res.cloudinary.com/dvknx0hpm/image/upload/v1761483011/WhatsApp_Image_2025-10-26_at_07.34.34_07ff3555_krwgdm.jpg" />
            <img src="https://res.cloudinary.com/dvknx0hpm/image/upload/v1761483040/WhatsApp_Image_2025-10-26_at_18.04.07_32906e57_ywbjhg.jpg" />
            <img src="https://res.cloudinary.com/dvknx0hpm/image/upload/v1768188154/WhatsApp_Image_2025-12-22_at_15.01.14_afayup.jpg" />
          </div>
          <p>Trusted by professionals at leading tech companies worldwide</p>
        </div>
      </div>
    </section>
  );
}
