import { useNavigate } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="wd-hero">
      <div className="wd-grid-bg" />

      <div className="wd-hero-container">
        {/* ================= LEFT ================= */}
        <div className="wd-left">
          <div className="wd-expert-pill">
            <span className="wd-pill-icon">{"</>"}</span>
            Website Development Experts
            <span className="wd-status-dot" />
          </div>

          <h1 className="wd-heading">
            <span className="wd-violet">Website Development</span>
            <br />
            <span className="wd-black">Services</span>
          </h1>

          <div className="wd-offer-pill">
            100% Custom Design • Pay ₹0 Advance
          </div>

          <div className="wd-price">
            Starting from <span className="wd-old">₹25,000</span>{" "}
            <span className="wd-new">₹5,000</span>
          </div>

          <p className="wd-desc">
            <strong>Website development services.</strong> 100% custom website
            designing from ₹5,000. ₹0 advance, pay after satisfaction.
            <strong> 3 sites</strong> delivered.
            <strong> Starts in 2026.</strong>
            <strong> 1.2s load speed.</strong>
          </p>

          {/* FEATURES */}
          <div className="wd-features">
            <div className="wd-feature purple">
              <div className="wd-icon">🎨</div>
              <h4>100% Custom</h4>
              <span>No Templates</span>
            </div>

            <div className="wd-feature green">
              <div className="wd-icon">₹</div>
              <h4>₹0 Advance</h4>
              <span>Pay After</span>
            </div>

            <div className="wd-feature blue">
              <div className="wd-icon">⚡</div>
              <h4>Lightning Fast</h4>
              <span>1.2s Load</span>
            </div>

            <div className="wd-feature orange">
              <div className="wd-icon">🚀</div>
              <h4>Journey</h4>
              <span>Starts in 2026</span>
            </div>
          </div>

          {/* ✅ ACTION BUTTONS – NOW 100% WORKING */}
          <div className="wd-actions">
            {/* CONTACT → CONSULTATION PAGE */}
            <button
              className="wd-btn primary"
              onClick={() => navigate("/consultation")}
            >
              Contact Us
            </button>

            {/* CLIENT WORK PAGE */}
            <button
              className="wd-btn work"
              onClick={() => navigate("/client-work")}
            >
              Check Client’s Work
            </button>
          </div>

          {/* TRUST */}
          <div className="wd-trust">
            <div>👨‍💻 Expert Team</div>
            <div>✅ Pay If Satisfied</div>
            <div>🛡️ Satisfaction Guaranteed</div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="wd-right">
          <div className="wd-mock">
            <div className="wd-url">🔒 yourwebsite.com</div>

            <div className="wd-metrics">
              <div className="wd-metric">
                ▶ 1.2s
                <span>Load Speed</span>
              </div>
              <div className="wd-metric">
                📱 100%
                <span>Mobile Ready</span>
              </div>
              <div className="wd-metric">
                🚀 95+
                <span>Performance</span>
              </div>
              <div className="wd-metric">
                🛡️ SSL
                <span>Secured</span>
              </div>
            </div>

            <div className="wd-footer">
              🌍 Serving Businesses Worldwide
            </div>
          </div>

          {/* FLOATING TAGS */}
          <div className="wd-float speed">⚡ 1.2s Load</div>
          <div className="wd-float seo">🔍 SEO Optimized</div>
          <div className="wd-float mobile">📱 Mobile Ready</div>
        </div>
      </div>
    </section>
  );
}
