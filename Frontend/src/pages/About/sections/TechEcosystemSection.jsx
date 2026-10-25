const techCategories = [
  { name: "Frontend", items: ["HTML", "CSS", "JavaScript", "React"] },
  { name: "Backend", items: ["Node.js", "Express", "Java", "Spring Boot"] },
  { name: "Database", items: ["MySQL", "PostgreSQL"] },
  { name: "AI & Data", items: ["Python", "Machine Learning", "Generative AI", "LLMs"] },
  { name: "AI Architecture", items: ["RAG", "AI Agents", "MCP", "APIs"] },
  { name: "Cloud & DevOps", items: ["Git", "GitHub", "Docker", "Cloud", "CI/CD"] },
  { name: "Digital", items: ["SEO", "Google Ads", "Meta Ads", "Analytics"] }
];

export default function TechEcosystemSection() {
  return (
    <section className="tech-ecosystem section-padding">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Powered by <span className="gradient-text">Modern Technology</span></h2>
        </div>

        <div className="tech-grid">
          {techCategories.map((cat, i) => (
            <div key={i} className="tech-category glass-card">
              <h3>{cat.name}</h3>
              <div className="tech-list">
                {cat.items.map((item, j) => (
                  <span key={j} className="tech-item">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
