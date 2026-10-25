export default function MissionVisionSection() {
  return (
    <section className="mission-vision section-padding">
      <div className="about-orb about-orb-1" style={{ top: 'auto', bottom: '-100px', left: '-100px' }} />
      <div className="about-orb about-orb-2" style={{ top: '-100px', right: '-100px', bottom: 'auto' }} />
      
      <div className="container mv-grid">
        <div className="mv-card">
          <h2>Our Mission</h2>
          <p>
            To make technology, practical learning and digital innovation more 
            accessible while helping individuals and organizations turn ideas 
            into meaningful digital outcomes.
          </p>
        </div>
        
        <div className="mv-card">
          <h2>Our Vision</h2>
          <p>
            To build a trusted technology ecosystem where people can learn, 
            create, launch and grow with the support of modern technology, 
            digital innovation and artificial intelligence.
          </p>
        </div>
      </div>
    </section>
  );
}
