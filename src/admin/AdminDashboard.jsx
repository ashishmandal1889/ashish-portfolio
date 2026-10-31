import { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { apiUrl } from "../config/api";

import ProjectsManager from "./ProjectsManager";
import SkillsManager from "./SkillsManager";
import AboutManager from "./AboutManager";
import ExperienceManager from "./ExperienceManager";
import EducationManager from "./EducationManager";
import CredentialsManager from "./CredentialsManager";
import CodingProfilesManager from "./CodingProfilesManager";
import ContactManager from "./ContactManager";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("Overview");
  const [stats, setStats] = useState({
    projects: "...",
    skills: "...",
    certificates: "...",
    achievements: "...",
    experiences: "...",
  });

  useEffect(() => {
    // Load counts for overview cards
    async function loadStats() {
      try {
        const [projRes, skillRes, credRes, expRes] = await Promise.allSettled([
          fetch(apiUrl("/api/projects")).then((r) => r.json()),
          fetch(apiUrl("/api/skills")).then((r) => r.json()),
          fetch(apiUrl("/api/credentials")).then((r) => r.json()),
          fetch(apiUrl("/api/experiences")).then((r) => r.json()),
        ]);

        const projects = projRes.status === "fulfilled" && Array.isArray(projRes.value) ? projRes.value.length : 0;
        const skills = skillRes.status === "fulfilled" && Array.isArray(skillRes.value) ? skillRes.value.length : 0;
        const credentials = credRes.status === "fulfilled" && Array.isArray(credRes.value) ? credRes.value : [];
        const certificates = credentials.filter((c) => c.type === "CERTIFICATE").length;
        const achievements = credentials.filter((c) => c.type === "ACHIEVEMENT").length;
        const experiences = expRes.status === "fulfilled" && Array.isArray(expRes.value) ? expRes.value.length : 0;

        setStats({
          projects,
          skills,
          certificates,
          achievements,
          experiences,
        });
      } catch (e) {
        console.warn("Failed to load dashboard stats:", e);
      }
    }

    loadStats();
  }, []);

  const menuItems = [
    "Overview",
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Education",
    "Certificates",
    "Achievements",
    "Coding Profiles",
    "Contact / Social",
    "Resume",
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "Overview":
        return (
          <div>
            <h2>Welcome to your dashboard 👋</h2>
            <p>From here you can manage your complete portfolio data dynamically.</p>

            <div className="overview-grid">
              <div
                className="overview-card"
                onClick={() => setActiveSection("Projects")}
                style={{ cursor: "pointer" }}
              >
                <span>Projects</span>
                <strong>{stats.projects}</strong>
              </div>

              <div
                className="overview-card"
                onClick={() => setActiveSection("Skills")}
                style={{ cursor: "pointer" }}
              >
                <span>Skills</span>
                <strong>{stats.skills}</strong>
              </div>

              <div
                className="overview-card"
                onClick={() => setActiveSection("Experience")}
                style={{ cursor: "pointer" }}
              >
                <span>Experiences</span>
                <strong>{stats.experiences}</strong>
              </div>

              <div
                className="overview-card"
                onClick={() => setActiveSection("Certificates")}
                style={{ cursor: "pointer" }}
              >
                <span>Certificates</span>
                <strong>{stats.certificates}</strong>
              </div>

              <div
                className="overview-card"
                onClick={() => setActiveSection("Achievements")}
                style={{ cursor: "pointer" }}
              >
                <span>Achievements</span>
                <strong>{stats.achievements}</strong>
              </div>
            </div>
          </div>
        );

      case "About":
        return <AboutManager />;

      case "Skills":
        return <SkillsManager />;

      case "Projects":
        return <ProjectsManager />;

      case "Experience":
        return <ExperienceManager />;

      case "Education":
        return <EducationManager />;

      case "Certificates":
        return (
          <CredentialsManager
            credentialType="CERTIFICATE"
            heading="Certificates Management"
          />
        );

      case "Achievements":
        return (
          <CredentialsManager
            credentialType="ACHIEVEMENT"
            heading="Achievements Management"
          />
        );

      case "Coding Profiles":
        return <CodingProfilesManager />;

      case "Contact / Social":
        return <ContactManager />;

      case "Resume":
        return (
          <div className="section-placeholder">
            <h2>Resume Management</h2>
            <p>
              Your active resume is hosted at <code>/resume.pdf</code>.
            </p>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-action-btn"
              style={{
                display: "inline-block",
                marginTop: "16px",
                padding: "10px 18px",
                background: "#22d3ee",
                color: "#000",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              Open Active Resume ↗
            </a>
          </div>
        );

      default:
        return (
          <div className="section-placeholder">
            <h2>{activeSection}</h2>
            <p>{activeSection} management will be added next.</p>
          </div>
        );
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div className="admin-logo-icon">A</div>

          <div>
            <h2>Admin Panel</h2>
            <p>Ashish Portfolio</p>
          </div>
        </div>

        <nav className="admin-nav">
          {menuItems.map((item) => (
            <button
              key={item}
              type="button"
              className={`admin-nav-item ${
                activeSection === item ? "active" : ""
              }`}
              onClick={() => setActiveSection(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="admin-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>{activeSection}</h1>
            <p>Manage your portfolio content</p>
          </div>

          <div className="admin-profile">
            <div className="profile-avatar">A</div>

            <div>
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        <section className="admin-content">
          {renderActiveSection()}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
