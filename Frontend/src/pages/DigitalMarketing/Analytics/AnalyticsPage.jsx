import DMServicePage from "../DMServicePage";

export default function AnalyticsPage() {
  return (
    <DMServicePage
      eyebrow="Analytics & Reporting"
      title="Turn Marketing Data Into"
      titleHighlight="Better Decisions."
      desc="Set up, analyse and report on your marketing performance data. We help businesses understand what their numbers mean and use that understanding to make smarter marketing decisions."
      waMsg="Hello 360° Vertex Solutions, I would like to discuss marketing analytics for my business."
      mailSubject="Analytics Enquiry — 360° Vertex Solutions"
      ctaPath="/contact?service=analytics"
      ctaLabel="Discuss Analytics"
      services={[
        { icon:"📊", title:"Google Analytics Setup", desc:"Configure Google Analytics 4 to accurately track website traffic, user behaviour and conversions.", items:["GA4 setup & configuration","Event tracking","Conversion goals","E-commerce tracking where applicable","Data validation"] },
        { icon:"🔍", title:"Search Console", desc:"Monitor organic search performance and identify technical issues through Google Search Console.", items:["Impressions & clicks","Query performance","Index coverage","Core Web Vitals","Sitemap submission"] },
        { icon:"📣", title:"Campaign Analytics", desc:"Track and analyse the performance of paid advertising and social media campaigns.", items:["Multi-channel tracking","UTM parameter setup","Attribution analysis","Campaign comparison"] },
        { icon:"🎯", title:"Conversion Tracking", desc:"Set up tracking for the specific actions that represent value to your business.", items:["Goal configuration","Form submissions","Phone calls","Purchases","Custom events"] },
        { icon:"📋", title:"Dashboard Creation", desc:"Build clear, accessible dashboards that surface the metrics that matter most.", items:["Data Studio / Looker Studio","Custom dashboards","KPI reporting","Scheduled delivery"] },
        { icon:"📈", title:"Monthly Reporting", desc:"Regular performance reports with data context, observations and recommendations.", items:["Traffic trends","Campaign performance","Conversion data","Observations","Next priorities"] },
      ]}
      process={[
        { num:"01", icon:"🔍", title:"Audit",         desc:"Review existing tracking setup and identify gaps." },
        { num:"02", icon:"⚙️", title:"Configure",     desc:"Set up or fix analytics and tracking tools." },
        { num:"03", icon:"🎯", title:"Goals",          desc:"Define what success looks like and configure conversion tracking." },
        { num:"04", icon:"📋", title:"Dashboard",     desc:"Build reporting dashboards tailored to your business." },
        { num:"05", icon:"📊", title:"Analyse",       desc:"Review data and identify patterns and opportunities." },
        { num:"06", icon:"📝", title:"Report",        desc:"Deliver clear, actionable performance reports." },
      ]}
      faqs={[
        { q:"What analytics tools do you use?", a:"We primarily use Google Analytics 4, Google Search Console, Google Business Profile Insights and Google Looker Studio for reporting. For paid campaigns, we use platform-native analytics from Meta, Google Ads and others." },
        { q:"Can you fix existing tracking issues?", a:"Yes. A common part of analytics work is auditing and correcting existing tracking setups that have gaps, errors or misconfigured goals." },
        { q:"What is UTM tracking?", a:"UTM parameters are tags added to URLs that allow analytics platforms to identify the source, medium and campaign of traffic. They are essential for understanding which marketing channels are driving results." },
        { q:"Do you show only real data in reports?", a:"Yes. All reports reflect real measured data. We do not present fabricated metrics or cherry-picked numbers." },
        { q:"Can I access my own data?", a:"Yes. We configure analytics in your own accounts so you have full access and ownership of your data at all times." },
        { q:"What does a monthly report include?", a:"A typical monthly report covers traffic trends, top sources, campaign performance, conversion data, key observations and recommended next steps." },
      ]}
      related={[
        { icon:"🔍", label:"SEO",               path:"/digital-marketing/seo" },
        { icon:"🔍", label:"Google Ads",         path:"/digital-marketing/google-ads" },
        { icon:"📣", label:"Meta Ads",            path:"/digital-marketing/meta-ads" },
        { icon:"⚡", label:"Lead Generation",    path:"/digital-marketing/lead-generation" },
        { icon:"🤖", label:"AI Automation",      path:"/digital-marketing/ai-automation" },
      ]}
      ctaTitle="Ready to Understand Your Marketing Data?"
      ctaDesc="Let's set up proper tracking and build a reporting system that helps you make better decisions."
    />
  );
}
