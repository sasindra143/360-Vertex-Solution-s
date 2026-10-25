import { useNavigate } from "react-router-dom";
import { waLink } from "../../config";
import "./AcademyPage.css";

const COURSES = [
  {
    cat: "Programming",
    color: "#6366f1",
    icon: "💻",
    items: ["Java", "Python", "C", "C++"],
  },
  {
    cat: "Web Development",
    color: "#06b6d4",
    icon: "🌐",
    items: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
  },
  {
    cat: "Full Stack",
    color: "#0072ff",
    icon: "⚡",
    items: ["Java Full Stack", "Python Full Stack", "React + Node"],
  },
  {
    cat: "Data & Analytics",
    color: "#f59e0b",
    icon: "📊",
    items: ["SQL", "Data Analytics", "Python", "Pandas", "NumPy"],
  },
  {
    cat: "AI & Machine Learning",
    color: "#8b5cf6",
    icon: "🤖",
    items: ["Machine Learning", "Generative AI", "LLMs", "Prompt Engineering", "RAG", "AI Agents"],
  },
  {
    cat: "Cloud & DevOps",
    color: "#10b981",
    icon: "☁️",
    items: ["Git", "GitHub", "Docker", "Cloud", "CI/CD"],
  },
  {
    cat: "Cyber Security",
    color: "#ef4444",
    icon: "🔒",
    items: ["Cyber Security Fundamentals", "Web Security", "Network Security"],
  },
];

const CAREER_ITEMS = [
  { icon: "📄", title: "ATS Resume", desc: "Build resumes that pass applicant tracking systems" },
  { icon: "🗂️", title: "Portfolio Development", desc: "Showcase your projects professionally" },
  { icon: "💼", title: "LinkedIn Optimization", desc: "Get noticed by recruiters and companies" },
  { icon: "🧠", title: "Aptitude Preparation", desc: "Quantitative, logical and verbal reasoning" },
  { icon: "💬", title: "Technical Interviews", desc: "Practice DSA, system design and core concepts" },
  { icon: "🎯", title: "Mock Interviews", desc: "Real interview simulation with feedback" },
];

const WHY_ITEMS = [
  { icon: "🏗️", title: "Project-Based Learning", desc: "Build real projects from day one" },
  { icon: "💡", title: "Practical First", desc: "Hands-on practice over theory" },
  { icon: "🚀", title: "Modern Technologies", desc: "Latest industry tools and frameworks" },
  { icon: "👔", title: "Career Preparation", desc: "Resume, portfolio, interview readiness" },
  { icon: "🤖", title: "AI-Ready Curriculum", desc: "Gen AI, LLMs and automation included" },
  { icon: "🔄", title: "Continuous Learning", desc: "Stay updated as technology evolves" },
];

const JOURNEY = ["Learn", "Practice", "Build", "Prepare", "Apply", "Grow"];

export default function AcademyPage() {
  const navigate = useNavigate();

  return (
    <div className="ap-page">
      {/* HERO */}
      <section className="ap-hero">
        <div className="ap-hero__bg">
          <div className="ap-orb ap-orb--1" />
          <div className="ap-orb ap-orb--2" />
        </div>
        <div className="ap-container">
          <span className="ap-label">VERTEX ACADEMY</span>
          <h1 className="ap-hero__title">
            Learn Technology. Build Skills.<br />
            <span className="ap-gradient">Shape Your Career.</span>
          </h1>
          <p className="ap-hero__desc">
            Vertex Academy provides practical, technology-focused learning through courses, projects, workshops and career preparation.
          </p>
          <div className="ap-hero__cta">
            <button className="ap-btn ap-btn--primary" onClick={() => navigate("/contact")}>
              Start Learning
            </button>
            <a href={waLink("Hello, I'm interested in joining Vertex Academy.")} target="_blank" rel="noopener noreferrer" className="ap-btn ap-btn--wa">
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* WHY VERTEX ACADEMY */}
      <section className="ap-section">
        <div className="ap-container">
          <div className="ap-section-header">
            <span className="ap-label">WHY CHOOSE US</span>
            <h2 className="ap-section-title">Why Vertex Academy?</h2>
          </div>
          <div className="ap-why-grid">
            {WHY_ITEMS.map((item, i) => (
              <div key={i} className="ap-why-card">
                <span className="ap-why-card__icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSE CATEGORIES */}
      <section className="ap-section ap-section--dark">
        <div className="ap-container">
          <div className="ap-section-header">
            <span className="ap-label">COURSES</span>
            <h2 className="ap-section-title">Course Categories</h2>
            <p className="ap-section-sub">Practical courses across every key technology domain</p>
          </div>
          <div className="ap-courses-grid">
            {COURSES.map((cat, i) => (
              <div key={i} className="ap-course-card" style={{ "--cat-color": cat.color }}>
                <div className="ap-course-card__header">
                  <span className="ap-course-card__icon">{cat.icon}</span>
                  <h3>{cat.cat}</h3>
                </div>
                <ul className="ap-course-card__list">
                  {cat.items.map((item, j) => (
                    <li key={j}>
                      <span className="ap-course-card__dot" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="ap-course-card__btn" onClick={() => navigate("/contact")}>
                  Enquire Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING JOURNEY */}
      <section className="ap-section">
        <div className="ap-container">
          <div className="ap-section-header">
            <span className="ap-label">YOUR PATH</span>
            <h2 className="ap-section-title">The Learning Journey</h2>
          </div>
          <div className="ap-journey">
            {JOURNEY.map((step, i) => (
              <div key={i} className="ap-journey__step">
                <div className="ap-journey__circle">
                  <span>{i + 1}</span>
                </div>
                <p>{step}</p>
                {i < JOURNEY.length - 1 && <div className="ap-journey__arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER PREPARATION */}
      <section className="ap-section ap-section--dark">
        <div className="ap-container">
          <div className="ap-section-header">
            <span className="ap-label">CAREER READY</span>
            <h2 className="ap-section-title">Career Preparation</h2>
            <p className="ap-section-sub">From learning to landing your dream role</p>
          </div>
          <div className="ap-career-grid">
            {CAREER_ITEMS.map((item, i) => (
              <div key={i} className="ap-career-card">
                <span className="ap-career-card__icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="ap-career-cta">
            <button className="ap-btn ap-btn--primary" onClick={() => navigate("/career-jobs")}>
              Explore Career & Jobs →
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="ap-final-cta">
        <div className="ap-container">
          <h2>Your Next Skill Starts Here.</h2>
          <p>Join Vertex Academy and start building your technology career today.</p>
          <div className="ap-final-cta__buttons">
            <button className="ap-btn ap-btn--primary" onClick={() => navigate("/contact")}>
              Start Learning
            </button>
            <a href={`tel:+919959732476`} className="ap-btn ap-btn--outline">
              📞 Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
