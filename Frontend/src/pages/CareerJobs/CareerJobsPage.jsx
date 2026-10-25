import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  MapPin,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";
import { waLink } from "../../config";
import { apiUrl } from "../../utils/api";
import {
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  getJobCategories,
  getPublicJob,
  getPublicJobs,
  WORK_MODES,
} from "./jobsApi";
import "./CareerJobsPage.css";

const PAGE_SIZE = 9;
const EMPTY_PAGE = { items: [], page: 1, pages: 0, total: 0 };
const INITIAL_FILTERS = {
  q: "",
  category: "",
  employmentType: "",
  workMode: "",
  experience: "",
  graduationYear: "",
  location: "",
  status: "open",
  sort: "newest",
};

const CAREER_SERVICES = [
  { icon: "📄", title: "ATS-Friendly Resume Building", desc: "We craft professional, keyword-optimized resumes that pass Applicant Tracking Systems (ATS) and catch recruiter attention." },
  { icon: "🌐", title: "Portfolio Development", desc: "Showcase your skills with a portfolio that highlights your projects and achievements." },
  { icon: "💼", title: "LinkedIn Optimization", desc: "Improve your profile to increase visibility, attract recruiters, and build a strong professional network." },
  { icon: "🤝", title: "Interview Preparation", desc: "Practice behavioral questions and technical rounds with a focused preparation plan." },
  { icon: "🧠", title: "Aptitude & Logical Reasoning", desc: "Prepare for quantitative, logical, and verbal reasoning assessments." },
  { icon: "🎓", title: "Internship & Job Assistance", desc: "Get guidance on job boards, applications, and placement drives." },
];

function formatDate(value, fallback = "Not specified") {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? fallback
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

function updatePageMetadata({ title, description, canonicalUrl, openGraphImage, structuredJob }) {
  const previousTitle = document.title;
  document.title = title;
  const updated = [];
  const setMeta = (selector, attribute, key, content) => {
    if (!content) return;
    let element = document.head.querySelector(selector);
    const created = !element;
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute, key);
      document.head.append(element);
    }
    updated.push({ element, previous: element.content, created });
    element.content = content;
  };
  setMeta('meta[name="description"]', "name", "description", description);
  setMeta('meta[property="og:title"]', "property", "og:title", title);
  setMeta('meta[property="og:description"]', "property", "og:description", description);
  setMeta('meta[property="og:type"]', "property", "og:type", structuredJob ? "article" : "website");
  setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
  setMeta('meta[property="og:image"]', "property", "og:image", openGraphImage);

  let canonical = document.head.querySelector('link[rel="canonical"]');
  const createdCanonical = !canonical;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  const previousCanonical = canonical.href;
  canonical.href = canonicalUrl;

  let structuredData;
  if (structuredJob) {
    structuredData = document.createElement("script");
    structuredData.type = "application/ld+json";
    structuredData.textContent = JSON.stringify(structuredJob);
    document.head.append(structuredData);
  }
  return () => {
    document.title = previousTitle;
    updated.forEach(({ element, previous, created }) => {
      if (created) element.remove();
      else element.content = previous;
    });
    if (createdCanonical) canonical.remove();
    else canonical.href = previousCanonical;
    structuredData?.remove();
  };
}

function useListingMetadata() {
  useEffect(() => updatePageMetadata({
    title: "Verified Tech Job Updates | 360° Vertex Solutions",
    description: "Browse verified technology jobs, internships, fresher opportunities, and off-campus drives. Every listing links to its official source.",
    canonicalUrl: `${window.location.origin}/career-jobs`,
  }), []);
}

function StatusBadge({ status }) {
  const label = status === "closingSoon" ? "Closing soon" : status === "open" ? "Open" : "Closed";
  return <span className={`cj-status cj-status--${status}`}>{label}</span>;
}

function CompanyMark({ job }) {
  const logoUrl = job.companyLogoUrl?.startsWith("/") ? apiUrl(job.companyLogoUrl) : job.companyLogoUrl;
  return (
    <span className="cj-company-mark" aria-label={`${job.companyName} logo`}>
      {logoUrl && <img src={logoUrl} alt="" onError={(event) => { event.currentTarget.hidden = true; }} />}
      <span aria-hidden="true">{job.companyName?.slice(0, 1)?.toUpperCase() || "J"}</span>
    </span>
  );
}

function JobCard({ job }) {
  return (
    <article className={`cj-job-card${job.featured ? " cj-job-card--featured" : ""}`}>
      <header className="cj-job-card__header">
        <CompanyMark job={job} />
        <div className="cj-job-card__company">
          <span>{job.companyName}</span>
          <span className="cj-job-card__category">{job.categoryName}</span>
        </div>
        {job.featured && <span className="cj-featured">Featured</span>}
      </header>
      <div className="cj-job-card__title-row">
        <h3><Link to={`/career-jobs/${encodeURIComponent(job.slug)}`}>{job.title}</Link></h3>
        <StatusBadge status={job.status} />
      </div>
      <div className="cj-job-facts">
        <span><MapPin size={15} />{job.location} · {job.workMode}</span>
        <span><BriefcaseBusiness size={15} />{job.experience} · {job.employmentType}</span>
        {job.salary && <span className="cj-salary">{job.salary}</span>}
      </div>
      <p className="cj-job-card__description">{job.description}</p>
      {job.qualification && <p className="cj-job-card__eligibility"><strong>Qualification:</strong> {job.qualification}</p>}
      {job.graduationYears?.length > 0 && <p className="cj-job-card__eligibility"><strong>Graduation years:</strong> {job.graduationYears.join(", ")}</p>}
      {job.skills?.length > 0 && (
        <ul className="cj-skill-list" aria-label="Required skills">
          {job.skills.slice(0, 6).map((skill) => <li key={skill}>{skill}</li>)}
          {job.skills.length > 6 && <li>+{job.skills.length - 6}</li>}
        </ul>
      )}
      <dl className="cj-job-dates">
        {job.applicationStartDate && <div><dt>Applications open</dt><dd>{formatDate(job.applicationStartDate)}</dd></div>}
        <div><dt>Apply by</dt><dd>{formatDate(job.applicationDeadline)}</dd></div>
        <div><dt>Verified</dt><dd>{formatDate(job.lastVerifiedAt)}</dd></div>
        {job.openings && <div><dt>Openings</dt><dd>{job.openings}</dd></div>}
      </dl>
      <footer className="cj-job-card__actions">
        <Link className="cj-button cj-button--secondary" to={`/career-jobs/${encodeURIComponent(job.slug)}`}>
          View details <ArrowRight size={16} />
        </Link>
        {job.status !== "closed" && job.applicationUrl && (
          <a className="cj-button cj-button--primary" href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
            Apply now <ExternalLink size={15} />
          </a>
        )}
        {job.sourceUrl && <a className="cj-source-link" href={job.sourceUrl} target="_blank" rel="noopener noreferrer">Official source</a>}
      </footer>
    </article>
  );
}

function JobFilters({ filters, categories, onChange, onReset }) {
  return (
    <section className="cj-filter-panel" aria-label="Search and filter jobs">
      <label className="cj-search">
        <Search size={18} aria-hidden="true" />
        <span className="cj-sr-only">Search jobs by title, company, technology, or skill</span>
        <input value={filters.q} onChange={(event) => onChange("q", event.target.value)} placeholder="Search roles, companies, skills…" />
      </label>
      <label><span className="cj-sr-only">Location</span>
        <input value={filters.location} onChange={(event) => onChange("location", event.target.value)} placeholder="Location" />
      </label>
      <label><span className="cj-sr-only">Job category</span>
        <select value={filters.category} onChange={(event) => onChange("category", event.target.value)}>
          <option value="">All job categories</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      </label>
      <label><span className="cj-sr-only">Experience</span>
        <select value={filters.experience} onChange={(event) => onChange("experience", event.target.value)}>
          <option value="">Any experience</option>
          {EXPERIENCE_LEVELS.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <label><span className="cj-sr-only">Employment type</span>
        <select value={filters.employmentType} onChange={(event) => onChange("employmentType", event.target.value)}>
          <option value="">All employment types</option>
          {EMPLOYMENT_TYPES.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <label><span className="cj-sr-only">Work mode</span>
        <select value={filters.workMode} onChange={(event) => onChange("workMode", event.target.value)}>
          <option value="">Any work mode</option>
          {WORK_MODES.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <label><span className="cj-sr-only">Eligible graduation year</span>
        <select value={filters.graduationYear} onChange={(event) => onChange("graduationYear", event.target.value)}>
          <option value="">Any graduation year</option>
          {[2025, 2026, 2027, 2028].map((year) => <option key={year} value={year}>{year} graduates</option>)}
        </select>
      </label>
      <label><span className="cj-sr-only">Job status</span>
        <select value={filters.status} onChange={(event) => onChange("status", event.target.value)}>
          <option value="open">Open opportunities</option>
          <option value="">All statuses</option>
          <option value="closingSoon">Closing soon</option>
          <option value="closed">Closed (for reference)</option>
        </select>
      </label>
      <label><span className="cj-sr-only">Sort jobs</span>
        <select value={filters.sort} onChange={(event) => onChange("sort", event.target.value)}>
          <option value="newest">Newest first</option>
          <option value="deadline">Application deadline</option>
          <option value="company">Company name A–Z</option>
        </select>
      </label>
      <button type="button" className="cj-reset-button" onClick={onReset}>Reset filters</button>
    </section>
  );
}

function JobListing() {
  const [jobs, setJobs] = useState(EMPTY_PAGE);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);
  useListingMetadata();

  useEffect(() => {
    let active = true;
    getJobCategories()
      .then((result) => { if (active) setCategories(result); })
      .catch((requestError) => { if (active) setError(requestError.message); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const result = await getPublicJobs({ ...filters, page, limit: PAGE_SIZE });
        if (active) {
          setJobs(result);
          setError("");
        }
      } catch (requestError) {
        if (active) setError(requestError.message);
      } finally {
        if (active) setLoading(false);
      }
    }, filters.q ? 250 : 0);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [filters, page, reloadToken]);

  const setFilter = (name, value) => {
    setPage(1);
    setFilters((current) => ({ ...current, [name]: value }));
  };

  return (
    <>
      <section className="cj-hero">
        <div className="cj-hero__glow cj-hero__glow--blue" />
        <div className="cj-hero__glow cj-hero__glow--violet" />
        <div className="cj-container cj-hero__content">
          <span className="cj-eyebrow"><span className="cj-pulse" /> CAREER &amp; JOB UPDATES</span>
          <h1>Find your next <span>opportunity.</span></h1>
          <p>Browse technology roles, fresher openings, internships, and hiring drives. Listings link to their official source and are date-verified.</p>
          <a href="#job-listings" className="cj-button cj-button--primary">Explore job updates <ArrowRight size={17} /></a>
          <div className="cj-hero__trust"><CheckCircle2 size={17} /> Verified sources · Clear deadlines · No invented vacancies</div>
        </div>
      </section>

      <main className="cj-container cj-board" id="job-listings">
        <div className="cj-section-heading">
          <div>
            <span className="cj-eyebrow">THE OPPORTUNITY BOARD</span>
            <h2>Latest job updates</h2>
            <p>Every opportunity is added by an administrator after checking the official source.</p>
          </div>
          <span className="cj-listing-count">{jobs.total} {jobs.total === 1 ? "listing" : "listings"}</span>
        </div>

        <JobFilters
          filters={filters}
          categories={categories}
          onChange={setFilter}
          onReset={() => { setFilters(INITIAL_FILTERS); setPage(1); }}
        />

        {error && (
          <div className="cj-state cj-state--error" role="alert">
            <strong>Job updates couldn’t be loaded.</strong>
            <span>{error}</span>
            <button type="button" className="cj-button cj-button--secondary" onClick={() => setReloadToken((value) => value + 1)}>
              <RefreshCw size={16} /> Try again
            </button>
          </div>
        )}
        {loading && <div className="cj-state" role="status"><span className="cj-spinner" /> Loading verified job updates…</div>}
        {!loading && !error && jobs.items.length === 0 && (
          <div className="cj-state cj-state--empty">
            <BriefcaseBusiness size={32} />
            <h3>No published jobs match these filters</h3>
            <p>There are no matching verified listings right now. Try adjusting the filters or check back later.</p>
            <button type="button" className="cj-button cj-button--secondary" onClick={() => { setFilters(INITIAL_FILTERS); setPage(1); }}>Clear filters</button>
          </div>
        )}
        {!error && jobs.items.length > 0 && (
          <div className="cj-job-grid" aria-live="polite">
            {jobs.items.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        )}
        {!error && jobs.pages > 1 && (
          <nav className="cj-pagination" aria-label="Job pages">
            <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((value) => value - 1)}><ArrowLeft size={16} /> Previous</button>
            <span>Page {jobs.page} of {jobs.pages}</span>
            <button type="button" disabled={page >= jobs.pages || loading} onClick={() => setPage((value) => value + 1)}>Next <ArrowRight size={16} /></button>
          </nav>
        )}
      </main>
      <CareerResources />
    </>
  );
}

function JobDetail({ slug }) {
  const [job, setJob] = useState(null);
  const [related, setRelated] = useState([]);
  const [relatedError, setRelatedError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getPublicJob(slug)
      .then(async (result) => {
        if (!active) return;
        setJob(result);
        setRelatedError("");
        try {
          const page = await getPublicJobs({ category: result.category, status: "", limit: 4, sort: "newest" });
          if (active) setRelated(page.items.filter((item) => item.slug !== result.slug).slice(0, 3));
        } catch (requestError) {
          if (active) setRelatedError(requestError.message);
        }
      })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  const structuredJob = useMemo(() => {
    if (!job || !["open", "closingSoon"].includes(job.status) || !job.postedAt || job.workMode === "Remote" || !job.location) return null;
    const data = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: job.title,
      description: job.description,
      datePosted: new Date(job.postedAt).toISOString(),
      employmentType: job.employmentType.toUpperCase().replaceAll("-", "_"),
      hiringOrganization: {
        "@type": "Organization",
        name: job.companyName,
        ...(job.companyLogoUrl ? { logo: job.companyLogoUrl } : {}),
      },
      identifier: { "@type": "PropertyValue", name: job.companyName, value: job.slug },
      url: window.location.href,
    };
    if (job.applicationDeadline) data.validThrough = new Date(job.applicationDeadline).toISOString();
    data.jobLocation = {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.location },
    };
    return data;
  }, [job]);

  useEffect(() => {
    if (!job) return undefined;
    const cleanup = updatePageMetadata({
      title: `${job.title} at ${job.companyName} | 360° Vertex Solutions Jobs`,
      description: `${job.title} — ${job.experience}, ${job.workMode} in ${job.location}. See verified details and apply through the official source.`,
      canonicalUrl: `${window.location.origin}/career-jobs/${encodeURIComponent(job.slug)}`,
      openGraphImage: job.companyLogoUrl,
      structuredJob,
    });
    return cleanup;
  }, [job, structuredJob]);

  if (loading) return <main className="cj-container cj-state" role="status"><span className="cj-spinner" /> Loading job details…</main>;
  if (error || !job) {
    return (
      <main className="cj-container cj-detail-error">
        <Link to="/career-jobs" className="cj-back-link"><ArrowLeft size={16} /> All job updates</Link>
        <div className="cj-state cj-state--error" role="alert">{error || "This job could not be found."}</div>
      </main>
    );
  }

  return (
    <main className="cj-container cj-detail">
      <Link to="/career-jobs" className="cj-back-link"><ArrowLeft size={16} /> All job updates</Link>
      <article className="cj-detail-card">
        <header className="cj-detail-header">
          <CompanyMark job={job} />
          <div className="cj-detail-heading">
            <div className="cj-detail-tags"><span>{job.categoryName}</span><StatusBadge status={job.status} /></div>
            <h1>{job.title}</h1>
            <p>{job.companyName}</p>
          </div>
          {job.status !== "closed" && job.applicationUrl && (
            <a className="cj-button cj-button--primary" href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
              Apply through official site <ExternalLink size={16} />
            </a>
          )}
        </header>
        {job.status === "closed" && <p className="cj-closed-notice">This opportunity is closed. The details remain available for reference.</p>}
        <section className="cj-detail-facts" aria-label="Job summary">
          <div><MapPin size={18} /><span><strong>Location</strong>{job.location} · {job.workMode}</span></div>
          <div><BriefcaseBusiness size={18} /><span><strong>Experience &amp; type</strong>{job.experience} · {job.employmentType}</span></div>
          <div><CalendarDays size={18} /><span><strong>Application deadline</strong>{formatDate(job.applicationDeadline)}</span></div>
          <div><Clock3 size={18} /><span><strong>Last verified</strong>{formatDate(job.lastVerifiedAt)}</span></div>
          {job.openings && <div><Users size={18} /><span><strong>Openings</strong>{job.openings}</span></div>}
          {job.salary && <div><CheckCircle2 size={18} /><span><strong>Officially stated compensation</strong>{job.salary}</span></div>}
          {job.graduationYears?.length > 0 && (
            <div><CheckCircle2 size={18} /><span><strong>Eligible graduation years</strong>{job.graduationYears.join(", ")}</span></div>
          )}
        </section>
        <div className="cj-detail-content">
          <section>
            <h2>About this opportunity</h2>
            <p className="cj-detail-description">{job.description}</p>
          </section>
          {job.qualification && <section><h2>Qualification</h2><p>{job.qualification}</p></section>}
          {job.skills?.length > 0 && <section><h2>Skills</h2><ul className="cj-skill-list">{job.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></section>}
          <section className="cj-official-links">
            <h2>Official information</h2>
            {job.sourceUrl && <a href={job.sourceUrl} target="_blank" rel="noopener noreferrer">Official notification / source <ExternalLink size={15} /></a>}
            {job.notificationFile && <a href={apiUrl(job.notificationFile.url)} target="_blank" rel="noopener noreferrer">Download official notification PDF: {job.notificationFile.name} <ExternalLink size={15} /></a>}
            <p>Information last verified {formatDate(job.lastVerifiedAt)}. Confirm eligibility and current status on the official source before applying.</p>
          </section>
        </div>
      </article>
      {relatedError && <p className="cj-state cj-state--error" role="alert">Related job updates couldn’t be loaded: {relatedError}</p>}
      {related.length > 0 && (
        <section className="cj-related">
          <div className="cj-section-heading"><div><span className="cj-eyebrow">MORE OPPORTUNITIES</span><h2>Related job updates</h2></div></div>
          <div className="cj-job-grid">{related.map((item) => <JobCard key={item.id} job={item} />)}</div>
        </section>
      )}
    </main>
  );
}

function CareerResources() {
  const navigate = useNavigate();
  return (
    <>
      <section className="cj-resources">
        <div className="cj-container">
          <div className="cj-section-heading cj-section-heading--center">
            <div><span className="cj-eyebrow">CAREER SUPPORT</span><h2>Prepare for your next step</h2><p>Practical support to help you present your skills and prepare for interviews.</p></div>
          </div>
          <div className="cj-resource-grid">
            {CAREER_SERVICES.map((service) => (
              <article className="cj-resource-card" key={service.title}>
                <span aria-hidden="true">{service.icon}</span><h3>{service.title}</h3><p>{service.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="cj-final-cta">
        <div className="cj-container">
          <span className="cj-eyebrow">YOUR CAREER, YOUR NEXT MOVE</span>
          <h2>Need help preparing for a role?</h2>
          <p>Talk with our team about your career goals and preparation needs.</p>
          <div className="cj-final-actions">
            <button type="button" className="cj-button cj-button--primary" onClick={() => navigate("/contact")}>Contact our team <ArrowRight size={16} /></button>
            <a className="cj-button cj-button--secondary" href={waLink("Hello, I need help with career preparation.")} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CareerJobsPage() {
  const { jobSlug } = useParams();
  return jobSlug ? <JobDetail key={jobSlug} slug={jobSlug} /> : <JobListing />;
}
