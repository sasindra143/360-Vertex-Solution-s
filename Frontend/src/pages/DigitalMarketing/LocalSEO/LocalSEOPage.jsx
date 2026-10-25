import DMServicePage from "../DMServicePage";

export default function LocalSEOPage() {
  return (
    <DMServicePage
      eyebrow="Local SEO"
      title="Get Found by Customers"
      titleHighlight="Near You."
      desc="Improve your business's visibility in location-based searches. We help local businesses, service providers and training institutes get discovered by nearby customers."
      waMsg="Hello 360° Vertex Solutions, I would like to discuss Local SEO services for my business."
      mailSubject="Local SEO Enquiry — 360° Vertex Solutions"
      ctaPath="/contact?service=local-seo"
      ctaLabel="Improve Local Visibility"
      services={[
        { icon:"📍", title:"Google Business Profile", desc:"Optimize your GBP listing with accurate information, categories, photos, posts and services.", items:["Business information","Categories & services","Photo optimization","Posts & updates","Q&A management"] },
        { icon:"🔑", title:"Local Keyword Research", desc:"Identify location-based search terms your target customers are using.", items:["Location + service keywords","Nearby area terms","Competitor keyword analysis","Search intent mapping"] },
        { icon:"🗺️", title:"Location Pages", desc:"Create dedicated pages for each service area to improve local relevance.", items:["Service area pages","Location-specific content","Local schema markup","Internal linking"] },
        { icon:"📝", title:"Local Content", desc:"Develop content relevant to your local audience and service area.", items:["Local blog content","Community content","Area-specific guides","Local news relevance"] },
        { icon:"⭐", title:"Review Strategy Guidance", desc:"Guidance on ethical approaches to generating and managing customer reviews.", items:["Review request process","Response best practices","Platform guidance","Reputation monitoring"] },
        { icon:"🔗", title:"NAP Consistency", desc:"Ensure your Name, Address and Phone number are consistent across all online listings.", items:["Citation audit","Directory cleanup","Consistent formatting","Citation building"] },
        { icon:"📊", title:"Local Analytics", desc:"Track local search performance using Google Business Profile Insights and Search Console.", items:["Local search impressions","Direction requests","Phone calls","Website visits from local"] },
        { icon:"🏷️", title:"Local Structured Data", desc:"Implement LocalBusiness schema and other appropriate structured data.", items:["LocalBusiness schema","Opening hours","Service areas","Review schema where appropriate"] },
      ]}
      process={[
        { num:"01", icon:"🔍", title:"Local Audit",      desc:"Analyse current local search presence and Google Business Profile." },
        { num:"02", icon:"🔑", title:"Research",         desc:"Identify local keywords, competitors and search behaviour." },
        { num:"03", icon:"📍", title:"Optimize",         desc:"Improve GBP, location pages and on-site local signals." },
        { num:"04", icon:"📝", title:"Content",          desc:"Create relevant local content for the service area." },
        { num:"05", icon:"🔗", title:"Citations",        desc:"Build consistent citations and NAP across key directories." },
        { num:"06", icon:"📊", title:"Monitor",          desc:"Track local visibility, GBP performance and improvements." },
      ]}
      faqs={[
        { q:"What is Local SEO?", a:"Local SEO is the process of improving a business's visibility in location-based searches on search engines and maps. It involves optimizing your Google Business Profile, website content, local citations and reviews to help nearby customers find your business." },
        { q:"Do you guarantee local pack rankings?", a:"No. We do not guarantee specific positions in local search results or the Google Map Pack. Search rankings are determined by search engines based on many factors. We focus on improving the quality and completeness of local signals." },
        { q:"What is Google Business Profile?", a:"Google Business Profile (formerly Google My Business) is a free business listing from Google that allows businesses to appear in Google Maps and local search results. A complete and optimized profile can improve local visibility." },
        { q:"How long does local SEO take?", a:"Local SEO improvements can sometimes show results faster than broader SEO — typically within 2–4 months — but this varies depending on competition, the current state of the listing and the work involved." },
        { q:"Do you work with service businesses?", a:"Yes. We work with local businesses, service providers, restaurants, training institutes, professional services, retail businesses and others who serve customers in specific locations." },
        { q:"Can you help with review management?", a:"We provide guidance on ethical review generation and response strategies. We do not use fake reviews or review manipulation tactics." },
      ]}
      related={[
        { icon:"🔍", label:"SEO",              path:"/digital-marketing/seo" },
        { icon:"🏢", label:"Google Business", path:"/digital-marketing/google-business-profile" },
        { icon:"✍️", label:"Content Marketing",path:"/digital-marketing/content-marketing" },
        { icon:"📊", label:"Analytics",        path:"/digital-marketing/analytics-reporting" },
        { icon:"🌐", label:"Web Development",  path:"/technology" },
      ]}
      ctaTitle="Ready to Improve Your Local Visibility?"
      ctaDesc="Let's review your current local search presence and build a practical strategy to get found by more local customers."
    />
  );
}
