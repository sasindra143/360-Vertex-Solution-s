import { useState } from "react";
import "./PortfolioMainPage.css";

const portfolioServices = [
  {
    title: "Students / Job Seekers",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    points: [
      "ATS-friendly portfolio structure",
      "Real academic & mini projects",
      "Recruiter-focused presentation",
    ],
    link: "/portfolio/students",
  },
  {
    title: "Content Creators",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=80",
    points: [
      "Personal brand focused design",
      "Showcase videos & social proof",
      "Audience growth optimized",
    ],
    link: "/portfolio/content-creators",
  },
  {
    title: "Digital Marketers",
    image:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=900&q=80",
    points: [
      "Campaign & case study showcase",
      "Performance metrics display",
      "Client conversion optimized",
    ],
    link: "/portfolio/digital-marketing",
  },
  {
    title: "Working Professionals",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    points: [
      "Role-based portfolio layout",
      "Experience & impact driven",
      "Career growth focused",
    ],
    link: "/portfolio/professionals",
  },
];

export default function PortfolioMainPage() {
  const [search, setSearch] = useState("");

  const filtered = portfolioServices.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="portfolio-page">
      {/* ================= HEADER ================= */}
      <div className="portfolio-header">
        <h1>
          Portfolio <span>Creation</span>
        </h1>

        <p>
          Choose a portfolio designed specifically for your career and goals.
        </p>

        <input
          type="text"
          placeholder="Search portfolio type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ================= GRID ================= */}
      <div className="portfolio-grid">
        {filtered.map((item, index) => (
          <div className="portfolio-card" key={index}>
            <img src={item.image} alt={item.title} />

            <div className="card-content">
              <h3>{item.title}</h3>

              <ul>
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              {/* ✅ OPEN IN NEW TAB (FULL ISOLATION) */}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="more-btn"
              >
                More →
              </a>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="no-results">No results found.</p>
        )}
      </div>
    </section>
  );
}
