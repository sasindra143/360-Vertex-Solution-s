import WebDevServiceTemplate from "./WebDevServiceTemplate";

export default function HealthcareWebsitePage() {
  return (
    <WebDevServiceTemplate
      eyebrow="HEALTHCARE WEBSITE"
      serviceId="healthcare-website"
      title="Create a Better Digital Experience"
      titleHighlight="for Healthcare Services."
      desc="Informational healthcare portals, hospital directories, and medical practice websites highlighting doctor profiles, department services, location directions, and patient enquiry scheduling."
      targetUsers={[
        { icon: "🏥", title: "Hospitals & Medical Centers", desc: "Multi-specialty hospitals showcasing departments, emergency contacts, and doctor lists." },
        { icon: "🩺", title: "Private Clinics & Practices", desc: "Doctors and specialists providing appointment enquiry forms and patient guidance." },
        { icon: "🔬", title: "Diagnostic Labs & Centers", desc: "Diagnostic testing centers listing test packages, preparation guides, and locations." }
      ]}
      features={[
        "Doctor Directory & Specialty Profiles", "Department & Medical Services Overview", "Appointment Enquiry & Callback Scheduling",
        "Hospital Locations & Map Directions", "Patient Education & Health Articles", "Insurance & TPA Empanelment Info",
        "Emergency Phone & Ambulance Numbers", "Mobile-Optimized Patient Interface"
      ]}
      faqs={[
        { q: "Is this website compliant for informational healthcare use?", a: "Yes, our healthcare portals present accurate informational content, emergency contacts, and appointment scheduling forms without diagnostic claims." }
      ]}
      related={[
        { icon: "📅", label: "Booking Website", path: "/technology/web-development/booking-website" },
        { icon: "🏢", label: "Business Website", path: "/technology/web-development/business-website" }
      ]}
    />
  );
}
