import DMServicePage from "../DMServicePage";

export default function LeadGenerationPage() {
  return (
    <DMServicePage
      eyebrow="Lead Generation"
      title="Turn Attention Into"
      titleHighlight="Qualified Opportunities."
      desc="Design and build lead generation systems that capture interest and guide potential customers toward a conversation with your team. We focus on quality over volume."
      waMsg="Hello 360° Vertex Solutions, I would like to discuss lead generation for my business."
      mailSubject="Lead Generation Enquiry — 360° Vertex Solutions"
      ctaPath="/contact?service=lead-generation"
      ctaLabel="Generate More Leads"
      services={[
        { icon:"📄", title:"Landing Pages", desc:"Conversion-focused pages designed to capture leads from paid and organic traffic.", items:["Page design","Copywriting","Form optimization","A/B testing","Mobile optimization"] },
        { icon:"📋", title:"Lead Forms", desc:"Well-designed forms that collect the right information without friction.", items:["Form design","Field optimization","Validation","CRM integration","Thank-you flow"] },
        { icon:"🎁", title:"Lead Magnets", desc:"Valuable resources that encourage visitors to share their contact information.", items:["Guide / checklist creation","Free audit offers","Resource downloads","Webinar registration"] },
        { icon:"💬", title:"WhatsApp Lead Capture", desc:"WhatsApp-based lead entry points for audiences who prefer messaging.", items:["Click-to-WhatsApp buttons","Pre-filled messages","Conversation flow","Lead qualification"] },
        { icon:"📧", title:"Email Capture", desc:"Email sign-up integration with follow-up automation for lead nurturing.", items:["Email forms","Welcome sequence","Lead nurturing flow","List management"] },
        { icon:"⚡", title:"CRM Integration", desc:"Connect lead sources to your CRM so no lead is missed.", items:["CRM connection","Lead routing","Status tracking","Notification setup","Team assignment"] },
      ]}
      process={[
        { num:"01", icon:"🚦", title:"Traffic",     desc:"Drive qualified visitors from SEO, ads or social." },
        { num:"02", icon:"📄", title:"Landing Page", desc:"Visitor arrives at a focused, conversion-optimised page." },
        { num:"03", icon:"📋", title:"Lead Form",   desc:"Visitor submits their information or contacts via WhatsApp." },
        { num:"04", icon:"🗄️", title:"CRM",        desc:"Lead is captured and routed to the right team member." },
        { num:"05", icon:"✅", title:"Qualify",     desc:"Lead is reviewed and qualified for follow-up." },
        { num:"06", icon:"📞", title:"Follow-up",   desc:"Timely, relevant follow-up with the potential customer." },
      ]}
      faqs={[
        { q:"What is lead generation?", a:"Lead generation is the process of attracting and capturing interest from potential customers — typically through a landing page, form, WhatsApp link or other lead capture mechanism — so your sales team can follow up." },
        { q:"Do you guarantee a specific number of leads?", a:"No. Lead volumes depend on traffic, offer quality, targeting and many other factors we cannot fully control. We focus on optimizing the system to capture more of the traffic you already receive or generate." },
        { q:"What is a lead magnet?", a:"A lead magnet is something valuable you offer in exchange for a visitor's contact information — such as a free guide, checklist, audit, consultation or resource download." },
        { q:"Can you integrate with our CRM?", a:"Yes. We can integrate lead forms with common CRM and contact management systems. We'll advise on the best integration approach for your setup." },
        { q:"Do you build the landing pages?", a:"Yes. Landing page design and development is part of our lead generation service." },
        { q:"How do you measure lead generation performance?", a:"We track form submissions, WhatsApp clicks, conversion rates, cost per lead (for paid traffic) and lead quality feedback from your team." },
      ]}
      related={[
        { icon:"🔍", label:"Google Ads",         path:"/digital-marketing/google-ads" },
        { icon:"📣", label:"Meta Ads",            path:"/digital-marketing/meta-ads" },
        { icon:"💬", label:"WhatsApp Marketing",  path:"/digital-marketing/whatsapp-marketing" },
        { icon:"📧", label:"Email Marketing",     path:"/digital-marketing/email-marketing" },
        { icon:"🤖", label:"AI Automation",       path:"/digital-marketing/ai-automation" },
      ]}
      ctaTitle="Ready to Build a Lead Generation System?"
      ctaDesc="Let's design a lead capture strategy that turns your website visitors into real business conversations."
    />
  );
}
