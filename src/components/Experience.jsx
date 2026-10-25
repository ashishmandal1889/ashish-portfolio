import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiUrl } from "../config/api";

const API_URL = apiUrl("/api/experiences");

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to load experience information.");
        }

        const data = await response.json();
        setExperiences(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading experiences:", err);
        setError("Experience information is temporarily unavailable.");
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  return (
    <section
      id="experience"
      style={{
        background: "#031f17",
        color: "#E0FFC2",
        padding: "110px 24px",
      }}
    >
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            color: "#8FAF9A",
            textAlign: "center",
            fontSize: "0.8rem",
            fontWeight: "700",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          My Journey
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "clamp(34px, 6vw, 50px)",
            textAlign: "center",
            marginBottom: "54px",
            color: "#E0FFC2",
            fontWeight: "700",
            letterSpacing: "-0.03em",
          }}
        >
          Work Experience
        </motion.h2>

        {loading ? (
          <p style={{ color: "#8FAF9A", textAlign: "center", fontSize: "16px" }}>
            Loading experience...
          </p>
        ) : error ? (
          <p style={{ color: "#f87171", textAlign: "center", fontSize: "16px" }}>
            {error}
          </p>
        ) : experiences.length === 0 ? (
          <p style={{ color: "#8FAF9A", textAlign: "center", fontSize: "16px" }}>
            Experience records will appear here soon.
          </p>
        ) : (
          <div style={{ display: "grid", gap: "22px" }}>
            {experiences.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  borderColor: "rgba(224, 255, 194, 0.42)",
                  boxShadow: "0 16px 40px rgba(0, 0, 0, 0.5), 0 0 24px rgba(224, 255, 194, 0.08)",
                }}
                style={{
                  background: "linear-gradient(145deg, rgba(7, 53, 39, 0.75), rgba(3, 31, 23, 0.95))",
                  border: "1px solid rgba(224, 255, 194, 0.14)",
                  borderRadius: "16px",
                  padding: "30px",
                  boxShadow: "0 16px 36px -10px rgba(0, 0, 0, 0.45)",
                  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                  <h3
                    style={{
                      fontSize: "22px",
                      margin: 0,
                      color: "#E0FFC2",
                      fontWeight: "700",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.position}
                  </h3>

                  {(item.startDate || item.endDate || item.current) && (
                    <span
                      style={{
                        color: "#E0FFC2",
                        background: "rgba(224, 255, 194, 0.08)",
                        border: "1px solid rgba(224, 255, 194, 0.25)",
                        padding: "4px 12px",
                        borderRadius: "16px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {formatDate(item.startDate) || "Start date not set"}
                      {" — "}
                      {item.current
                        ? "Present"
                        : formatDate(item.endDate) || "End date not set"}
                    </span>
                  )}
                </div>

                <p
                  style={{
                    color: "#b2d4bd",
                    margin: "0 0 14px",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {item.company}
                </p>

                {item.description && (
                  <p
                    style={{
                      color: "#8FAF9A",
                      lineHeight: "1.75",
                      whiteSpace: "pre-line",
                      margin: 0,
                      fontSize: "15px",
                    }}
                  >
                    {item.description}
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Experience;
