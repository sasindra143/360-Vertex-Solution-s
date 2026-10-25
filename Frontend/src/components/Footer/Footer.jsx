import { useNavigate } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaTelegramPlane, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { COMPANY, SOCIAL, waLink } from "../../config";
import "./Footer.css";

const FCOLS = [
  {
    h: "Quick Links",
    links: [
      { l: "Home", p: "/" },
      { l: "About Us", p: "/about" },
      { l: "Digital Marketing", p: "/digital-marketing" },
      { l: "Technology", p: "/technology" },
      { l: "Career & Jobs", p: "/career-jobs" },
      { l: "Testimonials", p: "/testimonials" },
      { l: "Contact", p: "/contact" },
    ],
  },
  {
    h: "Digital Marketing",
    links: [
      { l: "SEO Services", p: "/digital-marketing/seo" },
      { l: "Google Ads (PPC)", p: "/digital-marketing/google-ads" },
      { l: "Meta & Social Ads", p: "/digital-marketing/meta-ads" },
      { l: "Social Media", p: "/digital-marketing/social-media" },
      { l: "Content Marketing", p: "/digital-marketing/content-marketing" },
      { l: "Lead Generation", p: "/digital-marketing/lead-generation" },
      { l: "AI & Automation", p: "/digital-marketing/ai-automation" },
    ],
  },
  {
    h: "Technology",
    links: [
      { l: "Web Development", p: "/technology/web-development" },
      { l: "Business Websites", p: "/technology/web-development/business-website" },
      { l: "E-Commerce Stores", p: "/technology/web-development/ecommerce-website" },
      { l: "Web Applications", p: "/technology/web-development/web-application" },
      { l: "Full Stack Apps", p: "/technology/web-development/full-stack-development" },
      { l: "Admin Dashboards", p: "/technology/web-development/admin-dashboard" },
      { l: "Website Redesign", p: "/technology/web-development/website-redesign" },
    ],
  },
  {
    h: "Legal",
    links: [
      { l: "Privacy Policy", p: "/privacy" },
      { l: "Terms & Conditions", p: "/terms" },
      { l: "Refund Policy", p: "/refund" },
      { l: "Cookie Policy", p: "/cookies" },
    ],
  },
];

const SOCIALS = [
  { label: "LinkedIn", href: SOCIAL.linkedin, icon: <FaLinkedinIn aria-hidden="true" /> },
  { label: "Instagram", href: SOCIAL.instagram, icon: <FaInstagram aria-hidden="true" /> },
  { label: "YouTube", href: SOCIAL.youtube, icon: <FaYoutube aria-hidden="true" /> },
  { label: "WhatsApp", href: waLink(), icon: <FaWhatsapp aria-hidden="true" /> },
  { label: "Telegram", href: SOCIAL.telegram, icon: <FaTelegramPlane aria-hidden="true" /> },
];

export default function Footer() {
  const nav = useNavigate();
  const yr = new Date().getFullYear();

  return (
    <footer className="vx-footer">
      <div className="vx-footer__top">
        <div className="vx-footer__grid">
          {/* BRAND */}
          <div className="vx-footer__brand">
            <button className="vx-footer__logo" onClick={() => nav("/")} aria-label="Go home">
              <img
                src={COMPANY.logo}
                alt="360° Vertex Solutions"
              />
              <div>
                <p className="vx-footer__name">360° Vertex Solutions</p>
                <p className="vx-footer__tagline">{COMPANY.tagline}</p>
              </div>
            </button>

            <p className="vx-footer__desc">
              Digital marketing and technology solutions to help businesses strengthen their online presence and grow.
            </p>

            {/* CONTACT INFO */}
            <div className="vx-footer__contact">
              <a href={`tel:+${COMPANY.phoneRaw}`} className="vx-footer__contact-row">
                <span className="vx-footer__contact-icon">📞</span>
                <span>{COMPANY.phone}</span>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="vx-footer__contact-row">
                <span className="vx-footer__contact-icon">✉️</span>
                <span>{COMPANY.email}</span>
              </a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="vx-footer__contact-row">
                <span className="vx-footer__contact-icon">💬</span>
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* SOCIAL */}
            <div className="vx-footer__social">
              {SOCIALS.filter(({ href }) => href).map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="vx-footer__social-link"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* LINK COLUMNS */}
          {FCOLS.map((col, i) => (
            <div key={i} className="vx-footer__col">
              <h4 className="vx-footer__col-heading">{col.h}</h4>
              <ul>
                {col.links.map((l, j) => (
                  <li key={j}>
                    <button onClick={() => nav(l.p)}>{l.l}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="vx-footer__bottom">
        <div className="vx-footer__bottom-inner">
          <p>© {yr} 360° Vertex Solutions. All rights reserved.</p>
          <p>Your Vision | Our Solutions | A Brighter Tomorrow</p>
        </div>
      </div>
    </footer>
  );
}
