import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function CorporateWebsitePage() {
  return (
    <WebDevServiceTemplate
      eyebrow="CORPORATE WEBSITE"
      serviceId="corporate-website"
      title="Create a Strong Digital Presence"
      titleHighlight="for Your Organization."
      desc="Enterprise-grade corporate websites designed for organizations, companies, and technology groups needing high compliance, security, and multi-departmental representation."
      targetUsers={[
        { icon: "🏢", title: "Enterprise Corporations", desc: "Multi-branch enterprises showcasing corporate governance, leadership, and global operations." },
        { icon: "🌐", title: "Technology Companies", desc: "SaaS providers, IT firms, and software vendors highlighting products and client portfolios." },
        { icon: "🏛️", title: "Non-Profits & Orgs", desc: "NGOs, institutions, and foundations communicating mission, programs, and annual reports." },
        { icon: "💼", title: "Consulting & Financial", desc: "Financial institutions, legal firms, and advisories requiring high security and compliance." }
      ]}
      features={[
        "Corporate Home & Leadership Profile", "Multi-Language Internationalization", "Services & Enterprise Solutions",
        "Case Studies & Client Success Stories", "Investor Relations & Reports Section", "Careers & HR Job Openings Portal",
        "Newsroom & Press Releases", "Role-Based Access CMS Panel", "Enterprise Security & SSL",
        "GDPR / Privacy Compliance Controls", "High-Availability CDN Caching", "Custom Domain & Subdomain Routing"
      ]}
      faqs={[
        { q: "What security measures are implemented on corporate websites?", a: "We implement SSL encryption, Role-Based Access Control (RBAC), XSS/CSRF protections, SQL injection security, and automated cloud backups." },
        { q: "Can we connect our HR or ATS recruitment tools?", a: "Yes, we integrate custom APIs for applicant tracking systems (ATS), CRMs, and ERP platforms seamlessly." }
      ]}
      related={[
        { icon: "🏢", label: "Business Website", path: "/technology/web-development/business-website" },
        { icon: "⚙️", label: "Web Application", path: "/technology/web-development/web-application" },
        { icon: "📊", label: "Admin Dashboard", path: "/technology/web-development/admin-dashboard" },
        { icon: "🛠️", label: "Custom Web Dev", path: "/technology/web-development/custom-web-development" }
      ]}
    />
  );
}
