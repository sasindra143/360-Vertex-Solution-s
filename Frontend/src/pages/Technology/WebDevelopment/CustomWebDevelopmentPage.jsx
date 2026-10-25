import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function CustomWebDevelopmentPage() {
  return (
    <WebDevServiceTemplate
      eyebrow="CUSTOM WEB DEVELOPMENT"
      serviceId="custom-web-development"
      title="Your Requirement."
      titleHighlight="Your Solution."
      desc="Bespoke web engineering designed specifically around unique business logic, proprietary algorithms, specialized workflows, and custom third-party integrations."
      targetUsers={[
        { icon: "🔧", title: "Unique Business Workflows", desc: "Organizations with non-standard processes that off-the-shelf software cannot fulfill." },
        { icon: "🔄", title: "Legacy System Integration", desc: "Connecting new web interfaces with existing legacy databases, mainframes, or ERPs." },
        { icon: "🔒", title: "High Security Requirements", desc: "Enterprises needing strict data privacy, custom encryption, and dedicated server setups." }
      ]}
      features={[
        "Tailored Requirement Analysis & Technical Blueprint", "Bespoke Database Schema & API Architecture", "Custom Business Logic & Calculation Engines",
        "Third-Party SDK & Hardware API Integration", "Role-Based Access & Multi-Tenant Partitioning", "Comprehensive Automated Testing & QA",
        "Dedicated Source Code Handover & Documentation", "High-Availability Deployment & Monitoring"
      ]}
      faqs={[
        { q: "How do we start a custom web development project?", a: "We begin with a discovery call and blueprint workshop to document your exact functional requirements, user flows, and technical specifications." },
        { q: "Will we own 100% of the source code?", a: "Yes, you receive complete ownership of all developed source code, intellectual property, and documentation." }
      ]}
      related={[
        { icon: "⚡", label: "Full Stack App", path: "/technology/web-development/full-stack-development" },
        { icon: "⚙️", label: "Web Application", path: "/technology/web-development/web-application" },
        { icon: "📊", label: "Admin Dashboard", path: "/technology/web-development/admin-dashboard" }
      ]}
    />
  );
}
