import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { apiUrl } from "../config/api";

const resumeCertifications = [
  {
    id: "ai-fundamentals",
    type: "CERTIFICATE",
    title: "Artificial Intelligence Fundamentals",
    organization: "IBM SkillsBuild",
    date: "Sep 4, 2024",
    link: "",
  },
  {
    id: "rag-mongodb",
    type: "CERTIFICATE",
    title: "Building RAG Apps Using MongoDB",
    organization: "MongoDB",
    date: "Oct 22, 2026",
    link: "",
  },
  {
    id: "data-analytics",
    type: "CERTIFICATE",
    title: "Data Analytics Essentials",
    organization: "Coursera",
    date: "Jul 28, 2023",
    link: "",
  },
  {
    id: "observability",
    type: "CERTIFICATE",
    title: "Observability for AI Agents",
    organization: "MongoDB",
    date: "Oct 22, 2026",
    link: "",
  },
  {
    id: "code-unnati",
    type: "CERTIFICATE",
    title: "Code Unnati Machine Learning Program",
    organization: "SAP and Edunet Foundation",
    date: "2024",
    link: "",
  },
];

const resumeAchievements = [
  {
    id: "hackathons",
    category: "Hackathon Participation",
    title: "Hackathon Competitions & AI Innovation",
    organization: "Aptos Ctrl+Move, KRNL Dekoded & Hack2Skill",
    description: "Participated in Web3 and AI hackathons; built MindFlow AI platform during Hack2Skill.",
    link: "",
  },
  {
    id: "dsa",
    category: "DSA & Coding Achievements",
    title: "100+ Data Structures & Algorithms Solved",
    organization: "LeetCode",
    description: "Demonstrated consistent problem-solving across array manipulation, graphs, and dynamic programming.",
    link: "https://leetcode.com/u/ashishmandal1889/",
  },
  {
    id: "publication",
    category: "Research Publications",
    title: "Smart Waste Monitoring System for Sustainable Smart Cities",
    organization: "International Journal Research Publication Analysis (IJRPA)",
    date: "January 2026",
    doi: "101555/ijrpa.5184",
    description: "Co-authored peer-reviewed research paper. Volume 2, Issue 1, January 2026. DOI: 101555/ijrpa.5184.",
    link: "",
  },
];

function Credentials() {
  const [certifications, setCertifications] = useState(resumeCertifications);
  const [achievements, setAchievements] = useState(resumeAchievements);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCredentials() {
      try {
        const response = await fetch(apiUrl("/api/credentials"));
        if (!response.ok) {
          throw new Error("Failed to fetch credentials");
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const apiCerts = data.filter((item) => item.type === "CERTIFICATE");
          const apiAchieve = data.filter((item) => item.type === "ACHIEVEMENT");

          if (apiCerts.length > 0) {
            setCertifications(apiCerts);
          }
          if (apiAchieve.length > 0) {
            // Map or merge verified achievements
            setAchievements((prev) => {
              const merged = [...prev];
              apiAchieve.forEach((ach) => {
                const exists = merged.some(
                  (m) => m.title?.toLowerCase() === ach.title?.toLowerCase()
                );
                if (!exists) {
                  merged.push({
                    id: ach.id || String(Math.random()),
                    category: ach.organization || "Achievement",
                    title: ach.title,
                    organization: ach.organization || "",
                    date: ach.date || "",
                    description: ach.description || "",
                    link: ach.credentialUrl || "",
                  });
                }
              });
              return merged;
            });
          }
        }
      } catch (err) {
        console.warn("Using default verified credentials:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCredentials();
  }, []);

  return (
    <>
      {/* SECTION 8: CERTIFICATIONS */}
      <section id="certifications" className="editorial-section">
        {/* Anchor for backward compatibility with #credentials */}
        <span
          id="credentials"
          style={{ display: "block", position: "relative", top: "-84px", visibility: "hidden" }}
        />

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
              PROFESSIONAL CREDENTIALS
            </motion.span>

            <motion.h2
              className="editorial-section-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Certifications
            </motion.h2>

            <motion.p
              className="editorial-section-desc"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Verified credentials in Artificial Intelligence, MongoDB systems, and data analytics.
            </motion.p>
          </div>

          {loading && certifications.length === 0 ? (
            <p className="editorial-status-text">Loading certifications...</p>
          ) : certifications.length === 0 ? (
            <p className="editorial-status-text">No verified certifications available.</p>
          ) : (
            <div className="credentials-grid-editorial">
              {certifications.map((item, index) => (
                <motion.article
                  key={item.id}
                  className="credential-card-editorial"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div className="credential-editorial-top">
                    <span className="credential-type-tag">CERTIFICATION</span>
                    {item.date && (
                      <span className="credential-date-tag">{item.date}</span>
                    )}
                  </div>

                  <h3 className="credential-editorial-title">{item.title}</h3>

                  {item.organization && (
                    <p className="credential-editorial-org">{item.organization}</p>
                  )}

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="credential-link"
                    >
                      View Credential <ExternalLink size={12} style={{ marginLeft: "4px" }} />
                    </a>
                  )}
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 9: ACHIEVEMENTS & PUBLICATIONS */}
      <section id="achievements" className="editorial-section" style={{ backgroundColor: "#F8F7F3", borderTop: "1px solid rgba(52, 61, 56, 0.12)" }}>
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
              HONORS &amp; RECOGNITION
            </motion.span>

            <motion.h2
              className="editorial-section-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Achievements &amp; Publications
            </motion.h2>

            <motion.p
              className="editorial-section-desc"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Verified hackathon participation, algorithmic problem-solving milestones, and peer-reviewed research.
            </motion.p>
          </div>

          <div className="credentials-grid-editorial">
            {achievements.map((item, index) => (
              <motion.article
                key={item.id}
                className="credential-card-editorial"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="credential-editorial-top">
                  <span className="credential-type-tag">{item.category}</span>
                  {item.date && (
                    <span className="credential-date-tag">{item.date}</span>
                  )}
                </div>

                <h3 className="credential-editorial-title">{item.title}</h3>

                {item.organization && (
                  <p className="credential-editorial-org">{item.organization}</p>
                )}

                {item.doi && (
                  <p className="credential-editorial-doi">
                    <strong>DOI:</strong> {item.doi}
                  </p>
                )}

                {item.description && (
                  <p className="credential-editorial-desc">{item.description}</p>
                )}

                {item.link && (
                  <div style={{ marginTop: "12px" }}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial-secondary btn--sm"
                    >
                      View Profile <ExternalLink size={12} style={{ marginLeft: "4px" }} />
                    </a>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Credentials;