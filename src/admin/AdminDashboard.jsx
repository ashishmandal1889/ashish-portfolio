
import { useState } from "react";
import "./AdminDashboard.css";

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
            <p>From here you can manage your complete portfolio.</p>

            <div className="overview-grid">
              <div className="overview-card">
                <span>Projects</span>
                <strong>—</strong>
              </div>

              <div className="overview-card">
                <span>Skills</span>
                <strong>—</strong>
              </div>

              <div className="overview-card">
                <span>Certificates</span>
                <strong>—</strong>
              </div>

              <div className="overview-card">
                <span>Achievements</span>
                <strong>—</strong>
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

      default:
        return (
          <div className="section-placeholder">
            <h2>{activeSection}</h2>
            <p>
              {activeSection} management will be added next.
            </p>
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
