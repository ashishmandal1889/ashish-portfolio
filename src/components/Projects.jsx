import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        return response.json();
      })
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <section
      id="projects"
      style={{
        padding: "100px 20px",
        background: "#000",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            color: "#22d3ee",
            fontSize: "16px",
            marginBottom: "10px",
          }}
        >
          My Projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: "clamp(32px, 6vw, 45px)",
            margin: "10px 0 50px",
          }}
        >
          Projects I've Built
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
            textAlign: "left",
          }}
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
              style={{
                padding: "30px",
                background: "#080808",
                border: "1px solid #222",
                borderRadius: "14px",
                transition: "border-color 0.3s ease",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  marginBottom: "15px",
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  color: "#aaa",
                  lineHeight: "1.7",
                  marginBottom: "20px",
                }}
              >
                {project.description}
              </p>

              <p
                style={{
                  color: "#22d3ee",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  marginBottom: "25px",
                }}
              >
                {project.technologies}
              </p>

              {/* Project Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 16px",
                      border: "1px solid #333",
                      borderRadius: "8px",
                      color: "white",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    GitHub
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 16px",
                      background: "#22d3ee",
                      border: "1px solid #22d3ee",
                      borderRadius: "8px",
                      color: "#000",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
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