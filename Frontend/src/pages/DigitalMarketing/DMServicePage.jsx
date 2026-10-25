import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COMPANY, waLink, telLink, mailLink } from "../../config";
import "../DigitalMarketing/dm-shared.css";

/* Shared FAQ component */
export function DMFAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`dm-faq-item${open ? " dm-faq-item--open" : ""}`}>
      <button className="dm-faq-q" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span style={{ flex: 1 }}>{q}</span>
        <span className="dm-faq-chevron" aria-hidden="true">▾</span>
      </button>
      {open && <div className="dm-faq-a">{a}</div>}
    </div>
  );
}

/* Orbital Radar Graphic Component (matches user reference image) */
export function DMOrbitRadar({ centerTitle = "SEO", nodes = [] }) {
  const defaultNodes = [
    { icon: "🌐", label: "Search Engine" },
    { icon: "💻", label: "Website" },
    { icon: "📄", label: "Content" },
    { icon: "👥", label: "Users" },
    { icon: "📈", label: "Growth" },
    { icon: "⚙️", label: "Technical" },
    { icon: "🔑", label: "Keywords" },
    { icon: "📊", label: "Analytics" },
  ];

  const activeNodes = nodes.length > 0 ? nodes : defaultNodes;

  return (
    <div className="dm-radar-container">
      <div className="dm-radar">
        {/* Orbital Circles */}
        <div className="dm-radar__ring dm-radar__ring--inner" />
        <div className="dm-radar__ring dm-radar__ring--mid" />
        <div className="dm-radar__ring dm-radar__ring--outer" />

        {/* Center Node */}
        <div className="dm-radar__center">
          <div className="dm-radar__center-icon">🔍</div>
          <div className="dm-radar__center-title">{centerTitle}</div>
        </div>

        {/* Orbiting Nodes */}
        {activeNodes.map((n, idx) => (
          <div key={idx} className={`dm-radar__node dm-radar__node--${idx + 1}`}>
            <span className="dm-radar__node-icon">{n.icon}</span>
            <span className="dm-radar__node-label">{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Shared DM Page template */
export default function DMServicePage({
  eyebrow,
  title,
  titleHighlight,
  desc,
  waMsg,
  mailSubject,
  services,
  process,
  faqs,
  related,
  ctaTitle,
  ctaDesc,
  ctaPath,
  ctaLabel = "Get Started",
  accentColor = "#00c6ff",
  radarNodes,
}) {
  const navigate = useNavigate();
  const wa = waLink(waMsg);
  const mail = `mailto:${COMPANY.email}?subject=${encodeURIComponent(mailSubject)}`;

  return (
    <div className="dm-page">
      {/* Breadcrumb */}
      <div className="dm-ct">
        <nav className="dm-breadcrumb" aria-label="Breadcrumb">
          <button onClick={() => navigate("/")}>Home</button>
          <span className="dm-breadcrumb__sep">›</span>
          <button onClick={() => navigate("/digital-marketing")}>Digital Marketing</button>
          <span className="dm-breadcrumb__sep">›</span>
          <span className="dm-breadcrumb__active">{eyebrow}</span>
        </nav>
      </div>

      {/* HERO WITH ORBIT RADAR */}
      <section className="dm-hero" aria-label={`${eyebrow} Hero`}>
        <div className="dm-hero__bg" aria-hidden="true" />
        <div className="dm-hero__grid" aria-hidden="true" />
        <div className="dm-ct">
          <div className="dm-hero__wrapper">
            <div className="dm-hero__inner">
              <div className="dm-hero__eyebrow">
                <span className="dm-hero__dot" style={{ background: accentColor }} aria-hidden="true" />
                DIGITAL MARKETING • {eyebrow.toUpperCase()}
              </div>
              <h1 className="dm-hero__title">
                {title}{" "}
                {titleHighlight && <span className="dm-grad">{titleHighlight}</span>}
              </h1>
              <p className="dm-hero__desc">{desc}</p>
              <div className="dm-hero__ctas">
                <button
                  id={`hero-cta-${eyebrow.toLowerCase().replace(/\s+/g, "-")}`}
                  className="dm-btn dm-btn--primary"
                  onClick={() => navigate(ctaPath || "/contact")}
                >
                  {ctaLabel}
                </button>
                <button className="dm-btn dm-btn--outline" onClick={() => navigate("/contact")}>
                  Build With Us
                </button>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="dm-btn dm-btn--wa">
                  💬 WhatsApp Us
                </a>
              </div>
              <div className="dm-hero__contact">
                <span className="dm-hero__contact-item">
                  <span aria-hidden="true">📞</span>
                  <a href={telLink}>{COMPANY.phone}</a>
                </span>
                <span className="dm-hero__contact-item">
                  <span aria-hidden="true">✉️</span>
                  <a href={mail}>{COMPANY.email}</a>
                </span>
              </div>
            </div>

            {/* RADAR GRAPHIC VISUAL */}
            <div className="dm-hero__visual">
              <DMOrbitRadar centerTitle={eyebrow} nodes={radarNodes} />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      {services && services.length > 0 && (
        <section className="dm-section" aria-labelledby={`${eyebrow}-services-heading`}>
          <div className="dm-ct">
            <div className="dm-section-header dm-section-header--center">
              <span className="dm-section-label">OUR SERVICES</span>
              <h2 className="dm-section-title" id={`${eyebrow}-services-heading`}>What We Offer</h2>
            </div>
            <div className="dm-svc-grid">
              {services.map((svc) => (
                <article key={svc.title} className="dm-svc-card">
                  <div className="dm-svc-card__icon" aria-hidden="true">{svc.icon}</div>
                  <h3 className="dm-svc-card__title">{svc.title}</h3>
                  <p className="dm-svc-card__desc">{svc.desc}</p>
                  {svc.items && (
                    <ul className="dm-svc-card__list">
                      {svc.items.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS */}
      {process && process.length > 0 && (
        <section className="dm-section dm-section--alt" aria-labelledby={`${eyebrow}-process-heading`}>
          <div className="dm-ct">
            <div className="dm-section-header dm-section-header--center">
              <span className="dm-section-label">HOW WE WORK</span>
              <h2 className="dm-section-title" id={`${eyebrow}-process-heading`}>Our Process</h2>
            </div>
            <div className="dm-process">
              {process.map((step) => (
                <div key={step.title} className="dm-process-card">
                  <div className="dm-process-card__num">{step.num}</div>
                  <div className="dm-process-card__icon" aria-hidden="true">{step.icon}</div>
                  <h3 className="dm-process-card__title">{step.title}</h3>
                  <p className="dm-process-card__desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <section className="dm-section dm-section--dark" aria-labelledby={`${eyebrow}-faq-heading`}>
          <div className="dm-ct">
            <div className="dm-section-header dm-section-header--center">
              <span className="dm-section-label">QUESTIONS</span>
              <h2 className="dm-section-title" id={`${eyebrow}-faq-heading`}>Frequently Asked Questions</h2>
            </div>
            <div className="dm-faq">
              {faqs.map((faq) => (
                <DMFAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="dm-cta-section" aria-labelledby={`${eyebrow}-cta-heading`}>
        <div className="dm-cta-bg" aria-hidden="true" />
        <div className="dm-ct dm-cta-inner">
          <h2 className="dm-cta-title" id={`${eyebrow}-cta-heading`}>
            {ctaTitle || `Ready to Get Started?`}
          </h2>
          <p className="dm-cta-desc">{ctaDesc || "Let's discuss how we can help your business grow."}</p>
          <div className="dm-cta-btns">
            <button
              id={`cta-main-${eyebrow.toLowerCase().replace(/\s+/g, "-")}`}
              className="dm-btn dm-btn--primary"
              onClick={() => navigate(ctaPath || "/contact")}
            >
              {ctaLabel}
            </button>
            <button className="dm-btn dm-btn--outline" onClick={() => navigate("/contact")}>
              Build With Us
            </button>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="dm-btn dm-btn--wa">
              💬 WhatsApp Us
            </a>
            <a href={mail} className="dm-btn dm-btn--ghost">
              ✉️ Email Us
            </a>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related && related.length > 0 && (
        <section className="dm-section dm-section--dark" aria-labelledby={`${eyebrow}-related-heading`}>
          <div className="dm-ct">
            <div className="dm-section-header dm-section-header--center">
              <span className="dm-section-label">EXPLORE MORE</span>
              <h2 className="dm-section-title" id={`${eyebrow}-related-heading`}>Related Services</h2>
            </div>
            <div className="dm-related-grid">
              {related.map(r => (
                <button
                  key={r.label}
                  className="dm-related-card"
                  onClick={() => navigate(r.path)}
                  aria-label={`Go to ${r.label}`}
                >
                  <div className="dm-related-card__icon" aria-hidden="true">{r.icon}</div>
                  <div className="dm-related-card__label">{r.label}</div>
                  <div className="dm-related-card__arrow">→</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
