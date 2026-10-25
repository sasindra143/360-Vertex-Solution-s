import "./ContactSection.css";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      {/* HEADER */}
      <div className="contact-header">
        <h2>
          Ready to Transform Your <br />
          <span>Career Trajectory?</span>
        </h2>

        <p>
          Stop sending resumes that get ignored. Start showcasing your skills
          with a portfolio that makes recruiters reach out to you.
        </p>
      </div>

      {/* CONTENT */}
      <div className="contact-grid">
        {/* LEFT – FORM */}
        <div className="contact-form-card">
          <h3>Get Started Today</h3>
          <p className="form-subtitle">
            Fill in your details and we’ll get back to you within 24 hours
          </p>

          <form>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" placeholder="+91 9959732476" />
              </div>

              <div className="form-group">
                <label>Current Role</label>
                <input type="text" placeholder="e.g. Product Designer" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Experience Level</label>
                <select>
                  <option>Select experience</option>
                  <option>Fresher</option>
                  <option>0–2 Years</option>
                  <option>2–5 Years</option>
                  <option>5+ Years</option>
                </select>
              </div>

              <div className="form-group">
                <label>Preferred Package</label>
                <select>
                  <option>Select package</option>
                  <option>Professional</option>
                  <option>Standard</option>
                  <option>Signature</option>
                </select>
              </div>
            </div>

            <div className="form-group full">
              <label>Additional Information</label>
              <textarea placeholder="Tell us about your goals, requirements, or questions..." />
            </div>

            <button type="submit" className="contact-btn">
              Request Free Consultation →
            </button>

            <div className="form-meta">
              <span>• No credit card required</span>
              <span>• 100% free consultation</span>
            </div>
          </form>
        </div>

        {/* RIGHT – INFO */}
        <div className="contact-info">
          <div className="info-card">
            <h4>Quick Response</h4>
            <p>We respond within 24 hours to schedule your free consultation call.</p>
          </div>

          <div className="info-card">
            <h4>What You’ll Get</h4>
            <ul>
              <li>Portfolio ready in 3 days</li>
              <li>Mobile-responsive design</li>
              <li>SEO optimized for visibility</li>
              <li>30-day support included</li>
            </ul>
          </div>

          <div className="info-card">
            <h4>Prefer Direct Contact?</h4>
            <div className="direct-links">
              <button>Email</button>
              <button>LinkedIn</button>
              <button>Instagram</button>
            </div>
          </div>

          <div className="quote-card">
            <p>
              “Your portfolio is your digital handshake. Make it unforgettable.”
            </p>
            <span>— 360 VERTEX SOLUTIONS</span>
          </div>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="contact-footer">
        <p>
          We only take <strong>10 new clients per month</strong> to ensure
          exceptional quality.
        </p>

        <div className="contact-badges">
          <span>100% Satisfaction Guarantee</span>
          <span>No Hidden Fees</span>
          <span>Premium Support</span>
        </div>
      </div>
    </section>
  );
}
