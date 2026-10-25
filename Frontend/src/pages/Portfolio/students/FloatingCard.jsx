import "./FloatingCard.css";

export default function FloatingCard({ className = "" }) {
  return (
    <div className={`floating-card ${className}`}>
      <div className="card-header">
        <span className="dot purple"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>

      <div className="card-body">
        <div className="line line-lg"></div>
        <div className="line"></div>
      </div>
    </div>
  );
}
