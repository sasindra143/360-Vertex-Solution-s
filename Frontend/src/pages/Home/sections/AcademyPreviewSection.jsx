import { useNavigate } from "react-router-dom";
import "./HomeSection.css";

const courses = [
  { icon: "☕", name: "Java Full Stack", tag: "Most Popular" },
  { icon: "🐍", name: "Python Full Stack", tag: "In Demand" },
  { icon: "⚛️", name: "React & Frontend", tag: "" },
  { icon: "📊", name: "Data Analytics", tag: "" },
  { icon: "🤖", name: "AI & Machine Learning", tag: "New" },
  { icon: "🧠", name: "Generative AI", tag: "New" },
  { icon: "☁️", name: "Cloud & DevOps", tag: "" },
  { icon: "🔐", name: "Cyber Security", tag: "" },
  { icon: "📈", name: "Data Science", tag: "" }
];

export default function AcademyPreviewSection() {
  const navigate = useNavigate();
  return (
    <section className="home-section alt-bg section-padding" id="academy-preview">
      <div className="container">
        <div className="home-section-header">
          <div>
            <span className="section-label">Vertex Academy</span>
            <h2 className="section-title">Learn Skills That <span className="gradient-text">Create Opportunities</span></h2>
            <p className="section-subtitle">Practical, career-focused learning for students, freshers, and IT professionals.</p>
          </div>
          <button className="btn-secondary" onClick={() => navigate("/academy")}>Explore Academy →</button>
        </div>

        <div className="course-grid">
          {courses.map((c, i) => (
            <div key={i} className="course-chip glass-card" onClick={() => navigate("/academy")}>
              <span className="course-chip-icon">{c.icon}</span>
              <span>{c.name}</span>
              {c.tag && <span className="course-badge">{c.tag}</span>}
            </div>
          ))}
        </div>

        <div className="academy-cta-row">
          <button className="btn-primary" onClick={() => navigate("/academy")}>
            Explore Vertex Academy →
          </button>
        </div>
      </div>
    </section>
  );
}
