import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Code2,
  FileText,
  GraduationCap,
  Linkedin,
  Menu,
  MessageCircle,
  Monitor,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  MessageSquareText,
  X,
} from "lucide-react";
import { COMPANY, SOCIAL, waLink } from "../config";
import "./VertexSite.css";

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
    icon: Code2,
    href: "/business/ecommerce-development",
  },
  {
    title: "Landing pages",
    copy: "Focused pages for a product, campaign, event, or specific business goal.",
    icon: ArrowUpRight,
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
    icon: Sparkles,
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
    icon: Search,
    href: "/business/google-ads",
  },
  {
    title: "Meta Ads & social",
    copy: "Plan Meta campaigns and social media activity for your brand.",
    icon: Sparkles,
    href: "/business/meta-ads",
  },
  {
    title: "Content & analytics",
    copy: "Create useful content and understand how visitors engage with it.",
    icon: ArrowUpRight,
    href: "/business/content-marketing",
  },
];

const studentServices = [
  {
    title: "Portfolio websites",
    copy: "Present your projects, skills, and experience in a personal portfolio.",
    icon: Monitor,
    href: "/students/portfolio-websites",
  },
  {
    title: "Resume building",
    copy: "Organize your experience into a clear, role-focused resume.",
    icon: FileText,
    href: "/students/resume-building",
  },
  {
    title: "Project guidance",
    copy: "Understand your project, solve problems, and prepare to explain your work.",
    icon: Code2,
    href: "/students/project-guidance",
  },
  {
    title: "Interview preparation",
    copy: "Practice technical questions, project walkthroughs, and communication.",
    icon: MessageSquareText,
    href: "/students/interview-preparation",
  },
  {
    title: "LinkedIn optimization",
    copy: "Make your profile easier to understand and navigate for your goals.",
    icon: Linkedin,
    href: "/students/linkedin-optimization",
  },
  {
    title: "Learning resources",
    copy: "Build a practical learning path with curated topics and project ideas.",
    icon: BookOpen,
    href: "/students/learning-resources",
  },
];

const stageData = [
  {
    label: "First year",
    title: "Start with the fundamentals.",
    detail: "Get a friendly learning roadmap, beginner project guidance, and a first personal learning portfolio.",
    items: ["Programming fundamentals", "Learning roadmaps", "Beginner project guidance", "Personal learning portfolio"],
  },
  {
    label: "Second & third year",
    title: "Turn skills into practical work.",
    detail: "Choose a direction, build mini-projects, and present your work clearly through a portfolio and GitHub.",
    items: ["Mini-project guidance", "Technology-specific portfolios", "GitHub project presentation", "Technical skill resources"],
  },
  {
    label: "Final year",
    title: "Make your project easy to explain.",
    detail: "Get guidance on project understanding, documentation, demonstrations, resumes, and interview practice.",
    items: ["Major-project guidance", "Documentation support", "Presentation preparation", "Resume & interview support"],
  },
  {
    label: "Fresh graduate",
    title: "Prepare a confident professional presence.",
    detail: "Bring together your resume, LinkedIn profile, portfolio, and practical interview preparation.",
    items: ["ATS-conscious resume structure", "LinkedIn profile optimization", "Portfolio website", "Technical interview practice"],
  },
  {
    label: "Working professional",
    title: "Make your next milestone visible.",
    detail: "Refresh your professional brand, showcase your experience, and explore new learning directions.",
    items: ["Portfolio redesign", "Personal website", "Professional branding", "Freelance & entrepreneurship support"],
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

const featuredClientProjects = projects.filter(
  (project) => project.image && project.category !== "Personal",
);

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
  "/students/portfolio-websites": {
    title: "Portfolio websites",
    intro: "A personal website that helps you present your skills, projects, and professional direction.",
    group: "For students & professionals",
    deliverables: ["Role-focused content structure", "Project presentation", "Responsive personal website", "Launch guidance"],
  },
  "/students/resume-building": {
    title: "Resume building",
    intro: "A clear, role-aware resume that helps a reader quickly understand your experience and skills.",
    group: "For students & professionals",
    deliverables: ["Experience and project organization", "ATS-conscious structure", "Role-focused wording suggestions", "Review and refinement"],
  },
  "/students/linkedin-optimization": {
    title: "LinkedIn profile optimization",
    intro: "Improve the clarity and consistency of your professional profile and project presentation.",
    group: "For students & professionals",
    deliverables: ["Headline and About section guidance", "Project presentation suggestions", "Profile organization", "Personal brand alignment"],
  },
  "/students/project-guidance": {
    title: "Student project guidance",
    intro: "Build understanding as you work through a project, explain your choices, and prepare to present your work.",
    group: "For students & professionals",
    deliverables: ["Scope and concept discussions", "Technical explanations", "Debugging guidance", "Documentation and demo preparation"],
    notice: "Guidance is educational and supports independent learning. Students are responsible for following their institution's academic-integrity rules.",
  },
  "/students/learning-resources": {
    title: "Technology learning resources",
    intro: "Find a practical learning direction with structured topics, coding resources, and project ideas.",
    group: "For students & professionals",
    deliverables: ["Role-based learning roadmaps", "Practical coding topics", "Project ideas", "Interview preparation resources"],
  },
  "/students/interview-preparation": {
    title: "Interview preparation",
    intro: "Practice technical questions, project explanations, and communication in a structured way.",
    group: "For students & professionals",
    deliverables: ["Technical practice topics", "Project walkthrough preparation", "Mock interview discussions", "Communication practice"],
    notice: "Preparation can help you practice, but interview outcomes are never guaranteed.",
  },
  "/students/professional-branding": {
    title: "Professional branding",
    intro: "Create a consistent digital presence across your portfolio, personal website, and professional profiles.",
    group: "For students & professionals",
    deliverables: ["Professional positioning discussion", "Personal website planning", "Profile consistency review", "Freelancer and creator branding"],
  },
};

const navLinks = [
  ["Home", "/"],
  ["Services", "/services"],
  ["For Businesses", "/business"],
  ["For Students", "/students"],
  ["Our Work", "/work"],
  ["About", "/about"],
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
          <p>Your Vision. Your Skills. Your Future.<br />One brand. Two pathways. Complete digital solutions.</p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="vx-footer__chat"><MessageCircle size={17} /> WhatsApp {COMPANY.whatsappPhone}</a>
          <a className="vx-footer__contact-link" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          <a className="vx-footer__contact-link" href={`tel:+${COMPANY.phoneRaw}`}>{COMPANY.phone}</a>
        </div>
        <div><h3>Explore</h3>{navLinks.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}</div>
        <div><h3>Business</h3>{businessServices.slice(0, 4).map((item) => <Link key={item.href + item.title} to={item.href}>{item.title}</Link>)}</div>
        <div><h3>Students & careers</h3>{studentServices.slice(0, 4).map((item) => <Link key={item.href} to={item.href}>{item.title}</Link>)}</div>
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

  useEffect(() => {
    const shell = document.querySelector(".vx-site-shell");
    const sections = document.querySelectorAll("main > section, main > div > section");
    const serviceCards = document.querySelectorAll(".vx-service-grid--directory .vx-service-card");
    if (!shell) return undefined;
    const motionTargets = [...sections, ...serviceCards];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      motionTargets.forEach((target) => target.classList.add("is-visible"));
      return () => motionTargets.forEach((target) => target.classList.remove("is-visible"));
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
      serviceCards.forEach((card) => {
        card.classList.remove("vx-reveal-item", "is-visible");
        card.style.removeProperty("--vx-reveal-delay");
      });
    };
  }, [location.pathname]);

  return <div className="vx-site-shell"><SiteNavigation /><main>{children}</main><SiteFooter /></div>;
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
      ) : audience === "student" ? (
        <>
          <div className="vx-form__row"><label>Your name<input name="Name" autoComplete="name" required /></label><label>Email address<input name="Email" type="email" autoComplete="email" required /></label></div>
          <label>Current education or career stage<select name="Education or career stage" required defaultValue=""><option value="" disabled>Choose your stage</option>{stageData.map((stage) => <option key={stage.label}>{stage.label}</option>)}</select></label>
          <div className="vx-form__row"><label>Technology or role of interest<input name="Technology or role of interest" placeholder="e.g. Java, frontend development" required /></label><label>Service required<select name="Service required" required defaultValue=""><option value="" disabled>Select a service</option>{studentServices.map((service) => <option key={service.title}>{service.title}</option>)}</select></label></div>
          <label>Requirements or goals<textarea name="Requirements or goals" rows="4" required placeholder="Tell us what you are working toward." /></label>
          <label>Optional budget range<select name="Optional budget range" defaultValue=""><option value="">Prefer not to say</option><option>Under ₹5,000</option><option>₹5,000–₹15,000</option><option>₹15,000+</option><option>I'd like to discuss</option></select></label>
        </>
      ) : (
        <>
          <div className="vx-form__row"><label>Your name<input name="Name" autoComplete="name" required /></label><label>Email address<input name="Email" type="email" autoComplete="email" required /></label></div>
          <label>I&apos;m interested in<select name="Audience" defaultValue="General enquiry"><option>General enquiry</option><option>Business solutions</option><option>Student and professional services</option></select></label>
          <label>How can we help?<textarea name="Requirements or goals" rows="5" required placeholder="Share a little about what you need." /></label>
        </>
      )}
      {status && <p className={`vx-form__status vx-form__status--${status}`} role="status">{message}</p>}
      <button className="vx-button vx-button--full" type="submit">{audience === "student" ? "Find the right service" : "Continue in WhatsApp"}<ArrowRight size={16} /></button>
      <p className="vx-form__note">This opens a prepared message in WhatsApp. You can review it before choosing to send.</p>
    </form>
  );
}

function ContactBlock({ audience = "general", compact = false }) {
  return <section className={`vx-contact${compact ? " vx-contact--compact" : ""}`} id="enquiry">
    <div className="vx-container vx-contact__grid">
      <div className="vx-contact__intro">
        <Eyebrow>{audience === "business" ? "LET'S BUILD SOMETHING" : audience === "student" ? "YOUR NEXT STEP" : "START A CONVERSATION"}</Eyebrow>
        <h2>{audience === "business" ? "Tell us where you want to grow." : audience === "student" ? "Let's find a practical way forward." : "Your next step starts here."}</h2>
        <p>{audience === "business" ? "Share your goals, services, and budget. We'll start with a conversation about fit and scope." : audience === "student" ? "Tell us where you are in your journey and what you want help with." : "Tell us what you have in mind. We’ll help you find the right path."}</p>
        <a className="vx-contact__direct" href={waLink()} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> WhatsApp {COMPANY.whatsappPhone} <ArrowUpRight size={16} /></a>
        <a className="vx-contact__phone" href={`tel:+${COMPANY.phoneRaw}`}>Call {COMPANY.phone}</a>
      </div>
      <EnquiryForm audience={audience} />
    </div>
  </section>;
}

export function HomePage() {
  const [faqOpen, setFaqOpen] = useState(0);
  const faqs = [
    ["Who do you work with?", "We support businesses and startups, as well as students, graduates, freelancers, and working technology professionals."],
    ["Can I ask about a service before deciding?", "Yes. Send an enquiry with your needs and goals. We can discuss scope and the next step before you decide."],
    ["Do you guarantee jobs or interview results?", "No. We provide practical preparation and professional services, but hiring and interview outcomes depend on many factors and cannot be guaranteed."],
    ["How does student project guidance work?", "Guidance is intended to build understanding and support independent work. Students should follow their institution's academic-integrity rules."],
  ];
  return <>
    <section className="vx-hero">
      <div className="vx-hero__glow vx-hero__glow--a" /><div className="vx-hero__glow vx-hero__glow--b" />
      <div className="vx-container vx-hero__grid">
        <div className="vx-hero__copy">
          <Eyebrow>DIGITAL SOLUTIONS <b>·</b> CAREER GROWTH <b>·</b> TECHNOLOGY</Eyebrow>
          <h1>One platform.<br /><span>Solutions for every stage.</span></h1>
          <p>We help businesses build their digital presence and help students and professionals develop the websites, projects, and professional profiles they need to move forward.</p>
          <div className="vx-hero__actions"><CtaLink to="/business">Explore our services</CtaLink><CtaLink to="/work" secondary>View our work</CtaLink></div>
          <div className="vx-hero__trust"><span>Practical, personal support</span><span>Business and career pathways</span></div>
        </div>
        <div className="vx-hero-work" aria-label="Selected website projects">
          <a className="vx-hero-work__main" href="https://vaakya-creations.netlify.app/" target="_blank" rel="noopener noreferrer">
            <img src="/client-projects/vaakya-creations.jpg" alt="Vaakya Creations e-commerce website screenshot" />
            <span><small>ECOMMERCE WEBSITE</small>Vaakya Creations <ArrowUpRight size={15} /></span>
          </a>
          <a className="vx-hero-work__secondary" href="https://prskillverse.com/" target="_blank" rel="noopener noreferrer">
            <img src="/client-projects/pr-skillverse.jpg" alt="PR Skillverse training website screenshot" />
            <span><small>EDUCATION WEBSITE</small>PR Skillverse</span>
          </a>
          <p className="vx-hero-work__note">A few real projects, built for real needs.</p>
        </div>
      </div>
      <a href="#pathways" className="vx-scroll-cue">DISCOVER YOUR PATH <ArrowDownRight size={15} /></a>
    </section>

    <section className="vx-section vx-pathways" id="pathways">
      <div className="vx-container">
        <SectionTitle eyebrow="ONE BRAND. TWO PATHWAYS." title="Where would you like to go?" copy="Choose the path that fits you. We’ll help you take the next step." align="center" />
        <div className="vx-pathway-grid">
          <article className="vx-path-card vx-path-card--business"><div className="vx-path-card__icon"><Monitor size={22} /></div><span className="vx-card-label">FOR BUSINESSES & STARTUPS</span><h3>Build your brand.<br />Grow your business.</h3><p>Professional websites, e-commerce, digital marketing, and brand-building support shaped around your goals.</p><div className="vx-path-card__tags"><span>Websites</span><span>Marketing</span><span>Growth</span></div><div className="vx-path-card__actions"><CtaLink to="/business">Explore business solutions</CtaLink><Link to="/contact">Start your project <ArrowUpRight size={15} /></Link></div></article>
          <article className="vx-path-card vx-path-card--students"><div className="vx-path-card__icon"><GraduationCap size={23} /></div><span className="vx-card-label">FOR STUDENTS & PROFESSIONALS</span><h3>Learn. Build.<br />Get career-ready.</h3><p>Portfolios, project guidance, resumes, learning resources, and professional presence for your next milestone.</p><div className="vx-path-card__tags"><span>Learn</span><span>Build</span><span>Showcase</span></div><div className="vx-path-card__actions"><CtaLink to="/students">Explore student services</CtaLink><Link to="/students#enquiry">Find your solution <ArrowUpRight size={15} /></Link></div></article>
        </div>
      </div>
    </section>

    <section className="vx-section vx-section--soft">
      <div className="vx-container">
        <SectionTitle eyebrow="FOR BUSINESSES" title="Make your digital presence work harder." copy="From a first website to a broader marketing plan, get clear services for your next phase." />
        <div className="vx-service-grid">{businessServices.slice(0, 4).map((service) => { const Icon = service.icon; return <Link className="vx-service-card" to={service.href} key={service.title}><Icon size={21} /><h3>{service.title}</h3><p>{service.copy}</p><span>Explore service <ArrowUpRight size={15} /></span></Link>; })}</div>
        <div className="vx-section__action"><CtaLink to="/business">Explore business solutions</CtaLink></div>
      </div>
    </section>

    <section className="vx-section">
      <div className="vx-container">
        <SectionTitle eyebrow="FOR STUDENTS & PROFESSIONALS" title="Build skills. Make your work visible." copy="Practical support for the journey from learning the basics to growing your professional profile." />
        <div className="vx-service-grid vx-service-grid--students">{studentServices.slice(0, 4).map((service, index) => <Link className="vx-service-card vx-service-card--student" to={service.href} key={service.title}><span className="vx-service-card__number">0{index + 1}</span><h3>{service.title}</h3><p>{service.copy}</p><span>Explore service <ArrowUpRight size={15} /></span></Link>)}</div>
        <div className="vx-section__action"><CtaLink to="/students" secondary>Explore student services</CtaLink></div>
      </div>
    </section>

    <section className="vx-section vx-section--soft">
      <div className="vx-container"><div className="vx-section-heading-row"><SectionTitle eyebrow="SELECTED WORK" title="Good work, made visible." copy="A look at business websites, student projects, and technical work." /><Link className="vx-text-link" to="/work">View all projects <ArrowRight size={16} /></Link></div><ProjectGrid slugs={["pr-skillverse", "vaakya-creations", "froot-bowl", "sasindra-portfolio", "ration-shop-crm", "artisan-coffee-house"]} /></div>
    </section>

    <section className="vx-section vx-process">
      <div className="vx-container"><SectionTitle eyebrow="HOW WE WORK" title="Clear steps. Thoughtful work." copy="We keep the process collaborative, practical, and focused on the outcome you need." align="center" />
        <div className="vx-process-grid">{[["01", "Listen", "We learn about your goals, audience, current stage, and constraints."], ["02", "Shape the plan", "We agree on scope, deliverables, priorities, and the right next step."], ["03", "Build together", "We share progress, gather feedback, and keep the work aligned."], ["04", "Move forward", "We review the result and discuss handover or continued support."]].map(([number, title, copy]) => <article className="vx-process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div>
    </section>

    <section className="vx-section vx-testimonials" aria-labelledby="vx-testimonials-title">
      <div className="vx-container vx-testimonials__heading">
        <Eyebrow>SELECTED CLIENT WORK</Eyebrow>
        <h2 id="vx-testimonials-title">Projects made possible together.</h2>
        <p>A few of the websites and digital projects we’ve worked on. We’ll add client feedback here when approved reviews are available.</p>
      </div>
      <div className="vx-testimonials__marquee" role="region" aria-label="Selected client project previews scrolling right to left">
        <div className="vx-testimonials__track">
          {[false, true].map((isDuplicate) => (
            <div className="vx-testimonials__group" aria-hidden={isDuplicate || undefined} key={String(isDuplicate)}>
              {featuredClientProjects.map((project) => (
                <Link
                  className="vx-testimonials__project"
                  to={`/work/${project.slug}`}
                  tabIndex={isDuplicate ? -1 : undefined}
                  key={project.slug}
                >
                  <img src={project.image} alt="" loading="lazy" />
                  <span>{project.title}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="vx-container vx-testimonials__footer">
        <Link className="vx-text-link" to="/work">Explore all projects <ArrowRight size={16} /></Link>
        <Link className="vx-testimonials__feedback" to="/contact">Worked with us? Share feedback</Link>
      </div>
    </section>

    <section className="vx-section"><div className="vx-container vx-why-grid"><div><SectionTitle eyebrow="WHY 360° VERTEX" title="A useful partner, at every stage." copy="From the first conversation to the next iteration, we make the work understandable and the path forward clear." /><CtaLink to="/about" secondary>More about us</CtaLink></div><div className="vx-why-list">{[["One brand, two pathways", "Business services and career support, organized around different needs."], ["Practical over complicated", "Clear conversations, relevant deliverables, and useful next steps."], ["Built around your goals", "We start with your audience and what you are trying to accomplish."], ["Transparent scope", "Discuss the work, boundaries, and pricing before moving ahead."]].map(([title, copy]) => <article key={title}><span><ShieldCheck size={18} /></span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

    <section className="vx-section vx-section--soft"><div className="vx-container vx-faq-layout"><SectionTitle eyebrow="GOOD TO KNOW" title="A few common questions." copy="Still deciding? Start with a conversation." /><div className="vx-faq-list">{faqs.map(([question, answer], index) => <div className={`vx-faq${faqOpen === index ? " is-open" : ""}`} key={question}><button type="button" aria-expanded={faqOpen === index} onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}><span>{question}</span><span>{faqOpen === index ? "−" : "+"}</span></button>{faqOpen === index && <p>{answer}</p>}</div>)}</div></div></section>

    <section className="vx-cta-band"><div className="vx-container vx-cta-band__inner"><div><Eyebrow>YOUR VISION. YOUR SKILLS. YOUR FUTURE.</Eyebrow><h2>Let’s make your next step count.</h2><p>Tell us what you’re working toward. We’ll help you find the right path.</p></div><CtaLink to="/contact">Get started</CtaLink></div></section>
    <ContactBlock compact />
  </>;
}

export function BusinessPage() {
  return <>
    <section className="vx-inner-hero vx-inner-hero--business"><div className="vx-container vx-inner-hero__grid"><div><Eyebrow>BUSINESS & STARTUP SOLUTIONS</Eyebrow><h1>Your business deserves a stronger digital presence.</h1><p>We build professional websites and deliver digital marketing services designed around your business goals, audience, and budget.</p><div className="vx-hero__actions"><CtaLink to="#business-enquiry">Start your project</CtaLink><CtaLink to="/work" secondary>View our work</CtaLink></div></div><a className="vx-inner-hero__visual vx-inner-hero__visual--photo" href="https://vaakya-creations.netlify.app/" target="_blank" rel="noopener noreferrer"><img src="/client-projects/vaakya-creations.jpg" alt="Screenshot of the Vaakya Creations e-commerce website" /><span>Vaakya Creations <ArrowUpRight size={15} /></span></a></div></section>
    <section className="vx-section"><div className="vx-container"><SectionTitle eyebrow="WHAT WE DO" title="Digital foundations and growth." copy="Choose the services you need today. We can discuss how they fit together around your business." /><div className="vx-service-grid">{businessServices.map((service) => { const Icon = service.icon; return <Link className="vx-service-card" to={service.href} key={service.title}><Icon size={21} /><h3>{service.title}</h3><p>{service.copy}</p><span>Explore service <ArrowUpRight size={15} /></span></Link>; })}</div></div></section>
    <section className="vx-section vx-section--soft"><div className="vx-container vx-industries"><div><SectionTitle eyebrow="WHO WE SUPPORT" title="Built for businesses at different stages." copy="We work with people who want a thoughtful, useful digital presence." /></div><div className="vx-industry-list">{["Startups & small businesses", "Local service providers", "E-commerce brands", "Educational institutions", "Growing teams & established brands"].map((item) => <span key={item}><Check size={16} />{item}</span>)}</div></div></section>
    <section className="vx-section"><div className="vx-container"><div className="vx-section-heading-row"><SectionTitle eyebrow="SELECTED BUSINESS PROJECTS" title="Digital work with a purpose." /><Link className="vx-text-link" to="/work">See our work <ArrowRight size={16} /></Link></div><ProjectGrid slugs={["pr-skillverse", "vaakya-creations", "froot-bowl"]} /></div></section>
    <section className="vx-section vx-section--soft"><div className="vx-container"><SectionTitle eyebrow="OUR PROCESS" title="From first conversation to launch." align="center" /><div className="vx-process-grid">{[["01", "Discover", "Your goals, audience, services, timeline, and budget."], ["02", "Define", "A practical scope, clear deliverables, and shared priorities."], ["03", "Create", "Design and development shaped by your feedback."], ["04", "Launch & review", "A considered handover and next-step conversation."]].map(([n, t, c]) => <article className="vx-process-step" key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div></div></section>
    <div id="business-enquiry"><ContactBlock audience="business" /></div>
  </>;
}

export function StudentsPage() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = stageData[activeStage];
  return <>
    <section className="vx-inner-hero vx-inner-hero--students"><div className="vx-container vx-inner-hero__grid vx-inner-hero__grid--students"><div><Eyebrow>STUDENT & PROFESSIONAL GROWTH</Eyebrow><h1>From your first line of code to your next career milestone.</h1><p>Build practical projects, showcase your skills, create your professional portfolio, and prepare for opportunities with digital services designed for your journey.</p><p className="vx-student-audience">For B.Tech and diploma learners, graduates, job seekers, freelancers, and working IT professionals.</p><div className="vx-hero__actions"><CtaLink to="#student-services">Explore student services</CtaLink><CtaLink to="/students/portfolio-websites" secondary>Build my portfolio</CtaLink></div><p className="vx-no-guarantees">Practical support and preparation — never a promise of a particular career outcome.</p></div><div className="vx-student-hero-services"><div className="vx-student-hero-services__heading"><span>STUDENT SERVICES</span><Link to="#student-services">Explore all <ArrowUpRight size={14} /></Link></div><div className="vx-student-hero-services__grid">{studentServices.map((service) => { const Icon = service.icon; return <Link className="vx-student-hero-service" to={service.href} key={service.title}><span className="vx-student-hero-service__icon"><Icon size={18} strokeWidth={1.8} /></span><span className="vx-student-hero-service__copy"><strong>{service.title}</strong><small>{service.copy}</small></span><ArrowUpRight className="vx-student-hero-service__arrow" size={15} /></Link>; })}</div></div></div></section>
    <section className="vx-section vx-stage-section"><div className="vx-container"><SectionTitle eyebrow="FIND YOUR STAGE" title="Support that meets you where you are." copy="Choose the stage closest to your current journey to see what may be useful." align="center" /><div className="vx-stage-picker" role="tablist" aria-label="Choose your education or career stage">{stageData.map((item, index) => <button type="button" role="tab" aria-selected={activeStage === index} className={activeStage === index ? "is-active" : ""} key={item.label} onClick={() => setActiveStage(index)}>{item.label}</button>)}</div><div className="vx-stage-content" role="tabpanel"><div><span className="vx-stage-content__label">STAGE 0{activeStage + 1}</span><h3>{stage.title}</h3><p>{stage.detail}</p><Link to="/contact">Talk about your goals <ArrowRight size={16} /></Link></div><ul>{stage.items.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></div></div></section>
    <section id="student-services" className="vx-section vx-section--soft"><div className="vx-container"><SectionTitle eyebrow="OUR SERVICES" title="Practical support for your next move." copy="Pick a service to see what it includes and start a focused conversation." /><div className="vx-service-grid vx-service-grid--students">{studentServices.map((service, index) => <Link className="vx-service-card vx-service-card--student" to={service.href} key={service.title}><span className="vx-service-card__number">0{index + 1}</span><h3>{service.title}</h3><p>{service.copy}</p><span>Explore service <ArrowUpRight size={15} /></span></Link>)}</div></div></section>
    <section className="vx-section"><div className="vx-container vx-integrity"><div className="vx-integrity__icon"><ShieldCheck size={23} /></div><div><Eyebrow>LEARN WITH INTEGRITY</Eyebrow><h2>Understand the work. Own your learning.</h2><p>Project guidance is intended to support your understanding, independent learning, and ability to explain your work. Always follow your college or institution’s academic-integrity rules. Service scope and pricing are discussed transparently before work begins.</p></div></div></section>
    <section className="vx-section vx-section--soft"><div className="vx-container"><SectionTitle eyebrow="STUDENT PORTFOLIO" title="Present your skills and projects." copy="Explore the portfolio website and see how a personal site can make your work easier to discover." /><ProjectGrid slugs={["sasindra-portfolio"]} /></div></section>
    <ContactBlock audience="student" />
  </>;
}

export function WorkPage() {
  const [filter, setFilter] = useState("All work");
  const filters = ["All work", "Business", "CRM", "Education", "Technical", "Personal", "Events"];
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
  return <><PageIntro eyebrow="ABOUT 360° VERTEX SOLUTIONS" title="One brand. Two pathways. Complete digital solutions." copy="We bring business-focused digital services and practical technology and career support together under one brand." /><section className="vx-section"><div className="vx-container vx-about-grid"><div><SectionTitle eyebrow="OUR PURPOSE" title="Help people move forward with technology." /><p>We work with businesses building their presence online and with students and professionals building skills, projects, and professional visibility. Our aim is to make digital work feel clearer, more useful, and more accessible.</p><CtaLink to="/contact" secondary>Start a conversation</CtaLink><Link className="vx-founder-link" to="/founder">Meet the founder <ArrowRight size={15} /></Link></div><div className="vx-about-card"><span>360°</span><h3>Your vision.<br />Your skills.<br />Your future.</h3><p>Digital solutions · Career growth · Technology</p></div></div></section><section className="vx-section vx-section--soft"><div className="vx-container"><SectionTitle eyebrow="OUR VALUES" title="The way we work matters." align="center" /><div className="vx-value-grid">{[["Clarity", "Straightforward scope, practical recommendations, and open conversations."], ["Care", "Thoughtful work shaped around the real people who use it."], ["Learning", "Knowledge sharing that supports confidence and independent growth."], ["Integrity", "Honest communication, realistic expectations, and responsible guidance."]].map(([title, copy]) => <article key={title}><span><Check size={17} /></span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section><section className="vx-cta-band"><div className="vx-container vx-cta-band__inner"><div><Eyebrow>LET’S TALK</Eyebrow><h2>Have a goal you’re working toward?</h2></div><CtaLink to="/contact">Get in touch</CtaLink></div></section></>;
}

export function ServicesPage() {
  return <>
    <PageIntro eyebrow="OUR SERVICES" title="Practical digital support, from first idea to next step." copy="Explore the services we offer to businesses, students, and professionals. Start with the path that fits you." />
    <section className="vx-section" id="business-services">
      <div className="vx-container">
        <SectionTitle eyebrow="BUSINESSES & STARTUPS" title="Build and grow your digital presence." copy="Websites and marketing support with a clear scope, useful deliverables, and your business goals in view." />
        <div className="vx-service-grid vx-service-grid--directory">{businessServices.map((service) => { const Icon = service.icon; return <Link className="vx-service-card" to={service.href} key={service.title}><Icon size={20} /><h3>{service.title}</h3><p>{service.copy}</p><span>Explore service <ArrowUpRight size={15} /></span></Link>; })}</div>
        <div className="vx-service-directory__cta"><CtaLink to="/business">Explore business solutions</CtaLink></div>
      </div>
    </section>
    <section className="vx-section vx-section--soft" id="career-services">
      <div className="vx-container">
        <SectionTitle eyebrow="STUDENTS & PROFESSIONALS" title="Learn, build, and show what you can do." copy="Career-minded services and project guidance for different stages of your technology journey." />
        <div className="vx-service-grid vx-service-grid--directory">{studentServices.map((service, index) => <Link className="vx-service-card vx-service-card--student" to={service.href} key={service.title}><span className="vx-service-card__number">0{index + 1}</span><h3>{service.title}</h3><p>{service.copy}</p><span>Explore service <ArrowUpRight size={15} /></span></Link>)}</div>
        <div className="vx-service-directory__cta"><CtaLink to="/students" secondary>Explore student services</CtaLink></div>
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
          <p>I’m Sasindra, founder of 360° Vertex Solutions and a full-stack developer. I started Vertex to bring practical technology, digital, and career support together for businesses and people building their skills.</p>
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
        <div><p>I started 360° Vertex Solutions with a simple idea: students, professionals, startups, and businesses should be able to find practical digital and technology support in one place.</p><p>Today, that means two connected paths: helping businesses strengthen their online presence, and helping learners and professionals build projects, portfolios, and professional skills.</p><Link className="vx-text-link" to="/about">More about 360° Vertex <ArrowRight size={15} /></Link></div>
      </div>
    </section>
    <section className="vx-section vx-section--soft">
      <div className="vx-container">
        <SectionTitle eyebrow="WHAT I DO" title="A practical mix of building and guidance." copy="From digital products for businesses to hands-on support for people growing their technical careers." />
        <div className="vx-founder-pillars">
          <article><span>01</span><h3>Business & portfolio websites</h3><p>Responsive websites that present a business, portfolio, or personal profile clearly.</p></article>
          <article><span>02</span><h3>E-commerce platforms</h3><p>Online storefronts that help customers browse products and connect with a business.</p></article>
          <article><span>03</span><h3>Full-stack applications</h3><p>Web applications that bring the interface, server logic, and data layer together.</p></article>
          <article><span>04</span><h3>UI & frontend development</h3><p>Usable, responsive interfaces shaped around the people who use them.</p></article>
          <article><span>05</span><h3>Backend & API development</h3><p>Application logic and API connections that support digital products.</p></article>
          <article><span>06</span><h3>Database solutions</h3><p>Data structures and storage designed around a product’s information needs.</p></article>
          <article><span>07</span><h3>AI & automation</h3><p>Explore practical automation ideas that can simplify repetitive work.</p></article>
          <article><span>08</span><h3>Technology & career guidance</h3><p>Project, portfolio, and learning support for students and professionals.</p><Link to="/students">Explore student services <ArrowRight size={14} /></Link></article>
        </div>
        <div className="vx-service-directory__cta"><CtaLink to="/work" secondary>See selected work</CtaLink></div>
      </div>
    </section>
    <section className="vx-section">
      <div className="vx-container vx-founder-quote">
        <span>“</span><blockquote>Learn. Build. Launch. Grow.</blockquote><p>A reminder to keep learning, make useful things, and improve through the work.</p>
      </div>
    </section>
    <section className="vx-cta-band"><div className="vx-container vx-cta-band__inner"><div><Eyebrow>YOUR VISION. YOUR SKILLS. YOUR FUTURE.</Eyebrow><h2>Tell me what you’re working toward.</h2></div><CtaLink to="/contact">Start a conversation</CtaLink></div></section>
  </>;
}

export function ContactPage() {
  return <><PageIntro eyebrow="CONTACT" title="Tell us what you’re working toward." copy="Whether you run a business or are building your skills and career, start with a simple conversation." /><ContactBlock /></>;
}

export function ServicePage() {
  const { pathname } = useLocation();
  const service = servicePages[pathname.replace(/\/$/, "")];
  if (!service) return <PageIntro eyebrow="SERVICE" title="Let’s find the right solution." copy="Explore our services and tell us what you need." />;
  const isStudent = pathname.startsWith("/students/");
  return <><section className={`vx-inner-hero ${isStudent ? "vx-inner-hero--students" : "vx-inner-hero--business"}`}><div className="vx-container vx-service-hero"><Eyebrow>{service.group}</Eyebrow><h1>{service.title}</h1><p>{service.intro}</p><CtaLink to={isStudent ? "/students#enquiry" : "/business#business-enquiry"}>{isStudent ? "Find the right service" : "Enquire about this service"}</CtaLink></div></section><section className="vx-section"><div className="vx-container vx-deliverables"><div><SectionTitle eyebrow="WHAT'S INCLUDED" title="A clear scope, shaped around your needs." copy="We’ll discuss your requirements and confirm the scope before work begins." /><ul>{service.deliverables.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>{service.notice && <p className="vx-notice"><ShieldCheck size={18} />{service.notice}</p>}</div><aside className="vx-service-aside"><span>YOUR NEXT STEP</span><h3>Start with a conversation.</h3><p>Share what you have in mind. We’ll discuss fit, scope, and the best way to move forward.</p><CtaLink to="/contact">Make an enquiry</CtaLink></aside></div></section><section className="vx-section vx-section--soft"><div className="vx-container"><SectionTitle eyebrow="EXPLORE MORE" title={isStudent ? "More ways to build your career" : "More ways to grow your business"} /><div className="vx-related-links">{(isStudent ? studentServices : businessServices).filter((item) => item.href !== pathname).slice(0, 4).map((item) => <Link to={item.href} key={item.title}>{item.title}<ArrowUpRight size={15} /></Link>)}</div></div></section></>;
}

export function LegalPage() {
  const { pathname } = useLocation();
  const isPrivacy = pathname === "/privacy-policy";
  return <><PageIntro eyebrow="LEGAL" title={isPrivacy ? "Privacy policy" : "Terms of use"} copy={`Last updated: ${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}`} /><section className="vx-section"><div className="vx-container vx-legal"><h2>{isPrivacy ? "Information you choose to share" : "Using this website"}</h2><p>{isPrivacy ? "When you contact 360° Vertex Solutions, you may choose to share details such as your name, email address, phone number, project goals, or service interests. Enquiry forms open a prepared message in WhatsApp; you review and send that message yourself." : "This website provides general information about digital, educational, and professional services. Service scope, pricing, timing, and deliverables are agreed directly before work begins."}</p><h2>{isPrivacy ? "How information is used" : "Service and educational information"}</h2><p>{isPrivacy ? "Information you send is used to respond to your enquiry and discuss the services you requested. Do not include passwords, payment details, or other sensitive information in a general enquiry." : "Learning and project guidance supports independent learning and must be used consistently with your institution’s academic-integrity policies. Career preparation does not guarantee job placement, selection, or interview outcomes."}</p><h2>{isPrivacy ? "Your choices and questions" : "External links and enquiries"}</h2><p>{isPrivacy ? "You can choose not to submit an enquiry form and instead contact us through the listed channels. For questions about information you have shared, email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>." : "Links to third-party websites are provided for convenience. Their content, availability, and policies are managed by those third parties. Contact us to discuss any service before making a decision."}</p><p>This page is general website information and is not legal advice.</p></div></section></>;
}

export function PageMeta() {
  const location = useLocation();
  useEffect(() => {
    const pages = {
      "/": ["360° Vertex Solutions | Your Vision. Your Skills. Your Future.", "Digital solutions for businesses and career growth support for students and professionals."],
      "/services": ["Services | 360° Vertex Solutions", "Explore digital services for businesses and practical technology and career support for students and professionals."],
      "/business": ["Business Solutions | 360° Vertex Solutions", "Websites, e-commerce, and digital marketing for businesses and startups."],
      "/students": ["Student & Professional Services | 360° Vertex Solutions", "Portfolio websites, project guidance, resumes, and career development support."],
      "/work": ["Our Work | 360° Vertex Solutions", "Explore website, education, CRM, event, and technical project previews."],
      "/about": ["About | 360° Vertex Solutions", "One brand bringing business solutions and student and professional growth together."],
      "/founder": ["Founder | 360° Vertex Solutions", "Meet Sasindra, founder of 360° Vertex Solutions."],
      "/contact": ["Contact | 360° Vertex Solutions", "Tell us about your business or career goals."],
      "/privacy-policy": ["Privacy Policy | 360° Vertex Solutions", "How 360° Vertex Solutions handles information shared through enquiries."],
      "/terms": ["Terms | 360° Vertex Solutions", "Information about using the 360° Vertex Solutions website and services."],
    };
    const project = projects.find((item) => location.pathname === `/work/${item.slug}`);
    const details = pages[location.pathname] || servicePages[location.pathname] || (project && [`${project.title} | Project Preview | 360° Vertex Solutions`, project.description]);
    const title = details
      ? Array.isArray(details) ? details[0] : `${details.title} | 360° Vertex Solutions`
      : "360° Vertex Solutions | Business & Career Services";
    const content = details
      ? Array.isArray(details) ? details[1] : details.intro
      : "Digital solutions for businesses and practical technology and career support for students and professionals.";
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
