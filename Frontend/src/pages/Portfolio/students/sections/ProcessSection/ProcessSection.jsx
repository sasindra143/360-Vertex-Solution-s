import "./ProcessSection.css";
import CtaSection from "../CtaSection/CtaSection";

export default function ProcessSection() {
  return (
    <>
      <section className="process-section" id="process">
        {/* HEADER */}
        <div className="process-header">
          <span className="process-pill">HOW IT WORKS</span>

          <h2 className="process-title">
            From First Call to <br />
            <span>Live Your Portfolio</span>
          </h2>

          <p className="process-subtitle">
            Our simple, step-by-step process makes it easy to get a professional
            portfolio website without stress or confusion. We handle everything —
            design, content, and setup — while you focus on your career.
          </p>

          <div className="process-tags">
            <span>SIMPLE.</span>
            <span>FAST.</span>
            <span>PROFESSIONAL.</span>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="timeline">
          <div className="timeline-line" />

          {steps.map((step) => (
            <div className="step" key={step.no}>
              <div className="circle">{step.no}</div>

              <div className="step-content">
                <div className="step-header">
                  <h3>{step.title}</h3>
                  <span className="step-pill">{step.tag}</span>
                </div>

                <p>{step.desc}</p>

                <div className="step-boxes">
                  {step.items.map((item, i) => (
                    <div className="box" key={i}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA CONNECTED */}
      <CtaSection />
    </>
  );
}

const steps = [
  {
    no: "01",
    title: "Choose Your Plan",
    tag: "QUICK & EASY",
    desc:
      "Pick a plan that fits your career goals and requirements. Whether you're starting out or leveling up, there's a plan built for you.",
    items: [
      "Browse our pricing packages",
      "Compare features & benefits",
      "Select your perfect plan",
      "Ready to move forward",
    ],
  },
  {
    no: "02",
    title: "Complete Your Payment",
    tag: "SECURE PAYMENT",
    desc:
      "Secure your spot with the full payment so we can start building your portfolio immediately.",
    items: [
      "Safe and secure payment gateway",
      "Multiple payment options",
      "Instant payment confirmation",
      "Project kickoff email sent instantly",
    ],
  },
  {
    no: "03",
    title: "Share Your Details",
    tag: "WE GUIDE YOU",
    desc:
      "Send us your resume, projects, photos, certificates, and any content you want featured.",
    items: [
      "Resume & work history",
      "Project details & screenshots",
      "Photos & personal content",
      "Certificates & achievements",
    ],
  },
  {
    no: "04",
    title: "We Design & Develop Your Portfolio",
    tag: "EXPERT CRAFT",
    desc:
      "Our team designs and builds your custom portfolio website tailored to your industry.",
    items: [
      "Unique design for your profession",
      "Fully mobile-responsive layout",
      "SEO optimized structure",
      "Performance & quality testing",
    ],
  },
  {
    no: "05",
    title: "Review & Final Edits",
    tag: "YOUR FEEDBACK",
    desc:
      "You get a preview of your portfolio and request edits until you're 100% satisfied.",
    items: [
      "View your complete portfolio",
      "Share feedback easily",
      "Unlimited revision rounds",
      "Approve for launch",
    ],
  },
  {
    no: "06",
    title: "Your Portfolio Goes Live!",
    tag: "LAUNCH DAY",
    desc:
      "We deploy your live portfolio on your custom domain — fully tested and optimized.",
    items: [
      "Domain setup & hosting",
      "Analytics integration",
      "Final performance check",
      "Ready to share your portfolio",
    ],
  },
];
