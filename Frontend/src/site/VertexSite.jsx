import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Code2,
  Globe,
  GraduationCap,
  Headphones,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  Monitor,
  MousePointerClick,
  Palette,
  Rocket,
  Search,
  Send,
  ShoppingCart,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { COMPANY, SOCIAL, waLink } from "../config";
import IntroAnimation from "../components/IntroAnimation";
import "./VertexSite.css";
import "./PageTheme.css";

const businessServices = [
  {
    title: "Business websites",
    copy: "A clear, professional home for your company, services, and next customer.",
    icon: Monitor,
    href: "/business/website-development",
  },
  {
    title: "E-commerce",
    copy: "Online storefronts designed to make browsing products and getting in touch simple.",
    icon: ShoppingCart,
    href: "/business/ecommerce-development",
  },
  {
    title: "Landing pages",
    copy: "Focused pages for a product, campaign, event, or specific business goal.",
    icon: Monitor,
    href: "/business/landing-pages",
  },
  {
    title: "Search visibility",
    copy: "Search engine optimization shaped around your audience and content.",
    icon: Search,
    href: "/business/seo",
  },
  {
    title: "Digital marketing",
    copy: "A practical mix of paid campaigns, social, content, and measurement.",
    icon: Megaphone,
    href: "/business/digital-marketing",
  },
  {
    title: "Custom web applications",
    copy: "Purpose-built web experiences for workflows that need more than a standard website.",
    icon: Code2,
    href: "/business/custom-web-applications",
  },
  {
    title: "Brand & web refresh",
    copy: "Redesign and maintain an existing website as your business evolves.",
    icon: Palette,
    href: "/business/website-maintenance",
  },
  {
    title: "Google Ads",
    copy: "Plan paid search campaigns around your audience, offer, and budget.",
    icon: MousePointerClick,
    href: "/business/google-ads",
  },
  {
    title: "Meta Ads & social",
    copy: "Plan Meta campaigns and social media activity for your brand.",
    icon: Megaphone,
    href: "/business/meta-ads",
  },
  {
    title: "Content & analytics",
    copy: "Create useful content and understand how visitors engage with it.",
    icon: BarChart3,
    href: "/business/content-marketing",
  },
];

const projects = [
  {
    slug: "pr-skillverse",
    category: "Business",
    title: "PR Skillverse",
    type: "Business · Education",
    description: "Developed a responsive website for PR Skillverse, a professional SAP training institute. Designed an intuitive interface to showcase SAP courses, training programs, and institute information. Implemented an admin dashboard to upload, manage, and organize recorded classes for students. Integrated interactive UI components to enhance the learning experience across desktop and mobile devices. Built the platform using modern web technologies, focusing on responsive design, usability, and training content management.",
    overview: "A responsive learning platform for PR Skillverse that presents SAP courses and institute information, with an admin dashboard for managing recorded classes.",
    highlights: ["SAP courses and training programs", "Institute information and student resources", "Admin dashboard for recorded classes", "Responsive interactive learning experience"],
    image: "/client-projects/pr-skillverse.jpg",
    href: "https://prskillverse.com/",
  },
  {
    slug: "vaakya-creations",
    category: "Business",
    title: "Vaakya Creations",
    type: "Business · E-commerce",
    description: "Developed Vaakya Creations, a responsive women’s clothing e-commerce website to showcase fashion collections and products. Designed an intuitive interface to help customers browse clothing items and explore product details. Implemented interactive shopping features to enhance the online shopping experience across desktop and mobile devices. Built a modern, user-friendly design to improve product discovery and customer engagement. Developed the project using React and Node.js, focusing on responsive design, usability, and e-commerce functionality.",
    overview: "A responsive women’s clothing store built with React and Node.js, featuring fashion collections, product details, and interactive shopping features.",
    highlights: ["Fashion collections and product details", "Responsive browsing and shopping experience", "Interactive e-commerce features", "Built with React and Node.js"],
    image: "/client-projects/vaakya-creations.jpg",
    href: "https://vaakya-creations.netlify.app/",
  },
  {
    slug: "froot-bowl",
    category: "Business",
    title: "Froot Bowl",
    type: "Business · E-commerce",
    description: "Developed Froot Bowl Markapur, a responsive fruit-ordering website that allows customers to browse fruit boxes, register or log in, select delivery addresses, and place orders. Designed an intuitive storefront featuring fruit box options priced at ₹59 and ₹89. Implemented a backend using Node.js and Express.js to handle customer authentication, order processing, and delivery status management. Created an admin dashboard to manage orders, update delivery statuses, review sales summaries, and manage customer delivery details. Built the project using React, JavaScript, CSS, and REST APIs, with map-based address selection and order tracking functionality.",
    overview: "A responsive fruit-ordering platform for Froot Bowl Markapur, with ₹59 and ₹89 fruit box options, map-based delivery address selection, and order tracking. Its admin dashboard supports order, delivery status, customer delivery details, and sales summary management.",
    highlights: ["Fruit box options priced at ₹59 and ₹89", "Customer registration, login, and map-based address selection", "REST API backend using Node.js and Express.js", "Admin order, delivery status, and customer detail management", "Sales summaries and customer order tracking"],
    image: "/client-projects/froot-bowl-storefront.jpg",
    href: "https://froot-bowl.netlify.app/",
    adminHref: "https://froot-bowl.netlify.app/admin",
    screenshots: [
      {
        src: "/client-projects/froot-bowl-storefront.jpg",
        alt: "Froot Bowl storefront homepage showing its fruit bowl ordering experience",
      },
      {
        src: "/client-projects/froot-bowl-admin.jpg",
        alt: "Froot Bowl admin dashboard showing store overview and order reports",
      },
    ],
  },
  {
    slug: "sasindra-portfolio",
    category: "Personal",
    title: "Sasindra Portfolio",
    type: "Personal · Portfolio",
    description: "Developed a responsive personal portfolio website to showcase my technical skills, projects, education, and professional achievements. Designed a modern, interactive user interface with smooth animations and mobile-friendly layouts. Integrated dedicated project sections to highlight full-stack applications and real-world development experience. Implemented social media links and contact features to improve professional networking and collaboration opportunities. Built the portfolio using modern web technologies, focusing on performance, accessibility, and user experience.",
    overview: "A responsive personal portfolio presenting technical skills, education, achievements, and full-stack projects, with interactive sections and contact links.",
    highlights: ["Technical skills, education, and achievements", "Full-stack project showcase", "Social media and contact features", "Responsive, accessible interface with smooth animations"],
    image: "/client-projects/sasindra-portfolio.png",
    href: "https://sasindraportfolio.netlify.app/",
  },
  {
    slug: "ration-shop-crm",
    category: "CRM",
    title: "Ration Shop Management CRM",
    type: "CRM · Retail operations",
    description: "Developed a Ration Shop Management System to streamline the distribution and management of essential commodities through a digital platform. Designed a user-friendly interface to manage ration card details, beneficiary information, and ration stock. Implemented features to track stock availability, manage commodity distribution, and maintain transaction records. Created an organized management interface to improve inventory monitoring and simplify daily ration shop operations. Built the project using modern web technologies, focusing on usability, data management, and efficient distribution workflows.",
    overview: "A digital management platform for ration card and beneficiary records, stock availability, commodity distribution, and transaction tracking.",
    highlights: ["Ration card and beneficiary information", "Stock availability and inventory monitoring", "Commodity distribution and transaction records", "Efficient daily shop workflows"],
    image: "/client-projects/ration-shop-crm.png",
    href: "https://ration-shop-management-sys-sunkesula.netlify.app/",
  },
  {
    slug: "artisan-coffee-house",
    category: "Business",
    title: "Artisan Coffee House",
    type: "Business · Coffee shop website",
    description: "Developed a responsive coffee shop website to showcase coffee varieties, beverages, and café offerings. Designed an attractive and user-friendly interface with appealing visuals to create an engaging browsing experience. Implemented interactive sections to display the menu, product details, and coffee shop information. Optimized the website for desktop and mobile devices to ensure a seamless user experience. Built the project using modern web technologies, focusing on visual design, responsiveness, and usability.",
    overview: "A responsive coffee shop website showcasing coffee varieties, beverages, menu details, and café information through an engaging visual design.",
    highlights: ["Coffee varieties, beverages, and café offerings", "Interactive menu and product details", "Responsive desktop and mobile experience", "Visual design focused on usability"],
    image: "/client-projects/coffee-website.png",
    href: "https://sasindra143.github.io/Coffe-Website/",
  },
  {
    slug: "graphic-design-showcase",
    category: "Graphic Design",
    title: "Graphic Design Showcase",
    type: "Graphic Design · Brand & food creatives",
    description: "Explore graphic design demos featuring Balanced Bowl food creatives, brand logos, and promotional artwork. The collection highlights bold visual identities and campaign-ready designs for digital platforms.",
    overview: "A collection of graphic design demos featuring Balanced Bowl Kitchen food creatives, brand identity work, and digital promotional artwork.",
    highlights: ["Food and nutrition promotional graphics", "Balanced Bowl Kitchen campaign artwork", "Brand logo and identity concepts", "Digital-first visual design"],
    image: "/graphic-design/balanced-bowl-benefits.png",
    screenshots: [
      {
        src: "/graphic-design/balanced-bowl-benefits.png",
        alt: "Balanced Bowl graphic design poster describing bowl benefits and nutrition",
      },
      {
        src: "/graphic-design/balanced-bowl-meal.png",
        alt: "Balanced Bowl Kitchen non-vegetarian power meal promotional design",
      },
      {
        src: "/graphic-design/vertex-solutions-promo.png",
        alt: "360 Vertex Solutions promotional graphic for web development, SEO, portfolios, and digital marketing",
      },
      {
        src: "/graphic-design/home-interior-logo.png",
        alt: "HCD Home Interior logo design in black and gold",
      },
      {
        src: "/graphic-design/balanced-bowl-nonveg.png",
        alt: "Balanced Bowl Kitchen non-vegetarian bowl promotional graphic with nutrition details",
      },
      {
        src: "/graphic-design/balanced-bowl-meal-benefits.png",
        alt: "Balanced Bowl Kitchen meal graphic showing a balanced meal and nutrition breakdown",
      },
    ],
  },
  {
    slug: "wedding-invitation",
    category: "Events",
    title: "Wedding Invitation Website",
    type: "Events · Wedding invitation",
    description: "A digital invitation website for sharing wedding details with guests.",
    overview: "A wedding invitation website project presented as a dedicated preview page.",
    highlights: ["Digital wedding invitation", "Event information", "Guest-friendly presentation"],
    image: null,
  },
  {
    slug: "online-fraud-transaction-detection",
    category: "Technical",
    title: "Online Fraud Transaction Detection",
    type: "Technical · Machine learning",
    description: "A technical project focused on fraud transaction detection.",
    overview: "A machine-learning project focused on online transaction fraud detection.",
    highlights: ["Machine-learning project", "Transaction analysis", "Fraud detection"],
  },
];

const servicePages = {
  "/business/website-development": {
    title: "Business website development",
    intro: "A professional website that explains what you do and makes it easy for customers to take the next step.",
    group: "For businesses",
    deliverables: ["Responsive page structure", "Service and contact sections", "Enquiry-focused calls to action", "Launch and handover guidance"],
  },
  "/business/ecommerce-development": {
    title: "E-commerce development",
    intro: "A considered online storefront that helps customers explore your products and understand how to order.",
    group: "For businesses",
    deliverables: ["Storefront experience", "Product and category presentation", "Mobile-ready layouts", "Enquiry and launch planning"],
  },
  "/business/landing-pages": {
    title: "Landing page development",
    intro: "A focused page that gives one campaign, offer, or service a clear story and next step.",
    group: "For businesses",
    deliverables: ["Goal-led page structure", "Responsive design", "Contact or enquiry action", "Measurement planning"],
  },
  "/business/digital-marketing": {
    title: "Digital marketing",
    intro: "A joined-up approach to reaching the right audience through search, ads, social, and useful content.",
    group: "For businesses",
    deliverables: ["Channel and audience discussion", "Campaign planning", "Content direction", "Measurement setup planning"],
  },
  "/business/seo": {
    title: "Search engine optimization",
    intro: "Improve how your website communicates its relevance to people searching for your services.",
    group: "For businesses",
    deliverables: ["Website and content review", "Search topic planning", "On-page recommendations", "Progress measurement plan"],
  },
  "/business/google-ads": {
    title: "Google Ads management",
    intro: "Plan and manage search campaigns around your offer, audience, and budget.",
    group: "For businesses",
    deliverables: ["Campaign and keyword planning", "Ad copy direction", "Conversion measurement planning", "Review and optimization discussions"],
  },
  "/business/meta-ads": {
    title: "Meta Ads management",
    intro: "Reach potential customers across Meta platforms with thoughtful creative and campaign planning.",
    group: "For businesses",
    deliverables: ["Audience and campaign planning", "Creative direction", "Enquiry journey review", "Campaign measurement planning"],
  },
  "/business/custom-web-applications": {
    title: "Custom web applications",
    intro: "Purpose-built web experiences shaped around a specific workflow, audience, and business need.",
    group: "For businesses",
    deliverables: ["Workflow and requirements discussion", "Application structure planning", "Responsive interface", "Testing and handover planning"],
  },
  "/business/website-maintenance": {
    title: "Website redesign & maintenance",
    intro: "Refresh an existing website or keep its content and experience aligned with your business.",
    group: "For businesses",
    deliverables: ["Website and content review", "Redesign recommendations", "Maintenance scope discussion", "Update and handover planning"],
  },
  "/business/content-marketing": {
    title: "Content marketing & analytics",
    intro: "Plan useful content and measurement so you can learn how people discover and use your website.",
    group: "For businesses",
    deliverables: ["Content direction", "Audience and topic planning", "Analytics setup discussion", "Measurement and review planning"],
  },
};

const navLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Our Work", "/work"],
  ["Career Hub", "/career-hub"],
  ["Blog", "/blog"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
];

function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle("vx-menu-open", open);
    return () => document.body.classList.remove("vx-menu-open");
  }, [open]);

  return (
    <header className="vx-site-header">
      <div className="vx-site-header__inner">
        <Link className="vx-brand" to="/" aria-label="360° Vertex Solutions home">
          <img src="/vertex-solutions-logo.png" alt="" />
          <span><strong>360° Vertex</strong><small>Solutions</small></span>
        </Link>
        <button className="vx-menu-toggle" type="button" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`vx-site-nav${open ? " is-open" : ""}`} aria-label="Main navigation">
          {navLinks.map(([label, path]) => (
            <Link key={path} to={path} aria-current={location.pathname === path ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link className="vx-button vx-button--small" to="/contact" onClick={() => setOpen(false)}>Get started <ArrowRight size={15} /></Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="vx-footer">
      <div className="vx-container vx-footer__top">
        <div className="vx-footer__brand">
          <Link className="vx-brand" to="/"><img src="/vertex-solutions-logo.png" alt="" /><span><strong>360° Vertex</strong><small>Solutions</small></span></Link>
          <p>Your Skills. Your Career. Your Future.<br />All in 360°.</p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="vx-footer__chat"><MessageCircle size={17} /> WhatsApp {COMPANY.whatsappPhone}</a>
          <a className="vx-footer__contact-link" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          <a className="vx-footer__contact-link" href={`tel:+${COMPANY.phoneRaw}`}>{COMPANY.phone}</a>
        </div>
        <div><h3>Explore</h3>{navLinks.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}</div>
        <div><h3>Solutions</h3>{businessServices.slice(0, 4).map((item) => <Link key={item.href + item.title} to={item.href}>{item.title}</Link>)}</div>
        <div><h3>Company</h3><Link to="/about">About 360° Vertex</Link><Link to="/founder">Meet the founder</Link><Link to="/contact">Start a project</Link><Link to="/privacy-policy">Privacy</Link></div>
      </div>
      <div className="vx-container vx-footer__bottom">
        <span>© 2025 {COMPANY.name}. All rights reserved.</span>
        <div><Link to="/privacy-policy">Privacy</Link><Link to="/terms">Terms</Link></div>
        <div className="vx-footer__socials">
          {SOCIAL.linkedin && <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>}
          {SOCIAL.instagram && <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>}
          {SOCIAL.youtube && <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">yt</a>}
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }) {
  const location = useLocation();
  const [isInitialHome] = useState(() => location.pathname === "/");
  const [introComplete, setIntroComplete] = useState(
    () => !isInitialHome || window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const completeIntro = useCallback(() => setIntroComplete(true), []);

  useEffect(() => {
    const shell = document.querySelector(".vx-site-shell");
    const sections = document.querySelectorAll("main > section, main > div > section");
    const imageTargets = document.querySelectorAll("main section, main main, .public-prompts__hero");
    const serviceCards = document.querySelectorAll(".vx-service-grid--directory .vx-service-card");
    if (!shell) return undefined;
    const motionTargets = [...sections, ...serviceCards];
    imageTargets.forEach((target) => {
      target.classList.add("vx-image-wash");
      target.style.setProperty("--vx-section-art", 'url("/digital-marketing-background.png")');
    });
    const clearSectionArtwork = () => {
      imageTargets.forEach((target) => {
        target.classList.remove("vx-image-wash");
        target.style.removeProperty("--vx-section-art");
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      motionTargets.forEach((target) => target.classList.add("is-visible"));
      return () => {
        motionTargets.forEach((target) => target.classList.remove("is-visible"));
        clearSectionArtwork();
      };
    }

    sections.forEach((section) => section.classList.add("vx-reveal"));
    serviceCards.forEach((card, index) => {
      card.classList.add("vx-reveal-item");
      card.style.setProperty("--vx-reveal-delay", `${(index % 5) * 75}ms`);
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px 0px" });
    motionTargets.forEach((target) => observer.observe(target));
    const frame = requestAnimationFrame(() => shell.classList.add("vx-motion-ready"));

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      shell.classList.remove("vx-motion-ready");
      sections.forEach((section) => section.classList.remove("vx-reveal", "is-visible"));
      clearSectionArtwork();
      serviceCards.forEach((card) => {
        card.classList.remove("vx-reveal-item", "is-visible");
        card.style.removeProperty("--vx-reveal-delay");
      });
    };
  }, [location.pathname]);

  return (
    <div className={`vx-site-shell${introComplete ? " vx-site-shell--intro-complete" : ""}`}>
      {isInitialHome && !introComplete && <IntroAnimation onComplete={completeIntro} />}
      <SiteNavigation />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

function Eyebrow({ children }) {
  return <span className="vx-eyebrow"><span />{children}</span>;
}

function SectionTitle({ eyebrow, title, copy, align = "left" }) {
  return <div className={`vx-section-title vx-section-title--${align}`}><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function CtaLink({ to, children, secondary = false }) {
  return <Link className={`vx-button${secondary ? " vx-button--outline" : ""}`} to={to}>{children}<ArrowRight size={16} /></Link>;
}

function ServiceIdentity({ service, path, compact = false }) {
  const serviceIndex = businessServices.findIndex((item) => item.href === path);
  const serviceItem = businessServices[serviceIndex];
  const Icon = serviceItem?.icon || Sparkles;
  const accents = ["#1769d2", "#08b9e8", "#7a20d6", "#08b9e8", "#1769d2", "#7a20d6", "#08b9e8", "#1769d2", "#7a20d6", "#08b9e8"];
  const accent = accents[Math.max(serviceIndex, 0) % accents.length];

  return (
    <aside className={`vx-service-identity${compact ? " vx-service-identity--compact" : ""}`} style={{ "--service-accent": accent }} aria-label={`${service.title} visual identity`}>
      <div className="vx-service-identity__art" aria-hidden="true">
        <span className="vx-service-identity__orbit vx-service-identity__orbit--outer" />
        <span className="vx-service-identity__orbit vx-service-identity__orbit--inner" />
        <span className="vx-service-identity__spark vx-service-identity__spark--one" />
        <span className="vx-service-identity__spark vx-service-identity__spark--two" />
        <div className="vx-service-identity__icon"><Icon size={48} strokeWidth={1.35} /></div>
        <div className="vx-service-identity__logo"><img src="/vertex-solutions-logo.png" alt="360° Vertex Solutions" /></div>
      </div>
      <div className="vx-service-identity__copy">
        <span>{service.group} · 360° Vertex Solutions</span>
        <strong>{service.title}</strong>
        <small>{service.deliverables[0]}</small>
      </div>
    </aside>
  );
}

function ProjectGrid({ limit, slugs }) {
  const visible = slugs
    ? slugs.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean)
    : limit ? projects.slice(0, limit) : projects;
  return <div className="vx-project-grid">{visible.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div>;
}

function ProjectCard({ project, index }) {
  return (
    <article className={`vx-project-card vx-project-card--${index + 1}`} key={project.slug}>
      <Link className="vx-project-card__image-link" to={`/work/${project.slug}`} aria-label={`Preview ${project.title}`}>
        <div className="vx-project-card__image">
          {project.image ? <img src={project.image} alt={`${project.title} project screenshot`} loading="lazy" /> : <div className="vx-project-card__placeholder"><span>{project.category} PROJECT</span><strong>{project.title}</strong><small>PROJECT PREVIEW</small></div>}
          <span className="vx-project-card__index">0{index + 1}</span>
        </div>
      </Link>
      <div className="vx-project-card__copy">
        <span>{project.type}</span>
        <h3><Link to={`/work/${project.slug}`}>{project.title}</Link></h3>
        <p>{project.description}</p>
        <Link to={`/work/${project.slug}`}>View project preview <ArrowRight size={15} /></Link>
      </div>
    </article>
  );
}

function EnquiryForm({ audience = "general" }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [...data.entries()].filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`);
    const url = waLink(`Hello ${COMPANY.name}, I'd like to make an enquiry.\n\n${lines.join("\n")}`);
    const tab = window.open(url, "_blank");
    if (!tab) {
      setStatus("error");
      setMessage("Your browser blocked the WhatsApp window. Please allow pop-ups or contact us using the WhatsApp link below.");
      return;
    }
    tab.opener = null;
    setStatus("success");
    setMessage("Your enquiry is ready in WhatsApp. Review it there and press Send to share it with us.");
    event.currentTarget.reset();
  };

  return (
    <form className="vx-form" onSubmit={submit}>
      {audience === "business" ? (
        <>
          <label>Business name<input name="Business name" autoComplete="organization" required /></label>
          <div className="vx-form__row">
            <label>Your name<input name="Name" autoComplete="name" required /></label>
            <label>Email address<input name="Email" type="email" autoComplete="email" required /></label>
          </div>
          <label>Phone or WhatsApp<input name="Phone" type="tel" autoComplete="tel" required /></label>
          <label>Services you need<select name="Services required" required defaultValue=""><option value="" disabled>Select a service</option>{businessServices.map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
          <label>Approximate budget<select name="Approximate budget" required defaultValue=""><option value="" disabled>Select a range</option><option>Under ₹25,000</option><option>₹25,000–₹75,000</option><option>₹75,000–₹2,00,000</option><option>₹2,00,000+</option><option>Not sure yet</option></select></label>
          <label>Project goals<textarea name="Project goals" rows="4" required placeholder="What would you like to achieve?" /></label>
        </>
      ) : (
        <>
          <div className="vx-form__row"><label>Your name<input name="Name" autoComplete="name" required /></label><label>Email address<input name="Email" type="email" autoComplete="email" required /></label></div>
          <label>I&apos;m interested in<select name="Service interest" defaultValue=""><option value="" disabled>Select a solution</option>{businessServices.map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
          <label>How can we help?<textarea name="Requirements or goals" rows="5" required placeholder="Share a little about what you need." /></label>
        </>
      )}
      {status && <p className={`vx-form__status vx-form__status--${status}`} role="status">{message}</p>}
      <button className="vx-button vx-button--full" type="submit">Continue in WhatsApp<ArrowRight size={16} /></button>
      <p className="vx-form__note">This opens a prepared message in WhatsApp. You can review it before choosing to send.</p>
    </form>
  );
}

function ContactBlock({ audience = "general", compact = false }) {
  return <section className={`vx-contact${compact ? " vx-contact--compact" : ""}`} id="enquiry">
    <div className="vx-container vx-contact__grid">
      <div className="vx-contact__intro">
        <Eyebrow>{audience === "business" ? "LET'S BUILD SOMETHING" : "START A CONVERSATION"}</Eyebrow>
        <h2>{audience === "business" ? "Tell us where you want to grow." : "Your next step starts here."}</h2>
        <p>{audience === "business" ? "Share your goals, services, and budget. We'll start with a conversation about fit and scope." : "Tell us what you have in mind. We’ll help you find the right path."}</p>
        <a className="vx-contact__direct" href={waLink()} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> WhatsApp {COMPANY.whatsappPhone} <ArrowUpRight size={16} /></a>
        <a className="vx-contact__phone" href={`tel:+${COMPANY.phoneRaw}`}>Call {COMPANY.phone}</a>
      </div>
      <EnquiryForm audience={audience} />
    </div>
  </section>;
}

const homeServices = [
  {
    title: "Web Development",
    icon: Code2,
    color: "#7139d8",
    copy: "We build fast, secure, modern, and scalable websites tailored to your requirements.",
    items: ["Business Websites", "Portfolio Websites", "E-commerce Websites", "Custom Web Applications", "Landing Pages"],
  },
  {
    title: "Digital Marketing",
    icon: Megaphone,
    color: "#4263eb",
    copy: "We create data-driven marketing strategies that improve online visibility and engagement.",
    items: ["SEO", "Google Ads", "Meta Ads", "Social Media Marketing", "Analytics and Reporting"],
  },
  {
    title: "Branding & Design",
    icon: Palette,
    color: "#7139d8",
    copy: "We design memorable brands that help businesses build recognition and trust.",
    items: ["Logo Design", "Brand Identity", "Graphic Design", "Social Media Creatives", "UI/UX Design"],
  },
  {
    title: "Career & Education",
    icon: GraduationCap,
    color: "#39217d",
    copy: "We empower students and job seekers with practical learning resources and professional development services.",
    items: ["ATS-Friendly Resumes", "LinkedIn Optimization", "Interview Preparation", "Mini & Final Year Projects", "Educational Resources"],
  },
];

const whyChoose = [
  { icon: Rocket, title: "Fast Delivery", copy: "Quality solutions delivered within agreed timelines." },
  { icon: ShieldCheck, title: "Secure & Reliable", copy: "Focus on reliable technology and responsible development." },
  { icon: BarChart3, title: "Result-Driven", copy: "Practical solutions designed around your objectives." },
  { icon: Headphones, title: "Support & Guidance", copy: "Assistance throughout your project journey." },
];

const portfolioFilters = ["All", "Web Development", "E-commerce", "Branding", "Digital Marketing", "AI / ML"];

export function HomePage() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return project.image;
    const type = (project.type || "").toLowerCase();
    if (filter === "Web Development") return /business|website|crm|events/.test(type);
    if (filter === "E-commerce") return /e-commerce|ecommerce|store|shop/.test(type);
    if (filter === "Branding") return /graphic|brand|design|logo/.test(type);
    if (filter === "Digital Marketing") return /marketing|seo|ads/.test(type);
    if (filter === "AI / ML") return /machine learning|ai\/ml|ml|fraud/.test(type);
    return project.image;
  });

  return <div className="vx-home-page">
    {/* ===== HERO ===== */}
    <section className="vx-hero vx-hero--ads">
      <div className="vx-hero__blobs" aria-hidden="true">
        <span className="vx-hero__blob vx-hero__blob--a" />
        <span className="vx-hero__blob vx-hero__blob--b" />
      </div>
      <div className="vx-container vx-hero__grid">
        <div className="vx-hero__copy">
          <span className="vx-hero__badge">WE BUILD DIGITAL EXPERIENCES</span>
          <h1>Powerful <span className="vx-grad">Digital Solutions</span><br /><em>That Drive Real Results.</em></h1>
          <p>We design stunning websites, build innovative digital experiences, and deliver technology solutions that help students, professionals, and businesses grow.</p>
          <div className="vx-hero__actions">
            <CtaLink to="/contact">LET'S GET STARTED</CtaLink>
            <CtaLink to="/work" secondary>VIEW OUR PORTFOLIO</CtaLink>
          </div>
          <ul className="vx-hero__chips">
            <li><Code2 size={16} /> Web Development</li>
            <li><GraduationCap size={16} /> Resume &amp; Career Services</li>
            <li><Palette size={16} /> Branding &amp; Design</li>
            <li><BarChart3 size={16} /> Growth Strategy</li>
          </ul>
        </div>

        <div className="vx-hero-visual" aria-label="360° Vertex Solutions website shown on laptop and mobile mockups">
          <div className="vx-hero-visual__circle" aria-hidden="true" />
          <div className="vx-hero-visual__dots" aria-hidden="true" />

          {/* Laptop mockup */}
          <div className="vx-mockup vx-mockup--laptop">
            <div className="vx-mockup__camera" />
            <div className="vx-mockup__screen">
              <div className="vx-mockup__bar">
                <span /><span /><span />
                <strong>360° Vertex Solutions</strong>
              </div>
              <div className="vx-mockup__content">
                <div className="vx-mockup__hero">
                  <small>We Create Digital Experiences</small>
                  <h4>Websites that make an impact</h4>
                  <a className="vx-mockup__cta">Explore our work</a>
                </div>
                <div className="vx-mockup__grid">
                  <div className="vx-mockup__card" style={{ background: "linear-gradient(135deg,#7139d8,#4263eb)" }}>
                    <span>Projects</span><b>250+</b>
                  </div>
                  <div className="vx-mockup__card" style={{ background: "linear-gradient(135deg,#4263eb,#39217d)" }}>
                    <span>Clients</span><b>120+</b>
                  </div>
                  <div className="vx-mockup__card" style={{ background: "linear-gradient(135deg,#39217d,#7139d8)" }}>
                    <span>Success</span><b>98%</b>
                  </div>
                  <div className="vx-mockup__card vx-mockup__card--img">
                    <span className="vx-mockup__badge">Web Development</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="vx-mockup__base"><div /></div>
          </div>

          {/* Smartphone mockup */}
          <div className="vx-mockup vx-mockup--phone">
            <div className="vx-mockup__notch" />
            <div className="vx-mockup__screen">
              <div className="vx-mockup__bar vx-mockup__bar--phone">
                <strong>Your Brand</strong>
              </div>
              <div className="vx-mockup__stats">
                <div><b>140</b><small>Projects</small></div>
                <div><b>22K</b><small>Followers</small></div>
                <div><b>180</b><small>Following</small></div>
              </div>
              <a className="vx-mockup__cta vx-mockup__cta--phone">Message</a>
              <div className="vx-mockup__mini-grid">
                <span /><span /><span /><span />
                <span /><span /><span /><span />
                <span /><span /><span /><span />
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <div className="vx-float-card vx-float-card--1">
            <Monitor size={18} />
            <div><b>Web Development</b><small>Fast · Secure · Scalable</small></div>
          </div>
          <div className="vx-float-card vx-float-card--2">
            <Globe size={18} />
            <div><b>SEO Ready</b><small>Optimized for growth</small></div>
          </div>
        </div>
      </div>
      <a href="#services" className="vx-scroll-cue">SCROLL TO EXPLORE <ArrowDownRight size={15} /></a>
    </section>

    {/* ===== SERVICES ===== */}
    <section className="vx-section" id="services">
      <div className="vx-container">
        <SectionTitle eyebrow="WHAT WE DO" title="Our Services" copy="Everything you need to build, grow, and succeed in the digital world." align="center" />
        <div className="vx-service-grid vx-service-grid--ads">
          {homeServices.map((service) => {
            const Icon = service.icon;
            return (
              <article className="vx-service-card vx-service-card--ads" key={service.title} style={{ "--accent": service.color }}>
                <span className="vx-service-card__icon"><Icon size={24} /></span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <ul className="vx-service-card__list">
                  {service.items.map((item) => <li key={item}><Check size={14} /> {item}</li>)}
                </ul>
                <Link className="vx-service-card__cta" to="/services">Explore Service <ArrowUpRight size={15} /></Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>

    {/* ===== WHY CHOOSE US ===== */}
    <section className="vx-why-band">
      <div className="vx-container vx-why-band__grid">
        {whyChoose.map((item) => {
          const Icon = item.icon;
          return (
            <article className="vx-why-band__item" key={item.title}>
              <span className="vx-why-band__icon"><Icon size={26} /></span>
              <div>
                <h3>{item.title.toUpperCase()}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>

    {/* ===== RECENT PROJECTS ===== */}
    <section className="vx-section vx-section--soft">
      <div className="vx-container">
        <div className="vx-section-heading-row">
          <SectionTitle eyebrow="OUR WORK" title="Recent Projects" copy="A selection of websites, commerce experiences, branding, and technical projects." />
          <Link className="vx-text-link" to="/work">View all projects <ArrowRight size={16} /></Link>
        </div>
        <div className="vx-filter" aria-label="Filter recent projects">
          {portfolioFilters.map((item) => (
            <button className={filter === item ? "is-active" : ""} key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
        <div className="vx-project-grid vx-project-grid--ads">
          {filteredProjects.map((project) => (
            <Link className="vx-project-card" to={`/work/${project.slug}`} key={project.slug}>
              <div className="vx-project-card__media">
                {project.image
                  ? <img src={project.image} alt={`${project.title} project preview`} loading="lazy" />
                  : <div className="vx-project-card__placeholder"><span>{project.category}</span></div>}
                <span className="vx-project-card__cat">{project.category}</span>
              </div>
              <div className="vx-project-card__copy">
                <h3>{project.title}</h3>
                <p>{project.overview}</p>
                <span className="vx-project-card__link">View Project <ArrowUpRight size={15} /></span>
              </div>
            </Link>
          ))}
        </div>
        {filteredProjects.length === 0 && <p className="vx-empty">No projects in this category yet. Try another filter.</p>}
      </div>
    </section>

    {/* ===== FINAL CTA ===== */}
    <section className="vx-final-cta">
      <div className="vx-container vx-final-cta__inner">
        <div className="vx-final-cta__copy">
          <Send className="vx-final-cta__plane" size={38} aria-hidden="true" />
          <h2>Ready to Transform Your Ideas into Reality?</h2>
          <p>Let's build something amazing together.</p>
          <a className="vx-button vx-button--light" href={waLink()} target="_blank" rel="noopener noreferrer">GET IN TOUCH <ArrowRight size={16} /></a>
        </div>
        <div className="vx-final-cta__contacts">
          <a href={`mailto:${COMPANY.email}`}><Mail size={20} /> <span><small>EMAIL US</small><b>{COMPANY.email}</b></span></a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /> <span><small>WHATSAPP</small><b>{COMPANY.whatsappPhone}</b></span></a>
          <div className="vx-final-cta__socials">
            {SOCIAL.instagram && <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>}
            {SOCIAL.linkedin && <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>}
            {SOCIAL.youtube && <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">YouTube</a>}
          </div>
        </div>
      </div>
    </section>

    <ContactBlock compact />
  </div>;
}

export function BusinessPage() {
  return <>
    <section className="vx-inner-hero vx-inner-hero--business"><div className="vx-container vx-inner-hero__grid"><div><Eyebrow>BUSINESS & STARTUP SOLUTIONS</Eyebrow><h1>Your business deserves a stronger digital presence.</h1><p>We build professional websites and deliver digital marketing services designed around your business goals, audience, and budget.</p><div className="vx-hero__actions"><CtaLink to="#business-enquiry">Start your project</CtaLink><CtaLink to="/work" secondary>View our work</CtaLink></div></div><a className="vx-inner-hero__visual vx-inner-hero__visual--photo" href="https://vaakya-creations.netlify.app/" target="_blank" rel="noopener noreferrer"><img src="/client-projects/vaakya-creations.jpg" alt="Screenshot of the Vaakya Creations e-commerce website" /><span>Vaakya Creations <ArrowUpRight size={15} /></span></a></div></section>
    <section className="vx-section"><div className="vx-container"><SectionTitle eyebrow="WHAT WE DO" title="Digital foundations and growth." copy="Choose the services you need today. We can discuss how they fit together around your business." /><div className="vx-service-grid">{businessServices.map((service) => { const Icon = service.icon; return <Link className="vx-service-card" to={service.href} key={service.title}><Icon size={21} /><h3>{service.title}</h3><p>{service.copy}</p><span>Explore service <ArrowUpRight size={15} /></span></Link>; })}</div></div></section>
    <section className="vx-section vx-section--soft"><div className="vx-container vx-industries"><div><SectionTitle eyebrow="WHO WE SUPPORT" title="Built for businesses at different stages." copy="We work with people who want a thoughtful, useful digital presence." /></div><div className="vx-industry-list">{["Startups & small businesses", "Local service providers", "E-commerce brands", "Educational institutions", "Growing teams & established brands"].map((item) => <span key={item}><Check size={16} />{item}</span>)}</div></div></section>
    <section className="vx-section"><div className="vx-container"><div className="vx-section-heading-row"><SectionTitle eyebrow="SELECTED BUSINESS PROJECTS" title="Digital work with a purpose." /><Link className="vx-text-link" to="/work">See our work <ArrowRight size={16} /></Link></div><ProjectGrid slugs={["pr-skillverse", "vaakya-creations", "froot-bowl"]} /></div></section>
    <section className="vx-section vx-section--soft">
      <div className="vx-container">
        <div className="vx-section-heading-row">
          <SectionTitle eyebrow="GRAPHIC DESIGN DEMOS" title="Creative visuals for memorable brands." />
          <Link className="vx-text-link" to="/work/graphic-design-showcase">View design collection <ArrowRight size={16} /></Link>
        </div>
        <p className="vx-graphic-design__intro">
          Explore Balanced Bowl food creatives, brand identities, and digital campaign artwork. Open the collection to browse all six designs.
        </p>
        <div className="vx-graphic-design-grid">
          {projects.find((project) => project.slug === "graphic-design-showcase").screenshots.map((screenshot, index) => (
            <Link
              className="vx-graphic-design-card"
              key={screenshot.src}
              to="/work/graphic-design-showcase"
              aria-label={`View graphic design demo ${index + 1}: ${screenshot.alt}`}
            >
              <img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
            </Link>
          ))}
        </div>
      </div>
    </section>
    <section className="vx-section vx-section--soft"><div className="vx-container"><SectionTitle eyebrow="OUR PROCESS" title="From first conversation to launch." align="center" /><div className="vx-process-grid">{[["01", "Discover", "Your goals, audience, services, timeline, and budget."], ["02", "Define", "A practical scope, clear deliverables, and shared priorities."], ["03", "Create", "Design and development shaped by your feedback."], ["04", "Launch & review", "A considered handover and next-step conversation."]].map(([n, t, c]) => <article className="vx-process-step" key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div></div></section>
    <div id="business-enquiry"><ContactBlock audience="business" /></div>
  </>;
}

export function WorkPage() {
  const [filter, setFilter] = useState("All work");
  const filters = ["All work", "Business", "CRM", "Education", "Graphic Design", "Technical", "Personal", "Events"];
  const items = filter === "All work" ? projects : projects.filter((project) => project.category === filter);
  return <><PageIntro eyebrow="OUR WORK" title="A collection of digital work and learning projects." copy="Explore websites, education and business platforms, CRM tools, and technical projects. Open a project preview to see its details and available live demo." /><section className="vx-section"><div className="vx-container"><div className="vx-filter" aria-label="Filter projects">{filters.map((item) => <button className={filter === item ? "is-active" : ""} key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><ProjectGridItems items={items} /></div></section><section className="vx-cta-band"><div className="vx-container vx-cta-band__inner"><div><Eyebrow>HAVE A PROJECT IN MIND?</Eyebrow><h2>Let’s make it yours.</h2></div><CtaLink to="/contact">Talk with us</CtaLink></div></section></>;
}

function ProjectGridItems({ items }) {
  return <div className="vx-project-grid">{items.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div>;
}

function ProjectScreenshots({ project }) {
  const screenshots = project.screenshots || [];
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const currentScreenshot = screenshots[activeScreenshot];

  return (
    <figure className="vx-project-detail-image">
      {currentScreenshot ? (
        <div className="vx-project-detail-carousel">
          <img src={currentScreenshot.src} alt={currentScreenshot.alt} />
          {screenshots.length > 1 && (
            <div className="vx-project-detail-carousel__controls">
              <button
                type="button"
                onClick={() => setActiveScreenshot((activeScreenshot - 1 + screenshots.length) % screenshots.length)}
                aria-label="Show previous screenshot"
              >
                <ArrowLeft size={16} />
              </button>
              <span aria-live="polite">Screenshot {activeScreenshot + 1} of {screenshots.length}</span>
              <button
                type="button"
                onClick={() => setActiveScreenshot((activeScreenshot + 1) % screenshots.length)}
                aria-label="Show next screenshot"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      ) : project.image ? <img src={project.image} alt={`${project.title} website preview`} /> : <div className={`vx-project-detail-placeholder vx-project-detail-placeholder--${project.category.toLowerCase()}`}><span>{project.category} PROJECT</span><strong>{project.title}</strong><small>360° Vertex Solutions</small></div>}
      <figcaption>{currentScreenshot ? `Project screenshot · ${project.category}` : `Project preview · ${project.category}`}</figcaption>
    </figure>
  );
}

export function ProjectPreviewPage() {
  const { projectSlug } = useParams();
  const project = projects.find((item) => item.slug === projectSlug);

  if (!project) {
    return <><PageIntro eyebrow="PROJECT PREVIEW" title="We couldn't find that project." copy="Browse the full work collection to find another project preview." /><section className="vx-section"><div className="vx-container"><CtaLink to="/work">Browse all work</CtaLink></div></section></>;
  }

  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 3);
  return <>
    <section className="vx-project-detail-hero">
      <div className="vx-container">
        <Link className="vx-project-back" to="/work"><ArrowRight size={15} /> All projects</Link>
        <div className="vx-project-detail-hero__grid">
          <div className="vx-project-detail-copy">
            <Eyebrow>{project.type}</Eyebrow>
            <h1>{project.title}</h1>
            <p>{project.overview}</p>
            <div className="vx-hero__actions">
              {project.href ? <a className="vx-button" href={project.href} target="_blank" rel="noopener noreferrer">Open live project <ArrowUpRight size={16} /></a> : <span className="vx-project-live-pending">Live preview is not hosted yet</span>}
              {project.adminHref && <a className="vx-button vx-button--outline" href={project.adminHref} target="_blank" rel="noopener noreferrer">Open admin dashboard <ArrowUpRight size={16} /></a>}
              <CtaLink to="/contact" secondary>Discuss a similar project</CtaLink>
            </div>
          </div>
          <ProjectScreenshots key={project.slug} project={project} />
        </div>
      </div>
    </section>
    <section className="vx-section">
      <div className="vx-container vx-project-detail-body">
        <div><Eyebrow>PROJECT OVERVIEW</Eyebrow><h2>Designed around a clear purpose.</h2><p>{project.description}</p></div>
        <div><Eyebrow>PROJECT FOCUS</Eyebrow><ul>{project.highlights.map((highlight) => <li key={highlight}><Check size={16} />{highlight}</li>)}</ul></div>
      </div>
    </section>
    <section className="vx-section vx-section--soft">
      <div className="vx-container"><div className="vx-section-heading-row"><SectionTitle eyebrow="MORE SELECTED WORK" title="Explore another project." /><Link className="vx-text-link" to="/work">View all work <ArrowRight size={15} /></Link></div><ProjectGridItems items={related} /></div>
    </section>
    <section className="vx-cta-band"><div className="vx-container vx-cta-band__inner"><div><Eyebrow>HAVE A PROJECT IN MIND?</Eyebrow><h2>Let’s make a useful digital experience.</h2></div><CtaLink to="/contact">Start a conversation</CtaLink></div></section>
  </>;
}

function PageIntro({ eyebrow, title, copy }) {
  return <section className="vx-page-intro"><div className="vx-container"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{copy}</p></div></section>;
}

export function AboutPage() {
  return (
    <div className="vx-about-page">
      <PageIntro
        eyebrow="ABOUT 360° VERTEX SOLUTIONS"
        title="Technology that makes new possibilities practical."
        copy="We build intelligent software, digital products, and creative technology experiences that help businesses move forward."
      />
      <section className="vx-section">
        <div className="vx-container vx-about-grid">
          <div>
            <SectionTitle eyebrow="OUR PURPOSE" title="Make advanced technology accessible." />
            <p>Our work brings product thinking, modern engineering, and creative technology together to solve practical problems. We aim to make ambitious ideas useful, understandable, and ready to grow.</p>
            <p>Our long-term direction is product-led: explore recurring business problems, validate the need, and build focused software when evidence supports it. Vertex Business X-Ray is an early product hypothesis—not a released or validated product.</p>
            <CtaLink to="/contact" secondary>Start a conversation</CtaLink>
            <Link className="vx-founder-link" to="/founder">Meet the founder <ArrowRight size={15} /></Link>
          </div>
          <div className="vx-about-card">
            <span>360°</span>
            <h3>Learn.<br />Build.<br />Launch. Grow.</h3>
            <p>Software · Products · Creative technology</p>
          </div>
        </div>
      </section>
      <section className="vx-section vx-section--soft">
        <div className="vx-container">
          <SectionTitle eyebrow="OUR PRINCIPLES" title="The way we build matters." align="center" />
          <div className="vx-value-grid">
            {[
              ["Problem-first", "Understand real workflows before choosing features."],
              ["Simplicity", "Reduce steps and make the next action clear."],
              ["Trust", "Treat security, permissions, and transparency as foundations."],
              ["Evidence-led", "Validate demand and outcomes before expanding a product."],
            ].map(([title, copy]) => (
              <article key={title}>
                <span><Check size={17} /></span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="vx-cta-band">
        <div className="vx-container vx-cta-band__inner">
          <div><Eyebrow>LET’S TALK</Eyebrow><h2>Have an idea worth building?</h2></div>
          <CtaLink to="/contact">Get in touch</CtaLink>
        </div>
      </section>
    </div>
  );
}

export function ServicesPage() {
  return <>
    <section className="vx-page-intro vx-services-intro">
      <div className="vx-container vx-services-intro__grid">
        <div><Eyebrow>OUR SOLUTIONS</Eyebrow><h1>From first idea to intelligent product.</h1><p>Explore software, digital experience, and growth services designed around your goals.</p></div>
        <ServiceIdentity service={servicePages["/business/custom-web-applications"]} path="/business/custom-web-applications" compact />
      </div>
    </section>
    <section className="vx-section" id="business-services">
      <div className="vx-container">
        <SectionTitle eyebrow="BUSINESSES & STARTUPS" title="Build and grow your digital presence." copy="Websites and marketing support with a clear scope, useful deliverables, and your business goals in view." />
        <div className="vx-service-grid vx-service-grid--directory">{businessServices.map((service) => { const Icon = service.icon; return <Link className="vx-service-card" to={service.href} key={service.title}><Icon size={20} /><h3>{service.title}</h3><p>{service.copy}</p><span>Explore service <ArrowUpRight size={15} /></span></Link>; })}</div>
        <div className="vx-service-directory__cta"><CtaLink to="/business">Explore business solutions</CtaLink></div>
      </div>
    </section>
    <ContactBlock />
  </>;
}

export function FounderPage() {
  return <>
    <section className="vx-founder-hero">
      <div className="vx-container vx-founder-hero__grid">
        <div className="vx-founder-hero__copy">
          <Eyebrow>THE PERSON BEHIND THE WORK</Eyebrow>
          <h1>Built with curiosity.<br /><span>Grounded in real work.</span></h1>
          <p>I’m Sasindra, founder of 360° Vertex Solutions and a full-stack developer. I started Vertex to bring software engineering, digital product thinking, and creative technology together to help turn ambitious ideas into useful experiences.</p>
          <div className="vx-hero__actions"><CtaLink to="/contact">Get in touch</CtaLink><CtaLink to="/work" secondary>See selected work</CtaLink></div>
          <span className="vx-founder-hero__role">FOUNDER & FULL-STACK DEVELOPER · 360° VERTEX SOLUTIONS</span>
        </div>
        <figure className="vx-founder-portrait">
          <img src="/founder-portrait.png" alt="Sasindra, founder of 360° Vertex Solutions" />
          <figcaption><span>Sasindra</span><small>Founder, 360° Vertex Solutions</small></figcaption>
        </figure>
      </div>
    </section>
    <section className="vx-section">
      <div className="vx-container vx-founder-story">
        <div><Eyebrow>WHY I STARTED VERTEX</Eyebrow><h2>Make useful support easier to find.</h2></div>
        <div><p>I started 360° Vertex Solutions with a simple idea: make modern technology more useful and accessible to the people and businesses that need it.</p><p>Today, that means building digital products, software, and creative technology experiences with a focus on practical outcomes and thoughtful engineering.</p><Link className="vx-text-link" to="/about">More about 360° Vertex <ArrowRight size={15} /></Link></div>
      </div>
    </section>
    <section className="vx-section vx-section--soft">
      <div className="vx-container">
        <SectionTitle eyebrow="WHAT I DO" title="Software, products, and digital experiences." copy="A practical mix of product thinking, engineering, and creative technology." />
        <div className="vx-founder-pillars">
          <article><span>01</span><h3>Business & portfolio websites</h3><p>Responsive websites that present a business, portfolio, or personal profile clearly.</p></article>
          <article><span>02</span><h3>E-commerce platforms</h3><p>Online storefronts that help customers browse products and connect with a business.</p></article>
          <article><span>03</span><h3>Full-stack applications</h3><p>Web applications that bring the interface, server logic, and data layer together.</p></article>
          <article><span>04</span><h3>UI & frontend development</h3><p>Usable, responsive interfaces shaped around the people who use them.</p></article>
          <article><span>05</span><h3>Backend & API development</h3><p>Application logic and API connections that support digital products.</p></article>
          <article><span>06</span><h3>Database solutions</h3><p>Data structures and storage designed around a product’s information needs.</p></article>
          <article><span>07</span><h3>AI & automation</h3><p>Explore practical automation ideas that can simplify repetitive work.</p></article>
          <article><span>08</span><h3>Digital strategy & growth</h3><p>Use technology, analytics, and thoughtful optimisation to improve digital experiences.</p></article>
        </div>
        <div className="vx-service-directory__cta"><CtaLink to="/work" secondary>See selected work</CtaLink></div>
      </div>
    </section>
    <section className="vx-section">
      <div className="vx-container vx-founder-quote">
        <span>“</span><blockquote>Your Skills. Your Career. Your Future. All in 360°.</blockquote><p>A reminder to keep learning, build real skills, and create opportunities through the work.</p>
      </div>
    </section>
    <section className="vx-cta-band"><div className="vx-container vx-cta-band__inner"><div><Eyebrow>YOUR NEXT BIG IDEA STARTS HERE</Eyebrow><h2>Tell me what you’re building.</h2></div><CtaLink to="/contact">Start a conversation</CtaLink></div></section>
  </>;
}

export function ContactPage() {
  return <><PageIntro eyebrow="CONTACT" title="Your next big idea starts here." copy="Tell us what you want to build, improve, or explore. We’ll start with a conversation about fit and scope." /><ContactBlock /></>;
}

export function ServicePage() {
  const { pathname } = useLocation();
  const servicePath = pathname.replace(/\/$/, "");
  const service = servicePages[servicePath];
  if (!service) return <PageIntro eyebrow="SERVICE" title="Let’s find the right solution." copy="Explore our services and tell us what you need." />;
  return <><section className="vx-inner-hero vx-inner-hero--business"><div className="vx-container vx-inner-hero__grid"><div className="vx-service-hero"><Eyebrow>{service.group}</Eyebrow><h1>{service.title}</h1><p>{service.intro}</p><CtaLink to="/contact">Enquire about this solution</CtaLink></div><ServiceIdentity service={service} path={servicePath} /></div></section><section className="vx-section"><div className="vx-container vx-deliverables"><div><SectionTitle eyebrow="WHAT'S INCLUDED" title="A clear scope, shaped around your needs." copy="We’ll discuss your requirements and confirm the scope before work begins." /><ul>{service.deliverables.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>{service.notice && <p className="vx-notice"><ShieldCheck size={18} />{service.notice}</p>}</div><aside className="vx-service-aside"><span>YOUR NEXT STEP</span><h3>Start with a conversation.</h3><p>Share what you have in mind. We’ll discuss fit, scope, and the best way to move forward.</p><CtaLink to="/contact">Make an enquiry</CtaLink></aside></div></section><section className="vx-section vx-section--soft"><div className="vx-container"><SectionTitle eyebrow="EXPLORE MORE" title="More ways to build and grow" /><div className="vx-related-links">{businessServices.filter((item) => item.href !== servicePath).slice(0, 4).map((item) => <Link to={item.href} key={item.title}>{item.title}<ArrowUpRight size={15} /></Link>)}</div></div></section></>;
}

export function LegalPage() {
  const { pathname } = useLocation();
  const isPrivacy = pathname === "/privacy-policy";
  return <><PageIntro eyebrow="LEGAL" title={isPrivacy ? "Privacy policy" : "Terms of use"} copy={`Last updated: ${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}`} /><section className="vx-section"><div className="vx-container vx-legal"><h2>{isPrivacy ? "Information you choose to share" : "Using this website"}</h2><p>{isPrivacy ? "When you contact 360° Vertex Solutions, you may choose to share details such as your name, email address, phone number, project goals, or service interests. Enquiry forms open a prepared message in WhatsApp; you review and send that message yourself." : "This website provides general information about software, digital products, and technology services. Service scope, pricing, timing, and deliverables are agreed directly before work begins."}</p><h2>{isPrivacy ? "How information is used" : "Service information"}</h2><p>{isPrivacy ? "Information you send is used to respond to your enquiry and discuss the services you requested. Do not include passwords, payment details, or other sensitive information in a general enquiry." : "Descriptions of services and capabilities are informational. Project scope and outcomes depend on requirements and are agreed before work begins."}</p><h2>{isPrivacy ? "Your choices and questions" : "External links and enquiries"}</h2><p>{isPrivacy ? "You can choose not to submit an enquiry form and instead contact us through the listed channels. For questions about information you have shared, email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>." : "Links to third-party websites are provided for convenience. Their content, availability, and policies are managed by those third parties. Contact us to discuss any service before making a decision."}</p><p>This page is general website information and is not legal advice.</p></div></section></>;
}

export function FaqPage() {
  const groups = [
    {
      title: "About 360° Vertex Solutions",
      items: [
        ["What is 360° Vertex Solutions?", "An all-in-one platform providing educational resources, career development services, IT solutions, and project support for students and job seekers."],
        ["Who can use your services?", "Students, fresh graduates, working professionals looking to upskill, and businesses that need websites, software, or digital support."],
        ["How do I get started?", "Use the contact page to share what you need. We start with a short conversation about your goals and the right next step."],
      ],
    },
    {
      title: "Student Resources & Projects",
      items: [
        ["Do you provide study materials and notes?", "Yes. Our resource centre is being built with semester material, programming notes, interview preparation, and project documentation."],
        ["Can you help with mini and final-year projects?", "Yes. We support mini projects, final-year projects, and academic project guidance across Java, Python, web, and AI/ML."],
        ["Do you guarantee academic results or placements?", "No. We provide guidance, resources, and support. Outcomes depend on your own work, effort, and decisions."],
      ],
    },
    {
      title: "IT Services",
      items: [
        ["What IT services do you offer?", "Portfolio and business websites, e-commerce, landing pages, custom web applications, and digital marketing support."],
        ["How is a project priced?", "Scope, timeline, and budget are discussed and agreed before any work begins. Share your requirements for a clear proposal."],
        ["Do you maintain websites after launch?", "Yes. We can discuss ongoing maintenance, updates, and improvements after launch."],
      ],
    },
    {
      title: "Getting in touch",
      items: [
        ["How can I contact the team?", "Use the contact form, WhatsApp, or email listed on the contact page. Enquiries start a conversation — nothing is committed automatically."],
        ["What information should I share?", "Your name, contact details, the service you need, and a short description of your goal or project."],
      ],
    },
  ];
  const [open, setOpen] = useState("0-0");
  return <>
    <PageIntro eyebrow="FAQ" title="Everything you wanted to ask." copy="Answers about our services, student resources, career support, and how to get started." />
    <section className="vx-section"><div className="vx-container vx-faq-page">
      {groups.map((group, groupIndex) => (
        <div className="vx-faq-group" key={group.title}>
          <h2>{group.title}</h2>
          <div className="vx-faq-list">
            {group.items.map(([question, answer], itemIndex) => {
              const id = `${groupIndex}-${itemIndex}`;
              const isOpen = open === id;
              return (
                <div className={`vx-faq${isOpen ? " is-open" : ""}`} key={question}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : id)}>
                    <span>{question}</span><span>{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <p>{answer}</p>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div></section>
    <section className="vx-cta-band"><div className="vx-container vx-cta-band__inner"><div><Eyebrow>STILL HAVE A QUESTION?</Eyebrow><h2>Talk to us directly.</h2><p>We’ll help you find the right service or resource.</p></div><CtaLink to="/contact">Contact us</CtaLink></div></section>
  </>;
}

const roadmaps = [
  { title: "Java Developer", level: "Beginner → Advanced", steps: ["Core Java and OOP fundamentals", "Collections, generics, and exceptions", "JDBC and database connectivity", "Spring Boot and REST APIs", "Build and deploy a full-stack project"] },
  { title: "Frontend Developer", level: "Beginner → Advanced", steps: ["HTML and semantic structure", "CSS layout, Flexbox, and Grid", "JavaScript and DOM fundamentals", "React components and state", "Responsive, accessible interfaces"] },
  { title: "Backend Developer", level: "Beginner → Advanced", steps: ["Programming fundamentals", "Databases and SQL", "REST API design principles", "Authentication and security basics", "Deployment and monitoring basics"] },
  { title: "Full Stack Developer", level: "Intermediate → Advanced", steps: ["Frontend fundamentals", "Backend and API development", "Database modelling", "Connecting frontend to backend", "Deploying a complete application"] },
  { title: "Software Testing", level: "Beginner → Advanced", steps: ["Testing fundamentals and terminology", "Manual test case design", "Automation basics with Selenium", "API testing with Postman", "CI and reporting basics"] },
  { title: "AI / ML", level: "Intermediate → Advanced", steps: ["Python and data handling", "Maths for machine learning", "Supervised and unsupervised learning", "Model evaluation and tuning", "Deploying a simple ML project"] },
];

export function CareerHubPage() {
  const [active, setActive] = useState(0);
  const [done, setDone] = useState({});
  const roadmap = roadmaps[active];
  const completed = roadmap.steps.filter((_, index) => done[`${active}-${index}`]).length;
  const progress = Math.round((completed / roadmap.steps.length) * 100);
  const toggleStep = (index) => setDone((prev) => ({ ...prev, [`${active}-${index}`]: !prev[`${active}-${index}`] }));

  return <>
    <PageIntro eyebrow="CAREER HUB" title="Roadmaps that turn learning into a career path." copy="Follow structured learning paths, track your progress, and prepare for technical interviews with clear step-by-step guidance." />
    <section className="vx-section"><div className="vx-container">
      <div className="vx-stage-picker" aria-label="Choose a career roadmap">
        {roadmaps.map((item, index) => (
          <button className={index === active ? "is-active" : ""} key={item.title} type="button" aria-pressed={index === active} onClick={() => setActive(index)}>{item.title}</button>
        ))}
      </div>
      <div className="vx-roadmap">
        <div className="vx-roadmap__head">
          <div><h3>{roadmap.title} Roadmap</h3><span>{roadmap.level}</span></div>
          <strong>{progress}%</strong>
        </div>
        <div className="vx-roadmap__progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress} aria-label={`${roadmap.title} roadmap progress`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="vx-roadmap__note">Tap a step to mark it complete — your progress updates instantly.</p>
        <ol className="vx-roadmap__steps">
          {roadmap.steps.map((step, index) => {
            const isDone = Boolean(done[`${active}-${index}`]);
            return (
              <li key={step} className={isDone ? "is-done" : ""}>
                <button type="button" aria-pressed={isDone} onClick={() => toggleStep(index)}>
                  <span className="vx-roadmap__step-no">{isDone ? <Check size={15} /> : String(index + 1).padStart(2, "0")}</span>
                  <span className="vx-roadmap__step-label">{step}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div></section>
    <section className="vx-section vx-section--soft"><div className="vx-container vx-career-cols">
      <div><SectionTitle eyebrow="INTERVIEW PREPARATION" title="Practise the questions that matter." /><ul className="vx-career-list"><li><Check size={16} />Technical questions by role and technology</li><li><Check size={16} />Structured answers and explanation tips</li><li><Check size={16} />Common HR and behavioural questions</li><li><Check size={16} />Mock-interview guidance</li></ul><Link className="vx-text-link" to="/contact">Ask about interview preparation <ArrowRight size={16} /></Link></div>
      <div><SectionTitle eyebrow="JOB APPLICATION SUPPORT" title="Apply with clarity and confidence." /><ul className="vx-career-list"><li><Check size={16} />Resume and profile review guidance</li><li><Check size={16} />How to tailor applications per role</li><li><Check size={16} />Preparing for the first interview round</li><li><Check size={16} />Follow-up and communication tips</li></ul><p className="vx-notice"><ShieldCheck size={18} />We share job application links only when they are verified. We do not guarantee interviews or placements.</p></div>
    </div></section>
    <section className="vx-cta-band"><div className="vx-container vx-cta-band__inner"><div><Eyebrow>READY FOR THE NEXT STEP?</Eyebrow><h2>Let’s map your career path together.</h2></div><CtaLink to="/contact">Start your journey</CtaLink></div></section>
  </>;
}

export function NotFoundPage() {
  return (
    <section className="vx-inner-hero vx-notfound">
      <div className="vx-container vx-notfound__inner">
        <Eyebrow>ERROR 404</Eyebrow>
        <h1>Lost in the <span className="vx-grad">360°</span>?</h1>
        <p>This page has moved or never existed. Let’s get you back on track.</p>
        <div className="vx-notfound__actions">
          <CtaLink to="/">Back to home</CtaLink>
          <CtaLink to="/services" secondary>Explore services</CtaLink>
        </div>
        <div className="vx-notfound__links">
          <Link to="/career-hub">Career Hub <ArrowRight size={15} /></Link>
          <Link to="/contact">Contact Us <ArrowRight size={15} /></Link>
        </div>
      </div>
    </section>
  );
}

export function PageMeta() {
  const location = useLocation();
  useEffect(() => {
    const pages = {
      "/": ["360° Vertex Solutions | Student Career Development & IT Services", "Build your future with career development, IT solutions, educational resources, and student project support. Your skills. Your career. Your future. All in 360°."],
      "/services": ["Services | 360° Vertex Solutions", "Portfolio websites, resumes, LinkedIn optimisation, student projects, educational resources, and career development support."],
      "/business": ["Business Solutions | 360° Vertex Solutions", "Websites, e-commerce, and digital marketing for businesses and startups."],
      "/work": ["Our Work | 360° Vertex Solutions", "Explore website, education, CRM, event, and technical project previews."],
      "/about": ["About | 360° Vertex Solutions", "Learn how 360° Vertex Solutions bridges academic learning and industry requirements for students, job seekers, and businesses."],
      "/founder": ["Founder | 360° Vertex Solutions", "Meet Sasindra, founder of 360° Vertex Solutions."],
      "/contact": ["Contact | 360° Vertex Solutions", "Tell us what you want to build, improve, or explore."],
      "/career-hub": ["Career Hub | 360° Vertex Solutions", "Interactive career roadmaps for Java, frontend, backend, full-stack, testing, and AI/ML with interview and job application support."],
      "/faq": ["FAQ | 360° Vertex Solutions", "Answers about services, student resources, career support, and how to get started with 360° Vertex Solutions."],
      "/privacy-policy": ["Privacy Policy | 360° Vertex Solutions", "How 360° Vertex Solutions handles information shared through enquiries."],
      "/terms": ["Terms | 360° Vertex Solutions", "Information about using the 360° Vertex Solutions website and services."],
    };
    const project = projects.find((item) => location.pathname === `/work/${item.slug}`);
    const details = pages[location.pathname] || servicePages[location.pathname] || (project && [`${project.title} | Project Preview | 360° Vertex Solutions`, project.description]);
    const title = details
      ? Array.isArray(details) ? details[0] : `${details.title} | 360° Vertex Solutions`
      : "360° Vertex Solutions | Student Career Development & IT Services";
    const content = details
      ? Array.isArray(details) ? details[1] : details.intro
      : "Career development, IT solutions, educational resources, and student project support for students and job seekers.";
    document.title = title;
    const setMeta = (selector, attribute, value, property) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      element.content = value;
    };
    setMeta('meta[name="description"]', "name", content, "description");
    setMeta('meta[property="og:title"]', "property", title, "og:title");
    setMeta('meta[property="og:description"]', "property", content, "og:description");
    setMeta('meta[property="og:url"]', "property", `https://www.360vertexsolutions.com${location.pathname}`, "og:url");
    setMeta('meta[name="twitter:title"]', "name", title, "twitter:title");
    setMeta('meta[name="twitter:description"]', "name", content, "twitter:description");
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://www.360vertexsolutions.com${location.pathname}`;
  }, [location.pathname]);
  return null;
}
