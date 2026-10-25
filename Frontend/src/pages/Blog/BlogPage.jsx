import { Link } from "react-router-dom";
import "./BlogPage.css";

const guides = [
  {
    category: "BUSINESS WEBSITES",
    title: "What should a good business website include?",
    description:
      "A useful business website quickly explains what you offer, who you help, and how customers can contact you.",
    points: ["Clear services and contact details", "Mobile-friendly pages", "Fast loading and search-ready content"],
    link: "/technology/web-development/business-website",
    linkLabel: "Explore business websites",
  },
  {
    category: "E-COMMERCE",
    title: "Plan an online store customers can use with confidence",
    description:
      "A smooth shopping experience makes it easier for customers to discover products, understand delivery, and complete an order.",
    points: ["Simple product categories", "Clear pricing and delivery information", "A straightforward cart and checkout"],
    link: "/technology/web-development/ecommerce-website",
    linkLabel: "Explore e-commerce websites",
  },
  {
    category: "WEB APPLICATIONS",
    title: "When does your business need a custom web application?",
    description:
      "If spreadsheets and disconnected tools make daily work harder, a web application can bring information and workflows together.",
    points: ["Manage customers, stock, or bookings", "Give teams one place to work", "Use dashboards to track important activity"],
    link: "/technology/web-development/web-application",
    linkLabel: "Explore web applications",
  },
];

export default function BlogPage() {
  return (
    <main className="vertex-blog">
      <section className="vertex-blog__hero">
        <span className="vertex-blog__eyebrow">360° VERTEX SOLUTIONS · WEB DEVELOPMENT</span>
        <h1>Practical guides for your business website.</h1>
        <p>
          Straightforward ideas on websites, online stores, and web applications
          to help you choose the right next step for your business.
        </p>
      </section>

      <section className="vertex-blog__guides" aria-label="Website development guides">
        {guides.map((guide) => (
          <article className="vertex-blog-card" key={guide.title}>
            <span className="vertex-blog-card__category">{guide.category}</span>
            <h2>{guide.title}</h2>
            <p>{guide.description}</p>
            <ul>
              {guide.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <Link to={guide.link}>
              {guide.linkLabel} <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </section>

      <section className="vertex-blog__cta">
        <h2>Have a website idea?</h2>
        <p>Tell us what your business needs. We’ll help you plan the right solution.</p>
        <Link to="/contact">Talk to our team <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
