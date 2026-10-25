import { useNavigate } from "react-router-dom";
import WebDevServiceTemplate from "./WebDevServiceTemplate";
import ClientProjectsCarousel from "./ClientProjectsCarousel";
import "./webdev-shared.css";

const WEBSITE_TYPES = [
  { icon: "🏢", title: "Business Website", desc: "Professional websites to showcase products, services and connect with customers.", path: "/technology/web-development/business-website", tags: ["Small Business", "Startups", "Services"] },
  { icon: "🏛️", title: "Corporate Website", desc: "Enterprise-grade digital presence for companies, agencies and organizations.", path: "/technology/web-development/corporate-website", tags: ["Corporate", "Enterprise", "Brand"] },
  { icon: "👤", title: "Portfolio Website", desc: "Showcase your skills, projects, resume and personal identity online.", path: "/technology/web-development/portfolio-website", tags: ["Developers", "Designers", "Students"] },
  { icon: "🎯", title: "Landing Page", desc: "High-conversion single page websites designed for campaigns and ads.", path: "/technology/web-development/landing-page", tags: ["Ads", "Leads", "Conversions"] },
  { icon: "🛒", title: "E-Commerce Store", desc: "Complete online shopping platforms with catalog, cart, checkout and payments.", path: "/technology/web-development/ecommerce-website", tags: ["Retail", "D2C", "Payments"] },
  { icon: "⚙️", title: "Web Application", desc: "Custom web tools, SaaS dashboards, internal tools and CRM platforms.", path: "/technology/web-development/web-application", tags: ["SaaS", "Dashboards", "Tools"] },
  { icon: "⚡", title: "Full Stack App", desc: "End-to-end applications powered by React, Node, Express, and Databases.", path: "/technology/web-development/full-stack-development", tags: ["React", "Node", "DB"] },
  { icon: "🛠️", title: "Custom Development", desc: "Tailored web solutions engineered specifically around unique business logic.", path: "/technology/web-development/custom-web-development", tags: ["Custom", "APIs", "Workflows"] },
  { icon: "📝", title: "CMS Website", desc: "Manage your content easily without writing code using custom CMS platforms.", path: "/technology/web-development/cms-website", tags: ["Content", "Admin", "Blogs"] },
  { icon: "📅", title: "Booking Website", desc: "Enable online appointment scheduling, reservations, calendar and payments.", path: "/technology/web-development/booking-website", tags: ["Calendar", "Bookings", "Pay"] },
  { icon: "🎓", title: "LMS / Education", desc: "Online learning platforms with video lessons, quizzes, progress & certificates.", path: "/technology/web-development/lms-website", tags: ["Courses", "Quizzes", "Students"] },
  { icon: "🏡", title: "Real Estate Website", desc: "Property search engine with map integration, filters, and agent listings.", path: "/technology/web-development/real-estate-website", tags: ["Properties", "Maps", "Agents"] },
  { icon: "🍽️", title: "Restaurant Website", desc: "Digital food menu, online ordering, reservations, and location maps.", path: "/technology/web-development/restaurant-website", tags: ["Menu", "Ordering", "Tables"] },
  { icon: "🏥", title: "Healthcare Website", desc: "Patient information portals, doctor directories, and department schedules.", path: "/technology/web-development/healthcare-website", tags: ["Doctors", "Schedule", "Info"] },
  { icon: "💼", title: "Job Portal", desc: "Job board connecting candidates and employers with application tracking.", path: "/technology/web-development/job-portal", tags: ["Jobs", "Resumes", "Employers"] },
  { icon: "📊", title: "Admin Dashboard", desc: "Analytics, user management, order tracking, and business reporting tools.", path: "/technology/web-development/admin-dashboard", tags: ["Analytics", "RBAC", "Reports"] },
  { icon: "🔄", title: "Website Redesign", desc: "Modernize legacy websites with UI redesign, mobile optimization and speed.", path: "/technology/web-development/website-redesign", tags: ["Redesign", "Speed", "SEO"] },
];

export default function WebDevelopmentOverviewPage() {
  const navigate = useNavigate();

  return (
    <div>
      <WebDevServiceTemplate
        eyebrow="WEB DEVELOPMENT ECOSYSTEM"
        serviceId="web-development"
        title="Build Websites That Work"
        titleHighlight="for Your Business."
        desc="From professional business websites to e-commerce platforms, web applications and custom digital products, we design and develop responsive, scalable and modern web experiences."
        targetUsers={[
          { title: "Small & Growing Businesses", desc: "Establish search visibility, explain services, and turn traffic into leads." },
          { title: "Startups & SaaS Founders", desc: "Launch web applications, land users, and scale digital products." },
          { title: "Students & Professionals", desc: "Showcase skills with custom dark-mode modern portfolio websites." },
          { title: "Retail & E-Commerce Brands", desc: "Sell products online with secure payment gateways and order tracking." }
        ]}
        features={WEBSITE_TYPES.map(w => ({ icon: w.icon, label: w.title }))}
        faqs={[
          { q: "What types of websites do you build?", a: "We build business websites, corporate portals, e-commerce stores, SaaS web applications, LMS learning platforms, booking systems, real estate listings, job portals, and custom web apps." },
          { q: "What technologies do you use?", a: "Our primary tech stack includes React.js, JavaScript, HTML5, CSS3, Tailwind CSS, Node.js, Express.js, Java, Spring Boot, MySQL, PostgreSQL, and MongoDB." },
          { q: "Are all websites mobile responsive and SEO optimized?", a: "Yes, every website we build is 100% responsive across mobile, tablet, and desktop, and comes with SEO-ready semantic HTML architecture." }
        ]}
        related={WEBSITE_TYPES.slice(0, 6).map(w => ({ icon: w.icon, label: w.title, path: w.path }))}
      />

      <ClientProjectsCarousel />

      {/* SPECIAL ALL-TYPES CARDS SECTION */}
      <section className="wd-section wd-section--alt" style={{ marginTop: "-60px" }}>
        <div className="wd-ct">
          <div className="wd-section-header wd-section-header--center">
            <span className="wd-section-label">EXPLORE ALL WEBSITE TYPES</span>
            <h2 className="wd-section-title">What Do You Want to Build?</h2>
            <p className="wd-section-desc">Click any category below to view dedicated features, process, and tech specs.</p>
          </div>
          <div className="wd-svc-grid">
            {WEBSITE_TYPES.map((type) => (
              <div
                key={type.title}
                className="wd-card-glass"
                onClick={() => navigate(type.path)}
                style={{ cursor: "pointer" }}
              >
                <div className="wd-card-glass__icon">{type.icon}</div>
                <h3 className="wd-card-glass__title">{type.title}</h3>
                <p className="wd-card-glass__desc">{type.desc}</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "16px 0" }}>
                  {type.tags.map(t => (
                    <span key={t} className="wd-tech-tag" style={{ fontSize: "0.72rem", padding: "3px 8px" }}>{t}</span>
                  ))}
                </div>
                <div style={{ color: "#00c6ff", fontWeight: "700", fontSize: "0.88rem" }}>
                  Explore Page →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
