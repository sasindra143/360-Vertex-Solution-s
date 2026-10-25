import { Link } from "react-router-dom";
import "./ProjectsSection.css";

const projectCards = [
  {
    title: "PR Skillverse",
    type: "Business Website",
    description: "A training website that helps learners explore SAP courses and career support.",
    image: "/client-projects/pr-skillverse.jpg",
    website: "https://prskillverse.com/",
  },
  {
    title: "Vaakya Creations",
    type: "Online Store",
    description: "An online storefront for handcrafted sarees, fashion and accessories.",
    image: "/client-projects/vaakya-creations.jpg",
    website: "https://vaakya-creations.netlify.app/",
  },
  {
    title: "Froot Bowl",
    type: "E-commerce Website",
    description: "A responsive fruit-ordering store with customer accounts, delivery addresses, order placement, and an admin dashboard for order and report management.",
    image: "/client-projects/froot-bowl-storefront.jpg",
    website: "https://froot-bowl.netlify.app/",
  },
  {
    title: "Ration Shop Management CRM",
    type: "CRM & Management App",
    description: "A web app for managing ration cards, stock, distribution and shop records.",
    image: "/client-projects/ration-shop-management.jpg",
    website: "https://ration-shop-management-sys-sunkesula.netlify.app/",
  },
];

export default function ProjectsSection() {
  return (
    <section className="home-projects" aria-labelledby="home-projects-title">
      <div className="home-projects__container">
        <div className="home-projects__intro">
          <span className="home-projects__eyebrow">SELECTED WORK</span>
          <h2 id="home-projects-title">Projects built for real businesses.</h2>
          <p>See real websites and applications we have built to help businesses serve customers and manage their work online.</p>
        </div>

        <div className="home-projects__grid" aria-label="Featured project cards">
          {projectCards.map((project) => (
            <article className="home-projects__project-card" key={project.title}>
              <div className="home-projects__project-image-wrap">
                <img src={project.image} alt={`Real screenshot of the ${project.title} project`} loading="lazy" />
              </div>

              <div className="home-projects__project-body">
                <span className="home-projects__type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="home-projects__actions">
                  <a href={project.website} target="_blank" rel="noreferrer">
                    Live demo <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="home-projects__service-cta">
          <Link to="/client-work">View all projects <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
