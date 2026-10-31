import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import { apiUrl } from "../config/api";

const resumeProjects = [
  {
    id: "sentinelsos",
    title: "SentinelSOS - AI-Powered Women Safety System",
    description:
      "Contributed to an emergency-safety application featuring rapid SOS alerts, trusted contacts, live location sharing, ML-based area risk analysis, and CI-ready API testing.",
    technologies: "Python, FastAPI, React Native, PostgreSQL, Pytest, Docker, GitHub Actions",
    githubUrl: "https://github.com/ashishmandal1889/Sentinel_SOS",
    liveUrl: "",
    category: "AI & Full Stack",
  },
  {
    id: "mindflow-ai",
    title: "MindFlow AI - AI-Powered Reflection Platform",
    description:
      "Built an AI-powered reflection platform that generates contextual responses, analyzes sentiment, creates actionable SMART goals, and maintains secure user-specific conversation history.",
    technologies: "Node.js, Express.js, JavaScript, Firebase, Firestore, Gemini API, Docker",
    githubUrl: "https://github.com/ashishmandal1889/mindflow-ai",
    liveUrl: "https://mindflow-ai-9fho.onrender.com",
    category: "Generative AI",
  },
  {
    id: "aws-cloud-infra",
    title: "AWS Cloud Infrastructure & Monitoring Automation",
    description:
      "Designed and deployed a custom AWS VPC infrastructure with EC2, automated S3 backups, CloudWatch alarms with SNS notifications, and automated Python log analysis.",
    technologies: "AWS (VPC, EC2, S3, IAM, CloudWatch, SNS, EBS), Linux, Python, Bash, Git",
    githubUrl: "https://github.com/ashishmandal1889/aws-cloud-infrastructure-project",
    liveUrl: "http://ashish-aws-project.duckdns.org/",
    category: "Cloud & DevOps",
  },
  {
    id: "narrivox-ai",
    title: "Narrivox AI - AI-Powered YouTube Script Generator",
    description:
      "Developed a web application that turns user-provided topics into structured, topic-relevant YouTube scripts with hooks and outlines using a generative AI API.",
    technologies: "Generative AI, API Integration, Web Application, React",
    githubUrl: "https://github.com/ashishmandal1889/narrivox-ai",
    liveUrl: "https://narrivox-ai.vercel.app/",
    category: "AI Tool",
  },
  {
    id: "wanderlust",
    title: "Wanderlust",
    description:
      "A full-stack travel and property-listing web application where users can explore listings, create accounts, add properties, and share verified reviews.",
    technologies: "JavaScript, Node.js, Express, MongoDB, RESTful Architecture",
    githubUrl: "https://github.com/ashishmandal1889/wanderlust",
    liveUrl: "https://wanderlust-1-ph3e.onrender.com/",
    category: "Web Application",
  },
];

function Projects() {
  const [projects, setProjects] = useState(resumeProjects);

  useEffect(() => {
    fetch(apiUrl("/api/projects"))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Merge dynamic projects with standard resume projects
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
                technologies: apiProj.technologies || "",
                githubUrl: apiProj.githubUrl || "",
                liveUrl: apiProj.liveUrl || "",
                category: "Project",
              });
            }
          });
          setProjects(merged);
        }
      })
      .catch((error) => {
        console.warn("Using default rich projects list:", error.message);
      });
  }, []);

  return (
    <section id="projects" className="projects-section">
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
            Selected Work
          </motion.p>

          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured <span>Projects</span>
          </motion.h2>

          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Production web platforms, autonomous AI systems, and automated cloud deployments engineered with modern best practices.
          </motion.p>
        </div>

        <div className="projects-editorial-grid">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="project-card-top">
                <span className="project-card-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="project-card-badge">{project.category || "Featured"}</span>
              </div>

              <h3 className="project-card-title">{project.title}</h3>

              <p className="project-card-desc">{project.description}</p>

              <div className="project-card-tech">{project.technologies}</div>

              <div className="project-card-actions">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-btn project-action-btn--primary"
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-btn project-action-btn--secondary"
                  >
                    <GithubIcon size={15} />
                    GitHub
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
