import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function CMSWebsitePage() {
  return (
    <WebDevServiceTemplate
      eyebrow="CMS WEBSITE"
      serviceId="cms-website"
      title="Manage Your Website Without"
      titleHighlight="Depending on Developers."
      desc="Custom Content Management Systems empowering marketing teams and content creators to publish pages, blogs, media, and announcements easily without technical knowledge."
      targetUsers={[
        { icon: "📰", title: "Publishers & Bloggers", desc: "News portals, magazines, and content creators publishing daily articles." },
        { icon: "📣", title: "Marketing Teams", desc: "Companies needing to quickly update promo banners, campaign pages, and landing pages." },
        { icon: "🎓", title: "Educational Institutions", desc: "Colleges & schools posting daily announcements, events, and notices." }
      ]}
      features={[
        "Intuitive WYSIWYG Content Editor", "Media Library for Images, Videos & Docs", "Blog Post Category & Tag Management",
        "Custom Page Builder & Modular Sections", "SEO Title, Meta Description & Slug Controls", "User Roles (Admin, Editor, Author)",
        "Draft & Scheduled Publishing", "Automated XML Sitemap Updates"
      ]}
      faqs={[
        { q: "Do I need technical skills to update a CMS website?", a: "No, if you know how to use Microsoft Word or email, you can easily create, edit, and publish content on your CMS website." }
      ]}
      related={[
        { icon: "🏢", label: "Business Website", path: "/technology/web-development/business-website" },
        { icon: "🎯", label: "Landing Page", path: "/technology/web-development/landing-page" }
      ]}
    />
  );
}
