import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck, Sparkles, Cloud, Video, Compass } from "lucide-react";
import { GithubIcon } from "./Icons";
import { apiUrl } from "../config/api";

const resumeProjects = [
  {
    id: "sentinelsos",
    title: "SentinelSOS",
    subtitle: "AI-Powered Women Safety System",
    description:
      "A safety application concept with emergency SOS, location tracking, voice-based alerts, and ML-based area risk estimation.",
    technologies: "Python, FastAPI, PostgreSQL, Scikit-learn, React",
    githubUrl: "https://github.com/ashishmandal1889/Sentinel_SOS",
    liveUrl: "",
    status: "In Development",
  },
  {
    id: "mindflow-ai",
    title: "MindFlow AI",
    subtitle: "AI-Powered Reflection & Personal Growth Platform",
    description:
      "An application designed to support personal reflection and growth using AI-powered features.",
    technologies: "Node.js, Express.js, Firebase Authentication, Firestore, Gemini API, Docker",
    githubUrl: "https://github.com/ashishmandal1889/mindflow-ai",
    liveUrl: "https://mindflow-ai-9fho.onrender.com",
    status: "",
  },
  {
    id: "wanderlust",
    title: "Wanderlust",
    subtitle: "Full-Stack Travel & Property Listing Application",
    description:
      "An Airbnb-style application for exploring and managing property listings.",
    technologies: "JavaScript, Node.js, Express.js, MongoDB",
    githubUrl: "https://github.com/ashishmandal1889/wanderlust",
    liveUrl: "https://wanderlust-1-ph3e.onrender.com/",
    status: "",
  },
  {
    id: "narrivox-ai",
    title: "Narrivox AI",
    subtitle: "AI-Powered YouTube Script Generator",
    description:
      "An AI application that helps generate YouTube video scripts.",
    technologies: "JavaScript, AI API Integration, Web Development",
    githubUrl: "https://github.com/ashishmandal1889/narrivox-ai",
    liveUrl: "https://narrivox-ai.vercel.app/",
    status: "",
  },
  {
    id: "aws-cloud-infra",
    title: "AWS Cloud Infrastructure & Monitoring Automation",
    subtitle: "Cloud Infrastructure & Systems Deployment",
    description:
      "Configured AWS infrastructure, monitoring, alerting, automated log archiving, and backups.",
    technologies: "AWS, EC2, VPC, S3, IAM, CloudWatch, SNS, Linux, Python, Bash",
    githubUrl: "https://github.com/ashishmandal1889/aws-cloud-infrastructure-project",
    liveUrl: "http://ashish-aws-project.duckdns.org/",
    status: "",
  },
];

function getProjectIcon(id) {
  switch (id) {
    case "sentinelsos":
      return ShieldCheck;
    case "mindflow-ai":
      return Sparkles;
    case "aws-cloud-infra":
      return Cloud;
    case "narrivox-ai":
      return Video;
    case "wanderlust":
      return Compass;
    default:
      return Sparkles;
  }
}

function Projects() {
  const [projects, setProjects] = useState(resumeProjects);

  useEffect(() => {
    fetch(apiUrl("/api/projects"))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const merged = [...resumeProjects];
          data.forEach((apiProj) => {
            const exists = merged.some(
              (m) => m.title?.toLowerCase() === apiProj.title?.toLowerCase()
            );
            if (!exists) {
              merged.push({
                id: apiProj.id || String(Math.random()),
                title: apiProj.title,
                description: apiProj.description,
                contribution: apiProj.description,
                technologies: apiProj.technologies || "",
                githubUrl: apiProj.githubUrl || "",
                liveUrl: apiProj.liveUrl || "",
                category: "Engineering Project",
                tagline: "Full-Stack Engineering Project",
              });
            }
          });
          setProjects(merged);
        }
      })
      .catch((err) => {
        console.warn("Using default verified projects list:", err.message);
      });
  }, []);

  return (
    <section id="projects" className="projects-section">
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
            SELECTED WORK
          </motion.span>

          <motion.h2
            className="editorial-section-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Projects
          </motion.h2>

          <motion.p
            className="editorial-section-desc"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Production web platforms, applied AI applications, and automated cloud infrastructure engineered with rigorous technical standards.
          </motion.p>
        </div>

        {/* Responsive Projects Grid */}
        <div className="projects-editorial-grid">
          {projects.map((project, index) => {
            const ProjectIcon = getProjectIcon(project.id);
            const techList = (project.technologies || "")
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean);

            return (
              <motion.article
                key={project.id}
                className="project-card-premium"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {/* Visual Header Banner */}
                <div className="project-banner">
                  <div className="project-banner-content">
                    <span className="project-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="project-icon-badge">
                      <ProjectIcon size={20} className="proj-banner-icon" />
                    </div>
                    {project.status ? (
                      <span className="project-status-pill">
                        {project.status}
                      </span>
                    ) : (
                      <span className="project-category-pill">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Body */}
                <div className="project-card-inner">
                  {project.subtitle && (
                    <p className="project-subtitle-tag">{project.subtitle}</p>
                  )}
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>

                  {project.contribution && (
                    <div className="project-contribution-box">
                      <span className="project-contribution-label">Key Contribution:</span>
                      <p className="project-contribution-text">{project.contribution}</p>
                    </div>
                  )}

                  {/* Tech Pills */}
                  <div className="project-tech-tags">
                    {techList.map((tech) => (
                      <span key={tech} className="project-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="project-footer-actions">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-editorial-primary btn--sm"
                      >
                        <ExternalLink size={14} style={{ marginRight: "6px" }} />
                        Live Demo
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-editorial-secondary btn--sm"
                      >
                        <GithubIcon size={14} style={{ marginRight: "6px" }} />
                        Repository
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;