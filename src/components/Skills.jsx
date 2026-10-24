import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiUrl } from "../config/api";

const resumeSkills = [
  "Python", "Java", "JavaScript", "SQL", "Data Structures & Algorithms",
  "Machine Learning", "Deep Learning", "NumPy", "Pandas", "scikit-learn",
  "LLMs", "Gemini API", "OpenAI API", "Prompt Engineering", "Agentic AI",
  "React", "Node.js", "Express.js", "FastAPI", "REST APIs", "PostgreSQL",
  "MySQL", "MongoDB", "Firebase", "Docker", "GitHub Actions",
].map((name) => ({ id: name, name }));

function Skills() {
  const [skills, setSkills] = useState(resumeSkills);

  useEffect(() => {
    fetch(apiUrl("/api/skills"))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }

        return response.json();
      })
      .then((data) => {
        setSkills(Array.isArray(data) && data.length ? data : resumeSkills);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
  }, []);

  return (
    <section
      id="skills"
      style={{
        padding: "100px 20px",
        background: "#000",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* LABEL */}
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
          My Skills
        </motion.p>

        {/* TITLE */}
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
          Technologies I Work With
        </motion.h2>

        {/* SKILLS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{
                opacity: 0,
                y: 30,
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
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
                scale: 1.04,
                borderColor: "#22d3ee",
                boxShadow:
                  "0 0 20px rgba(34, 211, 238, 0.15)",
              }}
              whileTap={{
                scale: 0.97,
              }}
              style={{
                padding: "25px 15px",
                border: "1px solid #222",
                borderRadius: "12px",
                background: "#080808",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "default",
                transition: "border-color 0.3s ease",
              }}
            >
              {skill.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
