import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiUrl } from "../config/api";

const resumeEducation = [
  {
    id: "sea-college",
    institution: "SEA College of Engineering & Technology",
    university: "Visvesvaraya Technological University (VTU)",
    degree: "Bachelor of Engineering – Computer Science and Engineering",
    fieldOfStudy: "Computer Science and Engineering",
    location: "Bengaluru, Karnataka",
    description: "CGPA: 7.8/10",
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
          // Safeguard against invalid mock data if present in DB
          const filtered = data.filter(
            (item) =>
              !item.institution?.toLowerCase().includes("dayananda") &&
              !item.description?.includes("8.79")
          );
          setEducation(filtered.length > 0 ? filtered : resumeEducation);
        } else {
          setEducation(resumeEducation);
        }
      } catch (err) {
        console.warn("Using default verified education record:", err);
        setEducation(resumeEducation);
      } finally {
        setLoading(false);
      }
    }

    fetchEducation();
  }, []);

  return (
    <section id="education" className="editorial-section">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="editorial-section-header">
          <motion.span
            className="editorial-section-label"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            ACADEMIC FOUNDATION
          </motion.span>

          <motion.h2
            className="editorial-section-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Education
          </motion.h2>

          <motion.p
            className="editorial-section-desc"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Formal degree curriculum focusing on algorithms, distributed computing, and artificial intelligence fundamentals.
          </motion.p>
        </div>

        {loading && education.length === 0 ? (
          <p className="editorial-status-text">Loading education records...</p>
        ) : (
          <div className="education-cards-container">
            {education.map((item, index) => (
              <motion.article
                key={item.id}
                className="education-card-editorial"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="edu-editorial-top">
                  <div>
                    <span className="edu-editorial-status">
                      {item.current ? "CURRENT" : "COMPLETED"}
                    </span>
                    <h3 className="edu-editorial-degree">
                      {item.degree || "B.E. in Computer Science and Engineering"}
                    </h3>
                  </div>

                  <div className="edu-editorial-timeline">
                    {item.startDate || "2023"} – {item.endDate || "2027"}
                  </div>
                </div>

                <div className="edu-editorial-details">
                  <p className="edu-editorial-institution">
                    {item.institution || "SEA College of Engineering & Technology"}
                  </p>

                  <p className="edu-editorial-university">
                    Affiliated with {item.university || "Visvesvaraya Technological University (VTU)"} • {item.location || "Bengaluru, Karnataka"}
                  </p>
                </div>

                <div className="edu-editorial-meta-box">
                  <span className="edu-editorial-meta-label">ACADEMIC PERFORMANCE</span>
                  <span className="edu-editorial-meta-val">
                    CGPA: 7.8/10
                  </span>
                </div>

                <div className="edu-editorial-coursework">
                  <span className="edu-course-tag">Data Structures &amp; Algorithms</span>
                  <span className="edu-course-tag">Database Management Systems</span>
                  <span className="edu-course-tag">Operating Systems</span>
                  <span className="edu-course-tag">Machine Learning Fundamentals</span>
                  <span className="edu-course-tag">Software Engineering</span>
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