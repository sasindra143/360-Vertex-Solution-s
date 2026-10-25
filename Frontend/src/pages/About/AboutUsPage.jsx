import { Link, useNavigate } from "react-router-dom";
import { waLink } from "../../config";
import "./AboutUsPage.css";

const WHATSAPP_ABOUT = waLink("Hello 360° Vertex Solutions, I would like to know more about your services.");

const FEATURED_SERVICES = [
  { icon: "🌐", label: "Search Engine", path: "/digital-marketing/seo", className: "one" },
  { icon: "💻", label: "Web Development", path: "/technology/web-development", className: "two" },
  { icon: "🎨", label: "Graphic Design", path: "/digital-marketing/branding-creative", className: "three" },
  { icon: "👥", label: "Audience Growth", path: "/digital-marketing/social-media", className: "four" },
  { icon: "📈", label: "Digital Marketing", path: "/digital-marketing", className: "five" },
  { icon: "⚙️", label: "AI Automation", path: "/digital-marketing/ai-automation", className: "six" },
  { icon: "🔑", label: "SEO Strategy", path: "/digital-marketing/local-seo", className: "seven" },
  { icon: "📊", label: "Analytics", path: "/digital-marketing/analytics-reporting", className: "eight" },
];

const DIVISIONS = [
  {
    number: "01",
    title: "Digital Marketing",
    description: "Strategies that help businesses improve their online visibility, connect with the right audiences, and generate enquiries.",
    services: ["SEO", "Paid advertising", "Social media marketing", "Lead generation"],
    path: "/digital-marketing",
  },
  {
    number: "02",
    title: "Technology Solutions",
    description: "Practical digital products and engineering support, from business websites to custom applications and AI integrations.",
    services: ["Website development", "Web applications", "E-commerce", "AI and automation"],
    path: "/technology",
  },
];

export default function AboutUsPage() {
  const navigate = useNavigate();

  return (
    <main className="about-us">
      <section className="about-us__hero">
        <div className="about-us__container about-us__hero-layout">
          <div className="about-us__hero-copy">
            <span className="about-us__eyebrow">ABOUT 360° VERTEX SOLUTIONS</span>
            <h1>Your Vision. Our Solutions. <span>A Brighter Tomorrow.</span></h1>
            <p>
              We help businesses move forward with thoughtful digital marketing and
              technology solutions—built around real goals, clear communication,
              and practical execution.
            </p>
            <div className="about-us__hero-actions">
              <button className="about-us__button" onClick={() => navigate("/contact")}>
                Talk with our team <span aria-hidden="true">→</span>
              </button>
              <a className="about-us__chat-button" href={WHATSAPP_ABOUT} target="_blank" rel="noopener noreferrer">
                <span aria-hidden="true">💬</span> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="about-us__service-visual" aria-label="Highlighted services">
            <div className="about-us__service-glow" />
            <div className="about-us__service-ring about-us__service-ring--outer" />
            <div className="about-us__service-ring about-us__service-ring--middle" />
            <div className="about-us__service-ring about-us__service-ring--inner" />
            <div className="about-us__service-center">
              <img src="/vertex-solutions-logo.png" alt="360° Vertex Solutions" />
              <span>Digital Growth</span>
            </div>
            {FEATURED_SERVICES.map((service) => (
              <Link
                className={`about-us__service-chip about-us__service-chip--${service.className}`}
                key={service.label}
                to={service.path}
              >
                <span aria-hidden="true">{service.icon}</span>
                {service.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="about-us__section">
        <div className="about-us__container">
          <div className="about-us__intro">
            <span className="about-us__eyebrow">WHAT WE DO</span>
            <h2>Two focused divisions, working toward your growth.</h2>
            <p>
              360° Vertex Solutions brings creative thinking and technical
              expertise together to help brands strengthen their digital
              presence and build useful online experiences.
            </p>
          </div>
          <div className="about-us__grid">
            {DIVISIONS.map((division) => (
              <article className="about-us__card" key={division.number}>
                <span className="about-us__number">{division.number}</span>
                <h3>{division.title}</h3>
                <p>{division.description}</p>
                <ul>
                  {division.services.map((service) => <li key={service}>{service}</li>)}
                </ul>
                <button onClick={() => navigate(division.path)}>
                  Explore {division.title} <span aria-hidden="true">→</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-us__founder">
        <div className="about-us__container about-us__founder-layout">
          <div className="about-us__founder-photo">
            <img src="/founder-portrait.png" alt="Sasindra Madduri, founder of 360° Vertex Solutions" />
          </div>
          <div className="about-us__founder-copy">
            <span className="about-us__eyebrow">MEET OUR FOUNDER</span>
            <h2>Sasindra Madduri</h2>
            <p className="about-us__founder-role">Founder &amp; Lead Architect</p>
            <p>
              Sasindra founded 360° Vertex Solutions to bring practical technology
              and digital growth support together. His focus is on helping people
              and businesses turn ideas into useful, thoughtful solutions.
            </p>
            <blockquote>“Learn. Build. Launch. Grow.”</blockquote>
          </div>
        </div>
      </section>

      <section className="about-us__values">
        <div className="about-us__container">
          <span className="about-us__eyebrow">HOW WE WORK</span>
          <h2>Thoughtful strategy. Clear execution.</h2>
          <div className="about-us__values-grid">
            <p><strong>Understand</strong><span>We start by learning your goals, audience, and challenges.</span></p>
            <p><strong>Plan</strong><span>We shape a practical strategy and agree on clear priorities.</span></p>
            <p><strong>Build</strong><span>We deliver the marketing or technology work with your team.</span></p>
            <p><strong>Improve</strong><span>We review what is working and make informed refinements.</span></p>
          </div>
        </div>
      </section>
    </main>
  );
}
