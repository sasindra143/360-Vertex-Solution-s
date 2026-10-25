import "./FooterSection.css";
import { COMPANY } from "../../../../../config";

export default function FooterSection() {
  return (
    <footer className="footer-section">
      {/* TOP GLOW LINE */}
      <div className="footer-glow-line top" />

      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-brand">
          <div className="brand-title">
            <span className="brand-dot" />
            <h3>
              360 Vertex Solutions Builds
              <span>Premium Portfolios</span>
            </h3>
          </div>

          <p className="brand-desc">
            Elevating careers through exceptional portfolio design. We craft
            premium, conversion-focused websites that help professionals stand
            out and secure their dream opportunities.
          </p>

          <div className="socials">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Instagram">ig</a>
            <a href="#" aria-label="WhatsApp">wa</a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#portfolio">Portfolios</a></li>
            <li><a href="#process">Process</a></li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div className="footer-links">
          <h4>Resources</h4>
          <ul>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>
            Get exclusive portfolio tips and career insights delivered straight
            to your inbox.
          </p>

          <div className="newsletter-box">
            <input type="email" placeholder="Enter your Gmail" />
            <button>→</button>
          </div>

          <div className="footer-email">
            {COMPANY.email}
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © 2026 All rights reserved by{" "}
          <span>360 Vertex Solutions</span>
        </p>

        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to Top ↑
        </button>
      </div>

      {/* FLOATING DOTS */}
      <div className="footer-particles">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* BOTTOM GLOW LINE */}
      <div className="footer-glow-line bottom" />
    </footer>
  );
}
