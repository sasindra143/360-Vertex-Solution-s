import "./CtaSection.css";

export default function CtaSection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Ready to Get Started?</h2>

        <p className="cta-subtitle">
          Book your free consultation call today and take the first step toward
          building a portfolio that gets interview calls and recruiter attention
        </p>

        <button className="cta-button">
          Schedule Your Call Now
          <span className="cta-arrow">→</span>
        </button>

        <div className="cta-meta">
          <span>No credit card required</span>
          <span className="cta-dot">•</span>
          <span>No obligation</span>
          <span className="cta-dot">•</span>
          <span>100% free consultation</span>
        </div>
      </div>
    </section>
  );
}
