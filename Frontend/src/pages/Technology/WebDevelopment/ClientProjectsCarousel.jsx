import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import "./ClientProjectsCarousel.css";

const projects = [
  {
    name: "Vaakya Creations",
    category: "Fashion e-commerce",
    description: "A responsive women’s fashion store with product collections and interactive shopping features.",
    image: "/client-projects/vaakya-creations.jpg",
    imageAlt: "Screenshot of the Vaakya Creations online fashion store",
    url: "https://vaakya-creations.netlify.app/",
  },
  {
    name: "Froot Bowl",
    category: "Fruit e-commerce",
    description: "A responsive fruit-ordering store with customer accounts, delivery addresses, and an admin dashboard.",
    image: "/client-projects/froot-bowl-storefront.jpg",
    imageAlt: "Screenshot of the Froot Bowl fruit-ordering storefront",
    url: "https://froot-bowl.netlify.app/",
  },
  {
    name: "Ration Shop Management",
    category: "Management web app",
    description: "A digital platform for ration card records, stock monitoring, commodity distribution, and transactions.",
    image: "/client-projects/ration-shop-management.jpg",
    imageAlt: "Screenshot of the Ration Shop Management web app",
    url: "https://ration-shop-management-sys-sunkesula.netlify.app/",
  },
  {
    name: "PR Skillverse",
    category: "Training & education",
    description: "A responsive SAP training website featuring courses and an admin dashboard for recorded classes.",
    image: "/client-projects/pr-skillverse.jpg",
    imageAlt: "Screenshot of the PR Skillverse training website",
    url: "https://prskillverse.com/",
  },
];

export default function ClientProjectsCarousel() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = () => {
    const track = trackRef.current;
    if (!track) return;

    const trackLeft = track.getBoundingClientRect().left;
    const nearestIndex = Array.from(track.children).reduce(
      (nearest, card, index) => {
        const currentDistance = Math.abs(card.getBoundingClientRect().left - trackLeft);
        const nearestDistance = Math.abs(
          track.children[nearest].getBoundingClientRect().left - trackLeft
        );
        return currentDistance < nearestDistance ? index : nearest;
      },
      0
    );
    setActiveIndex(nearestIndex);
  };

  const moveTo = (index) => {
    const track = trackRef.current;
    const card = track?.children[index];
    if (!track || !card) return;

    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section className="wd-projects" aria-labelledby="wd-projects-title">
      <div className="wd-projects__grid-bg" aria-hidden="true" />
      <div className="wd-ct wd-projects__inner">
        <div className="wd-projects__heading">
          <div>
            <span className="wd-section-label">SELECTED CLIENT PROJECTS</span>
            <h2 className="wd-section-title" id="wd-projects-title">
              Websites we&apos;ve brought to life.
            </h2>
            <p className="wd-section-desc">
              Take a look at real websites and digital products built for different business needs.
            </p>
          </div>
          <div className="wd-projects__controls" aria-label="Project carousel controls">
            <button
              type="button"
              onClick={() => moveTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous projects"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => moveTo(Math.min(projects.length - 1, activeIndex + 1))}
              disabled={activeIndex === projects.length - 1}
              aria-label="Next projects"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          className="wd-projects__track"
          ref={trackRef}
          onScroll={updateActiveIndex}
          aria-label="Featured website projects"
        >
          {projects.map((project) => (
            <article className="wd-project-card" key={project.name}>
              <a
                className="wd-project-card__image"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.name} website`}
              >
                <img src={project.image} alt={project.imageAlt} loading="lazy" />
                <span className="wd-project-card__visit"><ExternalLink size={15} /></span>
              </a>
              <div className="wd-project-card__body">
                <span className="wd-project-card__category">{project.category}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  Visit live website <ArrowRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="wd-projects__pagination" aria-label="Choose a project">
          {projects.map((project, index) => (
            <button
              key={project.name}
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => moveTo(index)}
              aria-label={`Show project ${index + 1}: ${project.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
