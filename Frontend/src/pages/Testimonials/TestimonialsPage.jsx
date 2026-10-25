import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TestimonialsPage.css";

// Note: Testimonials will be fetched from an API/Database in the future.
// This is the frontend structure ready for data.
const TESTIMONIALS = [
  // Example data structure:
  // {
  //   id: 1,
  //   name: "John Doe",
  //   role: "Software Engineer",
  //   company: "Tech Corp",
  //   category: "Academy", // Academy, Digital Marketing, Technology, Career
  //   content: "Vertex Academy helped me transition from a non-tech background to a full-stack developer in 6 months. The hands-on projects were incredible.",
  //   rating: 5,
  //   image: "https://via.placeholder.com/150",
  // }
];

const CATEGORIES = ["All", "Academy", "Digital Marketing", "Technology", "Career"];

export default function TestimonialsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" 
    ? TESTIMONIALS 
    : TESTIMONIALS.filter(t => t.category === filter);

  return (
    <div className="tmp-page">
      {/* HERO */}
      <section className="tmp-hero">
        <div className="tmp-hero__bg">
          <div className="tmp-orb tmp-orb--1" />
        </div>
        <div className="tmp-container">
          <span className="tmp-label">TESTIMONIALS</span>
          <h1 className="tmp-hero__title">
            What Our <span className="tmp-gradient">Clients & Students Say.</span>
          </h1>
          <p className="tmp-hero__desc">
            Real stories and genuine feedback from people who have learned, built, and grown with 360° Vertex Solutions.
          </p>
        </div>
      </section>

      {/* FILTER & GRID */}
      <section className="tmp-section">
        <div className="tmp-container">
          {/* Filters */}
          <div className="tmp-filters">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                className={`tmp-filter-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="tmp-grid">
              {filtered.map(t => (
                <div key={t.id} className="tmp-card">
                  <div className="tmp-card__header">
                    <img src={t.image || "https://ui-avatars.com/api/?name=" + encodeURIComponent(t.name) + "&background=random"} alt={t.name} className="tmp-card__img" />
                    <div>
                      <h3 className="tmp-card__name">{t.name}</h3>
                      <p className="tmp-card__role">{t.role} {t.company && `at ${t.company}`}</p>
                    </div>
                  </div>
                  <div className="tmp-card__rating">
                    {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                  </div>
                  <p className="tmp-card__content">"{t.content}"</p>
                  <span className="tmp-card__cat">{t.category}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="tmp-empty">
              <span className="tmp-empty__icon">💬</span>
              <h3>No testimonials yet</h3>
              <p>Testimonials for {filter !== "All" ? filter : "360° Vertex Solutions"} are being updated. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="tmp-cta">
        <div className="tmp-container">
          <h2>Have you worked with us?</h2>
          <p>We'd love to hear about your experience with 360° Vertex Solutions.</p>
          <button className="tmp-btn" onClick={() => navigate("/contact")}>
            Share Your Feedback
          </button>
        </div>
      </section>
    </div>
  );
}
