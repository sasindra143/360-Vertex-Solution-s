import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function EcommerceWebsitePage() {
  return (
    <WebDevServiceTemplate
      eyebrow="E-COMMERCE WEBSITE"
      serviceId="ecommerce-website"
      title="Build Your Complete"
      titleHighlight="Online Store."
      desc="Feature-rich, scalable e-commerce platforms with product catalogs, shopping cart, secure payment gateways, inventory management, and customer dashboards."
      targetUsers={[
        { icon: "🛍️", title: "Fashion & Retail Brands", desc: "D2C apparel, footwear, and accessory stores seeking premium online storefronts." },
        { icon: "🔌", title: "Electronics & Tech", desc: "Gadget shops requiring complex specifications, variants, and product comparison tools." },
        { icon: "🍲", title: "Food & Grocery Stores", desc: "Local food vendors offering online ordering, delivery scheduling, and subscriptions." },
        { icon: "💄", title: "Beauty & Lifestyle", desc: "Cosmetics, skincare, and wellness brands building customer loyalty and re-orders." }
      ]}
      features={[
        "Interactive Product Catalog & Categories", "Real-Time Product Search & Filtering", "Shopping Cart & Wishlist System",
        "Multi-Gateway Checkout (Razorpay / Stripe)", "Order Tracking & History Dashboard", "Discount Coupon & Promo Engine",
        "Product Reviews & Customer Ratings", "Inventory & Stock Control System", "Customer Account Management",
        "Automated Order Email & WhatsApp Alerts", "Sales Analytics & Revenue Reports", "Admin Management Panel"
      ]}
      faqs={[
        { q: "Which payment gateways do you integrate?", a: "We integrate Razorpay, Stripe, Paytm, UPI, PhonePe, credit/debit cards, and Cash on Delivery (COD) options." },
        { q: "Can the online store handle thousands of products?", a: "Yes, our database architecture (MySQL / PostgreSQL / MongoDB) and CDN image optimization ensure ultra-fast catalog loading regardless of product volume." }
      ]}
      related={[
        { icon: "🏢", label: "Business Website", path: "/technology/web-development/business-website" },
        { icon: "⚙️", label: "Web Application", path: "/technology/web-development/web-application" },
        { icon: "📊", label: "Admin Dashboard", path: "/technology/web-development/admin-dashboard" },
        { icon: "⚡", label: "Full Stack App", path: "/technology/web-development/full-stack-development" }
      ]}
    />
  );
}
