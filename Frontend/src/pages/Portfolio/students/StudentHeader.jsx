import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./StudentHeader.css";

export default function StudentHeader() {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power4.out",
      }
    );
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header className="sp-header" ref={headerRef}>
      <div className="sp-header-inner">
        <div
          className="sp-logo"
          onClick={() => scrollToSection("top")}
        >
          360 Vertex Solutions <span>Builds</span>
        </div>

        <nav className="sp-nav">
          <button className="nav-link" onClick={() => scrollToSection("top")}>
            Home
          </button>

          <button
            className="nav-link"
            onClick={() => scrollToSection("portfolio")}
          >
            Portfolios
          </button>

          <button
            className="nav-link"
            onClick={() => scrollToSection("process")}
          >
            Process
          </button>
          <button
  className="nav-link"
  onClick={() => scrollToSection("testimonials")}
>
  Testimonials
</button>

          <button
  className="nav-link"
  onClick={() => scrollToSection("faqs")}
>
  FAQs
</button>

          
        
        </nav>

        <button
          className="sp-cta"
          onClick={() => scrollToSection("process")}
        >
          Book Now →
        </button>
      </div>
    </header>
  );
}
