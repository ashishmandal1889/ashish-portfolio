
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Credentials.css";
import { apiUrl } from "../config/api";

const resumeCredentials = [
  { id: "ai-fundamentals", type: "CERTIFICATE", title: "Artificial Intelligence Fundamentals", organization: "IBM SkillsBuild", date: "Sep 4, 2024" },
  { id: "rag-mongodb", type: "CERTIFICATE", title: "Building RAG Apps Using MongoDB", organization: "MongoDB", date: "Oct 22, 2026" },
  { id: "data-analytics", type: "CERTIFICATE", title: "Data Analytics Essentials", organization: "Coursera", date: "Jul 28, 2023" },
  { id: "observability", type: "CERTIFICATE", title: "Observability for AI Agents", organization: "MongoDB", date: "Oct 22, 2026" },
  { id: "code-unnati", type: "CERTIFICATE", title: "Code Unnati Program", organization: "SAP and Edunet Foundation", description: "Machine Learning training and exposure to emerging technologies." },
  { id: "dsa", type: "ACHIEVEMENT", title: "100+ DSA Problems Solved", organization: "LeetCode", description: "Solved over 100 data structures and algorithms problems." },
  { id: "publication", type: "ACHIEVEMENT", title: "Published: Smart Waste Monitoring System for Sustainable Smart Cities", organization: "International Journal Research Publication Analysis (IJRPA)", description: "Volume 2, Issue 1, January 2026. DOI: 101555/ijrpa.5184" },
  { id: "hackathons", type: "ACHIEVEMENT", title: "Hackathon Contributions", description: "Participated in Aptos Ctrl+Move and KRNL Dekoded hackathons; developed MindFlow AI during a Hack2Skill hackathon." },
];

function Credentials() {
  const [credentials, setCredentials] = useState(resumeCredentials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCredentials() {
      try {
        const response = await fetch(
          apiUrl("/api/credentials")
        );

        if (!response.ok) {
          throw new Error("Failed to fetch credentials");
        }

        const data = await response.json();
        setCredentials(Array.isArray(data) && data.length ? data : resumeCredentials);
      } catch (err) {
        console.error("Credentials API error:", err);
        setCredentials(resumeCredentials);
      } finally {
        setLoading(false);
      }
    }

    fetchCredentials();
  }, []);

  const certificates = credentials.filter(
    (item) => item.type === "CERTIFICATE"
  );

  const achievements = credentials.filter(
    (item) => item.type === "ACHIEVEMENT"
  );

  return (
    <section id="credentials" className="credentials-section">
      <div className="credentials-container">
        <motion.p
          className="credentials-subtitle"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Milestones & Recognition
        </motion.p>

        <motion.h2
          className="credentials-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Achievements <span>&</span> Certifications
        </motion.h2>

        {loading && (
          <p className="credentials-status">Loading credentials...</p>
        )}

        {!loading && credentials.length === 0 && (
          <p className="credentials-status">
            Achievements and certifications will appear here soon.
          </p>
        )}

        {!loading && credentials.length > 0 && (
          <>
            {[
              {
                title: "Achievements",
                type: "ACHIEVEMENT",
                items: achievements,
              },
              {
                title: "Certifications",
                type: "CERTIFICATE",
                items: certificates,
              },
            ].map((group) => (
              <div className="credential-group" key={group.type}>
                <h3 className="credential-group-title">
                  {group.title}
                </h3>

                {group.items.length === 0 ? (
                  <p className="credentials-status">
                    No {group.title.toLowerCase()} added yet.
                  </p>
                ) : (
                  <div className="credentials-grid">
                    {group.items.map((item, index) => (
                      <motion.article
                        className="credential-card"
                        key={item.id}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.12,
                        }}
                      >
                        <div className="credential-icon">
                          {group.type === "ACHIEVEMENT"
                            ? "🏆"
                            : "🎓"}
                        </div>

                        <h4 className="credential-title">
                          {item.title}
                        </h4>

                        {item.organization && (
                          <p className="credential-organization">
                            {item.organization}
                          </p>
                        )}

                        {item.description && (
                          <p className="credential-description">
                            {item.description}
                          </p>
                        )}

                        {item.date && (
                          <p className="credential-date">
                            {item.date}
                          </p>
                        )}

                        {item.url && (
                          <a
                            className="credential-link"
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Details ↗
                          </a>
                        )}
                      </motion.article>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Credentials;
