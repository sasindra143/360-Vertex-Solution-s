import { useEffect, useState } from "react";
import { COMPANY, waLink } from "../../config";
import "./FloatingButtons.css";

const WA_MSG = "Hello 360° Vertex Solutions, I would like to discuss a requirement with your team.";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="floating-buttons">
      {showTop && (
        <button
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}

      <a
        href={waLink(WA_MSG)}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Chat on WhatsApp"
        data-tooltip="Chat With Us"
      >
        <svg viewBox="0 0 32 32" className="whatsapp-icon" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M19.11 17.31c-.29-.15-1.71-.84-1.97-.93-.26-.1-.45-.15-.64.15-.19.29-.74.93-.91 1.12-.17.19-.34.22-.63.07-.29-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.55-.88-2.13-.23-.55-.47-.48-.64-.49-.17-.01-.36-.01-.55-.01-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44 0 1.44 1.05 2.83 1.19 3.02.15.19 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.71.23 1.36.2 1.87.12.57-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34z"/>
          <path fill="currentColor" d="M16.01 2.67c-7.36 0-13.34 5.98-13.34 13.34 0 2.35.61 4.65 1.77 6.68L2.6 29.33l6.81-1.78c1.95 1.06 4.15 1.62 6.6 1.62 7.36 0 13.34-5.98 13.34-13.34S23.37 2.67 16.01 2.67zm0 24.02c-2.12 0-4.19-.57-5.98-1.64l-.43-.25-4.05 1.06 1.08-3.95-.28-.41a10.97 10.97 0 01-1.78-5.95c0-6.07 4.94-11.01 11.01-11.01s11.01 4.94 11.01 11.01-4.94 11.01-11.01 11.01z"/>
        </svg>
      </a>
    </div>
  );
}
