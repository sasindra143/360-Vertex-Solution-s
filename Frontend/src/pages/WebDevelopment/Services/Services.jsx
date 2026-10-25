import "./Services.css";
import servicesData from "./servicesData";

export default function Services() {
  return (
    <section className="services">
      <div className="services-container">
        <span className="services-pill">Our Services</span>

        <h2 className="services-title">
          Website Development Services <span>That Deliver Results</span>
        </h2>

        <p className="services-subtitle">
          Complete web solutions for businesses of all sizes. From simple landing
          pages to complex web applications, we handle everything.
        </p>

        <div className="services-grid">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className={`service-card ${service.color}`}>
                <div className="service-icon">
                  <Icon size={22} />
                </div>

                <h3>{service.title}</h3>
                <p>{service.desc}</p>

                <div className="service-tags">
                  {service.tags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
