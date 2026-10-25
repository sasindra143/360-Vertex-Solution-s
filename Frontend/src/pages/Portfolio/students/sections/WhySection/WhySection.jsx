import "./WhySection.css";

const reasons = [
  {
    id: "01",
    stat: "7 sec",
    label: "AVERAGE REVIEW TIME",
    title: "Recruiters spend just 7 seconds on your resume",
    desc: "When it looks like everyone else’s, they skip it — your real value never gets noticed.",
    tag: "Lost in the 7-second scan",
  },
  {
    id: "02",
    stat: "500+",
    label: "SIMILAR CANDIDATES",
    title: "Hundreds of Similar Applicants",
    desc: "For every role, there are 500+ people with the same degree and skills.",
    tag: "Lost among hundreds of applications",
  },
  {
    id: "03",
    stat: "100+",
    label: "APPLICATIONS SENT",
    title: "No Replies After 100+ Applications",
    desc: "You apply again and again — no callbacks, no feedback. Just silence.",
    tag: "Effort goes unnoticed",
  },
  {
    id: "04",
    stat: "0",
    label: "REFERRAL RESPONSES",
    title: "You ask for referrals but no one replies",
    desc: "People rarely respond. Most don’t really know your work.",
    tag: "Networking efforts fail",
  },
  {
    id: "05",
    stat: "89%",
    label: "FEEL OVERLOOKED",
    title: "Recruiters don’t see your potential",
    desc: "A plain resume can’t show creativity, thinking, or impact.",
    tag: "Potential stays invisible",
  },
  {
    id: "06",
    stat: "1-2",
    label: "PAGES LIMIT",
    title: "Resumes Have Their Limits",
    desc: "A resume hides more than it shows. Your thinking never appears.",
    tag: "True capabilities unexpressed",
  },
  {
    id: "07",
    stat: "0",
    label: "PROJECT VISIBILITY",
    title: "Projects No One Sees",
    desc: "Your best work stays inside folders or GitHub repos.",
    tag: "Work remains hidden",
  },
  {
    id: "08",
    stat: "3x",
    label: "BETTER PRESENTATION",
    title: "Presentation Beats Skill",
    desc: "Less skilled people win — because they present better.",
    tag: "Presentation beats competence",
  },
];

export default function WhySection() {
  return (
    <section className="why-section">
      <h2 className="why-heading">Why?</h2>

      <div className="why-grid">
        {reasons.map((item) => (
          <div key={item.id} className="why-card">
            <div className="why-top">
              <span className="why-id">{item.id}</span>
              <div className="why-stat">
                <strong>{item.stat}</strong>
                <small>{item.label}</small>
              </div>
            </div>

            <h3>{item.title}</h3>
            <p>{item.desc}</p>

            <span className="why-tag">★ {item.tag}</span>
          </div>
        ))}
      </div>

      <div className="why-footer">
        <p>
          This is the <span>reality</span>. Every job seeker faces it.
        </p>
        <h4>And it hurts!</h4>
      </div>
    </section>
  );
}
