import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import { apiUrl } from "../config/api";

const API_URL = apiUrl("/api/experiences");

const defaultExperiences = [
  {
    id: "exp-aws-infra",
    position: "AWS Cloud Infrastructure & Monitoring Automation",
    company: "Cloud Infrastructure Project",
    period: "February 2026 – March 2026",
    startDate: "2026-02-01",
    endDate: "2026-03-31",
    current: false,
    technologies: ["AWS", "VPC", "EC2", "S3", "IAM", "CloudWatch", "SNS", "EBS", "Linux", "Python", "Bash", "Git"],
    responsibilities: [
      "Designed and configured a custom AWS VPC with a public subnet, Internet Gateway, route table, and EC2-based web application deployment.",
      "Implemented IAM roles and policies to enable secure, controlled access to Amazon S3 from EC2 instances.",
      "Configured CloudWatch monitoring, CPU utilization alarms, and SNS notifications.",
      "Automated Apache log archival and daily backups to Amazon S3 using Bash scripts and cron jobs.",
      "Developed Python scripts for web log analysis and traffic reporting.",
      "Configured EBS snapshots and documented deployment, backup, disaster recovery, and security procedures.",
    ],
    liveUrl: "http://ashish-aws-project.duckdns.org/",
    githubUrl: "https://github.com/ashishmandal1889/aws-cloud-infrastructure-project",
  },
  {
    id: "exp-thiranex-intern",
    position: "Full Stack Development Intern",
    company: "Thiranex",
    period: "2026 – Present",
    startDate: "2026-01-01",
    endDate: null,
    current: true,
    technologies: ["React", "JavaScript", "Spring Boot", "REST APIs", "CSS3", "Git", "Responsive Design"],
    responsibilities: [
      "Developing a personal portfolio website to showcase technical skills, projects, and professional achievements.",
      "Working on responsive frontend development and full-stack application development as part of internship tasks.",
    ],
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
          // Filter out dummy/empty test records (e.g. company 'xyz' without dates)
          const validApiData = data.filter(
            (item) => item.company && item.company.trim() !== "xyz" && item.company.trim() !== ""
          );

          if (validApiData.length > 0) {
            // Merge with default experiences to ensure core entries remain visible
            const merged = [...defaultExperiences];
            validApiData.forEach((apiItem) => {
              const exists = merged.some(
                (d) =>
                  d.position.toLowerCase() === apiItem.position?.toLowerCase() &&
                  d.company.toLowerCase() === apiItem.company?.toLowerCase()
              );
              if (!exists) {
                merged.push({
                  id: apiItem.id || String(Math.random()),
                  position: apiItem.position,
                  company: apiItem.company,
                  startDate: apiItem.startDate,
                  endDate: apiItem.endDate,
                  current: Boolean(apiItem.current),
                  period: apiItem.startDate
                    ? `${formatDate(apiItem.startDate)} — ${apiItem.current ? "Present" : formatDate(apiItem.endDate) || ""}`
                    : "Experience Period",
                  responsibilities: apiItem.description
                    ? apiItem.description.split("\n").filter((line) => line.trim())
                    : [],
                  technologies: [],
                });
              }
            });
            setExperiences(merged);
          }
        }
      } catch (err) {
        console.warn("Using default rich experiences:", err.message);
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
        <div className="section-header section-header--center">
          <motion.p
            className="section-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="dot" />
            Career &amp; Practical Experience
          </motion.p>

          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Work &amp; <span>Project Experience</span>
          </motion.h2>

          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hands-on software development internships and production cloud infrastructure deployments.
          </motion.p>
        </div>

        {loading && experiences.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)" }}>Loading experiences...</p>
        ) : (
          <div className="experience-list">
            {experiences.map((exp, index) => (
              <motion.article
                key={exp.id}
                className="experience-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <div className="experience-card-header">
                  <div>
                    <h3 className="experience-title">{exp.position}</h3>
                    <p className="experience-company-lead">{exp.company}</p>
                  </div>

                  <span className="experience-period-badge">
                    {exp.period ||
                      `${formatDate(exp.startDate) || ""} — ${exp.current ? "Present" : formatDate(exp.endDate) || ""}`}
                  </span>
                </div>

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="experience-responsibilities">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="experience-technologies">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="experience-tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {(exp.liveUrl || exp.githubUrl) && (
                  <div className="experience-links-row">
                    {exp.liveUrl && (
                      <a
                        href={exp.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn project-action-btn--primary"
                      >
                        <ExternalLink size={15} />
                        Live Demo
                      </a>
                    )}
                    {exp.githubUrl && (
                      <a
                        href={exp.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn project-action-btn--secondary"
                      >
                        <GithubIcon size={15} />
                        View Repository
                      </a>
                    )}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Experience;
