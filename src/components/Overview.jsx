import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiUrl } from "../config/api";

const defaultAbout = {
  heading: "About Me",
  subtitle: "A little about my background, interests, and what I am working towards.",
  intro:
    "I am a Computer Science Engineering undergraduate interested in software engineering, full-stack development, and Artificial Intelligence. I enjoy building practical applications and learning technologies that solve real-world problems.",
  goals:
    "To grow as a Software Engineer or AI/ML Engineer by building reliable applications and improving my technical skills.",
  interests:
    "Full-stack development, backend engineering, Machine Learning, Generative AI, and cloud technologies.",
  technologies: [
    "Java",
    "Python",
    "JavaScript",
    "React",
    "Node.js",
    "SQL",
    "MongoDB",
    "FastAPI",
    "Scikit-learn",
    "AWS",
    "Docker",
  ],
};

function Overview() {
  const [data, setData] = useState(defaultAbout);

  useEffect(() => {
    fetch(apiUrl("/api/about"))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch about data");
        return res.json();
      })
      .then((apiData) => {
        if (Array.isArray(apiData) && apiData.length > 0) {
          const first = apiData[0];
          setData((prev) => ({
            ...prev,
            heading: first.heading || prev.heading,
            intro: first.description || prev.intro,
          }));
        }
      })
      .catch((err) => {
        console.warn("Using default verified about content:", err.message);
      });
  }, []);

  return (
    <section id="about" className="overview-section">
      {/* Anchor for backward compatibility with #overview */}
      <span
        id="overview"
        style={{ display: "block", position: "relative", top: "-84px", visibility: "hidden" }}
      />

      <div className="section-container">
        {/* Section Header */}
        <div className="editorial-section-header">
          <motion.span
            className="editorial-section-label"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            BACKGROUND &amp; ASPIRATIONS
          </motion.span>

          <motion.h2
            className="editorial-section-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h2>

          <motion.p
            className="editorial-section-desc"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A little about my background, interests, and what I am working towards.
          </motion.p>
        </div>

        {/* Editorial Grid: Intro (Full), Goals & Interests (Side by Side), Key Tech (Full) */}
        <div className="overview-editorial-grid">
          {/* Card 1: Introduction (Full Width, #FFFFFF) */}
          <motion.div
            className="overview-card overview-card--intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="overview-card-tag">About Me</span>
            <h3 className="overview-card-title">Introduction</h3>
            <p className="overview-card-body" style={{ fontSize: "1.06rem", lineHeight: "1.75" }}>
              {data.intro}
            </p>
          </motion.div>

          {/* Card 2: Professional Goals (Left, #C5D0C5) */}
          <motion.div
            className="overview-card overview-card--goals"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="overview-card-tag">Aspirations</span>
            <h3 className="overview-card-title">Professional Goals</h3>
            <p className="overview-card-body">{data.goals}</p>
          </motion.div>

          {/* Card 3: Technical Interests (Right, #E9ECE7) */}
          <motion.div
            className="overview-card overview-card--interests"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="overview-card-tag">Focus Areas</span>
            <h3 className="overview-card-title">Technical Interests</h3>
            <p className="overview-card-body">{data.interests}</p>
          </motion.div>

          {/* Card 4: Key Technologies (Full Width, #FFFFFF) */}
          <motion.div
            className="overview-card overview-card--tech"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="overview-card-tag">Technical Stack</span>
            <h3 className="overview-card-title">Key Technologies</h3>
            <div className="tech-pill-grid">
              {data.technologies.map((tech) => (
                <span key={tech} className="tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Overview;