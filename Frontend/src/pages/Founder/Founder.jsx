import React from "react";
import "./Founder.css";

export default function Founder() {
  return (
    <section className="founder-section">
      <div className="founder-container">
        {/* LOGO & INTRO */}
        <div className="founder-header">
          <h1 className="founder-title">
            👋 Founder’s Message
          </h1>
          <h2 className="founder-name">Sasindra</h2>
          <p className="founder-subtitle">
            Founder & Full Stack Developer — 360° Vertex Solutions
          </p>
        </div>

        {/* BIO */}
        <div className="founder-content">
          <p className="founder-bio">
            I’m Sasindra, a Full Stack Developer and the founder of <strong>360° Vertex Solutions</strong>, 
            a technology, digital marketing, career development, and AI solutions company.
          </p>
          <p className="founder-bio">
            I started 360° Vertex Solutions with a vision to create a platform where students, freshers, 
            job seekers, IT professionals, startups, and businesses can access practical technology, 
            digital, and career solutions under one roof.
          </p>
        </div>

        {/* WHAT I DO - GRID */}
        <div className="founder-services">
          <h3 className="section-heading">💻 What I Do</h3>
          <p className="services-intro">
            As a Full Stack Developer, I specialize in building modern, responsive, and scalable digital solutions, including:
          </p>
          <div className="services-grid">
            <div className="service-card">
              <span className="icon">🌐</span>
              <span>Business & Portfolio Websites</span>
            </div>
            <div className="service-card">
              <span className="icon">🛒</span>
              <span>E-commerce Platforms</span>
            </div>
            <div className="service-card">
              <span className="icon">💻</span>
              <span>Full Stack Web Applications</span>
            </div>
            <div className="service-card">
              <span className="icon">🎨</span>
              <span>UI/UX & Frontend Development</span>
            </div>
            <div className="service-card">
              <span className="icon">⚙️</span>
              <span>Backend & API Development</span>
            </div>
            <div className="service-card">
              <span className="icon">🗄️</span>
              <span>Database Solutions</span>
            </div>
            <div className="service-card">
              <span className="icon">🤖</span>
              <span>AI & Automation Solutions</span>
            </div>
            <div className="service-card">
              <span className="icon">📱</span>
              <span>Digital Platforms & Tools</span>
            </div>
          </div>
        </div>

        {/* 360 VERTEX SOLUTIONS OVERVIEW */}
        <div className="founder-overview">
          <p>Through 360° Vertex Solutions, we also provide:</p>
          <div className="overview-badges">
            <span className="badge">🎓 Training & Academy</span>
            <span className="badge">💼 Career Solutions</span>
            <span className="badge">📈 Digital Marketing</span>
            <span className="badge">🤖 AI & Automation</span>
            <span className="badge">🎥 Media & Creative Services</span>
          </div>
        </div>

        {/* VISION & MISSION */}
        <div className="founder-vision">
          <h3 className="section-heading">🎯 My Vision</h3>
          <blockquote className="vision-quote">
            “Learn. Build. Launch. Grow.”
          </blockquote>
          <p className="vision-text">
            My goal is to combine technology, creativity, digital marketing, and continuous learning 
            to turn ideas into practical solutions and opportunities.
          </p>
        </div>

        {/* FOOTER */}
        <div className="founder-footer">
          <h4 className="company-name">360° Vertex Solutions</h4>
          <p className="tagline">Your Vision | Our Solutions | A Brighter Tomorrow</p>
        </div>
      </div>
    </section>
  );
}
