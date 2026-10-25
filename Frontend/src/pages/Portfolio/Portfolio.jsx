import PortfolioHero from "./PortfolioHero";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <main className="portfolio-page">
      <PortfolioHero />

      {/* Add other portfolio sections here later */}
      {/* Example:
          <Projects />
          <Testimonials />
      */}
    </main>
  );
}
