import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function RealEstateWebsitePage() {
  return (
    <WebDevServiceTemplate
      eyebrow="REAL ESTATE WEBSITE"
      serviceId="real-estate-website"
      title="Build a Better Property"
      titleHighlight="Search Experience."
      desc="Property listing portals, real estate agency websites, and broker platforms featuring interactive maps, property filtering, agent directories, and lead capture forms."
      targetUsers={[
        { icon: "🏡", title: "Real Estate Agencies", desc: "Brokers and property management firms showcasing sales, rentals, and commercial spaces." },
        { icon: "🏗️", title: "Property Developers", desc: "Builders promoting new residential townships, apartments, and commercial projects." },
        { icon: "🔑", title: "Individual Agents", desc: "Realtors building personal brand and capturing high-intent property buyer leads." }
      ]}
      features={[
        "Interactive Property Search & Filters (Location, Type, Price, BHK)", "Google Maps & Neighborhood Highlights", "Property Photo Galleries & Virtual Tours",
        "Agent Directory & Contact Profiles", "Instant Property Enquiry Lead Forms", "Saved Properties & Favorites List",
        "Mortgage & EMI Loan Calculator", "Admin Property Listing Management"
      ]}
      faqs={[
        { q: "Can buyers filter properties by budget and location?", a: "Yes, we include advanced multi-attribute filtering for location, property type, price range, bedrooms, amenities, and launch status." }
      ]}
      related={[
        { icon: "🏢", label: "Business Website", path: "/technology/web-development/business-website" },
        { icon: "📊", label: "Admin Dashboard", path: "/technology/web-development/admin-dashboard" }
      ]}
    />
  );
}
