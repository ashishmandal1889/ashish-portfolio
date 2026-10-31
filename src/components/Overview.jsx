import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiUrl } from "../config/api";

const defaultOverview = {
  heading: "About & Overview",
  role: "Full Stack Developer & AI/ML Enthusiast",
  intro:
    "I am Ashish Kumar, a Computer Science undergraduate graduating in 2027 with a strong passion for building robust full-stack web platforms and intelligent AI/ML solutions. I combine scalable backend architecture with clean, modern user interfaces to create practical, production-ready software.",
  interests: [
    "AI/ML & Generative AI (LLMs, Agentic AI, RAG Systems)",
    "Cloud Architecture & Automation (AWS VPC, EC2, S3, IAM)",
    "High-Performance Backend Engineering (Spring Boot, FastAPI, Node.js)",
    "Distributed Databases & Data Pipelines (PostgreSQL, MongoDB)",
  ],
  goals:
    "My objective is to engineer resilient, high-throughput cloud backends and production AI systems that deliver tangible real-world impact. I continuously strive to master distributed systems design, observability, and modern DevOps methodologies.",
  technologies: [
    "Python",
    "Java",
    "Spring Boot",
    "React",
    "JavaScript",
    "AWS",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "FastAPI",
    "Node.js",
    "Git & GitHub",
    "Linux",
    "Bash",
  ],
};

function Overview() {
  const [data, setData] = useState(defaultOverview);

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
        console.warn("Using default rich overview content:", err.message);
      });
  }, []);

  return (
    <section id="overview" className="overview-section">
      {/* Invisible anchor for backward compatibility with #about */}
      <span
        id="about"
        style={{ display: "block", position: "relative", top: "-84px", visibility: "hidden" }}
      />

      <div className="section-container">
        {/* Header */}
        <div className="section-header section-header--center">
          <motion.p
            className="section-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="dot" />
            Overview &amp; Profile
          </motion.p>

          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Who I Am <span>&amp; What I Build</span>
          </motion.h2>

          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A comprehensive look at my background, technical focus, and development philosophy.
          </motion.p>
        </div>

        {/* Editorial Bento / Grid */}
        <div className="overview-editorial-grid">
          {/* Card 1: Professional Introduction */}
          <motion.div
            className="overview-card overview-card--lead"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="overview-card-tag">Introduction</span>
            <h3 className="overview-card-title">{data.role}</h3>
            <p className="overview-card-body" style={{ fontSize: "1.1rem" }}>
              {data.intro}
            </p>
          </motion.div>

          {/* Card 2: Professional Goals */}
          <motion.div
            className="overview-card overview-card--col-6"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="overview-card-tag">Professional Goals</span>
            <h3 className="overview-card-title">Engineering Reliable Impact</h3>
            <p className="overview-card-body">{data.goals}</p>
          </motion.div>

          {/* Card 3: Technical Interests */}
          <motion.div
            className="overview-card overview-card--col-6"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="overview-card-tag">Technical Interests</span>
            <h3 className="overview-card-title">Core Disciplines</h3>
            <ul style={{ margin: "10px 0 0", paddingLeft: "18px", color: "var(--text-muted)", lineHeight: "1.7" }}>
              {data.interests.map((item, idx) => (
                <li key={idx} style={{ marginBottom: "6px" }}>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 4: Key Technologies */}
          <motion.div
            className="overview-card overview-card--col-12"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="overview-card-tag">Key Technologies</span>
            <h3 className="overview-card-title">Core Stack &amp; Development Tools</h3>
            <p className="overview-card-body" style={{ fontSize: "0.95rem" }}>
              Languages, frameworks, databases, and cloud platforms I actively leverage in production projects:
            </p>
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
