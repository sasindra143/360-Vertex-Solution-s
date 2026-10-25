import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(visualRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
        .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const tags = [
    "Custom web development",
    "E-commerce websites",
    "CRM & web applications",
    "SEO-ready design",
  ];

  return (
    <section className="hero" ref={heroRef} id="home">
      {/* ANIMATED BACKGROUND */}
      <div className="hero-bg">
        <div className="hero-gradient" />
        <div className="hero-grid" />
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />
        {/* Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="hero-particle" style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${i % 6}s`,
            animationDuration: `${4 + (i % 4)}s`
          }} />
        ))}
      </div>

      <div className="hero-container">
        {/* LEFT: TEXT */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            360° Vertex Solutions — Web Development for Growing Businesses
          </div>

          <h1 className="hero-title" ref={titleRef}>
            Web Development That <span className="gradient-text">Grows Your Business.</span>
          </h1>

          <p className="hero-subtitle" ref={subtitleRef}>
            360° Vertex Solutions designs and develops professional business websites, responsive websites, e-commerce stores and custom web applications.
            We also build CRM systems and admin dashboards, with SEO-ready structure and digital marketing to help customers find your business.
          </p>

          <div className="hero-cta" ref={ctaRef}>
            <button
              className="btn-primary"
              onClick={() => navigate("/technology/web-development")}
              id="hero-explore-web-development"
            >
              See Website Services
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate("/contact")}
              id="hero-build-with-us"
            >
              Get a Free Consultation
            </button>
          </div>

          <div className="hero-tags">
            {tags.map((t, i) => (
              <span key={i} className="hero-tag">{t}</span>
            ))}
          </div>
        </div>

        {/* RIGHT: VERTEX SOLUTIONS WEB DEVELOPMENT FOCUS */}
        <div className="hero-visual" ref={visualRef}>
          <div className="hero-focus-card">
            <div className="hero-focus-card__brand">
              <img
                src="/vertex-solutions-logo.png"
                alt="360° Vertex Solutions logo"
                className="hero-focus-card__logo"
              />
              <div>
                <span className="hero-focus-card__eyebrow">360° VERTEX SOLUTIONS</span>
                <h2>Web Development & Digital Solutions</h2>
                <p>Learn. Build. Launch. Grow.</p>
              </div>
            </div>
            <div className="hero-focus-card__divider" />
            <span className="hero-focus-card__label">WHAT WE BUILD</span>
            <div className="hero-focus-card__keywords">
              {[
                "Business website development",
                "Custom website design",
                "Responsive web design",
                "E-commerce website development",
                "Web application development",
                "CRM & admin dashboards",
                "Full-stack web development",
                "SEO-friendly websites",
                "Landing pages & booking sites",
                "Website maintenance & support",
              ].map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
            <div className="hero-focus-card__footer">
              <span aria-hidden="true">●</span>
              Websites made around your business goals
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="hero-strip">
        <span>🌐 Website development</span>
        <span className="strip-div">|</span>
        <span>🛒 E-commerce websites</span>
        <span className="strip-div">|</span>
        <span>💻 Custom web applications</span>
        <span className="strip-div">|</span>
        <span>📈 SEO & digital marketing</span>
      </div>
    </section>
  );
}
