import DMServicePage from "../DMServicePage";

export default function SocialMediaPage() {
  return (
    <DMServicePage
      eyebrow="Social Media"
      title="Build a Stronger"
      titleHighlight="Social Presence."
      desc="Develop a consistent, engaging social media presence across the platforms that matter for your business. We help you plan, create and manage content that connects with your audience."
      waMsg="Hello 360° Vertex Solutions, I would like to discuss social media marketing."
      mailSubject="Social Media Enquiry — 360° Vertex Solutions"
      ctaPath="/contact?service=social-media"
      ctaLabel="Grow My Social Media"
      services={[
        { icon:"📅", title:"Content Planning", desc:"Develop a structured content calendar aligned with your business goals and audience.", items:["Monthly content calendar","Content pillars","Topic planning","Platform-specific strategy"] },
        { icon:"🎬", title:"Reels & Video Content", desc:"Short-form video content designed for Instagram Reels, Facebook Reels and YouTube Shorts.", items:["Video scripting","Content direction","Caption writing","Hashtag strategy"] },
        { icon:"🖼️", title:"Posts & Carousels", desc:"Static posts, carousels and infographics that inform and engage your audience.", items:["Design direction","Copywriting","Brand consistency","Engagement optimization"] },
        { icon:"📖", title:"Stories", desc:"Time-sensitive story content that keeps your audience engaged daily.", items:["Story concepts","Interactive elements","Polls & questions","Story sequences"] },
        { icon:"💬", title:"Community Management", desc:"Monitor and respond to comments, messages and mentions on social platforms.", items:["Comment responses","Message management","Brand voice consistency","Escalation process"] },
        { icon:"📊", title:"Social Analytics", desc:"Track reach, engagement and audience growth to understand what content performs best.", items:["Reach & impressions","Engagement rate","Follower growth","Content performance"] },
      ]}
      process={[
        { num:"01", icon:"🔍", title:"Research",    desc:"Understand your audience, competitors and platform opportunities." },
        { num:"02", icon:"📅", title:"Plan",        desc:"Develop content strategy and monthly content calendar." },
        { num:"03", icon:"🎨", title:"Create",      desc:"Produce content assets aligned with brand and strategy." },
        { num:"04", icon:"🚀", title:"Publish",     desc:"Schedule and publish content at optimal times." },
        { num:"05", icon:"💬", title:"Engage",      desc:"Monitor and respond to audience interactions." },
        { num:"06", icon:"📊", title:"Analyse",     desc:"Review performance data and refine the strategy." },
      ]}
      faqs={[
        { q:"Which social media platforms do you work with?", a:"We primarily work with Instagram, Facebook, LinkedIn and YouTube. Platform selection depends on where your target audience is most active." },
        { q:"Do you create the content?", a:"We provide content strategy, direction and planning. Content creation services (design, video production) are discussed based on scope and requirements." },
        { q:"How often should I post?", a:"Posting frequency depends on the platform and audience. Consistency matters more than volume. We'll recommend an appropriate frequency based on your goals and resources." },
        { q:"Can social media guarantee followers or engagement?", a:"No. Organic social media growth depends on content quality, consistency, audience relevance and platform algorithms — all of which we can optimise, but cannot control absolutely." },
        { q:"Do you run paid social media campaigns?", a:"Organic social media management and paid advertising (Meta Ads) are separate services. See our Meta Ads service for paid social campaigns." },
        { q:"How do you measure social media success?", a:"We track reach, impressions, engagement rate, follower growth, click-through rates and other platform-specific metrics relevant to your goals." },
      ]}
      related={[
        { icon:"📣", label:"Meta Ads",            path:"/digital-marketing/meta-ads" },
        { icon:"✍️", label:"Content Marketing",   path:"/digital-marketing/content-marketing" },
        { icon:"🎨", label:"Branding & Creative",  path:"/digital-marketing/branding-creative" },
        { icon:"⚡", label:"Lead Generation",      path:"/digital-marketing/lead-generation" },
        { icon:"💬", label:"WhatsApp Marketing",   path:"/digital-marketing/whatsapp-marketing" },
      ]}
      ctaTitle="Ready to Build Your Social Presence?"
      ctaDesc="Let's understand your audience and business and create a social media strategy that works."
    />
  );
}
