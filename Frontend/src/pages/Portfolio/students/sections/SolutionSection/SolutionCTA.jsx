import "./SolutionCTA.css";

export default function SolutionCTA() {
  return (
    <section className="solution-cta">
      <h2 className="cta-title">
        <span className="cta-line fade-up">
          A portfolio doesn't just show your work.
        </span>

        <span className="cta-highlight reveal-underline">
          It proves your worth.
        </span>
      </h2>

      <div className="cta-actions">
        <button className="cta-btn primary">
          Book Your Consultation
          <span className="arrow">→</span>
        </button>

        <button className="cta-btn secondary">
          View Pricing Plans
          <span className="arrow">→</span>
        </button>
      </div>
    </section>
  );
}
