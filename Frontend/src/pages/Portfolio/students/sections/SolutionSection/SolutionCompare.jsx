import "./SolutionCompare.css";

export default function SolutionCompare() {
  return (
    <section className="solution-compare-section">
      <h2 className="compare-title">
        <span className="text-red">Invisible</span>{" "}
        <span className="text-neutral">to</span>{" "}
        <span className="text-green">Irresistible</span>
      </h2>

      <div className="compare-wrapper">
        {/* LEFT COLUMN */}
        <div className="compare-column bad">
          <div className="compare-header bad-header">
            WITHOUT PORTFOLIO
          </div>

          <ul>
            <li>Recruiter spends 7 seconds on average</li>
            <li>You look like every other candidate</li>
            <li>Hard to prove your skills</li>
            <li>Dependent on luck or referrals</li>
            <li>Limited to resume text</li>
            <li>Easily forgotten</li>
            <li>No visibility</li>
          </ul>
        </div>

        {/* CENTER ARROW */}
        <div className="compare-middle">
          <div className="arrow-circle">→</div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="compare-column good">
          <div className="compare-header good-header">
            WITH YOUR PORTFOLIO
          </div>

          <ul>
            <li>Recruiter spends 3 minutes on average</li>
            <li>You instantly stand out from 1000s of applicants</li>
            <li>Show real proof through projects</li>
            <li>Attracts opportunities organically</li>
            <li>Builds trust through visuals & results</li>
            <li>Professionally memorable</li>
            <li>Works 24/7 to showcase your value</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
