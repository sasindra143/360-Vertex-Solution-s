import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function WebsiteRedesignPage() {
  return (
    <WebDevServiceTemplate
      eyebrow="WEBSITE REDESIGN"
      serviceId="website-redesign"
      title="Transform Your Existing"
      titleHighlight="Website Experience."
      desc="Complete visual overhaul, UI/UX modernisation, mobile responsiveness optimization, speed enhancement, and SEO structural refactoring for outdated websites."
      targetUsers={[
        { icon: "🐢", title: "Slow & Outdated Sites", desc: "Websites built years ago that look obsolete and perform poorly on smartphones." },
        { icon: "📉", title: "Low-Converting Portals", desc: "Sites getting traffic but failing to generate leads or customer enquiries." },
        { icon: "🎨", title: "Rebranding Companies", desc: "Businesses updating brand identity, colors, logo, and core messaging." }
      ]}
      features={[
        "Comprehensive UI/UX & Conversion Rate Audit", "Modern MNC Dark/Light Glassmorphism Design", "100% Mobile & Tablet Responsive Layout",
        "Core Web Vitals & Speed Optimization", "SEO URL Preserving 301 Redirect Structure", "Clean HTML5 Semantic Code Refactoring",
        "Content Restructuring & Accessibility Fixes", "Post-Launch Performance Monitoring"
      ]}
      faqs={[
        { q: "Will redesigning my website hurt my existing Google SEO rankings?", a: "No! We preserve your existing URLs or implement 301 redirects and schema tags to maintain and improve your search rankings." }
      ]}
      related={[
        { icon: "🏢", label: "Business Website", path: "/technology/web-development/business-website" },
        { icon: "🎯", label: "Landing Page", path: "/technology/web-development/landing-page" }
      ]}
    />
  );
}
