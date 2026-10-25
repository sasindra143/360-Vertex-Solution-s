import DMServicePage from "../DMServicePage";

export default function BrandingPage() {
  return (
    <DMServicePage
      eyebrow="Branding & Creative"
      title="Build a Brand"
      titleHighlight="People Remember."
      desc="Create a consistent, professional brand identity that communicates your values and differentiates your business. From logo design to marketing creatives, we help your brand look and feel credible."
      waMsg="Hello 360° Vertex Solutions, I would like to discuss branding and creative services."
      mailSubject="Branding Enquiry — 360° Vertex Solutions"
      ctaPath="/contact?service=branding"
      ctaLabel="Build My Brand"
      services={[
        { icon:"✏️", title:"Brand Identity", desc:"Define the visual and verbal identity of your business.", items:["Brand positioning","Visual direction","Brand guidelines","Tone of voice","Brand story"] },
        { icon:"🎯", title:"Logo Design", desc:"Create a professional, memorable logo that represents your brand appropriately.", items:["Concept development","Color variations","File formats","Usage guidelines","Refinement process"] },
        { icon:"🎨", title:"Color System", desc:"Define a consistent color palette that works across digital and print.", items:["Primary palette","Secondary colors","Accessibility check","Usage rules","Digital codes"] },
        { icon:"🔤", title:"Typography", desc:"Select and define typefaces that communicate your brand's personality.", items:["Font selection","Heading style","Body text","Hierarchy","Web-safe alternatives"] },
        { icon:"📱", title:"Social Media Design", desc:"Templates and assets optimised for social media platforms.", items:["Post templates","Story templates","Highlight covers","Profile design","Platform-specific sizing"] },
        { icon:"🖼️", title:"Ad Creatives", desc:"Professional visual assets for digital advertising campaigns.", items:["Display ad sizes","Social ad formats","Copywriting","Brand consistency","Campaign-specific variants"] },
      ]}
      process={[
        { num:"01", icon:"🔍", title:"Discovery",    desc:"Understand the brand, audience and competitive landscape." },
        { num:"02", icon:"📋", title:"Strategy",     desc:"Define brand positioning, values and direction." },
        { num:"03", icon:"✏️", title:"Design",       desc:"Develop visual identity concepts and refinements." },
        { num:"04", icon:"✅", title:"Review",       desc:"Collaborative review and refinement process." },
        { num:"05", icon:"📦", title:"Deliver",      desc:"Deliver final assets and brand guidelines." },
        { num:"06", icon:"🚀", title:"Apply",        desc:"Implement across all marketing channels consistently." },
      ]}
      faqs={[
        { q:"What does a brand identity include?", a:"A brand identity typically includes a logo, color palette, typography system, brand guidelines and visual direction. The exact scope depends on your business needs." },
        { q:"Do I own the designs you create?", a:"Yes. All designs and brand assets created for you under our engagement are transferred to you upon completion." },
        { q:"How long does branding take?", a:"A complete brand identity project typically takes 3–6 weeks depending on scope, revisions and feedback turnaround time." },
        { q:"Can you redesign an existing brand?", a:"Yes. We can work on brand refreshes or full rebrands depending on your situation and goals." },
        { q:"Do you design for print?", a:"Yes. We can produce print-ready files for business cards, brochures, banners and other physical marketing materials." },
        { q:"Can you create ad creatives for campaigns?", a:"Yes. We create ad creatives in the correct formats and sizes for Google Display, Meta Ads, LinkedIn and other platforms." },
      ]}
      related={[
        { icon:"📱", label:"Social Media",         path:"/digital-marketing/social-media" },
        { icon:"✍️", label:"Content Marketing",    path:"/digital-marketing/content-marketing" },
        { icon:"📣", label:"Meta Ads",              path:"/digital-marketing/meta-ads" },
        { icon:"🌐", label:"Web Development",       path:"/technology" },
        { icon:"🔍", label:"SEO",                   path:"/digital-marketing/seo" },
      ]}
      ctaTitle="Ready to Build Your Brand?"
      ctaDesc="Let's discuss your business, audience and brand vision and create an identity that communicates credibility."
    />
  );
}
