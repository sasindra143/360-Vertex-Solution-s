import {
  Building2,
  ShoppingCart,
  Globe,        // ✅ FIXED (replaced Wordmark)
  Layers,
  LayoutTemplate,
  RefreshCcw,
} from "lucide-react";

const servicesData = [
  {
    title: "Business Websites",
    desc:
      "Professional websites to establish your online presence. Corporate sites, portfolios, and service pages optimized for speed, SEO, and conversions.",
    icon: Building2,
    tags: ["Corporate", "Portfolio", "Services"],
    color: "blue",
  },
  {
    title: "E-commerce Development",
    desc:
      "Complete online stores with Razorpay, Stripe & PayU payments, inventory control, shipping integration, and customer dashboards.",
    icon: ShoppingCart,
    tags: ["Online Store", "Payments", "Shipping"],
    color: "green",
  },
  {
    title: "WordPress Development",
    desc:
      "Custom WordPress websites built from scratch. SEO configured, secure admin panel, fast loading, and fully self-managed.",
    icon: Globe,               // ✅ FIXED
    tags: ["Custom Theme", "SEO Ready", "Self-Managed"],
    color: "cyan",
  },
  {
    title: "Web Applications",
    desc:
      "Scalable web applications like CRM systems, booking platforms, admin dashboards using React, Node, and Laravel.",
    icon: Layers,
    tags: ["CRM", "Portals", "Dashboards"],
    color: "purple",
  },
  {
    title: "Landing Pages",
    desc:
      "High-converting landing pages for Google Ads & Facebook Ads. Built for speed, lead capture, and A/B testing.",
    icon: LayoutTemplate,
    tags: ["PPC Ready", "Lead Gen", "A/B Testing"],
    color: "orange",
  },
  {
    title: "Website Redesign",
    desc:
      "Redesign outdated websites into modern, fast, SEO-optimized experiences without traffic or ranking loss.",
    icon: RefreshCcw,
    tags: ["Modern UI", "Speed Up", "SEO Safe"],
    color: "pink",
  },
];

export default servicesData;
