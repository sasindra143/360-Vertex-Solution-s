import { Link, useLocation, useNavigate } from "react-router-dom";
import { waLink } from "../../config";
import "./TechnologyPage.css";

const TECH_SERVICES = [
  {
    cat: "Business & Portfolio Websites",
    color: "#06b6d4",
    icon: "🌐",
    items: ["Corporate Websites", "Personal Portfolios", "Landing Pages", "CMS Development"],
  },
  {
    cat: "Custom Web Applications",
    color: "#6366f1",
    icon: "💻",
    items: ["SaaS Platforms", "Dashboards", "Internal Tools", "API Development"],
  },
  {
    cat: "E-Commerce Solutions",
    color: "#f59e0b",
    icon: "🛒",
    items: ["Online Stores", "Payment Integration", "Inventory Management", "Custom Carts"],
  },
  {
    cat: "AI & Automation Integration",
    color: "#8b5cf6",
    icon: "🤖",
    items: ["AI Chatbots", "Process Automation", "LLM Integration", "Data Scraping"],
  },
  {
    cat: "Prompt Engineering",
    color: "#d946ef",
    icon: "✍️",
    items: ["Reusable AI prompts", "Role and context design", "Structured output prompts", "Prompt testing and refinement"],
  },
  {
    cat: "Maintenance & Support",
    color: "#10b981",
    icon: "🛠️",
    items: ["Website Updates", "Performance Optimization", "Security Audits", "Hosting Support"],
  },
];

const PROMPT_NOTES = [
  {
    title: "Set a clear role and goal",
    text: "Tell the AI what role to take and exactly what outcome you need.",
    example: "Act as a product copywriter. Write a concise description for a reusable water bottle.",
  },
  {
    title: "Add useful context",
    text: "Include your audience, brand voice, constraints, and any source material the answer should use.",
    example: "Audience: first-time hikers. Voice: friendly and practical. Avoid unsupported claims.",
  },
  {
    title: "Specify the output format",
    text: "Request the structure you can use directly, such as a table, checklist, JSON object, or short sections.",
    example: "Return three headline options, each under 10 words, followed by one sentence of rationale.",
  },
  {
    title: "Iterate and verify",
    text: "Review the result, identify what is missing, and refine the prompt. Check factual claims before using them.",
    example: "Revise option 2 to sound more approachable. Keep the meaning and stay under 8 words.",
  },
];

const STACK = [
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "MongoDB", icon: "🍃" },
  { name: "AWS", icon: "☁️" },
  { name: "Figma", icon: "🎨" },
];

export default function TechnologyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const notesOpen = new URLSearchParams(location.search).get("notes") === "prompts";

  function closeNotes() {
    navigate("/technology", { replace: true });
  }

  return (
    <div className="tp-page">
      {/* HERO */}
      <section className="tp-hero">
        <div className="tp-hero__bg">
          <div className="tp-orb tp-orb--1" />
          <div className="tp-orb tp-orb--2" />
        </div>
        <div className="tp-container">
          <span className="tp-label">TECHNOLOGY SOLUTIONS</span>
          <h1 className="tp-hero__title">
            Build Scalable. <span className="tp-gradient">Deploy Faster.</span>
          </h1>
          <p className="tp-hero__desc">
            From stunning portfolios to complex web applications and AI automations, we engineer digital solutions that solve real business problems.
          </p>
          <div className="tp-hero__cta">
            <button className="tp-btn tp-btn--primary" onClick={() => navigate("/contact")}>
              Discuss Your Project
            </button>
            <a href={waLink("Hello, I need technology solutions / web development services.")} target="_blank" rel="noopener noreferrer" className="tp-btn tp-btn--wa">
              💬 Chat with Dev Team
            </a>
            <Link to="/students/notes" className="tp-btn tp-btn--notes">
              📝 Student Notes
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="tp-section">
        <div className="tp-container">
          <div className="tp-section-header">
            <span className="tp-label">WHAT WE BUILD</span>
            <h2 className="tp-section-title">End-to-End Development</h2>
          </div>
          <div className="tp-services-grid">
            {TECH_SERVICES.map((srv, i) => (
              <div key={i} className="tp-service-card" style={{ "--cat-color": srv.color }}>
                <span className="tp-service-card__icon">{srv.icon}</span>
                <h3>{srv.cat}</h3>
                <ul className="tp-service-card__list">
                  {srv.items.map((item, j) => (
                    <li key={j}>
                      <span className="tp-service-card__dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMPT ENGINEERING */}
      <section className="tp-section tp-prompt" aria-labelledby="tp-prompt-title">
        <div className="tp-container">
          <div className="tp-prompt__content">
            <div>
              <span className="tp-label">AI WORKFLOWS</span>
              <h2 className="tp-section-title" id="tp-prompt-title">Make AI More Useful with Better Prompts</h2>
              <p className="tp-prompt__desc">
                We design and refine prompts for business workflows, content generation, research, and AI-powered tools.
                Clear instructions, relevant context, and structured outputs help teams get more consistent results.
              </p>
              <ul className="tp-prompt__list">
                <li>Prompt templates tailored to your workflow</li>
                <li>Role, context, constraints, and output format design</li>
                <li>Testing and refinement for more consistent results</li>
                <li>Integration guidance for AI-powered applications</li>
              </ul>
              <button
                type="button"
                className="tp-btn tp-btn--notes"
                onClick={() => navigate("/prompts")}
              >
                ✨ Explore AI Prompts
              </button>
            </div>
            <div className="tp-prompt__example">
              <span className="tp-prompt__example-label">PROMPT FRAMEWORK</span>
              <p><strong>Role</strong> — Who should the AI act as?</p>
              <p><strong>Task</strong> — What should it do?</p>
              <p><strong>Context</strong> — What information should it use?</p>
              <p><strong>Constraints</strong> — What should it avoid or follow?</p>
              <p><strong>Format</strong> — How should the answer be delivered?</p>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="tp-section tp-section--dark">
        <div className="tp-container">
          <div className="tp-section-header">
            <span className="tp-label">TECH STACK</span>
            <h2 className="tp-section-title">Technologies We Use</h2>
          </div>
          <div className="tp-stack">
            {STACK.map((tech, i) => (
              <div key={i} className="tp-stack-card">
                <span className="tp-stack-card__icon">{tech.icon}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="tp-final-cta">
        <div className="tp-container">
          <h2>Got an Idea? Let's Build It.</h2>
          <p>Get a free technical consultation and project estimate.</p>
          <div className="tp-final-cta__buttons">
            <button className="tp-btn tp-btn--primary" onClick={() => navigate("/contact")}>
              Get an Estimate
            </button>
          </div>
        </div>
      </section>

      {notesOpen && (
        <div
          className="tp-notes-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeNotes();
          }}
        >
          <section
            className="tp-notes"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tp-notes-title"
          >
            <button
              type="button"
              className="tp-notes__close"
              onClick={closeNotes}
              aria-label="Close prompt engineering notes"
            >
              ×
            </button>
            <span className="tp-label">QUICK REFERENCE</span>
            <h2 id="tp-notes-title">Prompt Engineering Notes</h2>
            <div className="tp-notes__items">
              {PROMPT_NOTES.map((note) => (
                <article className="tp-notes__item" key={note.title}>
                  <h3>{note.title}</h3>
                  <p>{note.text}</p>
                  <code>{note.example}</code>
                </article>
              ))}
            </div>
            <button
              type="button"
              className="tp-btn tp-btn--primary"
              onClick={closeNotes}
            >
              Done
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
