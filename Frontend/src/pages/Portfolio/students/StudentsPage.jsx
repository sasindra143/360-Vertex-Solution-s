import StudentHeader from "./StudentHeader";
import StudentHero from "./StudentHero";

import RealitySection from "./sections/RealitySection/RealitySection";
import WhySection from "./sections/WhySection/WhySection";
import SolutionSection from "./sections/SolutionSection/SolutionSection";
import ProcessSection from "./sections/ProcessSection/ProcessSection";
import Portfolio from "./sections/Portfolio/Portfolio";
import TestimonialsSection from "./sections/TestimonialsSection/TestimonialsSection";
import PricingSection from "./sections/PricingSection/PricingSection";
import FaqSection from "./sections/FaqSection/FaqSection";
import ContactSection from "./sections/ContactSection/ContactSection";
import FooterSection from "./sections/FooterSection/FooterSection";


export default function StudentsPage() {
  return (
    <main
      style={{
        backgroundColor: "#05050d",
        overflowX: "hidden",
      }}
    >
      {/* HEADER */}
      <StudentHeader />

      {/* HERO */}
      <StudentHero />

      {/* REALITY / PROBLEM */}
      <RealitySection />

      {/* WHY US */}
      <WhySection />

      {/* SOLUTION */}
      <SolutionSection />

      {/* PROCESS */}
      <ProcessSection />

      {/* PORTFOLIOS */}
      <Portfolio />

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* PRICING */}
      <PricingSection />

      {/* FAQS */}
      <FaqSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
