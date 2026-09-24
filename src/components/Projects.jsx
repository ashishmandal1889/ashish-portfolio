import { motion } from "framer-motion";

function Projects() {
  const projects = [
    {
      title: "Wanderlust",
      description:
        "A full-stack travel and property listing platform where users can explore properties, create accounts, add listings, and share reviews.",
      technologies: ["JavaScript", "Node.js", "Express", "MongoDB"],
      github:
        "https://github.com/ashishmandal1889/wanderlust",
    },
    {
      title: "Narrivox AI",
      description:
        "An AI-powered application that helps content creators generate structured and engaging YouTube video scripts using AI and NLP.",
      technologies: ["Python", "AI/ML", "NLP", "Web Development"],
      github:
        "https://github.com/ashishmandal1889/narrivox-ai",
    },
  ];

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        minHeight: "100vh",
        padding: "100px 20px",
        background: "#000",
        color: "#fff",
        boxSizing: "border-box",
      }}
    >
      {/* LABEL */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: "center",
          color: "#22d3ee",
          fontSize: "18px",
          marginBottom: "15px",
        }}
      >
        My Work
      </motion.p>

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          textAlign: "center",
          fontSize: "clamp(40px, 6vw, 60px)",
          margin: "0 0 20px",
        }}
      >
        Featured Projects
      </motion.h2>

      {/* SUBTITLE */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.1,
        }}
        style={{
          maxWidth: "700px",
          margin: "0 auto 60px",
          textAlign: "center",
          color: "#737373",
          fontSize: "18px",
          lineHeight: "1.7",
        }}
      >
        Here are some of the projects I have built while developing
        my software engineering and problem-solving skills.
      </motion.p>

      {/* PROJECT GRID */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
            }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            style={{
              border: "1px solid #262626",
              borderRadius: "16px",
              padding: "35px",
              background: "#080808",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "350px",
              boxSizing: "border-box",
            }}
          >
            <div>
              {/* PROJECT TITLE */}
              <h3
                style={{
                  fontSize: "28px",
                  margin: "0 0 20px",
                }}
              >
                {project.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "16px",
                  lineHeight: "1.7",
                  margin: "0 0 25px",
                }}
              >
                {project.description}
              </p>

              {/* TECHNOLOGIES */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "30px",
                }}
              >
                {project.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{
                      scale: 1.08,
                    }}
                    style={{
                      border: "1px solid #22d3ee",
                      color: "#22d3ee",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "13px",
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* GITHUB BUTTON */}
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                borderColor: "#22d3ee",
                color: "#22d3ee",
              }}
              whileTap={{
                scale: 0.95,
              }}
              style={{
                display: "inline-block",
                width: "fit-content",
                border: "1px solid #333",
                borderRadius: "8px",
                padding: "11px 18px",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              View on GitHub →
            </motion.a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Projects;