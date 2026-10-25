export default function WhyCard({ no, title, subtitle, text, tag }) {
  return (
    <div className="why-card">
      <div className="why-card-top">
        <span className="why-no">{no}</span>
        <span className="why-title">{title}</span>
      </div>

      <h4 className="why-subtitle">{subtitle}</h4>
      <p className="why-text">{text}</p>

      <span className="why-tag">• {tag}</span>
    </div>
  );
}
