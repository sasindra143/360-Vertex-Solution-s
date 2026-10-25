import "./PricingSection.css";

export default function PricingSection() {
  return (
    <section className="pricing-section" id="pricing">
      {/* ================= HEADER ================= */}
      <div className="pricing-header">
        <span className="pricing-pill">PRICING</span>

        <h2 className="pricing-title">
          Choose Your <span>Growth Path</span>
        </h2>

        <p className="pricing-subtitle">
          One-time investment. No hidden fees.
        </p>
      </div>

      {/* ================= PRICING CARDS ================= */}
      <div className="pricing-grid">
        {/* PROFESSIONAL */}
        <div className="pricing-card">
          <span className="pricing-tag">PERFECT FOR JOB SEEKERS</span>
          <h3>Professional</h3>

          <p className="pricing-desc">
            Perfect for job seekers who want a clean, professional online
            presence.
          </p>

          <div className="price">
            ₹499 <span>one-time payment</span>
          </div>

          <ul>
            <li>Multi-section portfolio website</li>
            <li>Fully responsive design</li>
            <li>Free domain & hosting</li>
            <li>Resume download button</li>
            <li>Contact form & email integration</li>
            <li>GitHub & WhatsApp integration</li>
            <li>Up to 5 projects</li>
            <li>Certificate showcase</li>
            <li>Delivery within 3 days</li>
          </ul>

          <button className="pricing-btn">
            Build Your Portfolio →
          </button>
        </div>

        {/* STANDARD */}
        <div className="pricing-card popular">
          <span className="most-popular">MOST POPULAR</span>
          <span className="pricing-tag">MOST POPULAR CHOICE</span>

          <h3>Standard</h3>

          <p className="pricing-desc">
            Built for professionals who want customization and stronger
            branding.
          </p>

          <div className="price">
            ₹999 <span>one-time payment</span>
          </div>

          <ul>
            <li>Everything in Professional</li>
            <li>Add 5–7 projects</li>
            <li>Smooth premium animations</li>
            <li>Dedicated project pages</li>
            <li>Custom sections & layout</li>
            <li>Color, font & layout control</li>
            <li>Priority delivery (3 days)</li>
          </ul>

          <button className="pricing-btn glow">
            Get Your Portfolio →
          </button>
        </div>

        {/* SIGNATURE */}
        <div className="pricing-card">
          <span className="pricing-tag">PREMIUM CUSTOM DESIGN</span>

          <h3>Signature</h3>

          <p className="pricing-desc">
            For freelancers & professionals who want a fully custom portfolio.
          </p>

          <div className="price">
            ₹1499 <span>onwards</span>
          </div>

          <ul>
            <li>Everything in Standard</li>
            <li>Fully custom UI/UX</li>
            <li>Premium animations</li>
            <li>Up to 10 projects</li>
            <li>Blogs / Services / Testimonials</li>
            <li>SEO optimization</li>
            <li>Analytics integration</li>
            <li>Delivery within 1 week</li>
          </ul>

          <button className="pricing-btn">
            Contact Us →
          </button>
        </div>
      </div>

      {/* ================= DIVIDER DOT ================= */}
      <div className="pricing-dot-divider">
        <span></span>
      </div>

      {/* ================= CUSTOM WEBSITE CTA ================= */}
      <div className="custom-website-cta">
        <h3>
          Looking to build a <span>Custom Website?</span>
        </h3>

        <p>
          We'll help you build a custom website with the right structure,
          features, and design to match your business needs.
        </p>

        <button className="custom-cta-btn">
          Let’s Discuss →
        </button>
      </div>
    </section>
  );
}
