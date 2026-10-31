import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiUrl } from "../config/api";

const resumeSkills = [
  "Python", "Java", "JavaScript", "SQL", "Data Structures & Algorithms",
  "Machine Learning", "Deep Learning", "NumPy", "Pandas", "scikit-learn",
  "LLMs", "Gemini API", "OpenAI API", "Prompt Engineering", "Agentic AI",
  "React", "Node.js", "Express.js", "FastAPI", "REST APIs", "PostgreSQL",
  "MySQL", "MongoDB", "Firebase", "AWS (VPC, EC2, S3)", "Docker", "GitHub Actions",
  "Linux", "Bash",
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
        if (Array.isArray(data) && data.length > 0) {
          setSkills(data);
        }
      })
      .catch((error) => {
        console.warn("Using default rich skills list:", error.message);
      });
  }, []);

  return (
    <section id="skills" className="skills-section">
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
            Capabilities &amp; Stack
          </motion.p>

          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Technical <span>Expertise</span>
          </motion.h2>

          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Core programming languages, frameworks, cloud services, and AI developer tools I work with.
          </motion.p>
        </div>

        <div className="skills-grid-editorial">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id || skill.name}
              className="skill-chip-editorial"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: (index % 12) * 0.04 }}
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
