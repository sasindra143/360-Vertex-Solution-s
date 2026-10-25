export default function TemplateCard({
  badge,
  urlText,
  image,
  plan,
  title,
  description,
  features,
  link,
}) {
  return (
    <div className="template-card">
      {badge && <div className="template-badge">★ {badge}</div>}

      {/* PREVIEW */}
      <div className="preview-frame">
        <div className="browser-bar">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="browser-url">{urlText}</span>
        </div>

        <img src={image} alt={title} />
      </div>

      {/* CONTENT */}
      <div className="card-body">
        <span className="template-plan">{plan}</span>
        <h3>{title}</h3>
        <p>{description}</p>

        <div className="feature-list">
          {features.map((item, i) => (
            <span key={i}>• {item}</span>
          ))}
        </div>

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="view-btn"
        >
          View Portfolio →
        </a>
      </div>
    </div>
  );
}
