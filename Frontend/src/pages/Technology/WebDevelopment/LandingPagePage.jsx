import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function LandingPagePage() {
  return (
    <WebDevServiceTemplate
      eyebrow="LANDING PAGE"
      serviceId="landing-page"
      title="Landing Pages Built"
      titleHighlight="to Drive Action."
      desc="High-conversion, ultra-fast single page websites engineered specifically for marketing campaigns, product launches, event signups, Google Ads, and lead generation."
      targetUsers={[
        { icon: "📣", title: "Ad Campaign Managers", desc: "Convert Google Ads, Meta Ads, and social traffic into qualified leads with zero distraction." },
        { icon: "🚀", title: "Product & SaaS Launch", desc: "Introduce new products, capture waitlist signups, and validate business ideas fast." },
        { icon: "🎓", title: "Event & Webinar Hosts", desc: "Drive registrations for workshops, bootcamps, masterclasses, and conferences." },
        { icon: "⚡", title: "Lead Generation Firms", desc: "Maximize conversion rate per click with streamlined forms and instant WhatsApp triggers." }
      ]}
      features={[
        "Sub-1-Second Lightning Load Speed", "Above-The-Fold Value Headline & CTA", "Problem & Solution Breakdown Cards",
        "Key Benefits & Unique Value Spec", "Social Proof, Testimonials & Trust Badges", "Interactive Pricing & Offer Calculator",
        "Instant Lead Capture Form", "One-Tap WhatsApp Direct Connect", "Accordion FAQ for Objection Handling",
        "Google Tag Manager & Meta Pixel Integration", "A/B Testing Ready Architecture", "Mobile First Touch Interface"
      ]}
      faqs={[
        { q: "Why should I use a dedicated landing page instead of my main website?", a: "Dedicated landing pages focus on a single action (buying, signing up, or calling), removing navigation clutter to dramatically boost conversion rates." },
        { q: "Can we track conversions from Facebook and Google Ads?", a: "Yes, we integrate Google Tag Manager, GA4, Meta Pixel, and conversion API events by default." }
      ]}
      related={[
        { icon: "🏢", label: "Business Website", path: "/technology/web-development/business-website" },
        { icon: "🛒", label: "E-Commerce Website", path: "/technology/web-development/ecommerce-website" },
        { icon: "📅", label: "Booking Website", path: "/technology/web-development/booking-website" },
        { icon: "🔄", label: "Website Redesign", path: "/technology/web-development/website-redesign" }
      ]}
    />
  );
}
