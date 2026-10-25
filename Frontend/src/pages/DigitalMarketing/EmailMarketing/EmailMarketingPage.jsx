import DMServicePage from "../DMServicePage";

export default function EmailMarketingPage() {
  return (
    <DMServicePage
      eyebrow="Email Marketing"
      title="Build Relationships Beyond"
      titleHighlight="the First Click."
      desc="Develop professional email marketing campaigns that nurture your audience, keep customers informed and support your wider marketing strategy. Email remains one of the most cost-effective digital marketing channels."
      waMsg="Hello 360° Vertex Solutions, I would like to discuss email marketing for my business."
      mailSubject="Email Marketing Enquiry — 360° Vertex Solutions"
      ctaPath="/contact?service=email-marketing"
      ctaLabel="Start Email Marketing"
      services={[
        { icon:"📋", title:"Campaign Strategy", desc:"Develop an email strategy aligned with your audience and business objectives.", items:["Goal setting","Audience segmentation","Content planning","Frequency strategy","List management"] },
        { icon:"📰", title:"Newsletter", desc:"Regular newsletters that keep your audience informed and engaged.", items:["Editorial planning","Content creation","Design direction","Scheduling","Performance analysis"] },
        { icon:"🌱", title:"Lead Nurturing", desc:"Structured email sequences that guide new leads toward a decision over time.", items:["Welcome sequence","Educational content","Value communication","Follow-up timing","CTA strategy"] },
        { icon:"👋", title:"Welcome Emails", desc:"Automated welcome sequences that make a strong first impression with new subscribers.", items:["Welcome message","Brand introduction","Value proposition","Next steps","Onboarding flow"] },
        { icon:"📣", title:"Promotional Campaigns", desc:"Targeted promotional emails for offers, launches and events.", items:["Offer creation","Audience targeting","Subject line testing","Design","Results analysis"] },
        { icon:"📊", title:"Analytics & Reporting", desc:"Track email performance and use data to improve future campaigns.", items:["Open rates","Click rates","Conversion tracking","Unsubscribe analysis","A/B test results"] },
      ]}
      process={[
        { num:"01", icon:"📋", title:"Capture",   desc:"Build a permission-based subscriber list." },
        { num:"02", icon:"👥", title:"Segment",   desc:"Group subscribers by interest, behaviour or stage." },
        { num:"03", icon:"✍️", title:"Create",    desc:"Write and design effective email content." },
        { num:"04", icon:"📤", title:"Send",      desc:"Schedule and deliver campaigns to the right segments." },
        { num:"05", icon:"📊", title:"Measure",   desc:"Track opens, clicks, conversions and unsubscribes." },
        { num:"06", icon:"🔄", title:"Optimize",  desc:"Use data to improve subject lines, content and timing." },
      ]}
      faqs={[
        { q:"What email marketing tools do you work with?", a:"We work with several email marketing platforms. The right tool depends on your existing setup, list size and automation requirements. We'll advise during the initial consultation." },
        { q:"Do you build the email list?", a:"Email lists must be built with consent. We can help you design opt-in mechanisms and lead capture flows, but we do not purchase or supply contact lists." },
        { q:"What is email automation?", a:"Email automation allows you to send pre-designed email sequences automatically when a specific trigger occurs — such as a new subscriber, a purchase or a form submission — without manual intervention." },
        { q:"How often should I send emails?", a:"Frequency depends on your audience and content. Sending too often can increase unsubscribes; too infrequently can reduce engagement. We'll recommend an appropriate cadence based on your goals." },
        { q:"Can email marketing be integrated with our CRM?", a:"Yes. Most email marketing platforms offer CRM integration or data sync capabilities so subscriber activity is reflected in your contact management system." },
        { q:"How do you measure email marketing success?", a:"Key metrics include open rate, click-through rate, conversion rate, unsubscribe rate and revenue attributed to email campaigns (where tracked)." },
      ]}
      related={[
        { icon:"💬", label:"WhatsApp Marketing",  path:"/digital-marketing/whatsapp-marketing" },
        { icon:"⚡", label:"Lead Generation",     path:"/digital-marketing/lead-generation" },
        { icon:"✍️", label:"Content Marketing",   path:"/digital-marketing/content-marketing" },
        { icon:"🤖", label:"AI Automation",       path:"/digital-marketing/ai-automation" },
        { icon:"📊", label:"Analytics",           path:"/digital-marketing/analytics-reporting" },
      ]}
      ctaTitle="Ready to Build an Email Marketing Strategy?"
      ctaDesc="Let's design an email approach that keeps your audience engaged and supports your business goals."
    />
  );
}
