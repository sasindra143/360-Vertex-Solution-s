import DMServicePage from "../DMServicePage";

export default function GoogleAdsPage() {
  return (
    <DMServicePage
      eyebrow="Google Ads"
      title="Reach Customers When"
      titleHighlight="They're Searching."
      desc="Drive qualified traffic to your website through strategic paid search campaigns. We set up, manage and continuously optimize Google Ads campaigns aligned with your business goals."
      waMsg="Hello 360° Vertex Solutions, I would like to discuss Google Ads for my business."
      mailSubject="Google Ads Enquiry — 360° Vertex Solutions"
      ctaPath="/contact?service=google-ads"
      ctaLabel="Start Google Ads"
      services={[
        { icon:"🔍", title:"Search Ads", desc:"Appear at the top of Google search results when potential customers are looking for your services.", items:["Keyword strategy","Ad copy","Match types","Bidding strategy","Quality Score optimization"] },
        { icon:"🖥️", title:"Display Advertising", desc:"Reach your audience across the Google Display Network with visual ads.", items:["Audience targeting","Creative strategy","Placement management","Remarketing lists"] },
        { icon:"📈", title:"Performance Campaigns", desc:"Goal-oriented campaigns designed to drive specific conversion actions.", items:["Conversion tracking setup","Goal configuration","Campaign optimization","Performance analysis"] },
        { icon:"🔄", title:"Remarketing", desc:"Re-engage previous website visitors with relevant ads as they browse the web.", items:["Audience list creation","Ad creative","Frequency management","Conversion path analysis"] },
        { icon:"📊", title:"Conversion Tracking", desc:"Set up accurate tracking to measure the actions that matter to your business.", items:["Google Tag configuration","Conversion actions","Goal values","Attribution analysis"] },
        { icon:"📝", title:"Campaign Reporting", desc:"Regular, clear reports on campaign performance and spend efficiency.", items:["Spend & impressions","Clicks & conversions","CPC & ROAS","Recommendations"] },
      ]}
      process={[
        { num:"01", icon:"🔍", title:"Research",   desc:"Keyword research, competitor analysis and audience understanding." },
        { num:"02", icon:"🗺️", title:"Strategy",   desc:"Campaign structure, bidding approach and budget allocation." },
        { num:"03", icon:"⚙️", title:"Setup",      desc:"Campaign creation, ad copy, targeting and tracking configuration." },
        { num:"04", icon:"🚀", title:"Launch",     desc:"Campaigns go live with full tracking in place." },
        { num:"05", icon:"📊", title:"Measure",    desc:"Monitor performance data and identify optimizations." },
        { num:"06", icon:"🔄", title:"Optimize",   desc:"Continuously improve bids, copy, targeting and landing pages." },
      ]}
      faqs={[
        { q:"Do you guarantee leads or sales from Google Ads?", a:"No. We do not guarantee specific lead volumes, sales or revenue from paid advertising campaigns. Results depend on many factors including budget, market competitiveness, website quality and offer." },
        { q:"What budget do I need for Google Ads?", a:"Budget requirements vary significantly by industry, location and goals. We'll discuss a realistic budget range during the initial consultation based on your specific situation." },
        { q:"Do you create the ad copy?", a:"Yes. We develop ad copy as part of campaign setup and test multiple variations to identify what performs best." },
        { q:"What is conversion tracking?", a:"Conversion tracking records when a user completes a valuable action on your website — such as submitting a form, calling your number or completing a purchase — after clicking an ad." },
        { q:"How often will you report on campaign performance?", a:"We provide regular performance reports and are available to discuss results and strategy at any time." },
        { q:"Can you run Google Ads for a local business?", a:"Yes. Location targeting allows us to show ads only to users in specific geographic areas, making Google Ads suitable for local businesses." },
      ]}
      related={[
        { icon:"📊", label:"Analytics",          path:"/digital-marketing/analytics-reporting" },
        { icon:"📣", label:"Meta Ads",            path:"/digital-marketing/meta-ads" },
        { icon:"⚡", label:"Lead Generation",     path:"/digital-marketing/lead-generation" },
        { icon:"✍️", label:"Content Marketing",   path:"/digital-marketing/content-marketing" },
        { icon:"🔍", label:"SEO",                 path:"/digital-marketing/seo" },
      ]}
      ctaTitle="Ready to Start Advertising on Google?"
      ctaDesc="Let's discuss your business goals, audience and budget to design a Google Ads campaign that drives results."
    />
  );
}
