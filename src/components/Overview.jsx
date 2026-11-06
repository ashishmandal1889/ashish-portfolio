export default function Overview() {
  return (
    <section id="about" className="section about">
      {/* Compatibility anchor for /overview */}
      <span
        id="overview"
        style={{ display: "block", position: "relative", top: "-80px", visibility: "hidden" }}
      />

      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow">01 / ABOUT ME</p>
          <h2>A developer who enjoys building practical solutions.</h2>
        </div>

        <div className="about__grid">
          <div className="about__text">
            <p className="about__lede">
              I am pursuing a B.E. in Computer Science and Engineering at SEA College of Engineering &amp; Technology. I enjoy developing web applications, working with backend systems, and exploring AI and Machine Learning technologies.
            </p>

            <p className="about__body-paragraph">
              My interests include software engineering, full-stack development, Machine Learning, Artificial Intelligence, Generative AI, and cloud technologies.
            </p>
          </div>

          <div className="about__meta-box">
            <div className="about__meta-item">
              <span className="about__meta-label">Degree</span>
              <span className="about__meta-val">B.E. Computer Science and Engineering</span>
            </div>

            <div className="about__meta-item">
              <span className="about__meta-label">Institution</span>
              <span className="about__meta-val">SEA College of Engineering &amp; Technology</span>
            </div>

            <div className="about__meta-item">
              <span className="about__meta-label">Location</span>
              <span className="about__meta-val">Bengaluru, Karnataka, India</span>
            </div>

            <div className="about__meta-item">
              <span className="about__meta-label">Graduation Year</span>
              <span className="about__meta-val">2027</span>
            </div>

            <div className="about__meta-item">
              <span className="about__meta-label">Focus Areas</span>
              <span className="about__meta-val">Full-Stack Development, Backend APIs, AI/ML</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
