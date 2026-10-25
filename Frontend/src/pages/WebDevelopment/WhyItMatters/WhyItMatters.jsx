import "./WhyItMatters.css";

export default function WhyItMatters() {
  return (
    <section className="why-it-matters">
      <div className="wim-container">

        <span className="wim-pill">Why It Matters</span>

        <h2 className="wim-title">
          Why Professional{" "}
          <span>Website Development</span>{" "}
          Matters
        </h2>

        <p className="wim-subtitle">
          Your website is often the first impression customers have of your
          business. Make it count.
        </p>

        {/* STATS */}
        <div className="wim-stats">
          <div className="wim-stat blue">
            <h3>75%</h3>
            <p>Judge by Design</p>
          </div>

          <div className="wim-stat green">
            <h3>0.05s</h3>
            <p>First Impression</p>
          </div>

          <div className="wim-stat orange">
            <h3>24/7</h3>
            <p>Always Working</p>
          </div>

          <div className="wim-stat purple">
            <h3>3x</h3>
            <p>More Conversions</p>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="wim-cards">
          <div className="wim-card">
            <h4>Works 24/7 For You</h4>
            <p>
              Your website works around the clock, reaching customers while
              you sleep and converting visitors into paying clients.
            </p>
          </div>

          <div className="wim-card">
            <h4>First Impressions Matter</h4>
            <p>
              75% of users judge credibility by design. You get only 0.05
              seconds to make an impact.
            </p>
          </div>

          <div className="wim-card">
            <h4>Performance = Results</h4>
            <p>
              Faster websites rank higher on Google and directly improve
              conversions and revenue.
            </p>
          </div>

          <div className="wim-card">
            <h4>Professional Edge</h4>
            <p>
              A polished website instantly signals trust, authority, and
              professionalism.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
