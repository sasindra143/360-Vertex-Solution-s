import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function FullStackDevelopmentPage() {
  return (
    <WebDevServiceTemplate
      eyebrow="FULL STACK DEVELOPMENT"
      serviceId="full-stack-development"
      title="Complete Web Development"
      titleHighlight="From Frontend to Backend."
      desc="End-to-end full stack software development combining modern reactive UIs, scalable server architectures, secure APIs, and optimized databases."
      targetUsers={[
        { icon: "💡", title: "Product Founders", desc: "Build full MVP or production-ready products with end-to-end code architecture." },
        { icon: "📈", title: "Scaling Tech Companies", desc: "Outsource full stack module development to expand engineering capacity fast." },
        { icon: "🛠️", title: "Legacy Modernization", desc: "Migrate legacy backend monoliths to modern React + Node / Java Spring microservices." }
      ]}
      features={[
        "Frontend: React.js, JavaScript, HTML5, CSS3, Tailwind CSS",
        "Backend: Node.js, Express.js, Java, Spring Boot",
        "Databases: PostgreSQL, MySQL, MongoDB",
        "API Design: RESTful APIs, JSON Web Tokens (JWT), GraphQL",
        "Integrations: Payment Gateways, Email/SMS Services, WhatsApp APIs, AI LLM APIs",
        "DevOps: Docker, GitHub Actions CI/CD, AWS / Cloud Deployment, Nginx, Linux"
      ]}
      faqs={[
        { q: "What stack do you recommend for most projects?", a: "For modern fast applications, we recommend React.js frontend with Node.js/Express or Java Spring Boot backend and PostgreSQL / MongoDB database." },
        { q: "Do you provide API documentation for mobile apps?", a: "Yes, all APIs are documented with Swagger / Postman collections for seamless mobile app integration." }
      ]}
      related={[
        { icon: "⚙️", label: "Web Application", path: "/technology/web-development/web-application" },
        { icon: "🛠️", label: "Custom Development", path: "/technology/web-development/custom-web-development" },
        { icon: "📊", label: "Admin Dashboard", path: "/technology/web-development/admin-dashboard" }
      ]}
    />
  );
}
