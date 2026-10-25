import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLinkedinIn, FaInstagram, FaYoutube, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { SOCIAL, waLink } from "../../config";
import "./AboutPage.css";

const IC = {
  academy:   "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  trending:  "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  code:      "M16 18l6-6-6-6M8 6l-6 6 6 6",
  globe:     "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2c-2.8 4-4 8-4 10s1.2 6 4 10c2.8-4 4-8 4-10s-1.2-6-4-10z",
  cpu:       "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
  database:  "M12 2C6.5 2 2 4.7 2 8s4.5 6 10 6 10-2.7 10-6S17.5 2 12 2zM2 8v8c0 3.3 4.5 6 10 6s10-2.7 10-6V8M2 12c0 3.3 4.5 6 10 6s10-2.7 10-6",
  lightning: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  check:     "M20 6L9 17l-5-5",
  arrow:     "M5 12h14M12 5l7 7-7 7",
  target:    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z",
  sparkles:  "M5 3v4M3 5h4M6 17v4M4 19h4M13 3l1.5 4L18 8.5l-4 1.5L12.5 14l-1.5-4-4-1.5 4-1.5L13 3z",
  shield:    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  eye:       "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
};

const Ic = ({ d, sz = 20, col = "currentColor" }) => (
  <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

function useReveal(thr = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: thr });
    obs.observe(el);
    return () => obs.disconnect();
  }, [thr]);
  return [ref, vis];
}

/* ORBITAL HERO VISUAL */
function Orbital() {
  return (
    <div className="ab-orb">
      <div className="ab-orb__r1" /><div className="ab-orb__r2" /><div className="ab-orb__r3" />
      <div className="ab-orb__core">
        <img
          src="https://res.cloudinary.com/dvknx0hpm/image/upload/v1789818578/WhatsApp_Image_2026-09-19_at_10.44.11-removebg-preview_vzg736.png"
          alt="360 Vertex Solutions" className="ab-orb__img"
        />
        <p>360°</p>
      </div>
      {[["Academy","ab-orb__d1"],["Career","ab-orb__d2"],["Marketing","ab-orb__d3"],["Tech","ab-orb__d4"],["AI","ab-orb__d5"]].map(([l,c],i)=>(
        <div key={i} className={`ab-orb__dot ${c}`}><span>{l}</span></div>
      ))}
      <div className="ab-orb__lbl ab-orb__lbl--l">
        <span className="ab-pill ab-pill--blue">VERTEX ACADEMY</span>
        <p>Learn &amp; Career</p>
      </div>
      <div className="ab-orb__lbl ab-orb__lbl--r">
        <span className="ab-pill ab-pill--vio">DIGITAL + TECH</span>
        <p>Build &amp; Grow</p>
      </div>
    </div>
  );
}

/* S01 HERO */
function Hero({ nav }) {
  const [ref,vis] = useReveal(0.05);
  return (
    <section className={`ab-hero ${vis?"ab-in":""}`} ref={ref}>
      <div className="ab-hero__g1"/><div className="ab-hero__g2"/>
      <div className="ab-ct ab-hero__inner">
        <div className="ab-hero__txt">
          <div className="ab-ey"><span className="ab-ey__dot"/>ABOUT 360&deg; VERTEX SOLUTIONS</div>
          <h1 className="ab-hero__h1">Technology That Helps<br/><span className="ab-grad">People and Businesses</span> Grow.</h1>
          <p className="ab-hero__p">360&deg; Vertex Solutions brings technology education, career development, digital marketing and modern technology solutions together in one connected ecosystem.</p>
          <p className="ab-hero__tag">Learn &bull; Build &bull; Launch &bull; Grow</p>
          <div className="ab-hero__ctas">
            <button className="ab-btn ab-btn--pri" onClick={()=>nav("/academy")}>Explore Academy</button>
            <button className="ab-btn ab-btn--out" onClick={()=>nav("/technology")}>Explore Technology</button>
          </div>
        </div>
        <div className="ab-hero__vis"><Orbital/></div>
      </div>
    </section>
  );
}

/* S02 WHO WE ARE */
function WhoWeAre() {
  const [ref,vis] = useReveal();
  return (
    <section className={`ab-sec ${vis?"ab-in":""}`} ref={ref}>
      <div className="ab-ct ab-wwa__grid">
        <div className="ab-wwa__l">
          <div className="ab-ey"><span className="ab-ey__dot"/>WHO WE ARE</div>
          <h2 className="ab-h2">Who We Are</h2>
          <p className="ab-p">360&deg; Vertex Solutions is a technology-focused company built around two connected goals: helping people develop practical technology and career skills, and helping businesses build their digital presence and technology capabilities.</p>
          <p className="ab-p" style={{marginTop:"1rem"}}>Through <strong>Vertex Academy</strong>, we focus on learning, projects and career readiness. Through <strong>Digital Marketing &amp; Technology</strong>, we help businesses and organizations build, market, automate and improve their digital systems.</p>
        </div>
        <div className="ab-wwa__r">
          {[
            {col:"#60a5fa",ic:IC.academy,tag:"VERTEX ACADEMY",steps:["Learn","Practice","Build","Career"]},
            {col:"#a78bfa",ic:IC.trending,tag:"DIGITAL + TECHNOLOGY",steps:["Design","Develop","Market","Automate","Grow"]}
          ].map((c,i)=>(
            <div key={i} className="ab-pc" style={{"--pc":c.col}}>
              <div className="ab-pc__hd"><Ic d={c.ic} sz={20} col={c.col}/><span>{c.tag}</span></div>
              <div className="ab-pc__flow">
                {c.steps.map((s,j)=>(
                  <div key={j} className="ab-pc__step">
                    <span>{s}</span>
                    {j<c.steps.length-1&&<span className="ab-pc__arr">&#8595;</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* S03 TWO PILLARS */
const ACI = ["Programming","Web Development","Full Stack Development","Data Analytics","AI & Machine Learning","Generative AI","Cloud & DevOps","Cyber Security","Projects","Workshops","Career Preparation"];
const DGI = ["Website Development","E-Commerce","Web Applications","Full Stack Development","UI/UX","SEO","Google Ads","Meta Ads","Social Media Marketing","Content Marketing","AI Solutions","Automation"];

function TwoPillars({ nav }) {
  const [ref,vis] = useReveal();
  const cards = [
    {num:"01",col:"#60a5fa",ic:IC.academy,tag:"VERTEX ACADEMY",h:"Learn. Build. Prepare.",desc:"Vertex Academy helps students, freshers, job seekers and professionals develop practical skills in modern technologies.",list:ACI,cta:"Explore Academy",path:"/academy"},
    {num:"02",col:"#a78bfa",ic:IC.trending,tag:"DIGITAL MARKETING & TECHNOLOGY",h:"Build. Market. Automate. Grow.",desc:"We help businesses, startups and organizations establish their digital presence, develop technology products and use modern digital tools to grow.",list:DGI,cta:"Explore Services",path:"/digital-marketing"}
  ];
  return (
    <section className={`ab-sec ab-dk ${vis?"ab-in":""}`} ref={ref}>
      <div className="ab-ct">
        <div className="ab-ey ab-cx"><span className="ab-ey__dot"/>OUR TWO PILLARS</div>
        <h2 className="ab-h2 ab-cx">Two Pillars. One Vision.</h2>
        <div className="ab-2p__grid">
          {cards.map((c,i)=>(
            <div key={i} className="ab-2p__card" style={{"--cc":c.col}}>
              <div className="ab-2p__badge">{c.num}</div>
              <div className="ab-2p__ico"><Ic d={c.ic} sz={28} col={c.col}/></div>
              <p className="ab-2p__tag">{c.tag}</p>
              <h3 className="ab-2p__h3">{c.h}</h3>
              <p className="ab-2p__desc">{c.desc}</p>
              <ul className="ab-2p__list">
                {c.list.map((item,j)=><li key={j}><Ic d={IC.check} sz={13} col={c.col}/>{item}</li>)}
              </ul>
              <button className="ab-btn ab-btn--cc" style={{"--cc":c.col}} onClick={()=>nav(c.path)}>
                {c.cta}<Ic d={IC.arrow} sz={15}/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* S04 PURPOSE */
function Purpose() {
  const [ref,vis] = useReveal();
  const pts = [
    {n:"01",col:"#60a5fa",ic:IC.academy,lbl:"LEARN",d:"Help people develop practical technology skills."},
    {n:"02",col:"#a78bfa",ic:IC.code,lbl:"BUILD",d:"Turn ideas into websites, applications and digital products."},
    {n:"03",col:"#34d399",ic:IC.trending,lbl:"GROW",d:"Help people and businesses improve through technology, digital marketing and continuous learning."},
  ];
  return (
    <section className={`ab-sec ${vis?"ab-in":""}`} ref={ref}>
      <div className="ab-ct">
        <div className="ab-ey ab-cx"><span className="ab-ey__dot"/>OUR PURPOSE</div>
        <h2 className="ab-h2 ab-cx">Why 360&deg; Vertex Solutions?</h2>
        <p className="ab-p ab-cx ab-pmx">Technology is changing how people learn, work and build businesses. Our purpose is to make modern technology more practical, accessible and useful.</p>
        <div className="ab-pur__grid">
          {pts.map((p,i)=>(
            <div key={i} className="ab-pur__card" style={{"--pc":p.col}}>
              <div className="ab-pur__n">{p.n}</div>
              <div className="ab-pur__ic"><Ic d={p.ic} sz={26} col={p.col}/></div>
              <h3>{p.lbl}</h3><p>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* S05 WHO WE SERVE */
function WhoWeServe() {
  const [ref,vis] = useReveal();
  const srv = [
    {e:"🎓",l:"Students",d:"Technology learning, projects and career preparation."},
    {e:"💼",l:"Freshers & Job Seekers",d:"Skills, resumes, portfolios and interview preparation."},
    {e:"👨‍💻",l:"IT Professionals",d:"Upskilling and modern technology learning."},
    {e:"🚀",l:"Startups",d:"Digital products, websites, marketing and technology support."},
    {e:"🏢",l:"Businesses",d:"Digital presence, marketing, software and automation."},
    {e:"🌐",l:"Organizations",d:"Technology and digital solutions designed around their requirements."},
  ];
  return (
    <section className={`ab-sec ab-dk ${vis?"ab-in":""}`} ref={ref}>
      <div className="ab-ct">
        <div className="ab-ey ab-cx"><span className="ab-ey__dot"/>WHO WE SERVE</div>
        <h2 className="ab-h2 ab-cx">Who We Serve</h2>
        <div className="ab-srv__grid">
          {srv.map((s,i)=>(
            <div key={i} className="ab-srv__card">
              <div className="ab-srv__em">{s.e}</div>
              <h3>{s.l}</h3><p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* S06 JOURNEY */
function Journey() {
  const [ref,vis] = useReveal();
  const jrn = [
    {s:"LEARN",c:"#3b82f6",d:"Develop modern technology skills."},
    {s:"PRACTICE",c:"#6366f1",d:"Apply knowledge through exercises and projects."},
    {s:"BUILD",c:"#8b5cf6",d:"Create websites, applications and digital products."},
    {s:"LAUNCH",c:"#a855f7",d:"Take products, skills and ideas into the real world."},
    {s:"MARKET",c:"#f59e0b",d:"Reach customers through digital marketing."},
    {s:"AUTOMATE",c:"#10b981",d:"Use technology and AI to improve workflows."},
    {s:"GROW",c:"#34d399",d:"Continuously improve skills, products and businesses."},
  ];
  return (
    <section className={`ab-sec ${vis?"ab-in":""}`} ref={ref}>
      <div className="ab-ct">
        <div className="ab-ey ab-cx"><span className="ab-ey__dot"/>WHAT WE DO</div>
        <h2 className="ab-h2 ab-cx">From Learning to Digital Growth</h2>
        <div className="ab-jrn">
          {jrn.map((j,i)=>(
            <div key={i} className="ab-jrn__item">
              <div className="ab-jrn__node" style={{"--jc":j.c}}>{j.s}</div>
              <p className="ab-jrn__d">{j.d}</p>
              {i<jrn.length-1&&<div className="ab-jrn__con" style={{"--jc":j.c}}/>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* S07 TECHNOLOGY */
function OurTechnology() {
  const [ref,vis] = useReveal();
  const cats = [
    {c:"#60a5fa",ic:IC.code,cat:"Programming",items:["Java","Python","JavaScript","C","C++"]},
    {c:"#818cf8",ic:IC.globe,cat:"Web",items:["HTML","CSS","React","Node.js","Express","Spring Boot"]},
    {c:"#a78bfa",ic:IC.database,cat:"Database",items:["MySQL","PostgreSQL"]},
    {c:"#c084fc",ic:IC.cpu,cat:"AI",items:["Machine Learning","Generative AI","LLMs","RAG","AI Agents","MCP"]},
    {c:"#f59e0b",ic:IC.trending,cat:"Digital",items:["SEO","Google Ads","Meta Ads","Analytics","Content Marketing"]},
    {c:"#34d399",ic:IC.lightning,cat:"Tools",items:["Git","GitHub","Docker","Cloud","APIs"]},
  ];
  return (
    <section className={`ab-sec ab-dk ${vis?"ab-in":""}`} ref={ref}>
      <div className="ab-ct">
        <div className="ab-ey ab-cx"><span className="ab-ey__dot"/>OUR TECHNOLOGY</div>
        <h2 className="ab-h2 ab-cx">Powered by Modern Technology</h2>
        <div className="ab-tch__grid">
          {cats.map((cat,i)=>(
            <div key={i} className="ab-tch__card" style={{"--tc":cat.c}}>
              <div className="ab-tch__ic"><Ic d={cat.ic} sz={22} col={cat.c}/></div>
              <h3>{cat.cat}</h3>
              <div className="ab-tch__tags">
                {cat.items.map((it,j)=><span key={j} className="ab-tag">{it}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* S08 APPROACH */
function OurApproach() {
  const [ref,vis] = useReveal();
  const steps = [
    {n:"01",t:"Understand",d:"Understand the requirement or learning goal.",c:"#3b82f6"},
    {n:"02",t:"Plan",d:"Create a practical strategy.",c:"#6366f1"},
    {n:"03",t:"Learn / Design",d:"Develop the required knowledge or solution design.",c:"#8b5cf6"},
    {n:"04",t:"Build",d:"Implement the project or technology solution.",c:"#a855f7"},
    {n:"05",t:"Test",d:"Review quality, usability and performance.",c:"#ec4899"},
    {n:"06",t:"Launch",d:"Make the product, service or learning outcome ready.",c:"#f59e0b"},
    {n:"07",t:"Improve",d:"Continuously optimize and grow.",c:"#10b981"},
  ];
  return (
    <section className={`ab-sec ${vis?"ab-in":""}`} ref={ref}>
      <div className="ab-ct">
        <div className="ab-ey ab-cx"><span className="ab-ey__dot"/>HOW WE WORK</div>
        <h2 className="ab-h2 ab-cx">Our Approach</h2>
        <div className="ab-tl">
          <div className="ab-tl__spine"/>
          {steps.map((s,i)=>(
            <div key={i} className={`ab-tl__item ${i%2===0?"ab-tl__item--l":"ab-tl__item--r"}`}>
              <div className="ab-tl__nd" style={{"--ac":s.c}}>{s.n}</div>
              <div className="ab-tl__card" style={{"--ac":s.c}}><h3>{s.t}</h3><p>{s.d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* S09 VALUES */
function OurValues() {
  const [ref,vis] = useReveal();
  const vals = [
    {ic:IC.target,c:"#60a5fa",t:"Practicality",d:"Focus on real-world learning and useful solutions."},
    {ic:IC.sparkles,c:"#a78bfa",t:"Innovation",d:"Explore modern technology and new ideas."},
    {ic:IC.academy,c:"#818cf8",t:"Learning",d:"Keep developing knowledge and skills."},
    {ic:IC.shield,c:"#34d399",t:"Quality",d:"Aim for reliable and professional work."},
    {ic:IC.eye,c:"#f59e0b",t:"Transparency",d:"Communicate clearly and responsibly."},
    {ic:IC.trending,c:"#ec4899",t:"Growth",d:"Create opportunities for continuous improvement."},
  ];
  return (
    <section className={`ab-sec ab-dk ${vis?"ab-in":""}`} ref={ref}>
      <div className="ab-ct">
        <div className="ab-ey ab-cx"><span className="ab-ey__dot"/>OUR VALUES</div>
        <h2 className="ab-h2 ab-cx">What We Believe In</h2>
        <div className="ab-val__grid">
          {vals.map((v,i)=>(
            <div key={i} className="ab-val__card" style={{"--vc":v.c}}>
              <div className="ab-val__ic"><Ic d={v.ic} sz={24} col={v.c}/></div>
              <h3>{v.t}</h3><p>{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* S10 FOUNDER */
function Founder({ nav }) {
  const [ref,vis] = useReveal();
  return (
    <section className={`ab-sec ${vis?"ab-in":""}`} ref={ref}>
      <div className="ab-ct">
        <div className="ab-ey ab-cx"><span className="ab-ey__dot"/>THE FOUNDER</div>
        <h2 className="ab-h2 ab-cx">Meet the Founder</h2>
        <div className="ab-fnd__card">
          <div className="ab-fnd__img-wrap">
            <div className="ab-fnd__ring"/>
            <img src="https://res.cloudinary.com/dvknx0hpm/image/upload/v1789818578/WhatsApp_Image_2026-09-19_at_10.44.11-removebg-preview_vzg736.png" alt="Sasindra" className="ab-fnd__img"/>
          </div>
          <div className="ab-fnd__cnt">
            <h3 className="ab-fnd__name">Sasindra</h3>
            <p className="ab-fnd__role">Founder &amp; Full Stack Developer</p>
            <p className="ab-fnd__co">360&deg; Vertex Solutions</p>
            <p className="ab-fnd__bio">Sasindra is a Full Stack Developer and the Founder of 360&deg; Vertex Solutions. His vision is to create an ecosystem that connects technology education, career development, digital marketing and modern technology solutions.</p>
            <blockquote className="ab-fnd__q">&ldquo;Learn technology. Build ideas. Create opportunities. Grow together.&rdquo;</blockquote>
            <button className="ab-btn ab-btn--pri" onClick={()=>nav("/founder")}>Meet the Founder <Ic d={IC.arrow} sz={16}/></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* S11 VISION */
function Vision() {
  const [ref,vis] = useReveal();
  return (
    <section className={`ab-sec ab-dk ab-vis ${vis?"ab-in":""}`} ref={ref}>
      <div className="ab-vis__orb"/>
      <div className="ab-ct">
        <div className="ab-ey ab-cx"><span className="ab-ey__dot"/>OUR VISION</div>
        <h2 className="ab-h2 ab-cx">Our Vision</h2>
        <p className="ab-p ab-cx ab-pmx">To build a trusted technology ecosystem where individuals can learn practical skills, develop their careers and where businesses can use technology and digital innovation to build and grow.</p>
        <div className="ab-vis__flow">
          {["LEARN","CREATE","BUILD","GROW"].map((s,i)=>(
            <div key={i} className="ab-vis__step">
              <div className="ab-vis__bbl">{s}</div>
              {i<3&&<div className="ab-vis__arr">&#8595;</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* S12 MISSION */
function Mission() {
  const [ref,vis] = useReveal();
  return (
    <section className={`ab-msn ${vis?"ab-in":""}`} ref={ref}>
      <div className="ab-msn__bg"/>
      <div className="ab-ct ab-cx">
        <div className="ab-ey ab-cx"><span className="ab-ey__dot"/>OUR MISSION</div>
        <h2 className="ab-msn__h2">Our Mission</h2>
        <p className="ab-msn__txt">To connect education, technology and digital growth through practical learning, innovative solutions and accessible technology.</p>
      </div>
    </section>
  );
}

/* S13 FOUNDER MESSAGE */
function FounderMessage() {
  const [ref,vis] = useReveal();
  return (
    <section className={`ab-sec ab-dk ${vis?"ab-in":""}`} ref={ref}>
      <div className="ab-ct">
        <div className="ab-ey ab-cx"><span className="ab-ey__dot"/>FOUNDER MESSAGE</div>
        <h2 className="ab-h2 ab-cx">A Message From Our Founder</h2>
        <div className="ab-msg">
          <div className="ab-msg__qm">&ldquo;</div>
          <p className="ab-msg__txt">Technology is not only about building software. It is about creating opportunities, solving problems and helping people and businesses move forward.</p>
          <p className="ab-msg__txt">360&deg; Vertex Solutions was created with a simple vision &mdash; to bring learning, technology and digital growth together.</p>
          <div className="ab-msg__sig">
            <div className="ab-msg__sig-line"/>
            <div>
              <p className="ab-msg__sn">Sasindra</p>
              <p className="ab-msg__sr">Founder, 360&deg; Vertex Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* S14 FINAL CTA */
function FinalCTA({ nav }) {
  const [ref,vis] = useReveal();
  return (
    <section className={`ab-fcta ${vis?"ab-in":""}`} ref={ref}>
      <div className="ab-fcta__glow"/>
      <div className="ab-ct ab-cx">
        <h2 className="ab-fcta__h2">Let&rsquo;s Build the Future Together.</h2>
        <p className="ab-fcta__sub">Whether you want to learn a technology, prepare for your career, build a digital product or grow your business, 360&deg; Vertex Solutions is here to help.</p>
        <div className="ab-fcta__btns">
          <button className="ab-btn ab-btn--pri ab-btn--lg" onClick={()=>nav("/academy")}>Explore Academy</button>
          <button className="ab-btn ab-btn--out ab-btn--lg" onClick={()=>nav("/contact")}>Start a Project</button>
        </div>
      </div>
    </section>
  );
}

/* S15 FOOTER */
const FCOLS = [
  {h:"Main",links:[{l:"Home",p:"/"},{l:"About",p:"/about"},{l:"Digital Marketing",p:"/digital-marketing"},{l:"Academy",p:"/academy"},{l:"Technology",p:"/technology"},{l:"Career & Jobs",p:"/career-jobs"},{l:"Testimonials",p:"/testimonials"},{l:"Contact",p:"/contact"}]},
  {h:"Academy",links:[{l:"Courses",p:"/academy"},{l:"Learning Paths",p:"/academy"},{l:"Projects",p:"/academy/projects"},{l:"Workshops",p:"/academy/workshops"},{l:"Certificates",p:"/academy/certificates"},{l:"Career Preparation",p:"/academy/career-prep"}]},
  {h:"Digital Marketing",links:[{l:"SEO",p:"/digital-marketing/seo"},{l:"Google Ads",p:"/digital-marketing/google-ads"},{l:"Meta Ads",p:"/digital-marketing/meta-ads"},{l:"Social Media",p:"/digital-marketing/social-media"},{l:"Content Marketing",p:"/digital-marketing/content"},{l:"Lead Generation",p:"/digital-marketing/lead-generation"}]},
  {h:"Technology",links:[{l:"Web Development",p:"/technology/business-websites"},{l:"E-Commerce",p:"/technology/ecommerce"},{l:"Full Stack",p:"/technology/full-stack"},{l:"AI & Automation",p:"/technology/ai"},{l:"Software Solutions",p:"/technology/custom-software"}]},
  {h:"Legal",links:[{l:"Privacy Policy",p:"/privacy"},{l:"Terms & Conditions",p:"/terms"},{l:"Refund Policy",p:"/refund"},{l:"Cookie Policy",p:"/cookies"}]},
];

function Footer({ nav }) {
  const yr = new Date().getFullYear();
  return (
    <footer className="ab-ft">
      <div className="ab-ft__top">
        <div className="ab-ct ab-ft__grid">
          <div className="ab-ft__brand">
            <div className="ab-ft__logo" onClick={()=>nav("/")}>
              <img src="https://res.cloudinary.com/dvknx0hpm/image/upload/v1789818578/WhatsApp_Image_2026-09-19_at_10.44.11-removebg-preview_vzg736.png" alt="logo"/>
              <div>
                <p className="ab-ft__bn">360&deg; Vertex Solutions</p>
                <p className="ab-ft__tg">Learn &bull; Build &bull; Launch &bull; Grow</p>
              </div>
            </div>
            <p className="ab-ft__bd">A complete technology, career, digital marketing and AI ecosystem for students, professionals, startups and businesses.</p>
            <div className="ab-ft__soc">
              {[["LinkedIn", SOCIAL.linkedin, "LI"], ["Instagram", SOCIAL.instagram, "IG"], ["YouTube", SOCIAL.youtube, "YT"], ["WhatsApp", waLink(), "WA"]].filter(([, href]) => href).map(([lbl,href,ico],i)=>(
                <a key={i} href={href} target="_blank" rel="noreferrer" aria-label={lbl} className="ab-ft__sl">{ico}</a>
              ))}
            </div>
          </div>
          {FCOLS.map((col,i)=>(
            <div key={i} className="ab-ft__col">
              <h4>{col.h}</h4>
              <ul>{col.links.map((l,j)=><li key={j}><button onClick={()=>nav(l.p)}>{l.l}</button></li>)}</ul>
            </div>
          ))}
        </div>
      </div>
      <div className="ab-ft__bot">
        <div className="ab-ct ab-ft__bot-in">
          <p>&copy; {yr} 360&deg; Vertex Solutions. All rights reserved.</p>
          <p>Your Vision | Our Solutions | A Brighter Tomorrow</p>
        </div>
      </div>
    </footer>
  );
}

/* ROOT */
export function AboutContent({ nav }) {
  return (
    <>
      <WhoWeAre/>
      <TwoPillars nav={nav}/>
      <Purpose/>
      <WhoWeServe/>
      <Journey/>
      <OurTechnology/>
      <OurApproach/>
      <OurValues/>
      <Founder nav={nav}/>
      <Vision/>
      <Mission/>
      <FounderMessage/>
      <FinalCTA nav={nav}/>
    </>
  );
}

export default function AboutPage() {
  const nav = useNavigate();
  useEffect(()=>{ window.scrollTo(0,0); },[]);
  return (
    <div className="ab-page">
      <Hero nav={nav}/>
      <AboutContent nav={nav}/>
      <Footer nav={nav}/>
    </div>
  );
}
