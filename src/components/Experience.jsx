import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "./Icons";
import { apiUrl } from "../config/api";

const API_URL = apiUrl("/api/experiences");

const defaultExperiences = [
  {
    id: "exp-thiranex-intern",
    typeBadge: "Employment / Internship",
    position: "Full Stack Development Intern",
    company: "Thiranex",
    period: "2026 — Present",
    startDate: "2026-01-01",
    endDate: null,
    current: true,
    technologies: ["React", "JavaScript", "REST APIs", "CSS3", "Git"],
    responsibilities: [
      "Working on full-stack development tasks.",
      "Developing a personal portfolio website.",
      "Working with frontend and backend technologies.",
    ],
  },
  {
    id: "exp-code-unnati",
    typeBadge: "Training Programme",
    position: "Machine Learning Engineer Trainee",
    company: "Code Unnati – SAP & Edunet Foundation",
    description: "",
    responsibilities: [
      "Developing foundational knowledge of Python programming.",
      "Learning Machine Learning and Artificial Intelligence concepts.",
      "Exploring data analysis and practical learning activities.",
    ],
    technologies: ["Python", "Machine Learning", "Artificial Intelligence", "Data Analysis"],
  },
  {
    id: "exp-aws-infra",
    typeBadge: "Independent Project",
    position: "Cloud Infrastructure & Automation Architect",
    company: "AWS Cloud Infrastructure & Monitoring Automation",
    period: "February 2026 – March 2026",
    startDate: "2026-02-01",
    endDate: "2026-03-31",
    current: false,
    technologies: ["AWS", "EC2", "VPC", "S3", "IAM", "CloudWatch", "SNS", "Linux", "Python", "Bash"],
    responsibilities: [
      "Configured AWS VPC, EC2, and S3 infrastructure.",
      "Implemented monitoring and alerts using CloudWatch and SNS.",
      "Automated log archiving and backups using Bash, cron, and Python.",
    ],
    liveUrl: "http://ashish-aws-project.duckdns.org/",
    githubUrl: "https://github.com/ashishmandal1889/aws-cloud-infrastructure-project",
  },
];

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function Experience() {
  const [experiences, setExperiences] = useState(defaultExperiences);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Unable to load experience information.");
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const validApiData = data.filter(
            (item) => item.company && item.company.trim() !== "xyz" && item.company.trim() !== ""
          );

          if (validApiData.length > 0) {
            const merged = [...defaultExperiences];
            validApiData.forEach((apiItem) => {
              const matchIdx = merged.findIndex((d) => {
                const normComp1 = (d.company || "").toLowerCase().replace(/[^a-z0-9]/g, "");
                const normComp2 = (apiItem.company || "").toLowerCase().replace(/[^a-z0-9]/g, "");
                const normPos1 = (d.position || "").toLowerCase().replace(/[^a-z0-9]/g, "");
                const normPos2 = (apiItem.position || "").toLowerCase().replace(/[^a-z0-9]/g, "");
                return (
                  (normPos1 === normPos2 && (normComp1 === normComp2 || normComp1.includes(normComp2) || normComp2.includes(normComp1))) ||
                  (normComp1.includes("codeunnati") && normComp2.includes("codeunnati"))
                );
              });

              let descText = "";
              let respList = [];
              if (apiItem.description) {
                const lines = apiItem.description
                  .split("\n")
                  .map((l) => l.trim())
                  .filter(Boolean);
                const bullets = lines.filter((l) => l.startsWith("•") || l.startsWith("-") || l.startsWith("*"));
                const nonBullets = lines.filter((l) => !l.startsWith("•") && !l.startsWith("-") && !l.startsWith("*"));

                if (bullets.length > 0) {
                  descText = nonBullets.join(" ");
                  respList = bullets.map((b) => b.replace(/^[•\-*]\s*/, ""));
                } else if (lines.length > 1) {
                  respList = lines;
                } else {
                  descText = lines[0] || "";
                }
              }

              if (matchIdx !== -1) {
                merged[matchIdx] = {
                  ...merged[matchIdx],
                  id: apiItem.id || merged[matchIdx].id,
                  company: apiItem.company || merged[matchIdx].company,
                  position: apiItem.position || merged[matchIdx].position,
                  startDate: apiItem.startDate ?? merged[matchIdx].startDate,
                  endDate: apiItem.endDate ?? merged[matchIdx].endDate,
                  current: Boolean(apiItem.current),
                  period: apiItem.startDate
                    ? `${formatDate(apiItem.startDate)} — ${apiItem.current ? "Present" : formatDate(apiItem.endDate) || ""}`
                    : merged[matchIdx].period,
                  description: descText || merged[matchIdx].description,
                  responsibilities: respList.length > 0 ? respList : merged[matchIdx].responsibilities,
                };
              } else {
                merged.push({
                  id: apiItem.id || String(Math.random()),
                  typeBadge: "Professional Experience",
                  position: apiItem.position,
                  company: apiItem.company,
                  startDate: apiItem.startDate,
                  endDate: apiItem.endDate,
                  current: Boolean(apiItem.current),
                  period: apiItem.startDate
                    ? `${formatDate(apiItem.startDate)} — ${apiItem.current ? "Present" : formatDate(apiItem.endDate) || ""}`
                    : "",
                  description: descText,
                  responsibilities: respList,
                  technologies: [],
                });
              }
            });
            setExperiences(merged);
          }
        }
      } catch (err) {
        console.warn("Using default verified experiences:", err.message);
        setExperiences(defaultExperiences);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="experience-section">
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
            PRACTICAL TRACK
          </motion.span>

          <motion.h2
            className="editorial-section-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience &amp; Training
          </motion.h2>

          <motion.p
            className="editorial-section-desc"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hands-on software development internships, machine learning training, and independent production cloud deployments.
          </motion.p>
        </div>

        {loading && experiences.length === 0 ? (
          <p style={{ textAlign: "center", color: "#64756c" }}>Loading experiences...</p>
        ) : (
          <div className="experience-timeline-container">
            <div className="timeline-spine" aria-hidden="true" />

            <div className="experience-timeline-list">
              {experiences.map((exp, index) => (
                <motion.article
                  key={exp.id}
                  className="experience-timeline-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="timeline-node">
                    <Briefcase size={14} className="timeline-node-icon" />
                  </div>

                  <div className="experience-card-premium">
                    <div className="exp-card-header">
                      <div>
                        {exp.typeBadge && (
                          <span className="exp-type-tag">
                            {exp.typeBadge}
                          </span>
                        )}
                        <span className="exp-company-badge">{exp.company}</span>
                        <h3 className="exp-position-title">{exp.position}</h3>
                      </div>

                      {(exp.period || exp.startDate) && (
                        <div className="exp-period-pill">
                          <Calendar size={13} style={{ marginRight: "6px" }} />
                          {exp.period ||
                            `${formatDate(exp.startDate) || ""} — ${exp.current ? "Present" : formatDate(exp.endDate) || ""}`}
                        </div>
                      )}
                    </div>

                    {exp.description && (
                      <p className="exp-description-text">{exp.description}</p>
                    )}

                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="exp-bullet-list">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="exp-bullet-item">
                            <CheckCircle2 size={15} className="bullet-check-icon" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="exp-tech-chips">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="exp-tech-chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {(exp.liveUrl || exp.githubUrl) && (
                      <div className="exp-action-row">
                        {exp.liveUrl && (
                          <a
                            href={exp.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-editorial-primary btn--sm"
                          >
                            Live Deployment
                          </a>
                        )}
                        {exp.githubUrl && (
                          <a
                            href={exp.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-editorial-secondary btn--sm"
                          >
                            <GithubIcon size={14} style={{ marginRight: "6px" }} />
                            Repository
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Experience;