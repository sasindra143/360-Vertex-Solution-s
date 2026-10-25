import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function AdminDashboardPage() {
  return (
    <WebDevServiceTemplate
      eyebrow="ADMIN DASHBOARD"
      serviceId="admin-dashboard"
      title="Manage Your Business From"
      titleHighlight="One Dashboard."
      desc="Control panels, business intelligence analytics, user management interfaces, and operational reporting dashboards built with high-performance data grids and real-time metrics."
      targetUsers={[
        { icon: "📊", title: "Business Executives", desc: "CEOs & managers monitoring revenue KPIs, active users, and operational analytics." },
        { icon: "🛍️", title: "E-Commerce Managers", desc: "Store owners managing inventory, orders, customer refunds, and shipping logistics." },
        { icon: "🛡️", title: "System Administrators", desc: "IT admins managing user roles, system permissions, security logs, and database backups." }
      ]}
      features={[
        "Interactive KPI Cards & Real-Time Data Charts", "Advanced Data Grids with Filtering & CSV/PDF Export", "User Management & Role-Based Access Control (RBAC)",
        "Audit Trail & System Activity Logging", "Order, Lead & Support Ticket Processing", "Custom Notification Center & System Alerts",
        "Dark / Light Mode Responsive UI Interface", "RESTful API Data Synchronization"
      ]}
      faqs={[
        { q: "Can the dashboard handle large datasets without slowing down?", a: "Yes, we use server-side pagination, database indexing, and virtualized data grids to render 100,000+ records smoothly." }
      ]}
      related={[
        { icon: "⚙️", label: "Web Application", path: "/technology/web-development/web-application" },
        { icon: "⚡", label: "Full Stack App", path: "/technology/web-development/full-stack-development" }
      ]}
    />
  );
}
