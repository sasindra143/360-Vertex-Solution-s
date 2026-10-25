import DMServicePage from "../DMServicePage";

export default function ContentMarketingPage() {
  return (
    <DMServicePage
      eyebrow="Content Marketing"
      title="Create Content That"
      titleHighlight="Connects."
      desc="Develop a content strategy that serves your audience, supports your SEO and drives meaningful engagement. We help businesses create content that answers real questions and builds trust over time."
      waMsg="Hello 360° Vertex Solutions, I would like to discuss content marketing for my business."
      mailSubject="Content Marketing Enquiry — 360° Vertex Solutions"
      ctaPath="/contact?service=content-marketing"
      ctaLabel="Build My Content Strategy"
      services={[
        { icon:"🗺️", title:"Content Strategy", desc:"Develop a structured, audience-focused content plan aligned with your business goals.", items:["Audience research","Content pillars","Topic mapping","Channel strategy","Content calendar"] },
        { icon:"📝", title:"Blog Writing", desc:"Research-backed, well-written articles that inform your audience and support SEO.", items:["Topic research","SEO alignment","Original writing","Internal linking","Editorial review"] },
        { icon:"🌐", title:"Website Content", desc:"Effective copy for service pages, about pages, product descriptions and landing pages.", items:["Service pages","About pages","Landing pages","Homepage content","Product descriptions"] },
        { icon:"📱", title:"Social Content", desc:"Platform-specific content for Instagram, Facebook, LinkedIn and other relevant channels.", items:["Post copy","Carousel scripts","Story content","LinkedIn articles","Caption writing"] },
        { icon:"🎥", title:"Video Scripts", desc:"Clear, engaging scripts for explainer videos, product demos and social video content.", items:["Explainer scripts","Product demos","Educational videos","Short-form scripts"] },
        { icon:"📊", title:"Content Analytics", desc:"Track which content performs best and use that data to inform the ongoing strategy.", items:["Traffic analysis","Engagement metrics","Conversion data","Content audit","Improvement plan"] },
      ]}
      process={[
        { num:"01", icon:"👥", title:"Audience",    desc:"Define the target audience and what questions they're asking." },
        { num:"02", icon:"🔍", title:"Research",    desc:"Keyword and topic research to find content opportunities." },
        { num:"03", icon:"🗺️", title:"Strategy",   desc:"Content plan, calendar and channel selection." },
        { num:"04", icon:"✍️", title:"Create",     desc:"Write and produce high-quality, original content." },
        { num:"05", icon:"📢", title:"Publish",    desc:"Distribute content across relevant channels." },
        { num:"06", icon:"📊", title:"Measure",    desc:"Track performance and identify what to improve." },
      ]}
      faqs={[
        { q:"What types of content do you create?", a:"We create blog articles, website copy, social media content, video scripts, email content, case studies and more. The mix depends on your audience and goals." },
        { q:"How does content marketing support SEO?", a:"High-quality, relevant content helps search engines understand your website's topics and helps users find answers to their questions. A consistent content strategy can improve organic search visibility over time." },
        { q:"Do you keyword-stuff content?", a:"No. We write content for people first. Keywords are used naturally where they fit the topic. Keyword stuffing is a bad practice that harms user experience and is discouraged by search engines." },
        { q:"How often should we publish content?", a:"Consistency matters more than frequency. Publishing quality content regularly — whether weekly or monthly — is more valuable than producing large volumes of low-quality content." },
        { q:"Do you own the content you create?", a:"Content we create for you belongs to you. We transfer full ownership of all content produced under our engagement." },
        { q:"Can you improve existing website content?", a:"Yes. Content audits and existing page optimization are common parts of content strategy — often providing quicker improvements than creating new content from scratch." },
      ]}
      related={[
        { icon:"🔍", label:"SEO",              path:"/digital-marketing/seo" },
        { icon:"📱", label:"Social Media",     path:"/digital-marketing/social-media" },
        { icon:"📧", label:"Email Marketing",  path:"/digital-marketing/email-marketing" },
        { icon:"🎨", label:"Branding",         path:"/digital-marketing/branding-creative" },
        { icon:"⚡", label:"Lead Generation",  path:"/digital-marketing/lead-generation" },
      ]}
      ctaTitle="Ready to Build a Content Strategy?"
      ctaDesc="Let's understand your audience and create content that genuinely serves them and supports your business goals."
    />
  );
}
