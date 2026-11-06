import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";

const defaultEducation = [
  {
    title: "B.E. Computer Science and Engineering",
    institution: "SEA College of Engineering & Technology",
    meta: "CGPA: 7.8/10 · VTU · 2023 – 2027",
  },
];

const defaultAchievements = [
  {
    title: "100+ Data Structures & Algorithms Solved",
    organization: "LeetCode",
    meta: "Consistent problem-solving in algorithms and data structures.",
    link: "https://leetcode.com/u/ashishmandal1889/",
  },
  {
    title: "Smart Waste Monitoring System for Sustainable Smart Cities",
    organization: "International Journal Research Publication Analysis (IJRPA)",
    meta: "Published research paper · Volume 2, Issue 1, 2026 · DOI: 101555/ijrpa.5184",
  },
  {
    title: "Hackathon Competitions & AI Innovation",
    organization: "Aptos Ctrl+Move, KRNL Dekoded & Hack2Skill",
    meta: "Built MindFlow AI during Hack2Skill; explored AI and Web3 architectures.",
  },
];

const defaultCertifications = [
  {
    title: "Artificial Intelligence Fundamentals",
    organization: "IBM SkillsBuild",
    meta: "Issued Sep 2024",
  },
  {
    title: "Building RAG Apps Using MongoDB",
    organization: "MongoDB",
    meta: "Issued Oct 2026",
  },
  {
    title: "Observability for AI Agents",
    organization: "MongoDB",
    meta: "Issued Oct 2026",
  },
  {
    title: "Data Analytics Essentials",
    organization: "Coursera",
    meta: "Issued Jul 2023",
  },
  {
    title: "Code Unnati Program",
    organization: "SAP and Edunet Foundation",
    meta: "Machine Learning training and applied AI",
  },
];

export default function Credentials() {
  const [education] = useState(defaultEducation);
  const [achievements, setAchievements] = useState(defaultAchievements);
  const [certifications, setCertifications] = useState(defaultCertifications);

  useEffect(() => {
    fetch(apiUrl("/api/credentials"))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load credentials");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const certs = data
            .filter((c) => c.type === "CERTIFICATE")
            .map((c) => ({
              title: c.name || c.title,
              organization: c.issuer || c.organization || "",
              meta: c.issueDate || c.date || "",
            }));

          const achs = data
            .filter((c) => c.type === "ACHIEVEMENT")
            .map((c) => ({
              title: c.name || c.title,
              organization: c.issuer || c.organization || "",
              meta: c.description || c.meta || "",
            }));

          if (certs.length > 0) setCertifications(certs);
          if (achs.length > 0) setAchievements(achs);
        }
      })
      .catch((err) => {
        console.warn("Using default verified credentials:", err.message);
      });
  }, []);

  return (
    <section id="credentials" className="section credentials">
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow">05 / BACKGROUND &amp; RECOGNITION</p>
          <h2>Education, awards &amp; credentials</h2>
        </div>

        <div className="creds">
          {/* Column 1: Education */}
          <div className="cred">
            <h3>Education</h3>
            <ul>
              {education.map((item, idx) => (
                <li key={idx}>
                  <b>{item.title}</b>
                  <span>{item.institution}</span>
                  <span className="cred__meta">{item.meta}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Awards & Achievements */}
          <div className="cred">
            <h3>Awards &amp; Achievements</h3>
            <ul>
              {achievements.map((item, idx) => (
                <li key={idx}>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cred__link"
                    >
                      <b>{item.title}</b>
                      <span>{item.organization}</span>
                      <span className="cred__meta">{item.meta}</span>
                    </a>
                  ) : (
                    <>
                      <b>{item.title}</b>
                      <span>{item.organization}</span>
                      <span className="cred__meta">{item.meta}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Certifications */}
          <div className="cred">
            <h3>Certifications</h3>
            <ul>
              {certifications.map((item, idx) => (
                <li key={idx}>
                  <b>{item.title}</b>
                  <span>{item.organization}</span>
                  <span className="cred__meta">{item.meta}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
