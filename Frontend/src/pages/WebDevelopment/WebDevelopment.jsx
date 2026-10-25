import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WebDevelopment.css";

/* PAGE SECTIONS (CORRECT PATHS) */
import Hero from "./Hero/Hero";
import Services from "./Services/Services";
import Features from "./Features/Features";
import ClientWork from "./ClientWork/ClientWork";
import FinalCTA from "./FinalCTA/FinalCTA";

export default function WebDevelopment() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goBackToServices = () => {
    navigate("/#services");
  };

  return (
    <main className="webdev-page">
      {/* 🔙 STICKY BACK BUTTON */}
      <div className="webdev-back-wrapper">
        <button
          className="webdev-back-btn"
          onClick={goBackToServices}
        >
          ← Back to Services
        </button>
      </div>

      <Hero />
      <Services />
      <Features />
      <ClientWork />
      <FinalCTA />
    </main>
  );
}
