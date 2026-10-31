import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Education.css";
import { apiUrl } from "../config/api";

const resumeEducation = [
  {
    id: "sea-college",
    institution: "SEA College of Engineering and Technology, Bengaluru",
    university: "Visvesvaraya Technological University (VTU)",
    degree: "B.E. in Computer Science and Engineering",
    fieldOfStudy: "Computer Science and Engineering",
    description: "CGPA: 7.8 / 10",
    startDate: "2023",
    endDate: "2027",
    current: true,
  },
];

function Education() {
  const [education, setEducation] = useState(resumeEducation);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEducation() {
      try {
        const response = await fetch(apiUrl("/api/education"));

        if (!response.ok) {
          throw new Error("Failed to fetch education records");
        }

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setEducation(data);
        } else {
          setEducation(resumeEducation);
        }
      } catch (err) {
        console.warn("Using default education record:", err);
        setEducation(resumeEducation);
      } finally {
        setLoading(false);
      }
    }

    fetchEducation();
  }, []);

  return (
    <section id="education" className="education-section">
      <div className="education-container">
        <motion.p
          className="education-subtitle"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Academic Background
        </motion.p>

        <motion.h2
          className="education-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My <span>Education</span>
        </motion.h2>

        {loading && (
          <p className="education-status">Loading education...</p>
        )}

        {!loading && education.length === 0 && (
          <p className="education-status">No education records found.</p>
        )}

        {!loading && education.length > 0 && (
          <div className="education-timeline">
            {education.map((item, index) => (
              <motion.article
                key={item.id}
                className="education-item"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <span className="education-dot" />

                <div className="education-card">
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "0.76rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--muted-sage)",
                      marginBottom: "10px",
                    }}
                  >
                    Education Details
                  </span>

                  <h3 className="education-degree">
                    {item.degree || "B.E. in Computer Science and Engineering"}
                  </h3>

                  <p className="education-institution">
                    {item.institution || "SEA College of Engineering and Technology, Bengaluru"}
                  </p>

                  {(item.university || !item.institution) && (
                    <p
                      style={{
                        color: "var(--muted-sage)",
                        fontSize: "0.92rem",
                        fontWeight: "500",
                        margin: "-8px 0 12px",
                      }}
                    >
                      {item.university || "Visvesvaraya Technological University (VTU)"}
                    </p>
                  )}

                  {item.description && (
                    <p
                      style={{
                        color: "var(--soft-green)",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        margin: "0 0 16px",
                      }}
                    >
                      {item.description}
                    </p>
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginTop: "16px",
                      paddingTop: "14px",
                      borderTop: "1px solid var(--border-subtle)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--muted-sage)",
                        fontWeight: "500",
                      }}
                    >
                      Academic Timeline: {item.startDate || "2023"} – {item.current ? (item.endDate || "2027") : (item.endDate || "2027")}
                    </span>

                    <span className="education-date">
                      {item.current ? "In Progress" : "Completed"}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Education;
