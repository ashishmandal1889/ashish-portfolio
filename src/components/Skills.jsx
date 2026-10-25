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
        padding: "110px 24px",
        background: "linear-gradient(180deg, #031f17 0%, #064734 50%, #031f17 100%)",
        color: "#E0FFC2",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1050px",
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
            color: "#8FAF9A",
            fontSize: "0.8rem",
            fontWeight: "700",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          My Skills
        </motion.p>

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: "clamp(32px, 6vw, 48px)",
            color: "#E0FFC2",
            fontWeight: "700",
            letterSpacing: "-0.03em",
            margin: "0 0 54px",
          }}
        >
          Technologies I Work With
        </motion.h2>

        {/* SKILLS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))",
            gap: "18px",
          }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{
                opacity: 0,
                y: 25,
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
                duration: 0.45,
                delay: Math.min(index * 0.04, 0.4),
              }}
              whileHover={{
                y: -6,
                scale: 1.03,
                borderColor: "rgba(224, 255, 194, 0.45)",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.45), 0 0 20px rgba(224, 255, 194, 0.08)",
              }}
              whileTap={{
                scale: 0.98,
              }}
              style={{
                padding: "22px 16px",
                border: "1px solid rgba(224, 255, 194, 0.14)",
                borderRadius: "14px",
                background: "linear-gradient(145deg, rgba(7, 53, 39, 0.8), rgba(3, 31, 23, 0.92))",
                color: "#E0FFC2",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "default",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
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
