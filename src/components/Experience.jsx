
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
        background: "#000",
        color: "#fff",
        padding: "100px 24px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            color: "#22d3ee",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          My Journey
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "clamp(36px, 6vw, 52px)",
            textAlign: "center",
            marginBottom: "45px",
          }}
        >
          Experience
        </motion.h2>

        {loading ? (
          <p style={{ color: "#9ca3af", textAlign: "center" }}>
            Loading experience...
          </p>
        ) : error ? (
          <p style={{ color: "#f87171", textAlign: "center" }}>
            {error}
          </p>
        ) : experiences.length === 0 ? (
          <p style={{ color: "#9ca3af", textAlign: "center" }}>
            No experience has been added yet.
          </p>
        ) : (
          <div style={{ display: "grid", gap: "24px" }}>
            {experiences.map((item) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  background: "#0a0a0a",
                  border: "1px solid #262626",
                  borderRadius: "12px",
                  padding: "26px",
                }}
              >
                <h3
                  style={{
                    fontSize: "24px",
                    margin: "0 0 8px",
                  }}
                >
                  {item.position}
                </h3>

                <p
                  style={{
                    color: "#22d3ee",
                    margin: "0 0 12px",
                    fontSize: "17px",
                  }}
                >
                  {item.company}
                </p>

                {item.description && (
                  <p
                    style={{
                      color: "#a3a3a3",
                      lineHeight: "1.7",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {item.description}
                  </p>
                )}

                {(item.startDate || item.endDate || item.current) && (
                  <p style={{ color: "#737373", fontSize: "14px" }}>
                    {formatDate(item.startDate) || "Start date not set"}
                    {" — "}
                    {item.current
                      ? "Present"
                      : formatDate(item.endDate) || "End date not set"}
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
