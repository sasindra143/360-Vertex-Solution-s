import Hero from "../components/Hero/Hero";
import WhoWeServe from "../components/WhoWeServe/WhoWeServe";
import Ecosystem from "../components/Ecosystem/Ecosystem";
import HowWeWork from "../components/HowWeWork/HowWeWork";
import WhyVertex from "../components/WhyVertex/WhyVertex";
import FounderSection from "../components/FounderSection/FounderSection";
import Testimonials from "../components/Testimonials/Testimonials";
import FinalCTA from "../components/FinalCTA/FinalCTA";
import CareerPreviewSection from "./sections/CareerPreviewSection";
import DigitalServicesSection from "./sections/DigitalServicesSection";
import GrowthSection from "./sections/GrowthSection";
import AISection from "./sections/AISection";
import ProjectsSection from "./sections/ProjectsSection";
import BlogSection from "./sections/BlogSection";
import CommunitySection from "./sections/CommunitySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeServe />
      <Ecosystem />
      <CareerPreviewSection />
      <DigitalServicesSection />
      <GrowthSection />
      <AISection />
      <ProjectsSection />
      <HowWeWork />
      <WhyVertex />
      <FounderSection />
      <Testimonials />
      <BlogSection />
      <CommunitySection />
      <FinalCTA />
    </>
  );
}
