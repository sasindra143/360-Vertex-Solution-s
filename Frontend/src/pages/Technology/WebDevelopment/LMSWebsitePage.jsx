import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function LMSWebsitePage() {
  return (
    <WebDevServiceTemplate
      eyebrow="LMS / EDUCATION WEBSITE"
      serviceId="lms-website"
      title="Build Your Own Online"
      titleHighlight="Learning Platform."
      desc="Feature-rich Learning Management Systems with course video streaming, student progress tracking, quizzes, assignments, automated certificates, and course enrollment payments."
      targetUsers={[
        { icon: "🎓", title: "Training Academies", desc: "Coaching institutes and technical academies launching online video courses & test series." },
        { icon: "💡", title: "Course Creators", desc: "Subject matter experts monetization knowledge through structured online courses." },
        { icon: "🏢", title: "Corporate L&D", desc: "Companies onboarding and training employees with internal skill assessment modules." }
      ]}
      features={[
        "Course Catalog & Curriculum Hierarchy", "Secure Video Player with Watermarking", "Student Progress Tracking & Dashboards",
        "Online Quizzes, Exams & Instant Scoring", "Assignment Submission & Instructor Grading", "Automated PDF Completion Certificates",
        "Student & Instructor Account Portals", "Course Enrollment & Subscription Payments", "Discussion Forums & Q&A Board"
      ]}
      faqs={[
        { q: "Can we protect our videos from unauthorized downloads?", a: "Yes, we integrate DRM, encrypted HLS video streaming, and dynamic student email watermarking over video frames." }
      ]}
      related={[
        { icon: "⚙️", label: "Web Application", path: "/technology/web-development/web-application" },
        { icon: "📊", label: "Admin Dashboard", path: "/technology/web-development/admin-dashboard" }
      ]}
    />
  );
}
