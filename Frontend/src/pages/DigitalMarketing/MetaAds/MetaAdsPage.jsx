import DMServicePage from "../DMServicePage";

export default function MetaAdsPage() {
  return (
    <DMServicePage
      eyebrow="Meta Ads"
      title="Reach the Right Audience on"
      titleHighlight="Social Platforms."
      desc="Run effective advertising campaigns on Facebook and Instagram. We design, launch and optimize Meta ad campaigns to help you reach your target audience and drive meaningful business outcomes."
      waMsg="Hello 360° Vertex Solutions, I would like to discuss Meta Ads for my business."
      mailSubject="Meta Ads Enquiry — 360° Vertex Solutions"
      ctaPath="/contact?service=meta-ads"
      ctaLabel="Start Meta Ads"
      services={[
        { icon:"🎯", title:"Campaign Strategy", desc:"Design a campaign structure aligned with your marketing objectives and target audience.", items:["Objective setting","Campaign structure","Budget planning","Audience strategy"] },
        { icon:"👥", title:"Audience Research", desc:"Identify and build audience segments based on demographics, interests and behaviours.", items:["Custom audiences","Lookalike audiences","Interest targeting","Behavioural targeting","Retargeting audiences"] },
        { icon:"🎨", title:"Creative Strategy", desc:"Develop ad creative direction that communicates clearly and drives engagement.", items:["Ad format selection","Copy strategy","Visual guidelines","A/B testing plan"] },
        { icon:"⚙️", title:"Campaign Setup", desc:"Technical setup of campaigns, ad sets and ads with correct tracking in place.", items:["Meta Pixel / Conversions API","Event tracking","Campaign configuration","Ad set targeting"] },
        { icon:"🧪", title:"Testing & Optimization", desc:"Systematic testing of creative, audiences and placements to improve performance over time.", items:["Creative testing","Audience testing","Placement testing","Budget optimization"] },
        { icon:"📊", title:"Performance Reporting", desc:"Regular, transparent reporting on what the data shows and recommended next steps.", items:["Reach & impressions","Clicks & conversions","Spend efficiency","Optimization recommendations"] },
      ]}
      process={[
        { num:"01", icon:"🎯", title:"Objective",  desc:"Define campaign goals and key performance indicators." },
        { num:"02", icon:"👥", title:"Audience",   desc:"Research and build audience segments." },
        { num:"03", icon:"🎨", title:"Creative",   desc:"Develop ad copy and creative direction." },
        { num:"04", icon:"⚙️", title:"Setup",     desc:"Configure campaigns with tracking and targeting." },
        { num:"05", icon:"🚀", title:"Launch",     desc:"Campaigns go live with monitoring in place." },
        { num:"06", icon:"🔄", title:"Optimize",   desc:"Continuously test and improve based on performance data." },
      ]}
      faqs={[
        { q:"Do you guarantee results from Meta Ads?", a:"No. We do not guarantee specific lead volumes, conversions or revenue from paid social campaigns. Performance depends on many factors including budget, creative quality, offer, audience and market conditions." },
        { q:"Which platforms do Meta Ads cover?", a:"Meta Ads runs across Facebook, Instagram, Audience Network and Messenger placements." },
        { q:"What is Meta Pixel?", a:"Meta Pixel is a tracking code installed on your website that allows Meta to track user actions, measure conversions and optimize campaigns based on real purchase or lead data." },
        { q:"Do you handle the ad creative?", a:"We provide creative strategy and direction. We can work with your existing assets or advise on what creative to produce." },
        { q:"What budget is recommended?", a:"Meta Ads budgets vary widely by industry and objectives. We'll discuss a realistic starting budget during the initial consultation." },
        { q:"Can Meta Ads be used for local businesses?", a:"Yes. Location targeting allows ads to be shown to users within a specific radius or region, making them suitable for local businesses." },
      ]}
      related={[
        { icon:"📊", label:"Analytics",          path:"/digital-marketing/analytics-reporting" },
        { icon:"🔍", label:"Google Ads",          path:"/digital-marketing/google-ads" },
        { icon:"⚡", label:"Lead Generation",     path:"/digital-marketing/lead-generation" },
        { icon:"📱", label:"Social Media",        path:"/digital-marketing/social-media" },
        { icon:"🎨", label:"Branding",            path:"/digital-marketing/branding-creative" },
      ]}
      ctaTitle="Ready to Grow Your Social Advertising?"
      ctaDesc="Let's understand your audience and business goals and design an effective Meta Ads strategy."
    />
  );
}
