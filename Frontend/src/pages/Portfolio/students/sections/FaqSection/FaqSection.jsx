import { useState } from "react";
import "./FaqSection.css";

const faqs = [
  {
    q: "What is a portfolio website for job seekers?",
    a: "A portfolio website is a personal website that showcases your skills, projects, experience, and contact details in one place. It helps recruiters understand who you are and what you can do beyond just a resume."
  },
  {
    q: "Why do job seekers need a portfolio website?",
    a: "A portfolio website helps job seekers stand out in a competitive job market. It allows recruiters to see your real work, understand your skills clearly, and trust your profile faster, which improves your chances of getting interview calls."
  },
  {
    q: "Is a portfolio website better than a resume?",
    a: "A portfolio website does not replace a resume—it supports it. While a resume is limited in space, a portfolio website lets you show projects, visuals, case studies, and detailed work that a resume cannot fully explain."
  },
  {
    q: "Do freshers need a portfolio website?",
    a: "Yes. Freshers benefit a lot from having a portfolio website. When experience is limited, showcasing projects, internships, certifications, and learning progress helps recruiters evaluate your skills and potential."
  },
  {
    q: "Can a portfolio website help me get interview calls?",
    a: "Yes. When recruiters can clearly see your work and understand your skills quickly, they are more likely to shortlist you. A well-structured portfolio website increases your chances of getting interview calls."
  },
  {
    q: "What should a job seeker include in a portfolio website?",
    a: "A good portfolio website should include an about section, skills, projects or work samples, resume download, and contact details. This gives recruiters a complete picture of your profile in one place."
  },
  {
    q: "Do recruiters actually check portfolio websites?",
    a: "Yes. Many recruiters and hiring managers visit portfolio websites to see real work examples. A professional portfolio builds credibility and helps them assess candidates faster."
  },
  {
    q: "Is a portfolio website useful for non-technical job seekers?",
    a: "Yes. Portfolio websites are useful for designers, marketers, writers, analysts, and other non-technical roles. Any role that values skills, achievements, or work samples can benefit from a portfolio website."
  },
  {
    q: "Do I need to know how to code to have a portfolio website?",
    a: "No. You don’t need any coding knowledge. We take care of the complete design and development process. You only need to share your details and feedback."
  },
  {
    q: "How long does it take to build my portfolio?",
    a: "Most portfolios are completed within 3 days from our initial consultation. More complex portfolios with custom features may take 1 to 4 weeks."
  },
  {
    q: "What information do I need to provide?",
    a: "We’ll share a simple form where you can submit your resume, project details, content, and preferences. We guide you step by step."
  },
  {
    q: "Can I update my portfolio after it's built?",
    a: "Yes. You get free revisions depending on your package. Additional updates can be done later based on scope."
  },
  {
    q: "Can I use my portfolio website for MNC job applications?",
    a: "Yes. A portfolio website makes your application more professional and memorable for recruiters at top companies."
  },
  {
    q: "Can I use my portfolio website link on LinkedIn and job portals?",
    a: "Yes. You can add your portfolio link to LinkedIn, job portals, email signatures, and recruiter emails."
  },
  {
    q: "Can I use my own domain name?",
    a: "Yes. You can use your own custom domain like yourname.com. We help you connect and set it up properly."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(1);

  return (
    <section className="faq-section" id="faqs">
      <div className="faq-header">
        <span className="faq-pill">GOT QUESTIONS?</span>
        <h2>
          Frequently Asked <span>Questions</span>
        </h2>
        <p>
          Everything you need to know about our portfolio service. Can’t find
          what you’re looking for? Feel free to reach out.
        </p>
      </div>

      <div className="faq-grid">
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            <div className="faq-question">
              <span className="faq-icon">Q</span>
              <h4>{item.q}</h4>
              <span className="faq-toggle">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>

            <div className="faq-answer">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-footer">
        <div className="faq-help">
          <span className="faq-help-icon">?</span>
          <div>
            <h4>Still have questions?</h4>
            <p>
              We’re here to help. Schedule a free call and we’ll answer all your
              questions.
            </p>
          </div>
        </div>

        <button className="faq-btn">
          Get In Touch <span>→</span>
        </button>
      </div>
    </section>
  );
}
