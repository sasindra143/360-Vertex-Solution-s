import DMServicePage from "../DMServicePage";

export default function GBPPage() {
  return (
    <DMServicePage
      eyebrow="Google Business Profile"
      title="Make Your Local Business"
      titleHighlight="Easier to Discover."
      desc="Optimize your Google Business Profile to improve your visibility in local search results and Google Maps. A complete, well-managed profile helps potential customers find, understand and contact your business."
      waMsg="Hello 360° Vertex Solutions, I would like to discuss Google Business Profile optimization."
      mailSubject="Google Business Profile Enquiry — 360° Vertex Solutions"
      ctaPath="/contact?service=google-business-profile"
      ctaLabel="Optimize My Business Profile"
      services={[
        { icon:"🏢", title:"Profile Optimization", desc:"Complete and optimize every section of your Google Business Profile for maximum visibility.", items:["Business name & category","Contact information","Opening hours","Service areas","Description"] },
        { icon:"🗂️", title:"Categories & Services", desc:"Select the right primary and secondary categories and list your services accurately.", items:["Primary category","Secondary categories","Service list","Service descriptions","Product catalog"] },
        { icon:"📸", title:"Photos & Visual Content", desc:"Upload high-quality photos that represent your business accurately.", items:["Business exterior","Interior photos","Product/service photos","Team photos","Photo guidelines"] },
        { icon:"📝", title:"Google Posts", desc:"Regular posts to keep your profile active and share updates, offers and events.", items:["What's new posts","Offer posts","Event posts","Product posts","Posting schedule"] },
        { icon:"⭐", title:"Review Guidance", desc:"Ethical guidance on generating more genuine reviews and managing your online reputation.", items:["Review request process","Response templates","Negative review handling","Review monitoring","Platform policy compliance"] },
        { icon:"📊", title:"Performance Monitoring", desc:"Track profile views, search queries, customer actions and local search performance.", items:["Search impressions","Customer actions","Direction requests","Phone calls","Review analytics"] },
      ]}
      process={[
        { num:"01", icon:"🔍", title:"Audit",       desc:"Review the current profile completeness and accuracy." },
        { num:"02", icon:"⚙️", title:"Optimize",    desc:"Complete and improve every section of the profile." },
        { num:"03", icon:"📸", title:"Visuals",     desc:"Add or update photos and visual content." },
        { num:"04", icon:"📝", title:"Posts",       desc:"Set up a regular posting schedule." },
        { num:"05", icon:"⭐", title:"Reviews",     desc:"Implement an ethical review generation strategy." },
        { num:"06", icon:"📊", title:"Monitor",     desc:"Track profile performance and make ongoing improvements." },
      ]}
      faqs={[
        { q:"What is Google Business Profile?", a:"Google Business Profile (GBP) is a free tool from Google that allows businesses to appear in Google Search and Maps. A complete and optimized profile shows important business information to potential customers searching locally." },
        { q:"Is Google Business Profile free?", a:"Yes. Creating and managing a Google Business Profile is free. Some features and advertising options may have associated costs." },
        { q:"Do you guarantee local search rankings?", a:"No. We do not guarantee specific positions in Google local search results. We focus on making the profile as complete, accurate and relevant as possible." },
        { q:"What types of businesses can use GBP?", a:"Most businesses with a physical location or a defined service area can use Google Business Profile. This includes retail shops, restaurants, service businesses, training institutes, professional services and more." },
        { q:"How do you handle negative reviews?", a:"We advise on professional, constructive responses to negative reviews. We do not remove or fabricate reviews, as this violates Google's policies." },
        { q:"How often should I post on GBP?", a:"Regular posts — at least weekly or fortnightly — keep the profile active and signal to Google that the business is active and engaged." },
      ]}
      related={[
        { icon:"📍", label:"Local SEO",          path:"/digital-marketing/local-seo" },
        { icon:"🔍", label:"SEO",                path:"/digital-marketing/seo" },
        { icon:"✍️", label:"Content Marketing",  path:"/digital-marketing/content-marketing" },
        { icon:"📊", label:"Analytics",          path:"/digital-marketing/analytics-reporting" },
        { icon:"🎨", label:"Branding",           path:"/digital-marketing/branding-creative" },
      ]}
      ctaTitle="Ready to Optimize Your Business Profile?"
      ctaDesc="Let's review your Google Business Profile and create a plan to improve your local search visibility."
    />
  );
}
