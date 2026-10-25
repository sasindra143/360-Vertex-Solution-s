import "./WhyChoose.css";

export default function WhyChoose() {
  return (
    <section className="why-choose">
      <div className="why-container">
        <h2 className="why-title">
          Why Choose <span>360 Vertex Solutions?</span>
        </h2>

        <p className="why-subtitle">
          Compare us with typical web agencies and see the difference.
        </p>

        {/* Comparison Table */}
        <div className="why-table">
          <div className="why-row head">
            <div>Feature</div>
            <div>Other Agencies</div>
            <div className="highlight">360 Vertex</div>
          </div>

          <div className="why-row">
            <div>Design Approach</div>
            <div>Templates</div>
            <div className="highlight">100% Custom</div>
          </div>

          <div className="why-row">
            <div>Starting Price</div>
            <div>₹25,000+</div>
            <div className="highlight">₹5,000</div>
          </div>

          <div className="why-row">
            <div>Advance Payment</div>
            <div>50% Upfront</div>
            <div className="highlight">₹0 Advance</div>
          </div>

          <div className="why-row">
            <div>Delivery Time</div>
            <div>2–4 Weeks</div>
            <div className="highlight">24–72 Hours</div>
          </div>

          <div className="why-row">
            <div>Website Speed</div>
            <div>3–5 Seconds</div>
            <div className="highlight">Under 1.2s</div>
          </div>

          <div className="why-row">
            <div>Support</div>
            <div>Limited</div>
            <div className="highlight">Lifetime</div>
          </div>
        </div>
      </div>
    </section>
  );
}
