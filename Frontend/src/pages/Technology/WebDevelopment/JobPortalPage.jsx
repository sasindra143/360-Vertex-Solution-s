import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function JobPortalPage() {
  return (
    <WebDevServiceTemplate
      eyebrow="JOB PORTAL"
      serviceId="job-portal"
      title="Build a Modern"
      titleHighlight="Job & Career Platform."
      desc="Job boards and recruitment portals connecting candidate job seekers with employers, featuring job search filters, candidate profiles, resume upload, and employer dashboard tracking."
      targetUsers={[
        { icon: "💼", title: "Recruitment Agencies", desc: "Staffing firms managing job listings, candidate submissions, and client placements." },
        { icon: "🎓", title: "College Career Cells", desc: "Institutions facilitating campus placements and student job opportunities." },
        { icon: "🚀", title: "Industry Niche Boards", desc: "Specialized portals for tech jobs, remote work, freelance gigs, or healthcare careers." }
      ]}
      features={[
        "Job Search with Keyword, Location & Category Filters", "Candidate Account Registration & Profile Building", "One-Click Resume Upload & ATS Parser Sync",
        "Employer Registration & Job Posting Portal", "Application Tracking System (ATS) Dashboard", "Automated Job Alert Email Notifications",
        "Featured Job Badges & Employer Subscriptions", "Admin Approval & Content Moderation Panel"
      ]}
      faqs={[
        { q: "Can employers pay to feature their job postings?", a: "Yes, we integrate subscription packages and pay-per-job-post payment processing via Razorpay / Stripe." }
      ]}
      related={[
        { icon: "⚙️", label: "Web Application", path: "/technology/web-development/web-application" },
        { icon: "📊", label: "Admin Dashboard", path: "/technology/web-development/admin-dashboard" }
      ]}
    />
  );
}
