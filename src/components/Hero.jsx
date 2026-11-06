import { useState } from "react";

export default function Hero() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section id="top" className="hero" data-hero="true">
      <div className="wrap hero__inner">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">
            SOFTWARE ENGINEER · AI/ML ENTHUSIAST · BENGALURU, INDIA
          </p>

          <h1 className="hero__title">
            Building software. Exploring AI and Machine Learning.
          </h1>

          <p className="hero__intro">
            I'm Ashish Kumar, a Computer Science Engineering undergraduate interested in full-stack development, backend engineering, Artificial Intelligence, and Machine Learning.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="cta">
              <span className="cta__text">Explore Projects</span>
            </a>

            <a
              href="https://github.com/ashishmandal1889"
              target="_blank"
              rel="noopener noreferrer"
              className="ghost"
            >
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>

        {/* Profile Image Area */}
        <div className="hero__media">
          <div
            className={`portrait__card ${flipped ? "is-flipped" : ""}`}
            onClick={() => setFlipped(!flipped)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setFlipped(!flipped)}
            aria-label="Profile image area. Click to flip."
            title="Profile image area. Click to flip."
          >
            <div className="portrait__face portrait__face--front">
              <img
                src="/profile.jpg"
                alt="Ashish Kumar"
                onError={(e) => {
                  e.currentTarget.src = "/profile.jpeg";
                }}
              />
              <div className="portrait__tag">Ashish Kumar</div>
            </div>

            <div className="portrait__face portrait__face--back">
              <div className="portrait__back-content">
                <div className="portrait__mono">B.E. CSE · 2027</div>
                <h3>Ashish Kumar</h3>
                <p>Full-Stack Developer &amp; AI/ML Engineer based in Bengaluru, India.</p>
                <span className="portrait__click-hint">Click to flip</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
