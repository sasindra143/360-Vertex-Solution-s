import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function BusinessWebsitePage() {
  return (
    <WebDevServiceTemplate
      eyebrow="BUSINESS WEBSITE"
      serviceId="business-website"
      title="Build a Professional"
      titleHighlight="Online Presence."
      desc="Professional websites designed to help businesses explain what they do, showcase their services, build trust, and connect with prospective customers."
      targetUsers={[
        { icon: "🏪", title: "Small Businesses", desc: "Local stores, workshops, and family businesses establishing online visibility." },
        { icon: "🚀", title: "Startups & Firms", desc: "Emerging companies building brand authority and presenting solutions to investors & clients." },
        { icon: "👔", title: "Consultants & Agencies", desc: "Professional service providers demonstrating expertise and capturing client enquiries." },
        { icon: "🎓", title: "Training Institutes", desc: "Education & coaching centers presenting course catalogs, schedules, and admissions info." }
      ]}
      features={[
        "Modern Responsive Homepage", "About Us & Company Vision", "Services & Capabilities Catalog",
        "Product / Gallery Showcase", "Client Testimonials & Case Studies", "Interactive Contact Form",
        "Google Maps Location Integration", "WhatsApp Direct Chat Widget", "Blog / Article System",
        "Lead Capture & CRM Sync", "Google Analytics & Search Console", "Social Media Integration"
      ]}
      faqs={[
        { q: "How long does it take to develop a business website?", a: "Most business websites are designed, developed, tested, and launched within 2 to 3 weeks." },
        { q: "Will my business website work well on mobile phones?", a: "Yes, 100% of our websites are designed mobile-first with smooth responsive layouts across all device sizes." },
        { q: "Can I update the website content myself?", a: "Yes! We can integrate a user-friendly CMS dashboard allowing you to edit text, upload photos, or add blog posts easily." }
      ]}
      related={[
        { icon: "🏛️", label: "Corporate Website", path: "/technology/web-development/corporate-website" },
        { icon: "🎯", label: "Landing Page", path: "/technology/web-development/landing-page" },
        { icon: "🛒", label: "E-Commerce Website", path: "/technology/web-development/ecommerce-website" },
        { icon: "🔄", label: "Website Redesign", path: "/technology/web-development/website-redesign" }
      ]}
    />
  );
}
