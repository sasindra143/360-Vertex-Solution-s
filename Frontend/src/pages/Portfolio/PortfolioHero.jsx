export default function PortfolioHero() {
  return (
    <section className="portfolio-hero">
      <span className="portfolio-badge">
        Interview-Focused Portfolios
      </span>

      <h1>
        Portfolios That <span>Get Shortlisted</span>
      </h1>

      <p>
        We don’t build “pretty” portfolios.
        We build portfolios that prove skills,
        showcase real projects, and convince recruiters.
      </p>

      <div className="portfolio-actions">
        <a href="#projects" className="primary-btn">
          View Sample Work →
        </a>

        <a href="/consultation" className="secondary-btn">
          Book Free Call
        </a>
      </div>
    </section>
  );
}
