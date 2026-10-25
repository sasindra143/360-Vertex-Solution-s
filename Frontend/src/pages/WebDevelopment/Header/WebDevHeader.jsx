import { Link } from "react-router-dom";
import "./WebDevHeader.css";

function WebDevHeader() {
  return (
    <header className="webdev-header">
      <div className="webdev-header-inner">

        <Link to="/" className="logo">
          <span>360</span> Vertex
        </Link>

        <nav className="webdev-nav">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <Link to="/web-development/consultation" className="cta">
            Free Consultation
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default WebDevHeader;
