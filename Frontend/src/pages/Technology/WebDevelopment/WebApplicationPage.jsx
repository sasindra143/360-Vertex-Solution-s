import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function WebApplicationPage() {
  return (
    <WebDevServiceTemplate
      eyebrow="WEB APPLICATION"
      serviceId="web-application"
      title="Turn Business Processes Into"
      titleHighlight="Digital Applications."
      desc="Custom SaaS products, CRM systems, customer portals, internal management dashboards, and web software engineered for automated business workflows."
      targetUsers={[
        { icon: "🚀", title: "SaaS Startups", desc: "Founders building multi-tenant cloud products with subscription billing and user management." },
        { icon: "🏢", title: "Enterprise Operations", desc: "Businesses replacing manual spreadsheets with automated internal workflow software." },
        { icon: "👥", title: "Service Firms", desc: "Agencies requiring secure client portals for file sharing, invoicing, and messaging." },
        { icon: "📦", title: "Logistics & Fleet", desc: "Organizations needing real-time asset tracking, dispatch, and operational control." }
      ]}
      features={[
        "Secure User Authentication & OAuth", "Role-Based Access Control (RBAC)", "Interactive Real-Time Analytics Dashboard",
        "RESTful API & Webhook Architecture", "Data Grid with Sorting & Exporting", "Automated Notifications & Alerts",
        "File Upload & Document Management", "Third-Party API & SaaS Integrations", "Audit Logs & Activity History",
        "Multi-Tenant Database Architecture", "High-Concurrency Scalability", "Dark / Light Theme UI Controls"
      ]}
      faqs={[
        { q: "What is the difference between a website and a web application?", a: "A website primarily presents information, whereas a web application processes user inputs, performs complex calculations, manages data, and automates business logic." },
        { q: "How do you ensure data security in web applications?", a: "We apply JWT / OAuth authentication, HTTPS encryption, parameterized database queries, input sanitization, and strict CORS & RBAC access rules." }
      ]}
      related={[
        { icon: "⚡", label: "Full Stack App", path: "/technology/web-development/full-stack-development" },
        { icon: "🛠️", label: "Custom Development", path: "/technology/web-development/custom-web-development" },
        { icon: "📊", label: "Admin Dashboard", path: "/technology/web-development/admin-dashboard" },
        { icon: "🛒", label: "E-Commerce Website", path: "/technology/web-development/ecommerce-website" }
      ]}
    />
  );
}
