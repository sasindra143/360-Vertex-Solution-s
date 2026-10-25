import "./Gallery.css";
import { useEffect } from "react";

const galleryData = [
  {
    title: "Portfolio Development",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    description:
      "We build real-world portfolios for IT and creative professionals that demonstrate practical skills, project depth, and execution ability—not templates."
  },
  {
    title: "Website Development",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    description:
      "From business websites to e-commerce platforms, we deliver scalable, performance-driven web solutions aligned with real business goals."
  },
  {
    title: "ATS-Optimized Resumes",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4",
    description:
      "Our resumes are engineered to pass ATS filters, highlight impact, and position candidates clearly for technical and non-technical roles."
  },
  {
    title: "Interview Preparation",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978",
    description:
      "Company-specific interview preparation with mock interviews, real questions, and execution-based evaluation."
  },
  {
    title: "Project Development",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    description:
      "Industry-aligned projects for CSE & IT students that focus on architecture, problem-solving, and deployment—not academic theory."
  },
  {
    title: "Design & Branding",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698",
    description:
      "Logos, banners, thumbnails, and brand systems designed for clarity, consistency, and professional credibility."
  }
];

function Gallery() {
  useEffect(() => {
    const items = document.querySelectorAll(".gallery-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">
        <h2 className="gallery-title">
          Our <span>Execution Gallery</span>
        </h2>

        <p className="gallery-subtitle">
          A visual overview of how 360 Vertex Solutions delivers real outcomes
          across careers, technology, and business growth.
        </p>

        <div className="gallery-grid">
          {galleryData.map((item, index) => (
            <div className="gallery-item" key={index}>
              <div className="gallery-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="gallery-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
