import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { apiUrl } from "../config/api";

const resumeProjects = [
  { id: "mindflow-ai", title: "MindFlow AI - AI-Powered Reflection Platform", description: "Built an AI-powered reflection platform that generates contextual responses, analyzes sentiment, creates actionable SMART goals, and keeps user-specific conversation history.", technologies: "Node.js, Express.js, JavaScript, Firebase, Firestore, Gemini API, Docker", githubUrl: "https://github.com/ashishmandal1889/mindflow-ai", liveUrl: "https://mindflow-ai-9fho.onrender.com" },
  { id: "sentinelsos", title: "SentinelSOS - AI-Powered Women Safety System", description: "Contributed to an emergency-safety application with SOS alerts, trusted contacts, location sharing, ML-based area risk analysis, and CI-ready API testing.", technologies: "Python, FastAPI, React Native, PostgreSQL, Pytest, Docker, GitHub Actions", githubUrl: "https://github.com/ashishmandal1889/Sentinel_SOS" },
  { id: "narrivox-ai", title: "Narrivox AI - AI-Powered YouTube Script Generator", description: "Developed a web application that turns user-provided topics into structured, topic-relevant YouTube scripts using a generative AI API.", technologies: "Generative AI, API Integration, Web Application", githubUrl: "https://github.com/ashishmandal1889/narrivox-ai", liveUrl: "https://narrivox-ai.vercel.app/" },
  { id: "wanderlust", title: "Wanderlust", description: "A full-stack travel and property-listing web application where users can explore listings, create accounts, add properties, and share reviews.", technologies: "JavaScript, Node.js, Express, MongoDB", githubUrl: "https://github.com/ashishmandal1889/wanderlust", liveUrl: "https://wanderlust-1-ph3e.onrender.com/" },
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
        setProjects(Array.isArray(data) && data.length ? data : resumeProjects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <section
      id="projects"
      className="projects-section projects-section--premium"
    >
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-eyebrow"
        >
          My Projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-heading"
        >
          Projects I've Built
        </motion.h2>

        <div
          className="projects-grid projects-grid--premium"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
                borderColor: "#22d3ee",
                boxShadow: "0 0 25px rgba(34, 211, 238, 0.12)",
              }}
              className="project-card project-card--premium"
            >
              <div className="project-card__topline">
                <span className="project-card__number">{String(index + 1).padStart(2, "0")}</span>
                <span className="project-card__label">Selected work</span>
              </div>
              <h3 className="project-card__title">
                {project.title}
              </h3>

              <p className="project-card__description">
                {project.description}
              </p>

              <p className="project-card__technologies">
                {project.technologies}
              </p>

              {/* Project Buttons */}
              <div
                className="project-card__actions"
              >
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link--secondary"
                  >
                    GitHub
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link--primary"
                  >
                    <ExternalLink size={17} />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
