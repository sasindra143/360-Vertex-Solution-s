import DMServicePage from "../DMServicePage";

export default function AIAutomationPage() {
  return (
    <DMServicePage
      eyebrow="AI Automation"
      title="Automate Marketing."
      titleHighlight="Work Smarter."
      desc="Use AI and automation to reduce repetitive work, improve response times, organize leads and support scalable marketing workflows. Human oversight remains central to how we design every automation."
      waMsg="Hello 360° Vertex Solutions, I would like to discuss AI and marketing automation."
      mailSubject="AI Automation Enquiry — 360° Vertex Solutions"
      ctaPath="/contact?service=ai-automation"
      ctaLabel="Automate My Marketing"
      services={[
        { icon:"🤖", title:"AI Chatbots", desc:"Intelligent chatbots that handle common enquiries, qualify leads and route conversations to your team.", items:["Enquiry handling","FAQ automation","Lead qualification","Human handoff","WhatsApp / website integration"] },
        { icon:"🧠", title:"AI Lead Qualification", desc:"Automated lead scoring and qualification to help your team focus on the most promising prospects.", items:["Lead scoring","Qualification questions","Routing rules","CRM integration","Priority flags"] },
        { icon:"✍️", title:"AI Content Workflows", desc:"AI-assisted content research, briefing and draft creation — reviewed and refined by humans before publishing.", items:["Topic research","Content briefs","Draft assistance","SEO alignment","Editorial review workflow"] },
        { icon:"💬", title:"WhatsApp Automation", desc:"Automate WhatsApp lead responses, follow-up sequences and notification workflows.", items:["First response automation","Follow-up sequences","Lead routing","Notification campaigns","CRM sync"] },
        { icon:"📧", title:"Email Automation", desc:"Automated email sequences for lead nurturing, welcome flows and customer communication.", items:["Welcome sequences","Nurture flows","Re-engagement campaigns","Behaviour triggers","Segmentation"] },
        { icon:"⚙️", title:"Marketing Workflows", desc:"End-to-end automation connecting your marketing channels, CRM and team workflows.", items:["Multi-channel workflows","Trigger-based automation","CRM integration","Team notifications","Performance tracking"] },
      ]}
      process={[
        { num:"01", icon:"🔍", title:"Assess",       desc:"Review current workflows and identify automation opportunities." },
        { num:"02", icon:"🗺️", title:"Design",       desc:"Map the ideal automated workflow and define triggers and actions." },
        { num:"03", icon:"⚙️", title:"Build",        desc:"Build and test the automation workflows." },
        { num:"04", icon:"🚀", title:"Launch",        desc:"Deploy automations with human oversight in place." },
        { num:"05", icon:"📊", title:"Monitor",       desc:"Track performance and catch any issues early." },
        { num:"06", icon:"🔄", title:"Optimise",      desc:"Continuously improve automations based on performance data." },
      ]}
      faqs={[
        { q:"Does AI automation replace my team?", a:"No. AI automation is designed to handle repetitive, high-volume tasks so your team can focus on higher-value conversations and decisions. Human oversight and judgment remain essential." },
        { q:"Can AI guarantee better marketing results?", a:"No. AI can improve efficiency and help process more data — but it does not guarantee specific marketing outcomes. Results depend on strategy, content quality and many other factors." },
        { q:"What platforms do you use for automation?", a:"Platform selection depends on your existing tech stack and requirements. We advise on the right tools during the initial consultation." },
        { q:"Is AI-generated content accurate?", a:"AI can assist with content drafts but requires human review for accuracy, tone and editorial quality. We recommend all AI-assisted content be reviewed before publication." },
        { q:"Can AI chatbots be integrated with WhatsApp?", a:"Yes. AI-powered chatbots can be integrated with WhatsApp Business API to handle initial enquiries and route conversations to human team members." },
        { q:"How do I get started with AI automation?", a:"The best starting point is a consultation to review your current workflows, identify the highest-impact automation opportunities and design a practical implementation plan." },
      ]}
      related={[
        { icon:"💬", label:"WhatsApp Marketing",  path:"/digital-marketing/whatsapp-marketing" },
        { icon:"📧", label:"Email Marketing",     path:"/digital-marketing/email-marketing" },
        { icon:"⚡", label:"Lead Generation",     path:"/digital-marketing/lead-generation" },
        { icon:"🔍", label:"SEO",                 path:"/digital-marketing/seo" },
        { icon:"🌐", label:"Technology",          path:"/technology" },
      ]}
      ctaTitle="Ready to Automate Your Marketing?"
      ctaDesc="Let's identify the right automation opportunities for your business and build workflows that save time and improve results."
    />
  );
}
