import "./ProfileSection.css";
import {
  FaWhatsapp,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { COMPANY, SOCIAL, waLink } from "../../../../../config";

export default function ProfileSection() {
  return (
    <section className="student-profile">
      <div className="profile-card">
        {/* PROFILE IMAGE */}
        <img
          src="https://res.cloudinary.com/dvknx0hpm/image/upload/v1762711558/WhatsApp_Image_2025-11-08_at_14.35.30_61df71a9_mraa0r.jpg"
          alt="Madduri Sasindra"
          className="profile-avatar"
        />

        {/* BASIC INFO */}
        <h1 className="profile-name">Madduri Sasindra</h1>
        <h3 className="profile-role">Web Developer & Career Mentor</h3>

        {/* DESCRIPTION (UNCHANGED) */}
        <p className="profile-desc">
          I am a professional Web Developer focused on helping students and job
          seekers build strong technical foundations. Along with developing
          modern, responsive websites, I support students by providing
          interview-type questions, clear explanations, and real-world guidance
          to improve confidence and job readiness.
        </p>

        <p className="profile-desc">
          I also help individuals and businesses with website design, ATS-friendly
          resumes, portfolio creation, logo design, and interview preparation
          aligned with current industry expectations.
        </p>

        {/* CONTACT DETAILS – TWO COLUMN */}
        <div className="profile-contacts">
          <div className="contact-item">
            <FaEnvelope />
            <span>{COMPANY.email}</span>
          </div>

          <div className="contact-item">
            <FaPhoneAlt />
            <span>{COMPANY.phone}</span>
          </div>
        </div>

        {/* SERVICE HIGHLIGHTS */}
        <div className="profile-services">
          <span>Website Design</span>
          <span>Interview Tips</span>
          <span>ATS Resumes</span>
          <span>Logo Design</span>
          <span>Portfolio Building</span>
        </div>

        {/* SOCIAL TITLE (UNCHANGED TEXT) */}
        <h4 className="profile-connect-title">
          Connect with me for Website Design, Interview Tips, ATS Resumes,
          Logo Design & Portfolio Building
        </h4>

        {/* SOCIAL LINKS */}
        <div className="profile-socials">
          <a
            href={waLink("Hello 360° Vertex Solutions, I would like guidance on website design, interview preparation, resumes, and portfolio building.")}
            target="_blank"
            rel="noreferrer"
            className="whatsapp"
          >
            <FaWhatsapp />
            WhatsApp
          </a>

          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noreferrer"
            className="linkedin"
          >
            <FaLinkedin />
            LinkedIn
          </a>

          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noreferrer"
            className="instagram"
          >
            <FaInstagram />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
