import DMServicePage from "../DMServicePage";

export default function WhatsAppMarketingPage() {
  return (
    <DMServicePage
      eyebrow="WhatsApp Marketing"
      title="Connect With Customers Where"
      titleHighlight="Conversations Happen."
      desc="Use WhatsApp as a professional, consent-based communication channel to engage customers, share updates and support your lead follow-up process. All campaigns follow WhatsApp / Meta policies and applicable consent requirements."
      waMsg="Hello 360° Vertex Solutions, I would like to discuss WhatsApp marketing for my business."
      mailSubject="WhatsApp Marketing Enquiry — 360° Vertex Solutions"
      ctaPath="/contact?service=whatsapp-marketing"
      ctaLabel="Start WhatsApp Marketing"
      services={[
        { icon:"📢", title:"WhatsApp Campaigns", desc:"Plan and send relevant, consent-based messages to opted-in contacts.", items:["Campaign planning","Message templates","Audience segmentation","Scheduling","Opt-in compliance"] },
        { icon:"🔔", title:"Customer Notifications", desc:"Send timely, relevant notifications to keep customers informed.", items:["Order updates","Appointment reminders","Service notifications","Event alerts"] },
        { icon:"🔄", title:"Lead Follow-up Workflows", desc:"Structured WhatsApp follow-up for new leads captured through your website or campaigns.", items:["First response message","Follow-up sequence","Qualification questions","CRM connection"] },
        { icon:"🤖", title:"Automated Responses", desc:"Set up basic automated responses for common questions and initial enquiries.", items:["FAQ automation","Out-of-hours responses","Welcome messages","Quick reply setup"] },
        { icon:"🛒", title:"Catalog & Product Communication", desc:"Share product information, pricing and service details via WhatsApp catalog or messages.", items:["Product catalog setup","Pricing communication","Service descriptions","Order queries"] },
        { icon:"⚙️", title:"CRM Integration", desc:"Connect WhatsApp conversations and leads to your CRM or contact management system.", items:["Contact sync","Lead capture","Conversation history","Team routing"] },
      ]}
      process={[
        { num:"01", icon:"✅", title:"Opt-in Setup",   desc:"Establish compliant opt-in mechanisms for your contact list." },
        { num:"02", icon:"📋", title:"Strategy",       desc:"Define communication objectives and message types." },
        { num:"03", icon:"📝", title:"Templates",      desc:"Create approved message templates for campaigns and automation." },
        { num:"04", icon:"⚙️", title:"Automation",   desc:"Set up automated workflows for lead follow-up and notifications." },
        { num:"05", icon:"📢", title:"Campaigns",     desc:"Execute planned campaigns to opted-in contacts." },
        { num:"06", icon:"📊", title:"Measure",       desc:"Track open rates, responses and lead quality." },
      ]}
      faqs={[
        { q:"Is WhatsApp marketing compliant?", a:"We design WhatsApp marketing workflows that follow WhatsApp / Meta's policies and applicable data protection and consent requirements. We do not design spam workflows or message users who have not opted in." },
        { q:"Do I need WhatsApp Business API?", a:"WhatsApp Business API is required for higher volume campaigns and certain automation features. For smaller businesses, WhatsApp Business app may be sufficient. We'll advise based on your needs." },
        { q:"Can WhatsApp marketing be automated?", a:"Yes. WhatsApp automation can handle first responses, follow-up sequences, FAQ answers and lead qualification — while human team members handle more complex conversations." },
        { q:"How do I build a WhatsApp contact list?", a:"Contact lists must be built with explicit consent. Common methods include opt-in forms, click-to-WhatsApp buttons on your website or ads, and in-store sign-up." },
        { q:"Can WhatsApp be integrated with a CRM?", a:"Yes. WhatsApp can be integrated with many CRM systems to capture leads, log conversations and route enquiries to the right team member." },
        { q:"Is WhatsApp Marketing right for my business?", a:"WhatsApp is most effective for businesses with a direct relationship with their customers — such as service providers, local businesses, e-commerce and training institutes. We'll advise on fit during consultation." },
      ]}
      related={[
        { icon:"📧", label:"Email Marketing",    path:"/digital-marketing/email-marketing" },
        { icon:"⚡", label:"Lead Generation",    path:"/digital-marketing/lead-generation" },
        { icon:"🤖", label:"AI Automation",      path:"/digital-marketing/ai-automation" },
        { icon:"📱", label:"Social Media",       path:"/digital-marketing/social-media" },
        { icon:"📊", label:"Analytics",          path:"/digital-marketing/analytics-reporting" },
      ]}
      ctaTitle="Ready to Start WhatsApp Marketing?"
      ctaDesc="Let's discuss how WhatsApp can support your customer communication and lead follow-up process."
    />
  );
}
