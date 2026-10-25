import "./TestimonialsSection.css";

const testimonials = [
  {
    name: "Pradeep M",
    role: "Data Analyst",
    text:
      "A huge thank you to Prasanya for creating such a professional, clean, and visually stunning portfolio website for me. Her attention to detail and ability to capture my personal brand is truly amazing.",
  },
  {
    name: "Kavitha A",
    role: "Data Analyst",
    text:
      "I am so happy to work with Prasanya. Her work is very clean and neat. She always tries to match client expectations. Highly recommended.",
  },
  {
    name: "Shaheer Shaik",
    role: "Data Scientist",
    text:
      "Prasanya understood my vision and transformed it into a beautifully designed, functional website. Highly recommend her for any web development project.",
  },
  {
    name: "Syam K",
    role: "Frontend Developer",
    text:
      "Excellent communication, smooth delivery, and professional execution. My portfolio looks premium and recruiters love it.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" id="testimonials">
      {/* HEADER */}
      <div className="testimonials-header">
        <span className="testimonials-pill">TESTIMONIALS</span>

        <h2 className="testimonials-title">
          What Our <span>Clients Say</span>
        </h2>

        <p className="testimonials-subtitle">
          Don’t just take our word for it. Here’s what our clients say about
          their portfolio websites.
        </p>
      </div>

      {/* SLIDER */}
      <div className="testimonial-slider">
        <div className="testimonial-track">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div className="testimonial-card" key={i}>
              <p className="testimonial-text">“{t.text}”</p>

              <div className="testimonial-footer">
                <div className="avatar">{t.name[0]}</div>
                <div>
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>

              <div className="stars">★★★★★</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="testimonial-cta">
        <h3>
          Ready to Build Your Own <span>Professional Portfolio?</span>
        </h3>

        <p>
          Join 50+ professionals who chose a portfolio website to stand out and
          get interview calls.
        </p>

        <button className="testimonial-btn">
          Get Your Portfolio Now →
        </button>
      </div>
    </section>
  );
}
