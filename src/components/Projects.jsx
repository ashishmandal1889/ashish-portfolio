import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";

const resumeProjects = [
  {
    id: "sentinelsos",
    title: "SentinelSOS",
    tagline: "AI-Powered Women Safety System",
    category: "AI & Safety System",
    type: "ai-ml",
    year: "2026",
    description:
      "A safety application concept with emergency SOS, location tracking, voice-based alerts, and ML-based area risk estimation.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Scikit-learn", "React"],
    githubUrl: "https://github.com/ashishmandal1889/Sentinel_SOS",
    liveUrl: "",
    status: "In Development",
  },
  {
    id: "mindflow-ai",
    title: "MindFlow AI",
    tagline: "AI-Powered Reflection & Personal Growth Platform",
    category: "Full-Stack AI Application",
    type: "ai-ml",
    year: "2026",
    description:
      "An application designed to support personal reflection and growth using AI-powered features with Gemini API.",
    technologies: ["Node.js", "Express.js", "Firebase Auth", "Firestore", "Gemini API", "Docker"],
    githubUrl: "https://github.com/ashishmandal1889/mindflow-ai",
    liveUrl: "https://mindflow-ai-9fho.onrender.com",
    status: "Deployed",
  },
  {
    id: "wanderlust",
    title: "Wanderlust",
    tagline: "Full-Stack Travel & Property Listing Application",
    category: "Web Application",
    type: "full-stack",
    year: "2025",
    description:
      "An Airbnb-style application for exploring and managing property listings with reviews and secure auth.",
    technologies: ["JavaScript", "Node.js", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/ashishmandal1889/wanderlust",
    liveUrl: "https://wanderlust-1-ph3e.onrender.com/",
    status: "Deployed",
  },
  {
    id: "narrivox-ai",
    title: "Narrivox AI",
    tagline: "AI-Powered YouTube Script Generator",
    category: "AI Content Platform",
    type: "ai-ml",
    year: "2026",
    description:
      "An AI application that helps generate structured, topic-relevant YouTube video scripts via generative AI.",
    technologies: ["JavaScript", "AI Integration", "Web Development"],
    githubUrl: "https://github.com/ashishmandal1889/narrivox-ai",
    liveUrl: "https://narrivox-ai.vercel.app/",
    status: "Deployed",
  },
  {
    id: "aws-cloud-infra",
    title: "AWS Cloud Infrastructure & Monitoring Automation",
    tagline: "Cloud Infrastructure & Systems Deployment",
    category: "Cloud & DevOps",
    type: "cloud-devops",
    year: "2026",
    description:
      "Configured high-availability AWS infrastructure, EC2, VPC, S3, IAM, CloudWatch monitoring, SNS alerting, automated log archiving, and backups.",
    technologies: ["AWS", "EC2", "VPC", "S3", "IAM", "CloudWatch", "SNS", "Linux", "Python", "Bash"],
    githubUrl: "https://github.com/ashishmandal1889/aws-cloud-infrastructure-project",
    liveUrl: "http://ashish-aws-project.duckdns.org/",
    status: "Operational",
  },
];

export default function Projects() {
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
              const techs = (apiProj.technologies || "")
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t && !t.toLowerCase().includes("spring boot"));

              merged.push({
                id: apiProj.id ? String(apiProj.id) : `proj-${Math.random()}`,
                title: apiProj.title,
                tagline: apiProj.title,
                category: "Engineering Project",
                type: "full-stack",
                year: "2026",
                description: apiProj.description,
                technologies: techs.length > 0 ? techs : ["Full-Stack"],
                githubUrl: apiProj.githubUrl || "",
                liveUrl: apiProj.liveUrl || "",
                status: "Completed",
              });
            }
          });
          setProjects(merged);
        }
      })
      .catch((err) => {
        console.warn("Using default projects list:", err.message);
      });
  }, []);

  return (
    <section id="projects" className="section work">
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow">03 / SELECTED WORK</p>
          <h2>Featured Projects</h2>
          <p className="work__subtitle">
            All 5 core engineering projects built across full-stack development, applied AI, and cloud systems.
          </p>
        </div>

        <div className="cases">
          {projects.map((proj, idx) => {
            const indexStr = String(idx + 1).padStart(2, "0");
            return (
              <article
                key={proj.id}
                id={`project-${proj.id}`}
                className="case"
              >
                <div className="case__shot">
                  <div className="case__shot-inner">
                    <div className="case__shot-chrome">
                      <span className="case__shot-dot" />
                      <span className="case__shot-dot" />
                      <span className="case__shot-dot" />
                      <span className="case__shot-title">{proj.title}</span>
                    </div>
                    <div className="case__shot-view">
                      <div className="case__shot-accent-box">
                        <div className="case__meta-row">
                          <p className="case__no">
                            {indexStr} / {proj.year} · {proj.category}
                          </p>
                          {proj.status && (
                            <span className="case__status-pill">{proj.status}</span>
                          )}
                        </div>

                        <h3 className="case__title">{proj.title}</h3>
                        <p className="case__tag">{proj.tagline}</p>
                        <p className="case__lede">{proj.description}</p>

                        <div className="s-chips">
                          {proj.technologies.map((tech) => (
                            <span key={tech} className="s-chip">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="case__actions">
                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="case__go"
                            >
                              GitHub Code
                            </a>
                          )}
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="case__go case__go--live"
                            >
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
