// ============================================================
// 360° VERTEX SOLUTIONS — CENTRAL CONFIGURATION
// Update values here to change across the entire website
// ============================================================

export const COMPANY = {
  name: "360° Vertex Solutions",
  tagline: "Your Vision. Your Skills. Your Future.",
  positioning: "One brand. Two pathways. Complete digital solutions.",
  phone: "+91 9959732476",
  phoneRaw: "919959732476",
  whatsappPhone: "+91 8074286041",
  email: "vertex360solutions@gmail.com",
  whatsapp: "918074286041",
  whatsappMessage: "Hello 360° Vertex Solutions, I would like to discuss a requirement with your team.",
  logo: "https://res.cloudinary.com/dvknx0hpm/image/upload/v1789818578/WhatsApp_Image_2026-09-19_at_10.44.11-removebg-preview_vzg736.png",
  copyright: "© 2026 360° Vertex Solutions. All Rights Reserved.",
};

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/sasindra-madduri",
  instagram: "https://www.instagram.com/vertex_solutions_360?srtk=MTRpY3ZqNzZnNWRpbw==",
  youtube: "https://youtube.com/@vertexsolutions360?si=Aay_oKz1Y7062Gdj",
  telegram: "",       // Add Telegram URL when available
  whatsapp: `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMessage)}`,
};

export const LINKS = {
  buildWithUs: "/contact",
  getStarted: "/contact",
  exploreAcademy: "/academy",
  digitalMarketing: "/digital-marketing",
  technology: "/technology",
  careerJobs: "/career-jobs",
  testimonials: "/testimonials",
  about: "/about",
  contact: "/contact",
};

// WhatsApp CTA helper
export function waLink(msg = COMPANY.whatsappMessage) {
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`;
}

// Phone link helper
export const telLink = `tel:+${COMPANY.phoneRaw}`;

// Email link helper
export const mailLink = `mailto:${COMPANY.email}`;
