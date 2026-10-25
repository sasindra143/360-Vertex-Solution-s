import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COMPANY, waLink, telLink } from "../../../config";
import "./SEOPage.css";

/* ── Config ── */
const WA_SEO = waLink("Hello 360° Vertex Solutions, I would like to discuss SEO services for my business.");
const MAIL_SEO = `mailto:${COMPANY.email}?subject=SEO Enquiry — 360° Vertex Solutions`;

/* ── Data ── */
const AUDIT_TABS = [
  {
    label: "Technical",
    items: ["Crawlability","Indexability","XML Sitemap","Robots.txt","Canonical URLs","Redirects","Broken Links","HTTPS","Mobile Usability","Page Speed"],
  },
  {
    label: "On-Page",
    items: ["Title Tags","Meta Descriptions","Headings (H1-H6)","URL Structure","Internal Links","Image Alt Text","Content Structure","Canonical Tags"],
  },
  {
    label: "Content",
    items: ["Search Intent Alignment","Content Quality","Topic Coverage","Duplicate Content","Content Gaps","Readability","Freshness"],
  },
  {
    label: "Performance",
    items: ["Page Speed","Core Web Vitals","Image Optimization","JavaScript","CSS Optimization","Server Response","Caching","Compression"],
  },
  {
    label: "Local",
    items: ["Google Business Profile","Location Pages","NAP Consistency","Local Citations","Review Signals","Local Schema"],
  },
  {
    label: "Schema",
    items: ["Organization","LocalBusiness","Article","Product","BreadcrumbList","FAQPage","WebSite","Service"],
  },
];

const SERVICES = [
  {
    icon: "🔍", title: "SEO Audit",
    desc: "A comprehensive analysis of your website's current search visibility and technical health.",
    items: ["Technical structure","Indexability","Metadata","Content quality","Internal links","Page performance","Mobile experience","Structured data"],
    cta: "Request SEO Audit",
  },
  {
    icon: "🎯", title: "Keyword Research",
    desc: "Research and identify relevant search terms aligned with your audience's search behaviour.",
    items: ["Search term analysis","Search intent mapping","Topic opportunities","Commercial intent","Informational intent","Local search terms"],
  },
  {
    icon: "📄", title: "On-Page SEO",
    desc: "Optimize each important page for relevance, structure and search engine understanding.",
    items: ["Title tags","Meta descriptions","Heading structure","Content optimization","URL structure","Image alt text","Internal linking","Canonical URLs"],
  },
  {
    icon: "⚙️", title: "Technical SEO",
    desc: "Build a strong technical foundation that helps search engines access and understand your website.",
    items: ["Crawlability","Indexability","Site architecture","Sitemap","Robots.txt","Canonicalization","Redirects","HTTPS","Mobile usability"],
  },
  {
    icon: "✍️", title: "Content SEO",
    desc: "Create and optimize useful, relevant content aligned with what your audience is searching for.",
    items: ["Content strategy","Topic research","Content briefs","Existing content optimization","Search intent alignment","Internal linking strategy"],
  },
  {
    icon: "📍", title: "Local SEO",
    desc: "Improve visibility for location-based searches for businesses that serve specific areas.",
    items: ["Google Business Profile","Local keyword research","Location pages","NAP consistency","Review guidance","Local citations","Local structured data"],
  },
  {
    icon: "🛒", title: "E-Commerce SEO",
    desc: "Help customers discover your products through search with optimized pages and structure.",
    items: ["Product page optimization","Category pages","Product schema","Breadcrumbs","Faceted navigation","Image optimization","Internal linking"],
  },
  {
    icon: "💻", title: "SEO for Web Apps",
    desc: "Address the unique technical challenges of JavaScript-heavy and dynamic web applications.",
    items: ["JavaScript rendering","URL architecture","Indexable content","Server-side rendering","Metadata","Technical performance"],
  },
  {
    icon: "🔗", title: "Link Building / Digital PR",
    desc: "Build website authority through ethical, content-led link acquisition strategies.",
    items: ["Link opportunity research","Digital PR strategy","Content-led authority building","Outreach strategy","Quality over quantity"],
  },
  {
    icon: "📊", title: "SEO Monitoring",
    desc: "Track, measure and analyse organic search performance on an ongoing basis.",
    items: ["Organic clicks & impressions","Search queries","Indexed pages","Technical issues","Landing-page performance","Conversion tracking"],
  },
];

const PROCESS = [
  { num:"01", icon:"🔍", title:"Discover",    desc:"Understand the business, audience, market and goals." },
  { num:"02", icon:"🔎", title:"Audit",       desc:"Analyse the existing website and search visibility." },
  { num:"03", icon:"📚", title:"Research",    desc:"Research keywords, topics, competitors and search intent." },
  { num:"04", icon:"🗺️", title:"Strategize",  desc:"Create a prioritised SEO roadmap." },
  { num:"05", icon:"⚙️", title:"Optimize",    desc:"Improve technical SEO, content and website structure." },
  { num:"06", icon:"📝", title:"Publish",     desc:"Create or improve useful, search-focused content." },
  { num:"07", icon:"📊", title:"Measure",     desc:"Monitor organic search performance continuously." },
  { num:"08", icon:"🔄", title:"Improve",     desc:"Continuously test, optimize and refine the strategy." },
];

const WHY_MATTERS = [
  { num:"01", icon:"👁️", title:"Discoverability",       desc:"Help potential customers discover relevant pages through organic search." },
  { num:"02", icon:"🎯", title:"Relevance",              desc:"Align website content with user search intent for better engagement." },
  { num:"03", icon:"🏗️", title:"Technical Foundation",  desc:"Improve website structure and accessibility for search engines and users." },
  { num:"04", icon:"✍️", title:"Content",               desc:"Create useful, relevant and well-structured content that answers real questions." },
  { num:"05", icon:"📍", title:"Local Visibility",       desc:"Improve visibility for location-based searches where relevant." },
  { num:"06", icon:"📈", title:"Measurement",            desc:"Track organic search performance and identify opportunities for improvement." },
];

const WHY_US = [
  { num:"01", icon:"⚡", title:"Technical + Marketing",   desc:"Combine SEO strategy with deep technology expertise for complete solutions." },
  { num:"02", icon:"🎯", title:"Business Focus",          desc:"We understand the business objective behind every search visibility goal." },
  { num:"03", icon:"🛠️", title:"Practical Strategy",     desc:"We prioritize actionable, measurable improvements that move the needle." },
  { num:"04", icon:"📊", title:"Transparent Reporting",  desc:"Clearly communicate work completed, data measured and next steps." },
  { num:"05", icon:"🤖", title:"AI Ready",               desc:"Use appropriate AI and automation workflows to support SEO efficiently." },
  { num:"06", icon:"🔄", title:"Long-term Approach",     desc:"SEO is treated as an ongoing improvement process, not a one-time task." },
];

const PACKAGES = [
  {
    name: "Starter SEO",
    tagline: "For small websites and early-stage businesses.",
    features: ["SEO Audit","Keyword Research","On-Page SEO","Technical Recommendations","Basic Reporting"],
    featured: false,
  },
  {
    name: "Growth SEO",
    tagline: "For growing businesses building organic visibility.",
    features: ["Technical SEO","Keyword Strategy","Content Strategy","On-Page SEO","Local SEO (where applicable)","Continuous Optimization","Monthly Reporting"],
    featured: true,
  },
  {
    name: "Advanced SEO",
    tagline: "For larger websites and complex requirements.",
    features: ["Complete Technical SEO","Content Strategy & Execution","E-Commerce / Large Site SEO","Advanced Analytics & Reporting","Structured Data Implementation","AI-Assisted Workflows","Ongoing Optimization"],
    featured: false,
  },
];

const FAQS = [
  { q: "What is SEO?", a: "SEO (Search Engine Optimization) is the process of improving a website's technical structure, content and relevance so that search engines can better understand its pages and users can discover relevant information through organic search results." },
  { q: "How long does SEO take?", a: "SEO is a long-term process. Meaningful improvement in organic search visibility typically takes 3–6 months or more depending on the competitiveness of the market, the current state of the website and the scope of work. Results are not instant." },
  { q: "Can you guarantee Google rankings?", a: "No. We do not guarantee specific Google rankings. Search engine algorithms consider hundreds of factors and are controlled by Google. We focus on applying best practices, improving technical and content quality, and continuously measuring performance — but we cannot control where your website ranks." },
  { q: "What does an SEO audit include?", a: "An SEO audit typically covers technical health (crawlability, indexability, site speed, mobile usability), on-page elements (titles, headings, metadata, URLs), content quality, internal linking, structured data and search visibility analysis." },
  { q: "Do you provide local SEO?", a: "Yes. For eligible businesses, we can help optimize Google Business Profile, build location pages, improve NAP consistency, guide review strategy and implement local structured data. We do not claim guaranteed local pack rankings." },
  { q: "Do you work with e-commerce websites?", a: "Yes. We can optimize product pages, category pages, product schema, breadcrumb navigation, internal linking, image optimization and the overall technical architecture of e-commerce websites." },
  { q: "Do you provide content optimization?", a: "Yes. Content SEO is a core part of our service, covering content strategy, topic research, content briefs, existing page optimization and new content planning aligned with search intent." },
  { q: "Can you optimize an existing website?", a: "Yes. A large part of SEO work involves improving existing websites — fixing technical issues, improving metadata, restructuring content, optimizing page speed and addressing crawlability problems." },
  { q: "Can you build an SEO-friendly website?", a: "Yes. We can combine SEO strategy with our Technology division to build websites with SEO-ready architecture, semantic HTML, responsive design, performance optimization, structured data, clean URLs and Search Console integration." },
  { q: "Do you provide monthly SEO reports?", a: "Yes. Periodic reports typically include an executive summary, organic search trends, top queries and pages, technical issues, content performance and upcoming priorities." },
  { q: "Can AI be used for SEO?", a: "AI can support certain SEO workflows such as content research, topic clustering, search-query classification, data analysis and reporting assistance. Human review of AI-assisted work remains important for quality and accuracy." },
  { q: "How do I get started?", a: "You can request a free SEO audit using the form below, or reach out directly via WhatsApp or email. We'll start by understanding your website, business goals and current search visibility." },
];

const RELATED = [
  { icon:"📍", label:"Local SEO",          path:"/digital-marketing/local-seo" },
  { icon:"✍️", label:"Content Marketing",  path:"/digital-marketing/content-marketing" },
  { icon:"🏢", label:"Google Business",    path:"/digital-marketing/google-business-profile" },
  { icon:"📊", label:"Analytics",          path:"/digital-marketing/analytics-reporting" },
  { icon:"💻", label:"Web Development",    path:"/technology" },
  { icon:"🤖", label:"AI Automation",      path:"/digital-marketing/ai-automation" },
];

const ARCH_STEPS = [
  { icon:"👤", title:"User Searches",         desc:"A person types a query into a search engine." },
  { icon:"🤖", title:"Crawler Discovers",     desc:"Search engine crawlers find and visit your website's URLs." },
  { icon:"🧠", title:"Page is Understood",    desc:"The search engine parses HTML, content, links and structured data." },
  { icon:"🗂️", title:"Page is Indexed",       desc:"The page is added to the search engine's index if it meets quality standards." },
  { icon:"🏆", title:"Results Displayed",     desc:"The search engine returns relevant results based on many ranking signals." },
  { icon:"📱", title:"User Visits",           desc:"The user clicks a result and visits your website." },
];

const TECH_TAGS = ["Semantic HTML","Clean URLs","XML Sitemap","Robots.txt","Canonical URLs","301 Redirects","404 Handling","HTTPS","Mobile Responsiveness","Structured Data","Internal Linking","Performance Optimization"];

const AI_APPS = [
  { icon:"🔍", label:"Content Research",     desc:"Find topics and questions worth creating content for." },
  { icon:"🗂️", label:"Topic Clustering",     desc:"Group related topics for content strategy planning." },
  { icon:"📝", label:"Content Briefs",       desc:"Generate outlines and briefs for content writers." },
  { icon:"🔗", label:"Internal Link Suggestions", desc:"Identify linking opportunities across site content." },
  { icon:"📊", label:"Data Analysis",        desc:"Process large SEO datasets more efficiently." },
  { icon:"🏷️", label:"Query Classification",  desc:"Categorize search queries by intent at scale." },
  { icon:"📋", label:"Reporting Assistance",  desc:"Support in compiling and summarising performance data." },
  { icon:"⚙️", label:"SEO Automation",        desc:"Automate repetitive technical checks and audits." },
];

const WEBDEV_FEATURES = ["SEO-ready architecture","Semantic HTML","Responsive design","Page performance","Metadata control","Structured data","Clean URLs","XML Sitemap","Analytics integration","Search Console setup"];

const REPORT_SECTIONS = ["Executive Summary","Technical Issues Found","Organic Search Trends","Top Queries","Top Landing Pages","Content Performance","Conversions (if tracking configured)","Local Search Performance","Completed Work","Next Priorities"];

const DASHBOARD_BARS = [30,55,40,70,60,80,65,90,75,85,70,95];

/* ── Sub-components ── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`seo-faq__item${open ? " seo-faq__item--open" : ""}`}>
      <button
        className="seo-faq__q"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="seo-faq__q-text">{q}</span>
        <span className="seo-faq__chevron" aria-hidden="true">▾</span>
      </button>
      {open && <div className="seo-faq__a">{a}</div>}
    </div>
  );
}

/* ── Main Component ── */
export default function SEOPage() {
  const navigate = useNavigate();
  const [auditTab, setAuditTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "", business: "", email: "", phone: "", website: "",
    businessType: "", location: "", service: "", challenges: "",
    competitors: "", info: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="seo-page">
      {/* ── SEO Metadata ── */}
      <title>SEO Services | Search Engine Optimization | 360° Vertex Solutions</title>

      {/* ── BREADCRUMBS ── */}
      <div className="seo-ct">
        <nav className="seo-breadcrumb" aria-label="Breadcrumb">
          <button onClick={() => navigate("/")}>Home</button>
          <span>›</span>
          <button onClick={() => navigate("/digital-marketing")}>Digital Marketing</button>
          <span>›</span>
          <span className="seo-breadcrumb__active">SEO</span>
        </nav>
      </div>

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="seo-hero" aria-label="SEO Hero">
        <div className="seo-hero__bg" aria-hidden="true" />
        <div className="seo-hero__grid-overlay" aria-hidden="true" />
        <div className="seo-ct">
          <div className="seo-hero__inner">
            {/* Left */}
            <div className="seo-hero__content">
              <div className="seo-hero__eyebrow">
                <span className="seo-hero__eyebrow-dot" aria-hidden="true" />
                DIGITAL MARKETING • SEO
              </div>
              <h1 className="seo-hero__title">
                Get Found by the<br />
                <span className="seo-grad-text">Right Audience.</span>
              </h1>
              <p className="seo-hero__title-alt">
                Turn Search Visibility Into Digital Growth.
              </p>
              <p className="seo-hero__desc">
                We help businesses improve their organic search visibility through technical SEO, content optimization, keyword research, local SEO and continuous performance analysis.
              </p>
              <div className="seo-hero__ctas">
                <button
                  id="hero-cta-audit"
                  className="seo-btn seo-btn--primary"
                  onClick={() => document.getElementById("seo-audit-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Get an SEO Audit
                </button>
                <button
                  id="hero-cta-build"
                  className="seo-btn seo-btn--outline"
                  onClick={() => navigate("/contact")}
                >
                  Build With Us
                </button>
                <a
                  id="hero-cta-wa"
                  href={WA_SEO}
                  target="_blank" rel="noopener noreferrer"
                  className="seo-btn seo-btn--wa"
                >
                  💬 WhatsApp Us
                </a>
              </div>
              <div className="seo-hero__quick">
                <span className="seo-hero__quick-item">
                  <span>📞</span>
                  <a href={telLink}>{COMPANY.phone}</a>
                </span>
                <span className="seo-hero__quick-item">
                  <span>✉️</span>
                  <a href={MAIL_SEO}>{COMPANY.email}</a>
                </span>
              </div>
            </div>

            {/* Right — Visual */}
            <div className="seo-hero__visual" aria-hidden="true">
              <div className="seo-hero__viz">
                <div className="seo-viz__orb seo-viz__orb--1" />
                <div className="seo-viz__orb seo-viz__orb--2" />
                <div className="seo-viz__ring seo-viz__ring--1" />
                <div className="seo-viz__ring seo-viz__ring--2" />
                <div className="seo-viz__ring seo-viz__ring--3" />
                <div className="seo-viz__center">
                  <img className="seo-viz__brand-logo" src="/vertex-solutions-logo.png" alt="" />
                  <div className="seo-viz__center-label">SEO</div>
                </div>
                <div className="seo-viz__node seo-viz__node--1"><span className="seo-viz__node-icon">🌐</span>Search Engine</div>
                <div className="seo-viz__node seo-viz__node--2"><span className="seo-viz__node-icon">💻</span>Website</div>
                <div className="seo-viz__node seo-viz__node--3"><span className="seo-viz__node-icon">📝</span>Content</div>
                <div className="seo-viz__node seo-viz__node--4"><span className="seo-viz__node-icon">👥</span>Users</div>
                <div className="seo-viz__node seo-viz__node--5"><span className="seo-viz__node-icon">📈</span>Growth</div>
                <div className="seo-viz__node seo-viz__node--6"><span className="seo-viz__node-icon">⚙️</span>Technical</div>
                <div className="seo-viz__node seo-viz__node--7"><span className="seo-viz__node-icon">🔑</span>Keywords</div>
                <div className="seo-viz__node seo-viz__node--8"><span className="seo-viz__node-icon">📊</span>Analytics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          VALUE STRIP
          ============================================================ */}
      <div className="seo-strip">
        <div className="seo-ct">
          <div className="seo-strip__inner">
            <div className="seo-strip__items">
              {["Technical SEO","Content","Keywords","Local SEO","Authority","Analytics"].map((item) => (
                <span key={item} className="seo-strip__item">
                  <span className="seo-strip__item-dot" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
            <p className="seo-strip__text">An integrated approach to sustainable organic search visibility.</p>
          </div>
        </div>
      </div>

      {/* ============================================================
          WHAT IS SEO
          ============================================================ */}
      <section className="seo-section" aria-labelledby="what-is-seo-heading">
        <div className="seo-ct">
          <div className="seo-what__grid">
            <div className="seo-what__text">
              <span className="seo-section-label">UNDERSTANDING SEO</span>
              <h2 className="seo-section-title" id="what-is-seo-heading">What Is SEO?</h2>
              <p>
                Search Engine Optimization is the process of improving a website's technical structure, content, relevance and overall search experience to help search engines understand its pages and help users discover relevant information through organic search.
              </p>
              <p>
                Unlike paid advertising, organic search visibility is built over time through consistent technical improvement, useful content and a positive user experience. SEO is not a one-time activity — it requires ongoing analysis, refinement and adaptation as search engine algorithms and user behaviour evolve.
              </p>
              <div className="seo-what__note">
                Note: SEO improves the conditions for organic visibility. It does not guarantee specific ranking positions, as search results are determined by search engine algorithms.
              </div>
            </div>
            <div>
              <div className="seo-flow" aria-label="SEO process flow">
                {[
                  { icon:"🤖", label:"Crawl",    sub:"Search engine discovers your URLs" },
                  { icon:"🧠", label:"Understand",sub:"Content and structure are analysed" },
                  { icon:"🗂️", label:"Index",    sub:"Page is stored in the search index" },
                  { icon:"🏆", label:"Rank",      sub:"Page is ordered against competing results" },
                  { icon:"👁️", label:"Discover",  sub:"Users see your page in search results" },
                  { icon:"📱", label:"Visit",     sub:"User clicks through to your website" },
                ].map((step, i, arr) => (
                  <div key={step.label} className="seo-flow__item">
                    <div className="seo-flow__box">
                      <span className="seo-flow__icon" aria-hidden="true">{step.icon}</span>
                      <div>
                        <div className="seo-flow__label">{step.label}</div>
                        <div className="seo-flow__sub">{step.sub}</div>
                      </div>
                    </div>
                    {i < arr.length - 1 && <div className="seo-flow__arrow" aria-hidden="true" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY SEO MATTERS
          ============================================================ */}
      <section className="seo-section seo-section--alt" aria-labelledby="why-seo-heading">
        <div className="seo-ct">
          <div className="seo-section-header seo-section-header--center">
            <span className="seo-section-label">BUSINESS VALUE</span>
            <h2 className="seo-section-title" id="why-seo-heading">Why SEO Matters for Your Business</h2>
          </div>
          <div className="seo-why__grid">
            {WHY_MATTERS.map((item) => (
              <article key={item.num} className="seo-why-card">
                <div className="seo-why-card__num">{item.num}</div>
                <div className="seo-why-card__icon" aria-hidden="true">{item.icon}</div>
                <h3 className="seo-why-card__title">{item.title}</h3>
                <p className="seo-why-card__desc">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SEO SERVICES
          ============================================================ */}
      <section className="seo-section" aria-labelledby="seo-services-heading">
        <div className="seo-ct">
          <div className="seo-section-header seo-section-header--center">
            <span className="seo-section-label">OUR EXPERTISE</span>
            <h2 className="seo-section-title" id="seo-services-heading">Complete SEO Services</h2>
            <p className="seo-section-desc">
              A complete range of SEO services designed to improve technical quality, content relevance and organic search performance.
            </p>
          </div>
          <div className="seo-services__grid">
            {SERVICES.map((svc) => (
              <article key={svc.title} className="seo-svc-card">
                <div className="seo-svc-card__header">
                  <div className="seo-svc-card__icon" aria-hidden="true">{svc.icon}</div>
                  <h3 className="seo-svc-card__title">{svc.title}</h3>
                </div>
                <p className="seo-svc-card__desc">{svc.desc}</p>
                <ul className="seo-svc-card__list">
                  {svc.items.map(item => <li key={item}>{item}</li>)}
                </ul>
                {svc.cta && (
                  <button
                    className="seo-btn seo-btn--outline seo-btn--sm"
                    onClick={() => document.getElementById("seo-audit-form")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    {svc.cta}
                  </button>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SEO PROCESS
          ============================================================ */}
      <section className="seo-section seo-section--dark" aria-labelledby="seo-process-heading">
        <div className="seo-ct">
          <div className="seo-section-header seo-section-header--center">
            <span className="seo-section-label">HOW WE WORK</span>
            <h2 className="seo-section-title" id="seo-process-heading">Our SEO Process</h2>
            <p className="seo-section-desc">A structured, repeatable approach to improving organic search visibility over time.</p>
          </div>
          <div className="seo-process">
            {PROCESS.slice(0,4).map((step) => (
              <div key={step.num} className="seo-process-step">
                <div className="seo-process-step__circle" aria-hidden="true">
                  <div className="seo-process-step__num">STEP {step.num}</div>
                  <div className="seo-process-step__icon">{step.icon}</div>
                </div>
                <h3 className="seo-process-step__title">{step.title}</h3>
                <p className="seo-process-step__desc">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="seo-process-row2">
            {PROCESS.slice(4).map((step) => (
              <div key={step.num} className="seo-process-step">
                <div className="seo-process-step__circle" aria-hidden="true">
                  <div className="seo-process-step__num">STEP {step.num}</div>
                  <div className="seo-process-step__icon">{step.icon}</div>
                </div>
                <h3 className="seo-process-step__title">{step.title}</h3>
                <p className="seo-process-step__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SEO AUDIT CHECKLIST
          ============================================================ */}
      <section className="seo-section" aria-labelledby="seo-audit-heading">
        <div className="seo-ct">
          <div className="seo-section-header">
            <span className="seo-section-label">AUDIT SCOPE</span>
            <h2 className="seo-section-title" id="seo-audit-heading">What We Check During an SEO Audit</h2>
            <p className="seo-section-desc">A thorough SEO audit covers every dimension of your website's search visibility and technical health.</p>
          </div>
          <div className="seo-audit__tabs" role="tablist" aria-label="Audit categories">
            {AUDIT_TABS.map((tab, i) => (
              <button
                key={tab.label}
                role="tab"
                aria-selected={auditTab === i}
                aria-controls={`audit-panel-${i}`}
                className={`seo-audit__tab${auditTab === i ? " seo-audit__tab--active" : ""}`}
                onClick={() => setAuditTab(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div
            className="seo-audit__panel"
            id={`audit-panel-${auditTab}`}
            role="tabpanel"
            aria-label={`${AUDIT_TABS[auditTab].label} audit items`}
          >
            {AUDIT_TABS[auditTab].items.map((item) => (
              <div key={item} className="seo-audit__check">
                <div className="seo-audit__check-icon" aria-hidden="true">✓</div>
                <span className="seo-audit__check-label">{item}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <button
              id="audit-cta-form"
              className="seo-btn seo-btn--primary"
              onClick={() => document.getElementById("seo-audit-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Request a Full SEO Audit
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          TECHNICAL SEO ARCHITECTURE
          ============================================================ */}
      <section className="seo-section seo-section--alt" aria-labelledby="tech-seo-heading">
        <div className="seo-ct">
          <div className="seo-arch">
            <div>
              <span className="seo-section-label">TECHNICAL FOUNDATION</span>
              <h2 className="seo-section-title" id="tech-seo-heading">Technical SEO That Builds a Strong Foundation</h2>
              <p className="seo-section-desc">
                Technical SEO helps search engines access, crawl, understand and index your website's content efficiently. A strong technical foundation is the basis for all other SEO work.
              </p>
              <div className="seo-arch__tags">
                {TECH_TAGS.map(tag => (
                  <span key={tag} className="seo-arch__tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="seo-arch__flow" aria-label="Technical SEO flow">
              {ARCH_STEPS.map((step, i, arr) => (
                <div key={step.title} className="seo-arch__step">
                  <div className="seo-arch__step-left">
                    <div className="seo-arch__step-dot" aria-hidden="true">{step.icon}</div>
                    {i < arr.length - 1 && <div className="seo-arch__step-line" aria-hidden="true" />}
                  </div>
                  <div className="seo-arch__step-content">
                    <div className="seo-arch__step-title">{step.title}</div>
                    <div className="seo-arch__step-desc">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ON-PAGE SEO
          ============================================================ */}
      <section className="seo-section" aria-labelledby="onpage-seo-heading">
        <div className="seo-ct">
          <div className="seo-onpage__grid">
            <div>
              <span className="seo-section-label">ON-PAGE OPTIMIZATION</span>
              <h2 className="seo-section-title" id="onpage-seo-heading">Optimize Every Important Page</h2>
              <p className="seo-section-desc">
                Each important page should have a clear purpose, relevant content, logical headings and appropriate metadata. On-page SEO ensures search engines and users can understand each page's topic and value.
              </p>
              <div style={{ marginTop: "24px" }}>
                {[
                  { label:"H1 — Primary Heading",  desc:"One clear H1 per page describing the topic" },
                  { label:"H2 / H3 — Structure",   desc:"Logical heading hierarchy for readability" },
                  { label:"Title Tag",              desc:"Unique, descriptive title under 60 characters" },
                  { label:"Meta Description",       desc:"Compelling description that matches page content" },
                  { label:"Clean URL",              desc:"Short, descriptive URL structure" },
                  { label:"Relevant Content",       desc:"Useful, original content aligned with search intent" },
                  { label:"Internal Links",         desc:"Links to related relevant pages" },
                  { label:"Image Alt Text",         desc:"Descriptive alt attributes for images" },
                ].map(item => (
                  <div key={item.label} className="seo-local__svc">
                    <span className="seo-local__svc-icon" aria-hidden="true">›</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--seo-txt1)" }}>{item.label}</div>
                      <div style={{ fontSize: "12px", color: "var(--seo-txt3)", marginTop: "2px" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="seo-page-mock" aria-label="Webpage structure visualization">
                <div className="seo-page-mock__bar" aria-hidden="true">
                  <div className="seo-page-mock__dot seo-page-mock__dot--r" />
                  <div className="seo-page-mock__dot seo-page-mock__dot--y" />
                  <div className="seo-page-mock__dot seo-page-mock__dot--g" />
                </div>
                <div className="seo-page-mock__url">https://yourwebsite.com/your-page</div>
                {[
                  { el:"seo-page-mock__el--meta", label:"Title Tag", badge:"SEO", color:"#8e2de2" },
                  { el:"seo-page-mock__el--meta", label:"Meta Description", badge:"SEO", color:"#8e2de2" },
                  { el:"seo-page-mock__el--url",  label:"Clean URL", badge:"URL", color:"#10b981" },
                  { el:"seo-page-mock__el--h1",   label:"H1 — Page Heading", badge:"H1", color:"#0072ff" },
                  { el:"seo-page-mock__el--h2",   label:"H2 — Section Heading", badge:"H2", color:"#00c6ff" },
                  { el:"seo-page-mock__el--h2",   label:"Content Block", badge:"Content", color:"#00c6ff" },
                  { el:"seo-page-mock__el--img",  label:"Image + Alt Text", badge:"IMG", color:"#f59e0b" },
                  { el:"seo-page-mock__el--link", label:"Internal Links", badge:"Links", color:"#ef4444" },
                  { el:"seo-page-mock__el--schema",label:"Structured Data", badge:"Schema", color:"#6366f1" },
                ].map(item => (
                  <div key={item.label} className={`seo-page-mock__element ${item.el}`} style={{ color: "var(--seo-txt1)" }}>
                    <span style={{ fontSize: "13px" }}>{item.label}</span>
                    <span className="seo-page-mock__element-badge" style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}>{item.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTENT SEO
          ============================================================ */}
      <section className="seo-section seo-section--dark" aria-labelledby="content-seo-heading">
        <div className="seo-ct">
          <div className="seo-section-header seo-section-header--center">
            <span className="seo-section-label">CONTENT STRATEGY</span>
            <h2 className="seo-section-title" id="content-seo-heading">Content That Answers Real Questions</h2>
            <p className="seo-section-desc">
              Content should be original, useful and written for people first. Search engine optimization is a positive by-product of genuinely helpful content.
            </p>
          </div>
          <div className="seo-content-flow" aria-label="Content strategy flow">
            {["Audience","Search Intent","Keyword Research","Topic","Content","Internal Links","Search Visibility"].map((step, i, arr) => (
              <div key={step} className="seo-content-flow__item">
                <div className="seo-content-flow__box">{step}</div>
                {i < arr.length - 1 && <span className="seo-content-flow__arrow" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
          <div className="seo-content-types" aria-label="Content types">
            {[
              { icon:"📝", label:"Blog Articles" },
              { icon:"📄", label:"Service Pages" },
              { icon:"📍", label:"Location Pages" },
              { icon:"🛒", label:"Product Pages" },
              { icon:"📚", label:"Guides" },
              { icon:"🎓", label:"Tutorials" },
              { icon:"❓", label:"FAQs" },
              { icon:"📊", label:"Case Studies" },
            ].map(ct => (
              <div key={ct.label} className="seo-content-type">
                <div className="seo-content-type__icon" aria-hidden="true">{ct.icon}</div>
                <div className="seo-content-type__label">{ct.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          LOCAL SEO
          ============================================================ */}
      <section className="seo-section seo-section--alt" aria-labelledby="local-seo-heading">
        <div className="seo-ct">
          <div className="seo-local__grid">
            <div>
              <span className="seo-section-label">LOCAL SEARCH</span>
              <h2 className="seo-section-title" id="local-seo-heading">Be Visible Where Your Customers Search</h2>
              <p className="seo-section-desc">
                For businesses that serve specific locations, local SEO helps improve visibility in location-based searches. We do not claim guaranteed local pack rankings.
              </p>
              <div className="seo-local__targets">
                {["Local Businesses","Startups","Service Businesses","Training Institutes","Professional Services","Retail Businesses"].map(t => (
                  <span key={t} className="seo-local__target">{t}</span>
                ))}
              </div>
              <div style={{ marginTop: "32px" }}>
                <button
                  id="local-seo-cta"
                  className="seo-btn seo-btn--outline"
                  onClick={() => navigate("/digital-marketing/local-seo")}
                >
                  Explore Local SEO →
                </button>
              </div>
            </div>
            <div className="seo-local__services">
              {[
                { icon:"📍", text:"Google Business Profile optimization" },
                { icon:"🔑", text:"Local keyword research and targeting" },
                { icon:"🗺️", text:"Location pages for service areas" },
                { icon:"📝", text:"Local content creation" },
                { icon:"⭐", text:"Review strategy guidance" },
                { icon:"🔗", text:"NAP consistency across citations" },
                { icon:"📊", text:"Local analytics and reporting" },
                { icon:"🏷️", text:"Local structured data implementation" },
              ].map(s => (
                <div key={s.text} className="seo-local__svc">
                  <span className="seo-local__svc-icon" aria-hidden="true">{s.icon}</span>
                  <span className="seo-local__svc-text">{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          E-COMMERCE SEO
          ============================================================ */}
      <section className="seo-section" aria-labelledby="ecom-seo-heading">
        <div className="seo-ct">
          <div className="seo-section-header">
            <span className="seo-section-label">E-COMMERCE</span>
            <h2 className="seo-section-title" id="ecom-seo-heading">Help Customers Discover Your Products</h2>
            <p className="seo-section-desc">Improve how search engines understand and display your product and category pages.</p>
          </div>
          <div className="seo-ecom__grid">
            {[
              { icon:"📦", title:"Product Page SEO",      desc:"Optimized titles, descriptions, schema and images for individual products." },
              { icon:"🗂️", title:"Category Page SEO",     desc:"Clear taxonomy, internal linking and content for category pages." },
              { icon:"🏷️", title:"Product Schema",         desc:"Structured data to help search engines understand product attributes." },
              { icon:"🔗", title:"Breadcrumb Navigation",  desc:"Clear breadcrumb trails for users and structured data for search engines." },
              { icon:"🖼️", title:"Image Optimization",    desc:"Alt text, file names, compression and responsive images." },
              { icon:"⚙️", title:"Faceted Navigation",    desc:"Strategic approach to indexation for filter-based navigation." },
              { icon:"📱", title:"Mobile Optimization",   desc:"Fast, usable product pages on all devices." },
              { icon:"📊", title:"Indexation Strategy",   desc:"Controlling which pages are indexed for efficient crawl budget use." },
              { icon:"🔍", title:"Search-Friendly URLs",  desc:"Clean, descriptive URL structures for product and category pages." },
            ].map(c => (
              <article key={c.title} className="seo-ecom-card">
                <div className="seo-ecom-card__icon" aria-hidden="true">{c.icon}</div>
                <h3 className="seo-ecom-card__title">{c.title}</h3>
                <p className="seo-ecom-card__desc">{c.desc}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <button
              id="ecom-seo-cta"
              className="seo-btn seo-btn--outline"
              onClick={() => navigate("/contact?service=seo")}
            >
              Optimize My Store
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          SEO + WEBSITE DEVELOPMENT
          ============================================================ */}
      <section className="seo-section seo-section--alt" aria-labelledby="seo-webdev-heading">
        <div className="seo-ct">
          <div className="seo-webdev__grid">
            <div>
              <span className="seo-section-label">SEO + TECHNOLOGY</span>
              <h2 className="seo-section-title" id="seo-webdev-heading">SEO Starts With the Website</h2>
              <p className="seo-section-desc">
                We can combine SEO strategy with technical website development so that search visibility is considered throughout the development process — not added as an afterthought.
              </p>
              <p style={{ fontSize: "15px", color: "var(--seo-txt2)", lineHeight: "1.8", marginTop: "16px" }}>
                An SEO-ready website provides a strong foundation for organic growth from day one.
              </p>
              <div className="seo-webdev__features">
                {WEBDEV_FEATURES.map(f => (
                  <div key={f} className="seo-webdev__feature">{f}</div>
                ))}
              </div>
              <div style={{ marginTop: "32px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button
                  id="webdev-seo-cta"
                  className="seo-btn seo-btn--primary"
                  onClick={() => navigate("/contact?service=seo")}
                >
                  Build an SEO-Ready Website
                </button>
                <button
                  className="seo-btn seo-btn--outline"
                  onClick={() => navigate("/technology")}
                >
                  Explore Technology →
                </button>
              </div>
            </div>
            <div>
              <div className="seo-page-mock">
                <div className="seo-page-mock__bar" aria-hidden="true">
                  <div className="seo-page-mock__dot seo-page-mock__dot--r" />
                  <div className="seo-page-mock__dot seo-page-mock__dot--y" />
                  <div className="seo-page-mock__dot seo-page-mock__dot--g" />
                </div>
                <div className="seo-page-mock__url">SEO + Development Integration</div>
                {[
                  { el:"seo-page-mock__el--h1",   label:"SEO Strategy",         color:"#0072ff" },
                  { el:"seo-page-mock__el--h2",   label:"Technical Architecture",color:"#00c6ff" },
                  { el:"seo-page-mock__el--meta", label:"Metadata System",       color:"#8e2de2" },
                  { el:"seo-page-mock__el--url",  label:"Clean URL Structure",   color:"#10b981" },
                  { el:"seo-page-mock__el--schema",label:"Structured Data",      color:"#6366f1" },
                  { el:"seo-page-mock__el--img",  label:"Performance Optimized", color:"#f59e0b" },
                  { el:"seo-page-mock__el--link", label:"Analytics + Search Console",color:"#ef4444" },
                ].map(item => (
                  <div key={item.label} className={`seo-page-mock__element ${item.el}`} style={{ color: "var(--seo-txt1)", justifyContent: "flex-start", gap: "8px" }}>
                    <span aria-hidden="true" style={{ color: item.color }}>✓</span>
                    <span style={{ fontSize: "13px" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SEO + AI
          ============================================================ */}
      <section className="seo-section seo-section--dark" aria-labelledby="seo-ai-heading">
        <div className="seo-ct">
          <div className="seo-ai__grid">
            <div>
              <span className="seo-section-label">AI + AUTOMATION</span>
              <h2 className="seo-section-title" id="seo-ai-heading">AI-Assisted SEO Workflows</h2>
              <p className="seo-section-desc">
                AI can support certain SEO workflows while human review remains essential for quality, accuracy and editorial judgment.
              </p>
              <div className="seo-ai__note">
                AI supports SEO workflows — it does not automatically guarantee rankings or replace strategic thinking.
              </div>
              <div style={{ marginTop: "32px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button
                  id="ai-seo-cta"
                  className="seo-btn seo-btn--outline"
                  onClick={() => navigate("/digital-marketing/ai-automation")}
                >
                  Explore AI & Automation →
                </button>
              </div>
            </div>
            <div className="seo-ai__apps">
              {AI_APPS.map(app => (
                <div key={app.label} className="seo-ai__app">
                  <div className="seo-ai__app-icon" aria-hidden="true">{app.icon}</div>
                  <div className="seo-ai__app-label">{app.label}</div>
                  <div className="seo-ai__app-desc">{app.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ANALYTICS & REPORTING DASHBOARD
          ============================================================ */}
      <section className="seo-section seo-section--alt" aria-labelledby="analytics-heading">
        <div className="seo-ct">
          <div className="seo-analytics__grid">
            <div>
              <span className="seo-section-label">PERFORMANCE TRACKING</span>
              <h2 className="seo-section-title" id="analytics-heading">Measure What Matters</h2>
              <p className="seo-section-desc">
                We track the metrics that matter for your organic search performance and present them in clear, actionable reports.
              </p>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px", marginTop:"24px" }}>
                {["Organic Clicks","Search Impressions","Search Queries","CTR (Click-Through Rate)","Indexed Pages","Top Landing Pages","Conversions (where tracking configured)","Local Visibility Metrics","Technical Health Issues"].map(m => (
                  <li key={m} style={{ display:"flex", alignItems:"center", gap:"10px", fontSize:"14px", color:"var(--seo-txt2)" }}>
                    <span style={{ color:"var(--seo-green)", fontSize:"12px" }}>✓</span>
                    {m}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop:"24px" }}>
                <p style={{ fontSize:"13px", color:"var(--seo-txt3)", marginBottom:"8px" }}>Powered by:</p>
                <div className="seo-dashboard__tools">
                  {["Google Search Console","Google Analytics","Google Business Profile","SEO Platform (as applicable)"].map(t => (
                    <span key={t} className="seo-dashboard__tool">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="seo-dashboard" aria-label="Sample analytics dashboard">
                <div className="seo-dashboard__header">
                  <span className="seo-dashboard__title">Organic Search Performance</span>
                  <span className="seo-dashboard__badge">SAMPLE DATA</span>
                </div>
                <div className="seo-dashboard__metrics">
                  {[
                    { val:"2.4K", label:"Organic Clicks" },
                    { val:"28K",  label:"Impressions" },
                    { val:"8.5%", label:"Avg CTR" },
                  ].map(m => (
                    <div key={m.label} className="seo-dashboard__metric">
                      <span className="seo-dashboard__metric-val">{m.val}</span>
                      <div className="seo-dashboard__metric-label">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="seo-dashboard__chart" aria-hidden="true">
                  <div className="seo-dashboard__bars">
                    {DASHBOARD_BARS.map((h, i) => (
                      <div
                        key={i}
                        className="seo-dashboard__bar"
                        style={{ height:`${h}%`, animationDelay:`${i * 0.06}s` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="seo-dashboard__tools" style={{ marginTop:"16px" }}>
                  <span className="seo-dashboard__tool">Organic Clicks</span>
                  <span className="seo-dashboard__tool">Impressions</span>
                  <span className="seo-dashboard__tool">Queries</span>
                  <span className="seo-dashboard__tool">Indexed Pages</span>
                  <span className="seo-dashboard__tool">Technical Issues</span>
                  <span className="seo-dashboard__tool">Conversions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          REPORTING
          ============================================================ */}
      <section className="seo-section" aria-labelledby="reporting-heading">
        <div className="seo-ct">
          <div className="seo-reporting__grid">
            <div>
              <span className="seo-section-label">REPORTING</span>
              <h2 className="seo-section-title" id="reporting-heading">Clear SEO Reporting</h2>
              <p className="seo-section-desc">
                Periodic SEO reports are written in plain language so you understand what has been done, what the data shows and what the next priorities are.
              </p>
              <div style={{ marginTop:"32px", display:"flex", gap:"12px", flexWrap:"wrap" }}>
                <button
                  id="reporting-cta"
                  className="seo-btn seo-btn--primary"
                  onClick={() => navigate("/contact?service=seo")}
                >
                  Talk About SEO
                </button>
              </div>
            </div>
            <div>
              <div className="seo-report-card" aria-label="Sample SEO report sections">
                <div className="seo-report-card__header">
                  <span aria-hidden="true">📋</span>
                  Monthly SEO Report — Sample Structure
                </div>
                <div className="seo-report-card__items">
                  {REPORT_SECTIONS.map(s => (
                    <div key={s} className="seo-report-card__item">{s}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY CHOOSE US
          ============================================================ */}
      <section className="seo-section seo-section--alt" aria-labelledby="why-us-heading">
        <div className="seo-ct">
          <div className="seo-section-header seo-section-header--center">
            <span className="seo-section-label">WHY CHOOSE US</span>
            <h2 className="seo-section-title" id="why-us-heading">Why Work With 360° Vertex Solutions?</h2>
            <p className="seo-section-desc">
              We approach SEO as a long-term, strategic process — not a set of shortcuts. Our focus is on sustainable visibility and measurable improvement.
            </p>
          </div>
          <div className="seo-why2__grid">
            {WHY_US.map(c => (
              <article key={c.num} className="seo-why2-card">
                <div className="seo-why2-card__num">{c.num}</div>
                <div className="seo-why2-card__icon" aria-hidden="true">{c.icon}</div>
                <h3 className="seo-why2-card__title">{c.title}</h3>
                <p className="seo-why2-card__desc">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PACKAGES
          ============================================================ */}
      <section className="seo-section" aria-labelledby="packages-heading">
        <div className="seo-ct">
          <div className="seo-section-header seo-section-header--center">
            <span className="seo-section-label">SEO SOLUTIONS</span>
            <h2 className="seo-section-title" id="packages-heading">SEO Solutions</h2>
            <p className="seo-section-desc">Flexible SEO engagements designed around your business stage, website size and goals. Pricing is discussed during consultation.</p>
          </div>
          <div className="seo-packages__grid">
            {PACKAGES.map(pkg => (
              <article key={pkg.name} className={`seo-pkg${pkg.featured ? " seo-pkg--featured" : ""}`}>
                <h3 className="seo-pkg__name">{pkg.name}</h3>
                <p className="seo-pkg__tagline">{pkg.tagline}</p>
                <div className="seo-pkg__price">
                  Pricing discussed during consultation based on website size and scope.
                </div>
                <ul className="seo-pkg__features">
                  {pkg.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                <button
                  id={`pkg-cta-${pkg.name.toLowerCase().replace(/\s+/g,"-")}`}
                  className={`seo-btn ${pkg.featured ? "seo-btn--primary" : "seo-btn--outline"}`}
                  style={{ width:"100%" }}
                  onClick={() => document.getElementById("seo-audit-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Get Started
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ
          ============================================================ */}
      <section className="seo-section seo-section--dark" aria-labelledby="faq-heading">
        <div className="seo-ct">
          <div className="seo-section-header seo-section-header--center">
            <span className="seo-section-label">QUESTIONS</span>
            <h2 className="seo-section-title" id="faq-heading">Frequently Asked Questions</h2>
          </div>
          <div className="seo-faq" role="list">
            {FAQS.map(faq => (
              <div key={faq.q} role="listitem">
                <FAQItem q={faq.q} a={faq.a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          AUDIT FORM
          ============================================================ */}
      <section className="seo-section seo-section--alt" id="seo-audit-form" aria-labelledby="form-heading">
        <div className="seo-ct">
          <div className="seo-form__grid">
            <div className="seo-form__intro">
              <span className="seo-section-label">GET STARTED</span>
              <h2 className="seo-section-title" id="form-heading">Request Your SEO Audit</h2>
              <p>
                Tell us about your website and business. We'll review your current search visibility and share initial observations along with how we can help.
              </p>
              <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginTop:"16px" }}>
                <a href={WA_SEO} target="_blank" rel="noopener noreferrer" className="seo-btn seo-btn--wa">
                  💬 WhatsApp Us
                </a>
                <a href={MAIL_SEO} className="seo-btn seo-btn--ghost">
                  ✉️ Email Us
                </a>
              </div>
            </div>
            <div>
              {submitted ? (
                <div className="seo-form__success">
                  <div style={{ fontSize:"32px", marginBottom:"12px" }}>✅</div>
                  <div>Thank you! Your SEO audit request has been received. We'll be in touch shortly.</div>
                </div>
              ) : (
                <form className="seo-form" onSubmit={handleSubmit} noValidate aria-label="SEO Audit Request Form">
                  <div className="seo-form__row">
                    <div className="seo-form__field">
                      <label htmlFor="seo-name">Name *</label>
                      <input id="seo-name" name="name" type="text" required placeholder="Your name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="seo-form__field">
                      <label htmlFor="seo-business">Business Name</label>
                      <input id="seo-business" name="business" type="text" placeholder="Your business name" value={formData.business} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="seo-form__row">
                    <div className="seo-form__field">
                      <label htmlFor="seo-email">Email *</label>
                      <input id="seo-email" name="email" type="email" required placeholder="your@email.com" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="seo-form__field">
                      <label htmlFor="seo-phone">Phone / WhatsApp *</label>
                      <input id="seo-phone" name="phone" type="tel" required placeholder="+91 99999 99999" value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="seo-form__field">
                    <label htmlFor="seo-website">Website URL *</label>
                    <input id="seo-website" name="website" type="url" required placeholder="https://yourwebsite.com" value={formData.website} onChange={handleChange} />
                  </div>
                  <div className="seo-form__row">
                    <div className="seo-form__field">
                      <label htmlFor="seo-business-type">Business Type</label>
                      <select id="seo-business-type" name="businessType" value={formData.businessType} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option>Local Business</option>
                        <option>E-Commerce</option>
                        <option>SaaS / Web App</option>
                        <option>Service Business</option>
                        <option>Education / Academy</option>
                        <option>Healthcare</option>
                        <option>Real Estate</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="seo-form__field">
                      <label htmlFor="seo-location">Location</label>
                      <input id="seo-location" name="location" type="text" placeholder="City, State, Country" value={formData.location} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="seo-form__field">
                    <label htmlFor="seo-service">Main Service / Product</label>
                    <input id="seo-service" name="service" type="text" placeholder="What does your business offer?" value={formData.service} onChange={handleChange} />
                  </div>
                  <div className="seo-form__field">
                    <label htmlFor="seo-challenges">Current SEO Challenges</label>
                    <textarea id="seo-challenges" name="challenges" placeholder="Describe any SEO issues you're facing..." value={formData.challenges} onChange={handleChange} />
                  </div>
                  <div className="seo-form__field">
                    <label htmlFor="seo-competitors">Competitor Websites (optional)</label>
                    <input id="seo-competitors" name="competitors" type="text" placeholder="List competitor website URLs" value={formData.competitors} onChange={handleChange} />
                  </div>
                  <div className="seo-form__field">
                    <label htmlFor="seo-info">Additional Information</label>
                    <textarea id="seo-info" name="info" placeholder="Anything else you'd like us to know..." value={formData.info} onChange={handleChange} />
                  </div>
                  <p className="seo-form__note">* Required fields. We respect your privacy and will never share your information.</p>
                  <button id="form-submit-btn" type="submit" className="seo-btn seo-btn--primary" style={{ width:"100%", justifyContent:"center" }}>
                    Request SEO Audit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <section className="seo-cta" aria-labelledby="final-cta-heading">
        <div className="seo-cta__bg" aria-hidden="true" />
        <div className="seo-ct seo-cta__inner">
          <span className="seo-section-label" style={{ justifyContent:"center", marginBottom:"16px" }}>READY TO START?</span>
          <h2 className="seo-cta__title" id="final-cta-heading">
            Ready to Improve Your<br />
            <span className="seo-grad-text">Search Visibility?</span>
          </h2>
          <p className="seo-cta__desc">
            Let's understand your website, goals and audience and create a practical SEO roadmap together.
          </p>
          <div className="seo-cta__btns">
            <button
              id="final-cta-audit"
              className="seo-btn seo-btn--primary"
              onClick={() => document.getElementById("seo-audit-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get SEO Audit
            </button>
            <button
              id="final-cta-build"
              className="seo-btn seo-btn--outline"
              onClick={() => navigate("/contact")}
            >
              Build With Us
            </button>
            <a
              id="final-cta-wa"
              href={WA_SEO}
              target="_blank" rel="noopener noreferrer"
              className="seo-btn seo-btn--wa"
            >
              💬 WhatsApp Us
            </a>
            <a
              id="final-cta-email"
              href={MAIL_SEO}
              className="seo-btn seo-btn--ghost"
            >
              ✉️ Email Us
            </a>
          </div>
          <div className="seo-cta__contact">
            <span className="seo-cta__contact-item">
              <span aria-hidden="true">📞</span>
              <a href={telLink}>{COMPANY.phone}</a>
            </span>
            <span className="seo-cta__contact-item">
              <span aria-hidden="true">✉️</span>
              <a href={MAIL_SEO}>{COMPANY.email}</a>
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          RELATED SERVICES
          ============================================================ */}
      <section className="seo-section seo-section--dark" aria-labelledby="related-heading">
        <div className="seo-ct">
          <div className="seo-section-header seo-section-header--center">
            <span className="seo-section-label">EXPLORE MORE</span>
            <h2 className="seo-section-title" id="related-heading">Related Services</h2>
          </div>
          <div className="seo-related__grid">
            {RELATED.map(r => (
              <button
                key={r.label}
                className="seo-related-card"
                onClick={() => navigate(r.path)}
                aria-label={`Go to ${r.label}`}
              >
                <div className="seo-related-card__icon" aria-hidden="true">{r.icon}</div>
                <div className="seo-related-card__label">{r.label}</div>
                <div className="seo-related-card__arrow">→</div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
