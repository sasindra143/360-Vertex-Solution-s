import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu, X, ChevronDown,
  TrendingUp, Search, MapPin, Megaphone, Share2, FileText,
  Mail, MessageSquare, BarChart2, Palette, Zap,
  Code2, Globe, Database, Cloud, Shield, Briefcase,
  Monitor, ShoppingBag, Layers, Cpu, Server, Wrench,
  UserCheck, FileSearch, Linkedin, Star, GraduationCap,
  ArrowRight, Sparkles
} from "lucide-react";
import "./Header.css";

const LOGO_URL =
  "/vertex-solutions-logo.png";

/* ───────────────────────────────────────────
   NAV CONFIG
─────────────────────────────────────────── */
const NAV = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },

  {
    label: "Digital Marketing",
    path: "/digital-marketing",
    badge: "Marketing",
    badgeColor: "#f59e0b",
    megaTitle: "Digital Marketing & Growth",
    megaSubtitle: "Full-spectrum marketing to grow your brand online",
    columns: [
      {
        heading: "Advertising",
        items: [
          { icon: <Search size={15} />, label: "SEO", path: "/digital-marketing/seo" },
          { icon: <MapPin size={15} />, label: "Local SEO", path: "/digital-marketing/local-seo" },
          { icon: <TrendingUp size={15} />, label: "Google Ads", path: "/digital-marketing/google-ads" },
          { icon: <Megaphone size={15} />, label: "Meta Ads", path: "/digital-marketing/meta-ads" },
          { icon: <BarChart2 size={15} />, label: "Analytics & Reporting", path: "/digital-marketing/analytics-reporting" },
        ],
      },
      {
        heading: "Content & Social",
        items: [
          { icon: <Share2 size={15} />, label: "Social Media Marketing", path: "/digital-marketing/social-media" },
          { icon: <FileText size={15} />, label: "Content Marketing", path: "/digital-marketing/content-marketing" },
          { icon: <Zap size={15} />, label: "Lead Generation", path: "/digital-marketing/lead-generation" },
          { icon: <MessageSquare size={15} />, label: "WhatsApp Marketing", path: "/digital-marketing/whatsapp-marketing" },
          { icon: <Mail size={15} />, label: "Email Marketing", path: "/digital-marketing/email-marketing" },
        ],
      },
      {
        heading: "Brand & Automation",
        items: [
          { icon: <Globe size={15} />, label: "Google Business Profile", path: "/digital-marketing/google-business-profile" },
          { icon: <Palette size={15} />, label: "Branding & Creative", path: "/digital-marketing/branding-creative" },
          { icon: <Sparkles size={15} />, label: "AI Automation", path: "/digital-marketing/ai-automation" },
        ],
      },
      {
        heading: "Web & Applications",
        items: [
          { icon: <Monitor size={15} />, label: "Business Websites", path: "/technology/web-development/business-website" },
          { icon: <ShoppingBag size={15} />, label: "E-Commerce Websites", path: "/technology/web-development/ecommerce-website" },
          { icon: <Layers size={15} />, label: "Web Applications", path: "/technology/web-development/web-application" },
        ],
      },
      {
        heading: "Specialized Sites",
        items: [
          { icon: <Wrench size={15} />, label: "Landing Pages", path: "/technology/web-development/landing-page" },
          { icon: <Monitor size={15} />, label: "Booking Websites", path: "/technology/web-development/booking-website" },
          { icon: <GraduationCap size={15} />, label: "Learning Websites", path: "/technology/web-development/lms-website" },
        ],
      },
    ],
    cta: { label: "Start Marketing", path: "/digital-marketing" },
  },

  {
    label: "Technology",
    path: "/technology/web-development",
    badge: "Tech",
    badgeColor: "#06b6d4",
    megaTitle: "Technology Solutions",
    megaSubtitle: "End-to-end digital solutions for businesses",
    columns: [
      {
        heading: "Web & Applications",
        items: [
          { icon: <Monitor size={15} />, label: "Business Websites", path: "/technology/web-development/business-website" },
          { icon: <Globe size={15} />, label: "Portfolio Websites", path: "/technology/web-development/portfolio-website" },
          { icon: <ShoppingBag size={15} />, label: "E-Commerce", path: "/technology/web-development/ecommerce-website" },
          { icon: <Layers size={15} />, label: "Web Applications", path: "/technology/web-development/web-application" },
          { icon: <Code2 size={15} />, label: "Full Stack Development", path: "/technology/web-development/full-stack-development" },
        ],
      },
      {
        heading: "Specialized Sites",
        items: [
          { icon: <Palette size={15} />, label: "Corporate Website", path: "/technology/web-development/corporate-website" },
          { icon: <Wrench size={15} />, label: "Landing Pages", path: "/technology/web-development/landing-page" },
          { icon: <Zap size={15} />, label: "CMS Websites", path: "/technology/web-development/cms-website" },
          { icon: <Monitor size={15} />, label: "Booking Websites", path: "/technology/web-development/booking-website" },
          { icon: <Layers size={15} />, label: "LMS Education", path: "/technology/web-development/lms-website" },
        ],
      },
      {
        heading: "Solutions & Admin",
        items: [
          { icon: <FileText size={15} />, label: "AI Prompts", path: "/prompts" },
          { icon: <Globe size={15} />, label: "Real Estate Website", path: "/technology/web-development/real-estate-website" },
          { icon: <Cpu size={15} />, label: "Job Portals", path: "/technology/web-development/job-portal" },
          { icon: <Database size={15} />, label: "Admin Dashboards", path: "/technology/web-development/admin-dashboard" },
          { icon: <Server size={15} />, label: "Custom Development", path: "/technology/web-development/custom-web-development" },
          { icon: <Shield size={15} />, label: "Website Redesign", path: "/technology/web-development/website-redesign" },
        ],
      },
      {
        heading: "Career & Jobs",
        items: [
          { icon: <Briefcase size={15} />, label: "Career & Jobs", path: "/career-jobs" },
          { icon: <FileSearch size={15} />, label: "Resume Building", path: "/career-jobs/resume" },
          { icon: <UserCheck size={15} />, label: "Interview Preparation", path: "/career-jobs/interview-prep" },
          { icon: <Briefcase size={15} />, label: "Latest Job Updates", path: "/career-jobs" },
          { icon: <GraduationCap size={15} />, label: "Internship Resources", path: "/career-jobs/internships" },
          { icon: <TrendingUp size={15} />, label: "Career Guidance", path: "/career-jobs/guidance" },
        ],
      },
    ],
    cta: { label: "Build with Us", path: "/technology/web-development" },
  },

  { label: "Testimonials", path: "/testimonials" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

/* ───────────────────────────────────────────
   GET STARTED MODAL OPTIONS
─────────────────────────────────────────── */
const GET_STARTED_OPTIONS = [
  { icon: <TrendingUp size={22} />, label: "Digital Marketing", sub: "Grow your brand & reach customers", path: "/digital-marketing", color: "#f59e0b" },
  { icon: <Code2 size={22} />, label: "Technology Services", sub: "Build websites, apps & automation", path: "/technology", color: "#06b6d4" },
  { icon: <Briefcase size={22} />, label: "Career & Jobs", sub: "Land your dream tech job", path: "/career-jobs", color: "#10b981" },
  { icon: <Mail size={22} />, label: "General Enquiry", sub: "Talk to us about anything", path: "/contact", color: "#8b5cf6" },
];

/* ───────────────────────────────────────────
   COMPONENT
─────────────────────────────────────────── */
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("vertexLoggedInUser")));
  const dropdownTimer = useRef(null);

  useEffect(() => {
    const handleStorage = () => {
      setUser(JSON.parse(localStorage.getItem("vertexLoggedInUser")));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setModalOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = (mobileOpen || modalOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, modalOpen]);

  const go = (path) => {
    navigate(path);
    setMobileOpen(false);
    setActiveDropdown(null);
    setModalOpen(false);
  };

  const handleMouseEnter = (idx) => {
    clearTimeout(dropdownTimer.current);
    setActiveDropdown(idx);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const isActive = (item) =>
    location.pathname === item.path ||
    (item.path !== "/" && location.pathname.startsWith(item.path));

  return (
    <>
      {/* ══════════════════════ HEADER ══════════════════════ */}
      <header className={`vx-header ${isScrolled ? "vx-header--scrolled" : ""}`}>
        <div className="vx-header__inner">

          {/* LOGO */}
          <button className="vx-logo" onClick={() => go("/")} aria-label="360 Vertex Solutions Home">
            <img src={LOGO_URL} alt="360° Vertex Solutions" className="vx-logo__img" />
          </button>

          {/* DESKTOP NAV */}
          <nav className="vx-nav" aria-label="Main navigation">
            {NAV.map((item, idx) => (
              <div
                key={idx}
                className={`vx-nav__item ${item.columns ? "vx-nav__item--mega" : ""}`}
                onMouseEnter={() => item.columns && handleMouseEnter(idx)}
                onMouseLeave={() => item.columns && handleMouseLeave()}
              >
                <button
                  className={`vx-nav__btn ${isActive(item) ? "vx-nav__btn--active" : ""}`}
                  onClick={() => !item.columns && go(item.path)}
                  aria-expanded={item.columns ? activeDropdown === idx : undefined}
                >
                  {item.label}
                  {item.columns && (
                    <ChevronDown
                      size={13}
                      className={`vx-nav__chevron ${activeDropdown === idx ? "vx-nav__chevron--open" : ""}`}
                    />
                  )}
                </button>

                {/* MEGA DROPDOWN */}
                {item.columns && (
                  <div
                    className={`vx-mega ${activeDropdown === idx ? "vx-mega--visible" : ""}`}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={() => handleMouseLeave()}
                  >
                    {/* Mega Header */}
                    <div className="vx-mega__header">
                      <div>
                        <p className="vx-mega__title">{item.megaTitle}</p>
                        <p className="vx-mega__sub">{item.megaSubtitle}</p>
                      </div>
                      <button
                        className="vx-mega__cta-top"
                        onClick={() => go(item.cta.path)}
                        style={{ "--badge-color": item.badgeColor }}
                      >
                        {item.cta.label}
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    {/* Mega Columns */}
                    <div
                      className="vx-mega__body"
                      style={{ "--mega-columns": item.columns.length }}
                    >
                      {item.columns.map((col, ci) => (
                        <div key={ci} className="vx-mega__col">
                          <p className="vx-mega__col-heading">{col.heading}</p>
                          <ul className="vx-mega__list">
                            {col.items.map((sub, si) => (
                              <li key={si}>
                                <button
                                  className="vx-mega__link"
                                  onClick={() => go(sub.path)}
                                >
                                  <span className="vx-mega__link-icon" style={{ "--badge-color": item.badgeColor }}>
                                    {sub.icon}
                                  </span>
                                  {sub.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + HAMBURGER */}
          <div className="vx-actions">
            {user ? (
              <button className="vx-user-avatar" onClick={() => go("/profile")} title={user.name}>
                <img src={user.avatar} alt="Profile" />
              </button>
            ) : (
              <button className="vx-login-btn" onClick={() => go("/login")}>
                Login
              </button>
            )}
            <button className="vx-cta" onClick={() => go("/contact")} id="header-build-with-us">
              <span>Build With Us</span>
              <Sparkles size={14} />
            </button>
            <button
              className="vx-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

      </header>

      {/* ══════════════════════ MOBILE PANEL ══════════════════════ */}
      <div className={`vx-mobile ${mobileOpen ? "vx-mobile--open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="vx-mobile__inner">
          <div className="vx-mobile__pillars">
            <button className="vx-mobile__pillar vx-mobile__pillar--d" onClick={() => go("/digital-marketing")}>
              <TrendingUp size={16} />
              <div>
                <p>Digital Marketing & Tech</p>
                <span>Design → Develop → Grow</span>
              </div>
            </button>
          </div>

          {/* Nav items */}
          {NAV.map((item, idx) => (
            <div key={idx} className="vx-mobile__group">
              <button
                className={`vx-mobile__row ${isActive(item) ? "vx-mobile__row--active" : ""}`}
                onClick={() => {
                  if (item.columns) setMobileExpanded(mobileExpanded === idx ? null : idx);
                  else go(item.path);
                }}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className="vx-mobile__badge"
                    style={{ background: item.badgeColor + "22", color: item.badgeColor, border: `1px solid ${item.badgeColor}44` }}
                  >
                    {item.badge}
                  </span>
                )}
                {item.columns && (
                  <ChevronDown
                    size={18}
                    className={`vx-mobile__chev ${mobileExpanded === idx ? "vx-mobile__chev--open" : ""}`}
                  />
                )}
              </button>

              {item.columns && mobileExpanded === idx && (
                <div className="vx-mobile__sub">
                  {item.columns.map((col, ci) => (
                    <div key={ci} className="vx-mobile__sub-group">
                      <p className="vx-mobile__sub-heading">{col.heading}</p>
                      {col.items.map((sub, si) => (
                        <button key={si} className="vx-mobile__sub-link" onClick={() => go(sub.path)}>
                          <span style={{ color: item.badgeColor }}>{sub.icon}</span>
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button className="vx-mobile__cta" onClick={() => { setMobileOpen(false); go("/contact"); }}>
            <Sparkles size={16} />
            Build With Us
          </button>
        </div>
      </div>
      {mobileOpen && <div className="vx-overlay" onClick={() => setMobileOpen(false)} />}

      {/* ══════════════════════ GET STARTED MODAL ══════════════════════ */}
      {modalOpen && (
        <div className="vx-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="vx-modal" onClick={(e) => e.stopPropagation()}>
            <button className="vx-modal__close" onClick={() => setModalOpen(false)} aria-label="Close">
              <X size={20} />
            </button>
            <div className="vx-modal__header">
              <p className="vx-modal__eyebrow">360° Vertex Solutions</p>
              <h2 className="vx-modal__title">How can we help you?</h2>
              <p className="vx-modal__sub">Choose your journey below</p>
            </div>
            <div className="vx-modal__grid">
              {GET_STARTED_OPTIONS.map((opt, i) => (
                <button
                  key={i}
                  className="vx-modal__card"
                  onClick={() => go(opt.path)}
                  style={{ "--card-color": opt.color }}
                >
                  <span className="vx-modal__card-icon">{opt.icon}</span>
                  <div>
                    <p className="vx-modal__card-label">{opt.label}</p>
                    <p className="vx-modal__card-sub">{opt.sub}</p>
                  </div>
                  <ArrowRight size={16} className="vx-modal__card-arrow" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
