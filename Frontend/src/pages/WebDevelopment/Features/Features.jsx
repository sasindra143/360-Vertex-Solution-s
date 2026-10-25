// src/pages/WebDevelopment/Features/Features.jsx
import "./Features.css";
import featuresData from "./featuresData";

export default function Features() {
  return (
    <section className="features">
      <div className="features-container">
        <span className="features-pill">What’s Included</span>

        <h2 className="features-title">
          Everything You Get With Our{" "}
          <span>Professional Website Development</span>
        </h2>

        <p className="features-subtitle">
          No hidden costs. Every website includes these essential features
          by default.
        </p>

        <div className="features-grid">
          {featuresData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className={`feature-card ${item.color}`}>
                <div className="feature-icon">
                  <Icon size={26} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
