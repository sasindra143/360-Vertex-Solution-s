import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function PortfolioWebsitePage() {
  return (
    <WebDevServiceTemplate
      eyebrow="PORTFOLIO WEBSITE"
      serviceId="portfolio-website"
      title="Turn Your Skills Into"
      titleHighlight="Your Digital Identity."
      desc="Sleek, modern portfolio websites tailored for software developers, designers, students, freshers, freelancers, and content creators to showcase projects, resume, and skills."
      targetUsers={[
        { icon: "💻", title: "Software Developers", desc: "Showcase GitHub repositories, live demo links, full stack projects, and technical skills." },
        { icon: "🎨", title: "UI/UX Designers", desc: "Display visual design prototypes, case studies, Figma boards, and creative projects." },
        { icon: "🎓", title: "Students & Graduates", desc: "Build an impressive ATS resume portfolio to stand out during campus drives & job interviews." },
        { icon: "📸", title: "Creators & Freelancers", desc: "Present personal brand, client testimonials, YouTube media, and contact booking links." }
      ]}
      features={[
        "Interactive Dark / Light Modern Theme", "Project Category Filtering & Tags", "One-Click PDF Resume Download",
        "Skills Matrix & Tech Icons", "Work Experience Timeline", "Education & Certifications Section",
        "GitHub & LinkedIn Profile Sync", "Live Demo Embeds & Video Previews", "Client Testimonials & Feedback",
        "Fast Single-Page Smooth Scroll", "Contact & Hire Me Lead Form", "Mobile-Optimized Touch Layout"
      ]}
      faqs={[
        { q: "Can I update my projects or resume after the site is built?", a: "Yes! We provide clean code and simple markdown / JSON structure so you can add new projects easily, or host on GitHub Pages / Vercel." },
        { q: "Is the portfolio ATS-friendly and mobile optimized?", a: "Absolutely. All content is structured for fast loading, clean readability, and seamless rendering on smartphones." }
      ]}
      related={[
        { icon: "🏢", label: "Business Website", path: "/technology/web-development/business-website" },
        { icon: "🎯", label: "Landing Page", path: "/technology/web-development/landing-page" },
        { icon: "⚡", label: "Full Stack App", path: "/technology/web-development/full-stack-development" },
        { icon: "🔄", label: "Website Redesign", path: "/technology/web-development/website-redesign" }
      ]}
    />
  );
}
