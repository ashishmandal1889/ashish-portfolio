import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Education.css";
import { apiUrl } from "../config/api";

const resumeEducation = [{
  id: "sea-college", institution: "SEA College of Engineering and Technology",
  degree: "Bachelor of Engineering", fieldOfStudy: "Computer Science and Engineering",
  description: "CGPA: 7.8/10 | Visvesvaraya Technological University (VTU)",
  startDate: "2023", endDate: "2027", current: false,
}];

function Education() {
  const [education, setEducation] = useState(resumeEducation);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEducation() {
      try {
        const response = await fetch(
          apiUrl("/api/education")
        );

        if (!response.ok) {
          throw new Error("Failed to fetch education records");
        }

        const data = await response.json();
        setEducation(Array.isArray(data) && data.length ? data : resumeEducation);
      } catch (err) {
        console.error("Education API error:", err);
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
      >
        My Academic Background
      </motion.p>

      <motion.h2
        className="education-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        My <span>Education</span>
      </motion.h2>

      {loading && (
        <p className="education-status">Loading education...</p>
      )}

      {!loading && education.length === 0 && (
        <p className="education-status">
          No education records found.
        </p>
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
                <h3 className="education-degree">
                  {item.degree || "Degree not specified"}
                </h3>

                <p className="education-institution">
                  {item.institution || "Institution not specified"}
                </p>

                {item.fieldOfStudy && (
                  <p className="education-field">
                    Field of Study: {item.fieldOfStudy}
                  </p>
                )}

                {item.description && (
                  <p className="education-description">
                    {item.description}
                  </p>
                )}

                {(item.startDate || item.endDate || item.current) && (
                  <span className="education-date">
                    {item.startDate || "Start date unavailable"}
                    {" — "}
                    {item.current
                      ? "Present"
                      : item.endDate || "End date unavailable"}
                  </span>
                )}
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
