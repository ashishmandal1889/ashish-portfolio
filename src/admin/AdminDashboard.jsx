import { useState } from "react";
import "./AdminDashboard.css";
import ProjectsManager from "./ProjectsManager";
import SkillsManager from "./SkillsManager";
import AboutManager from "./AboutManager";
import ExperienceManager from "./ExperienceManager";
import EducationManager from "./EducationManager";
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
    "Contact / Social",
    "Resume",
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="admin-layout">

      {/* Sidebar */}
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
          className="admin-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>

      {/* Main Content */}
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

          {activeSection === "Overview" && (
            <div>
              <h2>Welcome to your dashboard 👋</h2>
              <p>
                From here you can manage your complete portfolio.
              </p>

              <div className="overview-grid">

                <div className="overview-card">
                  <span>Projects</span>
                  <strong>0</strong>
                </div>

                <div className="overview-card">
                  <span>Skills</span>
                  <strong>0</strong>
                </div>

                <div className="overview-card">
                  <span>Certificates</span>
                  <strong>0</strong>
                </div>

                <div className="overview-card">
                  <span>Achievements</span>
                  <strong>0</strong>
                </div>

              </div>
            </div>
          )}

{activeSection === "Projects" ? (
  <ProjectsManager />
) : activeSection === "Skills" ? (
  <SkillsManager />
) : activeSection === "About" ? (
  <AboutManager />
) : activeSection !== "Overview" ? (
  <div className="section-placeholder">
    <h2>{activeSection}</h2>
    <p>
      {activeSection} management will be added next.
    </p>
  </div>
) : null}
{activeSection === "Projects" ? (
  <ProjectsManager />
) : activeSection === "Skills" ? (
  <SkillsManager />
) : activeSection === "About" ? (
  <AboutManager />
) : activeSection === "Experience" ? (
  <ExperienceManager />
) : activeSection === "Education" ? (
  <EducationManager />
) : activeSection !== "Overview" ? (
  <div className="section-placeholder">
    <h2>{activeSection}</h2>
    <p>{activeSection} management will be added next.</p>
  </div>
) : null}

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;