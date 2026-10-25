import { useNavigate } from "react-router-dom";
import { waLink, COMPANY, telLink } from "../../config";
import "./DigitalMarketingPage.css";

const WA_DM = waLink("Hello 360° Vertex Solutions, I would like to discuss Digital Marketing services for my business.");

const SERVICES = [
  { icon:"🔍", title:"SEO",                    desc:"Improve organic search visibility through technical SEO, content and keyword strategy.",    tags:["Technical","Content","Keywords","Local"],         path:"/digital-marketing/seo" },
  { icon:"📍", title:"Local SEO",              desc:"Get found by customers searching in your area through Google Maps and local search.",       tags:["GBP","Citations","Local Keywords"],              path:"/digital-marketing/local-seo" },
  { icon:"📈", title:"Google Ads",             desc:"Reach customers at the exact moment they're searching for your product or service.",       tags:["Search","Display","Remarketing"],                path:"/digital-marketing/google-ads" },
  { icon:"📣", title:"Meta Ads",               desc:"Target your audience on Facebook and Instagram with strategic paid social campaigns.",    tags:["Facebook","Instagram","Retargeting"],            path:"/digital-marketing/meta-ads" },
  { icon:"📊", title:"Analytics & Reporting",  desc:"Understand your marketing data and make better decisions with clear, accurate reporting.", tags:["GA4","Search Console","Dashboards"],             path:"/digital-marketing/analytics-reporting" },
  { icon:"📱", title:"Social Media Marketing", desc:"Build a consistent, engaging social media presence across the platforms that matter.",     tags:["Instagram","LinkedIn","Facebook","YouTube"],    path:"/digital-marketing/social-media" },
  { icon:"✍️", title:"Content Marketing",      desc:"Create original, useful content that attracts your audience and supports SEO.",           tags:["Blog","Website","Video","Strategy"],             path:"/digital-marketing/content-marketing" },
  { icon:"⚡", title:"Lead Generation",        desc:"Build systems that capture qualified enquiries and convert website traffic into leads.",   tags:["Landing Pages","Forms","CRM"],                  path:"/digital-marketing/lead-generation" },
  { icon:"💬", title:"WhatsApp Marketing",     desc:"Reach customers through WhatsApp with consent-based campaigns and automation.",           tags:["Campaigns","Automation","Follow-up"],            path:"/digital-marketing/whatsapp-marketing" },
  { icon:"📧", title:"Email Marketing",        desc:"Nurture your audience and build relationships through strategic email campaigns.",        tags:["Newsletter","Automation","Nurture"],             path:"/digital-marketing/email-marketing" },
  { icon:"🏢", title:"Google Business Profile",desc:"Optimize your GBP listing to improve visibility in local search and Google Maps.",      tags:["GBP","Reviews","Posts","Local"],                 path:"/digital-marketing/google-business-profile" },
  { icon:"🎨", title:"Branding & Creative",    desc:"Build a professional brand identity with logo design, color system and marketing assets.", tags:["Logo","Identity","Creatives","Design"],          path:"/digital-marketing/branding-creative" },
];

const PROCESS = [
  { num:"01", icon:"🔍", title:"Audit",     desc:"Understand your current digital presence and identify opportunities." },
  { num:"02", icon:"🗺️", title:"Strategy",  desc:"Create a tailored marketing roadmap aligned with your business goals." },
  { num:"03", icon:"🎨", title:"Create",    desc:"Produce campaigns, content and creative assets." },
  { num:"04", icon:"🚀", title:"Launch",    desc:"Execute campaigns across the right channels." },
  { num:"05", icon:"📊", title:"Measure",   desc:"Track performance with accurate data and reporting." },
  { num:"06", icon:"🔄", title:"Optimize",  desc:"Continuously improve based on what the data shows." },
  { num:"07", icon:"📈", title:"Grow",      desc:"Scale what works and expand your digital reach." },
];

const INDUSTRIES = [
  { icon:"🚀", label:"Startups" },
  { icon:"🏪", label:"Local Businesses" },
  { icon:"🛒", label:"E-Commerce" },
  { icon:"🎓", label:"Education" },
  { icon:"💻", label:"Technology" },
  { icon:"👔", label:"Professional Services" },
  { icon:"🏠", label:"Real Estate" },
  { icon:"🍽️", label:"Restaurants" },
  { icon:"📦", label:"D2C Brands" },
  { icon:"🔧", label:"Service Businesses" },
];

export default function DigitalMarketingPage() {
  const navigate = useNavigate();

  return (
    <div className="dmp2-page">
      {/* ─────── HERO ─────── */}
      <section className="dmp2-hero" aria-label="Digital Marketing Hero">
        <div className="dmp2-hero__bg" aria-hidden="true" />
        <div className="dmp2-hero__grid" aria-hidden="true" />
        <div className="dmp2-ct">
          <div className="dmp2-hero__inner">
            <div className="dmp2-hero__content">
              <div className="dmp2-hero__eyebrow">
                <span className="dmp2-hero__dot" aria-hidden="true" />
                DIGITAL MARKETING & GROWTH
              </div>
              <h1 className="dmp2-hero__title">
                Grow Your Brand in the<br />
                <span className="dmp2-grad">Digital World.</span>
              </h1>
              <p className="dmp2-hero__desc">
                From search visibility and paid advertising to social media, content, lead generation, automation and brand building — we create digital marketing strategies designed around your business goals.
              </p>
              <div className="dmp2-hero__ctas">
                <button id="dm-hero-start" className="dmp2-btn dmp2-btn--primary" onClick={() => navigate("/contact?service=digital-marketing")}>
                  Start Marketing
                </button>
                <button id="dm-hero-build" className="dmp2-btn dmp2-btn--outline" onClick={() => navigate("/contact")}>
                  Build With Us
                </button>
                <a id="dm-hero-wa" href={WA_DM} target="_blank" rel="noopener noreferrer" className="dmp2-btn dmp2-btn--wa">
                  💬 WhatsApp Us
                </a>
              </div>
              <div className="dmp2-hero__contact">
                <span className="dmp2-hero__contact-item"><span aria-hidden="true">📞</span><a href={telLink}>{COMPANY.phone}</a></span>
                <span className="dmp2-hero__contact-item"><span aria-hidden="true">✉️</span><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></span>
              </div>
            </div>
            <div className="dmp2-hero__visual" aria-hidden="true">
              <div className="dmp2-hero__viz">
                <div className="dmp2-viz__orb dmp2-viz__orb--1" />
                <div className="dmp2-viz__orb dmp2-viz__orb--2" />
                <div className="dmp2-viz__ring dmp2-viz__ring--1" />
                <div className="dmp2-viz__ring dmp2-viz__ring--2" />
                <div className="dmp2-viz__center">
                  <div className="dmp2-viz__icon">📈</div>
                  <div className="dmp2-viz__label">DIGITAL GROWTH</div>
                </div>
                {["🔍 SEO","📣 Ads","📱 Social","✍️ Content","🤖 AI","📊 Analytics","⚡ Leads","🎨 Brand"].map((n, i) => (
                  <div key={n} className={`dmp2-viz__node dmp2-viz__node--${i+1}`}>{n}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────── ECOSYSTEM FLOW ─────── */}
      <section className="dmp2-section dmp2-section--strip">
        <div className="dmp2-ct">
          <div className="dmp2-strip">
            <p className="dmp2-strip__label">One Ecosystem. Every Digital Growth Channel.</p>
            <div className="dmp2-strip__flow">
              {["Brand","Content","Traffic","Leads","Customers","Growth"].map((item, i, arr) => (
                <div key={item} className="dmp2-strip__item">
                  <div className="dmp2-strip__box">{item}</div>
                  {i < arr.length - 1 && <div className="dmp2-strip__arr" aria-hidden="true">→</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────── SERVICES ─────── */}
      <section className="dmp2-section" aria-labelledby="dm-services-heading">
        <div className="dmp2-ct">
          <div className="dmp2-section-header dmp2-section-header--center">
            <span className="dmp2-section-label">SERVICES</span>
            <h2 className="dmp2-section-title" id="dm-services-heading">Complete Digital Marketing Services</h2>
            <p className="dmp2-section-desc">Every service you need to build and grow your digital presence — from search and social to automation and branding.</p>
          </div>
          <div className="dmp2-svc-grid">
            {SERVICES.map((svc) => (
              <article
                key={svc.title}
                className="dmp2-svc-card"
                onClick={() => navigate(svc.path)}
                style={{ cursor:"pointer" }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(svc.path)}
                aria-label={`Learn more about ${svc.title}`}
              >
                <div className="dmp2-svc-card__icon" aria-hidden="true">{svc.icon}</div>
                <h3 className="dmp2-svc-card__title">{svc.title}</h3>
                <p className="dmp2-svc-card__desc">{svc.desc}</p>
                <div className="dmp2-svc-card__tags">
                  {svc.tags.map(t => <span key={t} className="dmp2-svc-card__tag">{t}</span>)}
                </div>
                <div className="dmp2-svc-card__cta">View Service →</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dmp2-section dmp2-web-services" aria-labelledby="dm-web-services-heading">
        <div className="dmp2-ct">
          <div className="dmp2-section-header dmp2-section-header--center">
            <span className="dmp2-section-label">YOUR COMPLETE ONLINE PRESENCE</span>
            <h2 className="dmp2-section-title" id="dm-web-services-heading">
              Websites, Apps & Marketing — Working Together
            </h2>
            <p className="dmp2-section-desc">
              Need a website or app as well as marketing? We can build the right digital experience and help customers find it.
            </p>
          </div>
          <div className="dmp2-web-services__grid">
            <article className="dmp2-web-service-card">
              <span className="dmp2-web-service-card__icon" aria-hidden="true">🌐</span>
              <span className="dmp2-section-label">SPECIALIZED SITES</span>
              <h3>Purpose-built websites for your business</h3>
              <p>
                Launch a professional business site, online store, booking website, learning platform or campaign landing page.
              </p>
              <ul>
                <li>Business and corporate websites</li>
                <li>E-commerce and booking sites</li>
                <li>Landing pages and learning websites</li>
              </ul>
              <button type="button" onClick={() => navigate("/technology/web-development")}>
                Explore website development <span aria-hidden="true">→</span>
              </button>
            </article>
            <article className="dmp2-web-service-card">
              <span className="dmp2-web-service-card__icon" aria-hidden="true">💻</span>
              <span className="dmp2-section-label">WEB & APPLICATIONS</span>
              <h3>Useful tools that make work easier</h3>
              <p>
                Give your team and customers practical online tools, from custom web apps to CRM and admin dashboards.
              </p>
              <ul>
                <li>Custom web applications and portals</li>
                <li>CRM and business management systems</li>
                <li>Admin dashboards and workflow tools</li>
              </ul>
              <button type="button" onClick={() => navigate("/technology/web-development/web-application")}>
                Explore web applications <span aria-hidden="true">→</span>
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* ─────── AI & AUTOMATION ─────── */}
      <section className="dmp2-section dmp2-section--dark" aria-labelledby="dm-ai-heading">
        <div className="dmp2-ct">
          <div className="dmp2-ai-grid">
            <div>
              <span className="dmp2-section-label">AI & AUTOMATION</span>
              <h2 className="dmp2-section-title" id="dm-ai-heading">Make Your Marketing Smarter With AI.</h2>
              <p className="dmp2-section-desc">
                Use AI and automation to reduce repetitive work, improve response times, organise leads and support scalable marketing workflows.
              </p>
              <div className="dmp2-ai-features">
                {["AI Chatbots","AI Lead Qualification","AI Content Assistance","WhatsApp Automation","Email Automation","CRM Automation","AI Marketing Workflows","AI Agents"].map(f => (
                  <div key={f} className="dmp2-ai-feature">
                    <span className="dmp2-ai-feature__dot" aria-hidden="true" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="dmp2-ai-btns">
                <button id="dm-ai-explore" className="dmp2-btn dmp2-btn--primary" onClick={() => navigate("/digital-marketing/ai-automation")}>
                  Explore AI Automation
                </button>
                <a href={WA_DM} target="_blank" rel="noopener noreferrer" className="dmp2-btn dmp2-btn--wa">
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
            <div className="dmp2-ai-visual" aria-hidden="true">
              <div className="dmp2-ai-card">
                <div className="dmp2-ai-card__header">🤖 AI Marketing Hub</div>
                {[
                  { label:"Lead captured", status:"✅ Qualified", color:"#10d9a0" },
                  { label:"WhatsApp response", status:"⚡ Automated", color:"#00c6ff" },
                  { label:"Email sequence", status:"🔄 Running", color:"#0072ff" },
                  { label:"Content brief", status:"📝 Generated", color:"#8e2de2" },
                  { label:"CRM updated", status:"✅ Synced", color:"#10d9a0" },
                ].map(r => (
                  <div key={r.label} className="dmp2-ai-card__row">
                    <span className="dmp2-ai-card__label">{r.label}</span>
                    <span className="dmp2-ai-card__status" style={{ color: r.color }}>{r.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────── PROCESS ─────── */}
      <section className="dmp2-section dmp2-section--alt" aria-labelledby="dm-process-heading">
        <div className="dmp2-ct">
          <div className="dmp2-section-header dmp2-section-header--center">
            <span className="dmp2-section-label">HOW WE WORK</span>
            <h2 className="dmp2-section-title" id="dm-process-heading">Our Marketing Process</h2>
          </div>
          <div className="dmp2-process">
            {PROCESS.map((step) => (
              <div key={step.num} className="dmp2-process-step">
                <div className="dmp2-process-step__num">{step.num}</div>
                <div className="dmp2-process-step__icon" aria-hidden="true">{step.icon}</div>
                <h3 className="dmp2-process-step__title">{step.title}</h3>
                <p className="dmp2-process-step__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── INDUSTRIES ─────── */}
      <section className="dmp2-section" aria-labelledby="dm-industries-heading">
        <div className="dmp2-ct">
          <div className="dmp2-section-header dmp2-section-header--center">
            <span className="dmp2-section-label">WHO WE WORK WITH</span>
            <h2 className="dmp2-section-title" id="dm-industries-heading">Industries & Business Types</h2>
            <p className="dmp2-section-desc">We work with businesses across multiple industries who are serious about building their digital presence.</p>
          </div>
          <div className="dmp2-industries">
            {INDUSTRIES.map(ind => (
              <div key={ind.label} className="dmp2-industry-chip">
                <span aria-hidden="true">{ind.icon}</span>
                {ind.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── FINAL CTA ─────── */}
      <section className="dmp2-final-cta" aria-labelledby="dm-final-cta-heading">
        <div className="dmp2-final-cta__bg" aria-hidden="true" />
        <div className="dmp2-ct dmp2-final-cta__inner">
          <span className="dmp2-section-label" style={{ justifyContent:"center", marginBottom:"16px" }}>GET STARTED</span>
          <h2 className="dmp2-section-title" id="dm-final-cta-heading" style={{ textAlign:"center" }}>
            Ready to Grow Your<br /><span className="dmp2-grad">Digital Presence?</span>
          </h2>
          <p className="dmp2-section-desc" style={{ textAlign:"center", margin:"0 auto 36px" }}>
            Let's understand your business, goals and audience and build a practical digital marketing strategy.
          </p>
          <div className="dmp2-final-cta__btns">
            <button id="dm-final-start" className="dmp2-btn dmp2-btn--primary" onClick={() => navigate("/contact?service=digital-marketing")}>
              Start Marketing
            </button>
            <button id="dm-final-build" className="dmp2-btn dmp2-btn--outline" onClick={() => navigate("/contact")}>
              Build With Us
            </button>
            <a id="dm-final-wa" href={WA_DM} target="_blank" rel="noopener noreferrer" className="dmp2-btn dmp2-btn--wa">
              💬 WhatsApp Us
            </a>
            <a id="dm-final-email" href={`mailto:${COMPANY.email}?subject=Digital Marketing Enquiry — 360° Vertex Solutions`} className="dmp2-btn dmp2-btn--ghost">
              ✉️ Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
