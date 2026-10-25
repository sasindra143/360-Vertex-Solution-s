import { useState } from "react";
import { COMPANY, SOCIAL, waLink, telLink, mailLink } from "../../config";
import "./Contact.css";

const IC = {
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  wa: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93V18h-2v1.93c-3.94-.49-7-3.85-7-7.93 0-1.04.2-2.03.57-2.94l1.43 1.43V12h2v-2.59l-2.3-2.3C6.93 8.03 7 9 7 9H5c0-1.1.25-2.13.68-3.06l1.41 1.41C7.76 8.31 8.73 9 10 9V7c-.79 0-1.5-.32-2.01-.83L9.34 4.82C10.14 4.3 11.03 4 12 4s1.86.3 2.66.82l1.35 1.35C15.5 6.68 14.79 7 14 7v2c1.27 0 2.24-.69 2.91-1.65l1.41-1.41C18.75 6.87 19 7.9 19 9h-2c0 0 .07-.97-.09-1.89l-2.3 2.3V12h2v-1.51l1.43-1.43c.37.91.57 1.9.57 2.94 0 4.08-3.06 7.44-7 7.93z"
};

const Ic = ({ d, sz = 20, col = "currentColor" }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `New Enquiry - 360° Vertex Solutions\n\nName: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`;
    window.open(waLink(text), "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="ct-sec" id="contact">
      <div className="ct-bg" />
      <div className="ct-ct">
        <div className="ct-eyebrow"><span className="ct-dot" />GET IN TOUCH</div>
        <h2 className="ct-h2">Start a Conversation.</h2>
        <p className="ct-p">Whether you have a project, career enquiry, or business requirement, we are ready to listen.</p>

        <div className="ct-grid">
          {/* LEFT SIDE: Info */}
          <div className="ct-info">
            <a href={telLink} className="ct-info-card ct-info-card--link">
              <div className="ct-ic"><Ic d={IC.phone} col="#06b6d4" /></div>
              <div>
                <h3>Phone & WhatsApp</h3>
                <p>{COMPANY.phone}</p>
              </div>
            </a>
            <a href={mailLink} className="ct-info-card ct-info-card--link">
              <div className="ct-ic"><Ic d={IC.mail} col="#7c3aed" /></div>
              <div>
                <h3>Email</h3>
                <p>{COMPANY.email}</p>
              </div>
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="ct-info-card ct-info-card--link">
              <div className="ct-ic"><Ic d={IC.map} col="#3b82f6" /></div>
              <div>
                <h3>WhatsApp</h3>
                <p>{COMPANY.whatsappPhone}</p>
              </div>
            </a>
            <div className="ct-social">
              {[
                ["LinkedIn", "https://www.linkedin.com/in/sasindra-madduri", "LI"],
                ["Instagram", SOCIAL.instagram, "IG"],
                ["YouTube", SOCIAL.youtube, "YT"],
                ["WhatsApp", waLink(), "WA"],
              ].filter(([, href]) => href).map(([lbl, href, txt], i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={lbl}>{txt}</a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Form */}
          <form className="ct-form" onSubmit={handleSubmit}>
            <h3 className="ct-form-title">Send an Enquiry</h3>
            {submitted && <div className="ct-success">Thank you! We'll be in touch shortly. 🎉</div>}
            <div className="ct-input-group">
              <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="ct-input-group">
              <input type="tel" name="phone" placeholder="Your WhatsApp Number" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="ct-input-group">
              <textarea name="message" placeholder="How can we help you?" rows="4" value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className="ct-btn">
              Send via WhatsApp <Ic d={IC.send} sz={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
