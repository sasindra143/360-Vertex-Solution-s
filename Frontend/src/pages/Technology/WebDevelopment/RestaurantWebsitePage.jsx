import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function RestaurantWebsitePage() {
  return (
    <WebDevServiceTemplate
      eyebrow="RESTAURANT WEBSITE"
      serviceId="restaurant-website"
      title="Bring Your Restaurant"
      titleHighlight="Online."
      desc="Digital food menus, online table reservations, direct food ordering portals, customer reviews, and location maps for restaurants, cafes, and food brands."
      targetUsers={[
        { icon: "🍽️", title: "Restaurants & Fine Dining", desc: "Showcase signature menus, ambiance photos, chef specials, and table booking." },
        { icon: "☕", title: "Cafes & Bakeries", desc: "Display daily specials, takeout options, and direct WhatsApp food ordering." },
        { icon: "📦", title: "Cloud Kitchens & D2C", desc: "Accept direct food orders without paying high aggregator commission fees." }
      ]}
      features={[
        "Interactive Digital Food Menu with Photos", "Online Table Reservation System", "Direct Online Food Ordering & Cart",
        "Google Maps Location & Directions", "WhatsApp One-Tap Food Ordering", "Special Offers & Combo Banners",
        "Customer Reviews & Social Feed", "Admin Menu & Order Dashboard"
      ]}
      faqs={[
        { q: "Can customers order food directly via WhatsApp?", a: "Yes, we integrate direct WhatsApp cart ordering so customers can place orders straight to your restaurant's WhatsApp phone." }
      ]}
      related={[
        { icon: "🛒", label: "E-Commerce Website", path: "/technology/web-development/ecommerce-website" },
        { icon: "📅", label: "Booking Website", path: "/technology/web-development/booking-website" }
      ]}
    />
  );
}
