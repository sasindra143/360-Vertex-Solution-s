import "./Portfolio.css";
import TemplateCard from "./TemplateCard";

export default function Portfolio() {
  return (
    <section className="portfolio-section" id="portfolio">
      {/* ===== TOP CONTENT ===== */}
      <div className="portfolio-header">
        <span className="portfolio-pill">PORTFOLIO TEMPLATES</span>

        <h2>
          Choose Your <span>Perfect Template</span>
        </h2>

        <p>
          Explore our handcrafted portfolio templates designed to make you
          stand out. Preview them live right here!
        </p>
      </div>

      {/* ===== MARQUEE WRAPPER ===== */}
      <div className="portfolio-marquee">
        <div className="portfolio-grid">
          {/* ===== EXISTING TEMPLATE CARDS (UNCHANGED) ===== */}

          <TemplateCard
            badge="MOST POPULAR"
            urlText="sasindra-m-portfolio.netlify.app"
            image="https://res.cloudinary.com/dvknx0hpm/image/upload/v1770167886/Screenshot_2026-02-04_064724_mrivkc.png"
            plan="STANDARD"
            title="Full Stack Developer"
            description="Clean, modern design perfect for data analysts and professionals seeking a polished online presence."
            features={[
              "Modern Layout",
              "Project Showcase",
              "Contact Form",
              "Responsive",
            ]}
            link="https://sasindraportfolio.netlify.app/"
          />

          <TemplateCard
            badge="MOST POPULAR"
            urlText="sasindra-m-portfolio.netlify.app"
            image="https://res.cloudinary.com/dvknx0hpm/image/upload/v1770257618/Screenshot_2026-02-05_074305_q9qojr.png"
            plan="STANDARD"
            title="Full Stack Developer"
            description="Clean, modern design perfect for data analysts and professionals seeking a polished online presence."
            features={[
              "Modern Layout",
              "Project Showcase",
              "Contact Form",
              "Responsive",
            ]}
            link="https://vertex-solutions1922.github.io/portfolio2/"
          />

          <TemplateCard
            badge="MOST POPULAR"
            urlText="sasindra-m-portfolio.netlify.app"
            image="https://res.cloudinary.com/dvknx0hpm/image/upload/v1770256345/Screenshot_2026-02-05_072206_lj2ylh.png"
            plan="STANDARD"
            title="Full Stack Developer"
            description="Clean, modern design perfect for data analysts and professionals seeking a polished online presence."
            features={[
              "Modern Layout",
              "Project Showcase",
              "Contact Form",
              "Responsive",
            ]}
            link="https://vertex-solutions1922.github.io/portfolio1/"
          />
 {/*
          <TemplateCard
            urlText="sasindra-portfolio.netlify.app"
            image="https://res.cloudinary.com/dvknx0hpm/image/upload/v1770255050/Screenshot_2026-02-05_070025_csfxo2.png"
            plan="PROFESSIONAL"
            title="Creative Starter"
            description="Elegant and minimalist portfolio design ideal for showcasing your skills and achievements beautifully."
            features={[
              "Clean Design",
              "Easy Navigation",
              "Skills Section",
              "Mobile First",
            ]}
            link="https://sasindra143.github.io/My-Portfolio/"
          />  */}

          {/* ===== NEW CARD : GET MORE PORTFOLIOS ===== */}
          <div className="template-card more-portfolios-card">
            <div className="card-body more-portfolios-body">
              <span className="template-plan">EXPLORE MORE</span>

              <h3>Get More Portfolios</h3>

              <p>
                Explore additional professionally designed portfolios.
                Click any option below to preview different styles and layouts.
              </p>

              <div className="more-portfolio-buttons">
                <a
                  href="https://vertex-solutions1922.github.io/portfolio3/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio 1
                </a>

                <a
                  href="https://vertex-solutions1922.github.io/portfolio4/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio 2
                </a>

                <a
                  href="https://vertex-solutions1922.github.io/portfolio5/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio 3
                </a>

                <a
                  href="https://vertex-solutions1922.github.io/porfolio6/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio 4
                </a>

                
                <a
                  href="https://sasindra143.github.io/My-Portfolio/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio 5
                </a>

                <a
                  href="https://vertex-solutions1922.github.io/portfolio7/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio 6
                </a>
              </div>
            </div>
          </div>
          {/* ===== END NEW CARD ===== */}
        </div>
      </div>

      {/* ===== BOTTOM CONTENT ===== */}
      <div className="portfolio-footer">
        <p>
          Can&apos;t find the perfect fit?
          <span> We&apos;ll create a custom design just for you.</span>
        </p>

        <button className="portfolio-footer-btn">
          Request Custom Design →
        </button>
      </div>
    </section>
  );
}
