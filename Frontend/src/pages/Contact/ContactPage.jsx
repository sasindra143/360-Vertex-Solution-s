import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { COMPANY, SOCIAL, waLink, telLink, mailLink } from "../../config";
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./ContactPage.css";

const WA_MSG = "Hello 360° Vertex Solutions, I would like to discuss a project with your team.";

const CONTACT_CARDS = [
  {
    icon: "📞",
    title: "Call Us",
    value: COMPANY.whatsappPhone,
    action: "Call Now",
    href: telLink,
    color: "#06b6d4",
  },
  {
    icon: "✉️",
    title: "Email Us",
    value: COMPANY.email,
    action: "Send Email",
    href: mailLink,
    color: "#7c3aed",
  },
  {
    icon: "💬",
    title: "WhatsApp",
    value: COMPANY.phone,
    action: "Chat on WhatsApp",
    href: waLink(WA_MSG),
    color: "#25d366",
    external: true,
  },
  {
    icon: "🚀",
    title: "Build With Us",
    value: "Discuss your requirement",
    action: "Start a Conversation",
    href: waLink(WA_MSG),
    color: "#f59e0b",
    external: true,
  },
];

const ENQUIRY_TYPES = [
  "Academy / Courses",
  "Digital Marketing",
  "Technology / Development",
  "Career & Jobs",
  "AI & Automation",
  "General Enquiry",
];

const FEEDBACK_TYPES = [
  "Course Feedback",
  "Service Feedback",
  "Website Feedback",
  "Other",
];

export default function ContactPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get("service");

  const [activeFormType, setActiveFormType] = useState("enquiry"); // "enquiry", "feedback", "contact"
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: serviceParam ? "Technology / Development" : "",
    feedbackType: "",
    company: "",
    budget: "",
    rating: "5",
    message: serviceParam ? `I am interested in ${serviceParam.replace(/-/g, " ")} services.` : "",
    contactPref: "WhatsApp",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (serviceParam) {
      setForm(prev => ({
        ...prev,
        enquiryType: serviceParam.includes("digital") || serviceParam.includes("seo") || serviceParam.includes("ads") ? "Digital Marketing" : "Technology / Development",
        message: `Hello 360° Vertex Solutions, I would like to discuss ${serviceParam.replace(/-/g, " ")} for my project.`
      }));
    }
  }, [serviceParam]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    let text = "";
    
    if (activeFormType === "enquiry") {
      text =
        `New Enquiry — 360° Vertex Solutions\n\n` +
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n` +
        `Enquiry Type: ${form.enquiryType}\nCompany: ${form.company || "N/A"}\n` +
        `Budget: ${form.budget || "N/A"}\nPreferred Contact: ${form.contactPref}\n\nMessage:\n${form.message}`;
    } else if (activeFormType === "feedback") {
      text =
        `New Feedback — 360° Vertex Solutions\n\n` +
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "N/A"}\n` +
        `Feedback Type: ${form.feedbackType}\nRating: ${form.rating} Stars\n\nFeedback:\n${form.message}`;
    } else {
      // General Contact
      text =
        `New Contact Message — 360° Vertex Solutions\n\n` +
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`;
    }
    
    window.open(waLink(text), "_blank");
    setSubmitted(true);
  };

  const formTitles = {
    enquiry: "Send Us an Enquiry",
    feedback: "Share Your Feedback",
    contact: "Contact Us Directly"
  };

  const formSubtitles = {
    enquiry: "Fill in the form and our team will review your enquiry and get in touch.",
    feedback: "We value your feedback to help us improve our services.",
    contact: "Have a general question? Drop us a message below."
  };

  return (
    <div className="cp-page">
      {/* HERO */}
      <section className="cp-hero">
        <div className="cp-hero__bg">
          <div className="cp-hero__orb cp-hero__orb--1" />
          <div className="cp-hero__orb cp-hero__orb--2" />
        </div>
        <div className="cp-container">
          <span className="cp-label">GET IN TOUCH</span>
          <h1 className="cp-hero__title">Let's Build Something <span className="cp-gradient">Meaningful.</span></h1>
          <p className="cp-hero__desc">
            Have a project, career question, learning goal or business idea?<br />
            Connect with 360° Vertex Solutions.
          </p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="cp-cards-section">
        <div className="cp-container">
          <div className="cp-cards-grid">
            {CONTACT_CARDS.map((card, i) => (
              <a
                key={i}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className="cp-card"
                style={{ "--card-color": card.color }}
              >
                <span className="cp-card__icon">{card.icon}</span>
                <h3 className="cp-card__title">{card.title}</h3>
                <p className="cp-card__value">{card.value}</p>
                <span className="cp-card__btn">{card.action} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="cp-form-section">
        <div className="cp-container cp-form-grid">
          {/* Left info */}
          <div className="cp-form-info">
            <h2 className="cp-form-heading">Reach Out To Us</h2>
            <p className="cp-form-sub">
              Whether you need to start a project, give us feedback, or just say hello—we're here.
            </p>
            <div className="cp-form-contact-list">
              <a href={telLink} className="cp-form-contact-item">
                <span>📞</span><span>{COMPANY.phone}</span>
              </a>
              <a href={mailLink} className="cp-form-contact-item">
                <span>✉️</span><span>{COMPANY.email}</span>
              </a>
              <a href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer" className="cp-form-contact-item">
                <span>💬</span><span>WhatsApp Us</span>
              </a>
            </div>

            <div className="cp-form-social">
              <p>Find Us Online</p>
              <div className="cp-form-social-icons">
                {[
                  ["LinkedIn", "https://www.linkedin.com/in/sasindra-madduri", <FaLinkedinIn key="li" />],
                  ["Instagram", SOCIAL.instagram, <FaInstagram key="ig" />],
                  ["YouTube", SOCIAL.youtube, <span key="yt">YT</span>],
                  ["WhatsApp", waLink(WA_MSG), <FaWhatsapp key="wa" />],
                ].filter(([, href]) => href).map(([lbl, href, ico], i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={lbl}
                    className="cp-form-social-icon">{ico}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="cp-form-container">
            <div className="cp-form-tabs">
              <button 
                className={`cp-tab-btn ${activeFormType === "enquiry" ? "active" : ""}`}
                onClick={() => { setActiveFormType("enquiry"); setSubmitted(false); }}
              >
                Enquiry
              </button>
              <button 
                className={`cp-tab-btn ${activeFormType === "contact" ? "active" : ""}`}
                onClick={() => { setActiveFormType("contact"); setSubmitted(false); }}
              >
                Contact
              </button>
              <button 
                className={`cp-tab-btn ${activeFormType === "feedback" ? "active" : ""}`}
                onClick={() => { setActiveFormType("feedback"); setSubmitted(false); }}
              >
                Feedback
              </button>
            </div>

            <form className="cp-form" onSubmit={handleSubmit}>
              <h2 style={{ marginBottom: "5px" }}>{formTitles[activeFormType]}</h2>
              <p style={{ color: "rgba(200,215,255,0.6)", fontSize: "0.9rem", marginBottom: "24px" }}>
                {formSubtitles[activeFormType]}
              </p>

              {submitted ? (
                <div className="cp-success">
                  <div className="cp-success__icon">✅</div>
                  <h3>Thank You!</h3>
                  <p>Your message has been received successfully.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="cp-form-btn" style={{ marginTop: 20 }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="cp-form-row cp-form-row--2">
                    <div className="cp-field">
                      <label>Full Name *</label>
                      <input name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="cp-field">
                      <label>Email *</label>
                      <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>

                  {activeFormType !== "feedback" && (
                    <div className="cp-form-row cp-form-row--2">
                      <div className="cp-field">
                        <label>Phone / WhatsApp *</label>
                        <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} required />
                      </div>
                      
                      {activeFormType === "enquiry" && (
                        <div className="cp-field">
                          <label>Enquiry Type *</label>
                          <select name="enquiryType" value={form.enquiryType} onChange={handleChange} required>
                            <option value="">Select type...</option>
                            {ENQUIRY_TYPES.map((t, i) => <option key={i} value={t}>{t}</option>)}
                          </select>
                        </div>
                      )}
                    </div>
                  )}

                  {activeFormType === "enquiry" && (
                    <div className="cp-form-row cp-form-row--2">
                      <div className="cp-field">
                        <label>Company / Organization</label>
                        <input name="company" type="text" placeholder="Your company (optional)" value={form.company} onChange={handleChange} />
                      </div>
                      <div className="cp-field">
                        <label>Budget Range</label>
                        <input name="budget" type="text" placeholder="e.g. ₹20,000 – ₹50,000" value={form.budget} onChange={handleChange} />
                      </div>
                    </div>
                  )}

                  {activeFormType === "feedback" && (
                    <div className="cp-form-row cp-form-row--2">
                      <div className="cp-field">
                        <label>Feedback Type *</label>
                        <select name="feedbackType" value={form.feedbackType} onChange={handleChange} required>
                          <option value="">Select feedback type...</option>
                          {FEEDBACK_TYPES.map((t, i) => <option key={i} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="cp-field">
                        <label>Rating (1-5) *</label>
                        <select name="rating" value={form.rating} onChange={handleChange} required>
                          <option value="5">5 - Excellent</option>
                          <option value="4">4 - Very Good</option>
                          <option value="3">3 - Average</option>
                          <option value="2">2 - Poor</option>
                          <option value="1">1 - Terrible</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="cp-field">
                    <label>Message *</label>
                    <textarea 
                      name="message" 
                      rows={5} 
                      placeholder={activeFormType === "feedback" ? "Please detail your feedback..." : "Tell us about your requirement or question..."} 
                      value={form.message} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>

                  {activeFormType === "enquiry" && (
                    <div className="cp-field">
                      <label>Preferred Contact Method</label>
                      <div className="cp-radio-group">
                        {["WhatsApp", "Email", "Phone"].map((opt) => (
                          <label key={opt} className="cp-radio">
                            <input type="radio" name="contactPref" value={opt} checked={form.contactPref === opt} onChange={handleChange} />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <button type="submit" className="cp-form-btn">
                    Submit {activeFormType.charAt(0).toUpperCase() + activeFormType.slice(1)} →
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
