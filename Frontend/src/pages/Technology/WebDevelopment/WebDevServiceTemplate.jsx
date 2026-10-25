import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COMPANY, waLink, telLink } from "../../../config";
import "./webdev-shared.css";

/* FAQ Accordion Component */
function FAQItem({ q, a }) {
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

/* Master Web Development Service Template */
export default function WebDevServiceTemplate({
  eyebrow = "WEB DEVELOPMENT",
  serviceId = "web-development",
  title = "Build Websites That Work",
  titleHighlight = "for Your Business.",
  desc = "Responsive, scalable, and modern web experiences built for high performance and results.",
  targetUsers = [],
  features = [],
  solutionPoints = [],
  aiOptions = [],
  techStack,
  faqs = [],
  related = [],
  ctaTitle,
  ctaDesc,
}) {
  const navigate = useNavigate();

  // Contact links
  const waMsg = `Hello 360° Vertex Solutions, I would like to discuss building a ${eyebrow.toLowerCase()}.`;
  const wa = waLink(waMsg);
  const mailSubject = `${eyebrow} Enquiry — 360° Vertex Solutions`;
  const mail = `mailto:${COMPANY.email}?subject=${encodeURIComponent(mailSubject)}`;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    budget: "$1k - $5k",
    timeline: "1 - 2 months",
    description: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const message = `Hello 360° Vertex Solutions,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${eyebrow}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\nDescription: ${formData.description}`;
    window.open(waLink(message), "_blank");
  };

  const defaultTechStack = {
    frontend: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Bootstrap"],
    backend: ["Node.js", "Express.js", "Java", "Spring Boot"],
    database: ["MySQL", "PostgreSQL", "MongoDB"],
    tools: ["Git", "GitHub", "Docker", "REST APIs"],
    deployment: ["Cloud", "Linux", "CI/CD", "HTTPS", "CDN"],
  };

  const stack = techStack || defaultTechStack;

  const processSteps = [
    { num: "01", title: "Discover", desc: "Analyze business goals, audience, and technical scope." },
    { num: "02", title: "Plan", desc: "Map architecture, user journeys, and feature specs." },
    { num: "03", title: "Wireframe", desc: "Create structural layouts and interface wireframes." },
    { num: "04", title: "Design", desc: "Craft modern UI/UX design with brand styling." },
    { num: "05", title: "Develop", desc: "Build frontend UI, backend APIs, and database." },
    { num: "06", title: "Test", desc: "Comprehensive testing for performance, security & QA." },
    { num: "07", title: "Deploy", desc: "Launch to production with SSL, CDN, and monitoring." },
    { num: "08", title: "Maintain", desc: "Ongoing security patches, updates, and maintenance." },
  ];

  return (
    <div className="wd-page">
      {/* BREADCRUMB */}
      <div className="wd-ct">
        <nav className="wd-breadcrumb" aria-label="Breadcrumb">
          <button onClick={() => navigate("/")}>Home</button>
          <span className="wd-breadcrumb__sep">›</span>
          <button onClick={() => navigate("/technology")}>Technology</button>
          <span className="wd-breadcrumb__sep">›</span>
          <button onClick={() => navigate("/technology/web-development")}>Web Development</button>
          <span className="wd-breadcrumb__sep">›</span>
          <span className="wd-breadcrumb__active">{eyebrow}</span>
        </nav>
      </div>

      {/* HERO SECTION */}
      <section className="wd-hero" aria-label={`${eyebrow} Hero`}>
        <div className="wd-hero__bg" aria-hidden="true" />
        <div className="wd-hero__grid-bg" aria-hidden="true" />
        <div className="wd-ct">
          <div className="wd-hero__wrapper">
            <div className="wd-hero__inner">
              <div className="wd-hero__eyebrow">
                <span className="wd-hero__dot" aria-hidden="true" />
                TECHNOLOGY • {eyebrow.toUpperCase()}
              </div>
              <h1 className="wd-hero__title">
                {title}{" "}
                {titleHighlight && <span className="wd-grad">{titleHighlight}</span>}
              </h1>
              <p className="wd-hero__desc">{desc}</p>
              <div className="wd-hero__ctas">
                <button
                  id={`wd-hero-btn-${serviceId}`}
                  className="wd-btn wd-btn--primary"
                  onClick={() => navigate(`/contact?service=${serviceId}`)}
                >
                  Build My {eyebrow}
                </button>
                <button className="wd-btn wd-btn--outline" onClick={() => navigate(`/contact?service=${serviceId}`)}>
                  Get a Quote
                </button>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="wd-btn wd-btn--wa">
                  💬 WhatsApp Us
                </a>
              </div>
              <div className="wd-hero__contact">
                <span className="wd-hero__contact-item">
                  <span aria-hidden="true">📞</span>
                  <a href={telLink}>{COMPANY.phone}</a>
                </span>
                <span className="wd-hero__contact-item">
                  <span aria-hidden="true">✉️</span>
                  <a href={mail}>{COMPANY.email}</a>
                </span>
              </div>
            </div>

            {/* AI-GENERATED COMMAND CENTER VISUAL */}
            <div className="wd-hero__visual">
              <div className="wd-hero__cmd">
                <div className="wd-cmd__header">
                  <div className="wd-cmd__dots">
                    <span className="wd-cmd__dot wd-cmd__dot--red" />
                    <span className="wd-cmd__dot wd-cmd__dot--yellow" />
                    <span className="wd-cmd__dot wd-cmd__dot--green" />
                  </div>
                  <span className="wd-cmd__title">{eyebrow} COMMAND CENTER</span>
                </div>
                <div className="wd-cmd__grid">
                  <div className="wd-cmd__node">
                    <span className="wd-cmd__icon">💻</span>
                    <div>
                      <div className="wd-cmd__label">Frontend UI</div>
                      <div className="wd-cmd__sub">React / Tailwind</div>
                    </div>
                  </div>
                  <div className="wd-cmd__node">
                    <span className="wd-cmd__icon">⚙️</span>
                    <div>
                      <div className="wd-cmd__label">Backend API</div>
                      <div className="wd-cmd__sub">Node / Spring Boot</div>
                    </div>
                  </div>
                  <div className="wd-cmd__node">
                    <span className="wd-cmd__icon">🗄️</span>
                    <div>
                      <div className="wd-cmd__label">Database</div>
                      <div className="wd-cmd__sub">PostgreSQL / Mongo</div>
                    </div>
                  </div>
                  <div className="wd-cmd__node">
                    <span className="wd-cmd__icon">🔒</span>
                    <div>
                      <div className="wd-cmd__label">Security</div>
                      <div className="wd-cmd__sub">HTTPS / Auth / RBAC</div>
                    </div>
                  </div>
                  <div className="wd-cmd__node">
                    <span className="wd-cmd__icon">⚡</span>
                    <div>
                      <div className="wd-cmd__label">Performance</div>
                      <div className="wd-cmd__sub">Fast CDN & SEO</div>
                    </div>
                  </div>
                  <div className="wd-cmd__node">
                    <span className="wd-cmd__icon">☁️</span>
                    <div>
                      <div className="wd-cmd__label">Cloud Deploy</div>
                      <div className="wd-cmd__sub">Docker & CI/CD</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TARGET USERS / WHO IT IS FOR */}
      {targetUsers.length > 0 && (
        <section className="wd-section wd-section--alt" aria-label="Who It Is For">
          <div className="wd-ct">
            <div className="wd-section-header wd-section-header--center">
              <span className="wd-section-label">TARGET AUDIENCE</span>
              <h2 className="wd-section-title">Who This Is For</h2>
              <p className="wd-section-desc">Tailored solutions engineered specifically for your organizational requirements.</p>
            </div>
            <div className="wd-grid-2">
              {targetUsers.map((item, idx) => (
                <div key={idx} className="wd-card-glass">
                  <div className="wd-card-glass__icon">{item.icon || "🎯"}</div>
                  <h3 className="wd-card-glass__title">{item.title}</h3>
                  <p className="wd-card-glass__desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* KEY FEATURES */}
      {features.length > 0 && (
        <section className="wd-section" aria-label="Key Features">
          <div className="wd-ct">
            <div className="wd-section-header wd-section-header--center">
              <span className="wd-section-label">KEY FEATURES</span>
              <h2 className="wd-section-title">Core Capabilities & Features</h2>
              <p className="wd-section-desc">Every element engineered for modern speed, usability, and growth.</p>
            </div>
            <div className="wd-svc-grid">
              {features.map((feat, idx) => (
                <div key={idx} className="wd-feature-chip">
                  <span className="wd-feature-chip__icon">{feat.icon || "⚡"}</span>
                  <span>{feat.label || feat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DEVELOPMENT PROCESS */}
      <section className="wd-section wd-section--alt" aria-label="Development Process">
        <div className="wd-ct">
          <div className="wd-section-header wd-section-header--center">
            <span className="wd-section-label">HOW WE BUILD</span>
            <h2 className="wd-section-title">Structured Development Lifecycle</h2>
            <p className="wd-section-desc">From initial discovery to post-launch maintenance, we follow proven engineering standards.</p>
          </div>
          <div className="wd-process">
            {processSteps.map((step) => (
              <div key={step.num} className="wd-process-step">
                <div className="wd-process-step__num">{step.num}</div>
                <h3 className="wd-process-step__title">{step.title}</h3>
                <p className="wd-process-step__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY STACK */}
      <section className="wd-section" aria-label="Technology Stack">
        <div className="wd-ct">
          <div className="wd-section-header wd-section-header--center">
            <span className="wd-section-label">TECH STACK</span>
            <h2 className="wd-section-title">Modern Engineering Stack</h2>
            <p className="wd-section-desc">We use industry-standard frameworks and tools to build robust applications.</p>
          </div>
          <div className="wd-tech-grid">
            <div className="wd-tech-card">
              <div className="wd-tech-card__cat">Frontend</div>
              <div className="wd-tech-card__tags">
                {stack.frontend.map(t => <span key={t} className="wd-tech-tag">{t}</span>)}
              </div>
            </div>
            <div className="wd-tech-card">
              <div className="wd-tech-card__cat">Backend</div>
              <div className="wd-tech-card__tags">
                {stack.backend.map(t => <span key={t} className="wd-tech-tag">{t}</span>)}
              </div>
            </div>
            <div className="wd-tech-card">
              <div className="wd-tech-card__cat">Database</div>
              <div className="wd-tech-card__tags">
                {stack.database.map(t => <span key={t} className="wd-tech-tag">{t}</span>)}
              </div>
            </div>
            <div className="wd-tech-card">
              <div className="wd-tech-card__cat">Tools & APIs</div>
              <div className="wd-tech-card__tags">
                {stack.tools.map(t => <span key={t} className="wd-tech-tag">{t}</span>)}
              </div>
            </div>
            <div className="wd-tech-card">
              <div className="wd-tech-card__cat">Deployment</div>
              <div className="wd-tech-card__tags">
                {stack.deployment.map(t => <span key={t} className="wd-tech-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI & AUTOMATION SECTION */}
      <section className="wd-section wd-section--dark" aria-label="AI Automation Options">
        <div className="wd-ct">
          <div className="wd-ai-box">
            <div>
              <span className="wd-section-label">OPTIONAL CAPABILITY</span>
              <h2 className="wd-section-title" style={{ fontSize: "1.8rem" }}>Make Your Website Smarter With AI</h2>
              <p className="wd-section-desc">Integrate optional AI features like chatbots, automated lead qualification, smart search, and workflow automation.</p>
              <div style={{ marginTop: "24px" }}>
                <button className="wd-btn wd-btn--primary" onClick={() => navigate(`/contact?service=${serviceId}&ai=true`)}>
                  Add AI to My Website
                </button>
              </div>
            </div>
            <div className="wd-ai-chips">
              {(aiOptions.length > 0 ? aiOptions : [
                "AI Chatbot & Support",
                "AI Customer Search",
                "AI Lead Qualification",
                "WhatsApp Automation",
                "Email Automation",
                "AI Recommendations"
              ]).map((opt, i) => (
                <div key={i} className="wd-ai-chip">
                  <span>🤖</span>
                  <span>{opt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY & PERFORMANCE */}
      <section className="wd-section" aria-label="Security and Performance">
        <div className="wd-ct">
          <div className="wd-section-header wd-section-header--center">
            <span className="wd-section-label">ENTERPRISE STANDARDS</span>
            <h2 className="wd-section-title">Security & SEO Optimization Built-In</h2>
          </div>
          <div className="wd-grid-2">
            <div className="wd-card-glass">
              <div className="wd-card-glass__icon">🔒</div>
              <h3 className="wd-card-glass__title">Security First Architecture</h3>
              <p className="wd-card-glass__desc">
                HTTPS SSL encryption, Role-Based Access Control (RBAC), SQL Injection protection, XSS / CSRF defenses, password hashing, and secure API rate-limiting.
              </p>
            </div>
            <div className="wd-card-glass">
              <div className="wd-card-glass__icon">🚀</div>
              <h3 className="wd-card-glass__title">SEO & Speed Performance</h3>
              <p className="wd-card-glass__desc">
                Clean HTML5 semantic structure, fast Core Web Vitals, OpenGraph meta data, automatic sitemap inclusion, CDN caching, and mobile responsive optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      {faqs.length > 0 && (
        <section className="wd-section wd-section--alt" aria-label="Frequently Asked Questions">
          <div className="wd-ct">
            <div className="wd-section-header wd-section-header--center">
              <span className="wd-section-label">FAQ</span>
              <h2 className="wd-section-title">Frequently Asked Questions</h2>
            </div>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROJECT ENQUIRY FORM */}
      <section className="wd-section" aria-label="Project Enquiry">
        <div className="wd-ct">
          <div className="wd-section-header wd-section-header--center">
            <span className="wd-section-label">START A PROJECT</span>
            <h2 className="wd-section-title">Discuss Your {eyebrow} Requirement</h2>
            <p className="wd-section-desc">Fill out the project enquiry form below or connect directly via WhatsApp.</p>
          </div>
          <div className="wd-enquiry">
            <form onSubmit={handleFormSubmit} className="wd-form-grid">
              <div className="wd-form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="wd-form-input"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="wd-form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="wd-form-input"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="wd-form-group">
                <label>Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9959732476"
                  className="wd-form-input"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="wd-form-group">
                <label>Service Requested</label>
                <input type="text" readOnly value={eyebrow} className="wd-form-input" style={{ opacity: 0.8 }} />
              </div>
              <div className="wd-form-group">
                <label>Budget Range</label>
                <select
                  className="wd-form-select"
                  value={formData.budget}
                  onChange={e => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option value="Under $1k">Under $1k</option>
                  <option value="$1k - $5k">$1k - $5k</option>
                  <option value="$5k - $10k">$5k - $10k</option>
                  <option value="$10k+">$10k+</option>
                </select>
              </div>
              <div className="wd-form-group">
                <label>Timeline</label>
                <select
                  className="wd-form-select"
                  value={formData.timeline}
                  onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                >
                  <option value="Urgent (< 2 weeks)">Urgent (&lt; 2 weeks)</option>
                  <option value="1 - 2 months">1 - 2 months</option>
                  <option value="3+ months">3+ months</option>
                </select>
              </div>
              <div className="wd-form-group wd-form-group--full">
                <label>Project Description *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Briefly describe what you want to build..."
                  className="wd-form-textarea"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="wd-form-group wd-form-group--full">
                <button type="submit" className="wd-btn wd-btn--primary" style={{ width: "100%" }}>
                  Submit Enquiry via WhatsApp →
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      {related.length > 0 && (
        <section className="wd-section wd-section--dark" aria-label="Related Services">
          <div className="wd-ct">
            <div className="wd-section-header wd-section-header--center">
              <span className="wd-section-label">EXPLORE MORE</span>
              <h2 className="wd-section-title">Related Web Development Services</h2>
            </div>
            <div className="dm-related-grid">
              {related.map((r, idx) => (
                <button
                  key={idx}
                  className="dm-related-card"
                  onClick={() => navigate(r.path)}
                >
                  <div className="dm-related-card__icon">{r.icon || "💻"}</div>
                  <div className="dm-related-card__label">{r.label}</div>
                  <div className="dm-related-card__arrow">→</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="wd-cta-section" aria-label="Final Call to Action">
        <div className="wd-ct">
          <h2 className="wd-cta-title">
            Have a {eyebrow} Idea?
          </h2>
          <p className="wd-cta-desc">
            {ctaDesc || "Tell us what you want to build and we'll help you turn the idea into a practical digital solution."}
          </p>
          <div className="wd-cta-btns">
            <button
              id={`wd-final-btn-${serviceId}`}
              className="wd-btn wd-btn--primary"
              onClick={() => navigate(`/contact?service=${serviceId}`)}
            >
              Build With Us
            </button>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="wd-btn wd-btn--wa">
              💬 WhatsApp Us
            </a>
            <a href={mail} className="wd-btn wd-btn--ghost">
              ✉️ Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
