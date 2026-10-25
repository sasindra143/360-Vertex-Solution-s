import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function BookingWebsitePage() {
  return (
    <WebDevServiceTemplate
      eyebrow="BOOKING WEBSITE"
      serviceId="booking-website"
      title="Make Online Booking"
      titleHighlight="Simple & Automated."
      desc="Automated appointment scheduling, calendar availability management, online reservation systems, and instant booking confirmation platforms."
      targetUsers={[
        { icon: "🩺", title: "Medical & Clinics", desc: "Doctors, dentists, and health clinics scheduling patient consultations." },
        { icon: "🏨", title: "Hotels & Stays", desc: "Resorts, homestays, and venues managing room availability and online deposits." },
        { icon: "👔", title: "Consultants & Coaches", desc: "Advisors, tutors, and trainers accepting paid 1-on-1 advisory sessions." },
        { icon: "✂️", title: "Salons & Spas", desc: "Beauty parlors, spas, and wellness centers taking slot reservations." }
      ]}
      features={[
        "Interactive Calendar & Slot Availability", "Real-Time Booking & Deposit Payment", "Automated SMS / Email / WhatsApp Confirmation",
        "Customer Account & Booking Management", "Staff Member / Resource Assignment", "Cancellation & Rescheduling Rules",
        "Google Calendar & iCal Sync", "Admin Booking Management Dashboard"
      ]}
      faqs={[
        { q: "Can customers pay online when booking a slot?", a: "Yes, we integrate Razorpay, Stripe, and UPI for instant slot confirmation payments." }
      ]}
      related={[
        { icon: "🏢", label: "Business Website", path: "/technology/web-development/business-website" },
        { icon: "⚙️", label: "Web Application", path: "/technology/web-development/web-application" }
      ]}
    />
  );
}
