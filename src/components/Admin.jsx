
import { useEffect, useRef, useState } from "react";
import { apiUrl } from "../config/api";

const API_BASE = apiUrl("/api");

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "30px 16px",
    color: "#1f2937",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    marginBottom: "24px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    marginBottom: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "12px",
    marginTop: "6px",
    marginBottom: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    fontSize: "14px",
    boxSizing: "border-box",
    resize: "vertical",
  },
  button: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
    marginRight: "8px",
    marginBottom: "8px",
  },
  primary: {
    background: "#2563eb",
    color: "#fff",
  },
  secondary: {
    background: "#e5e7eb",
    color: "#111827",
  },
  danger: {
    background: "#dc2626",
    color: "#fff",
  },
  success: {
    color: "#15803d",
    marginBottom: "12px",
  },
  error: {
    color: "#dc2626",
    marginBottom: "12px",
  },
  tabs: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  tab: {
    padding: "11px 18px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#fff",
    fontWeight: "600",
  },
  activeTab: {
    background: "#2563eb",
    color: "#fff",
    borderColor: "#2563eb",
  },
  item: {
    border: "1px solid #e5e7eb",
    borderRadius: "9px",
    padding: "16px",
    marginBottom: "12px",
    overflowWrap: "anywhere",
  },
  label: {
    display: "block",
    fontWeight: "600",
  },
};

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("adminToken"))
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("projects");

  // Project form reference for scrolling
  const projectFormRef = useRef(null);

  // Projects
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
  });

  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectError, setProjectError] = useState("");
  const [projectSuccess, setProjectSuccess] = useState("");
  const [projectLoading, setProjectLoading] = useState(false);

  // Skills
  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [skillError, setSkillError] = useState("");
  const [skillSuccess, setSkillSuccess] = useState("");
  const [skillLoading, setSkillLoading] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const getErrorMessage = async (response, fallback) => {
    try {
      const data = await response.json();
      return data.message || data.error || fallback;
    } catch {
      return fallback;
    }
  };

  // Scroll to project form when editing
  useEffect(() => {
    if (editingProjectId !== null && activeTab === "projects") {
      projectFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [editingProjectId, activeTab]);

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, "Login failed.")
        );
      }

      const data = await response.json();
      const token = data.token || data.accessToken;

      if (!token) {
        throw new Error("Login response did not contain a token.");
      }

      localStorage.setItem("adminToken", token);
      setIsLoggedIn(true);
      setPassword("");
    } catch (error) {
      setLoginError(error.message || "Unable to log in.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setProjects([]);
    setSkills([]);
    resetProjectForm();
    resetSkillForm();
  };

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE}/projects`);

      if (!response.ok) {
        throw new Error("Failed to load projects.");
      }

      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      setProjectError(error.message);
    }
  };

  // Fetch skills
  const fetchSkills = async () => {
    try {
      const response = await fetch(`${API_BASE}/skills`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to load skills.");
      }

      const data = await response.json();
      setSkills(Array.isArray(data) ? data : []);
    } catch (error) {
      setSkillError(error.message);
    }
  };

  // Load data after login
  useEffect(() => {
    if (isLoggedIn) {
      fetchProjects();
      fetchSkills();
    }
  }, [isLoggedIn]);

  // Project form handlers
  const handleProjectChange = (e) => {
    const { name, value } = e.target;

    setProjectForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: "",
      description: "",
      technologies: "",
      githubUrl: "",
      liveUrl: "",
    });

    setEditingProjectId(null);
    setProjectError("");
    setProjectSuccess("");
  };

  // Edit project
  const handleEditProject = (project) => {
    setProjectForm({
      title: project.title || "",
      description: project.description || "",
      technologies: project.technologies || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
    });

    setEditingProjectId(project.id);
    setProjectError("");
    setProjectSuccess("");
  };

  // Add or update project
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setProjectError("");
    setProjectSuccess("");
    setProjectLoading(true);

    const isEditing = editingProjectId !== null;

    const url = isEditing
      ? `${API_BASE}/projects/${editingProjectId}`
      : `${API_BASE}/projects`;

    try {
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(projectForm),
      });

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, "Unable to save project.")
        );
      }

      setProjectSuccess(
        isEditing
          ? "Project updated successfully."
          : "Project added successfully."
      );

      resetProjectForm();
      await fetchProjects();
    } catch (error) {
      setProjectError(error.message);
    } finally {
      setProjectLoading(false);
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    setProjectError("");
    setProjectSuccess("");

    try {
      const response = await fetch(`${API_BASE}/projects/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, "Unable to delete project.")
        );
      }

      setProjectSuccess("Project deleted successfully.");

      if (editingProjectId === id) {
        resetProjectForm();
      }

      await fetchProjects();
    } catch (error) {
      setProjectError(error.message);
    }
  };

  // Skill form handlers
  const resetSkillForm = () => {
    setSkillName("");
    setEditingSkillId(null);
    setSkillError("");
    setSkillSuccess("");
  };

  const handleEditSkill = (skill) => {
    setSkillName(skill.name || "");
    setEditingSkillId(skill.id);
    setSkillError("");
    setSkillSuccess("");
  };

  // Add or update skill
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    setSkillError("");
    setSkillSuccess("");
    setSkillLoading(true);

    const isEditing = editingSkillId !== null;

    const url = isEditing
      ? `${API_BASE}/skills/${editingSkillId}`
      : `${API_BASE}/skills`;

    try {
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: skillName,
        }),
      });

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, "Unable to save skill.")
        );
      }

      setSkillSuccess(
        isEditing
          ? "Skill updated successfully."
          : "Skill added successfully."
      );

      resetSkillForm();
      await fetchSkills();
    } catch (error) {
      setSkillError(error.message);
    } finally {
      setSkillLoading(false);
    }
  };

  // Delete skill
  const handleDeleteSkill = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmed) return;

    setSkillError("");
    setSkillSuccess("");

    try {
      const response = await fetch(`${API_BASE}/skills/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, "Unable to delete skill.")
        );
      }

      setSkillSuccess("Skill deleted successfully.");

      if (editingSkillId === id) {
        resetSkillForm();
      }

      await fetchSkills();
    } catch (error) {
      setSkillError(error.message);
    }
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <main style={styles.page}>
        <div style={{ ...styles.container, maxWidth: "450px" }}>
          <section style={styles.card}>
            <h1 style={styles.heading}>Admin Login</h1>

            {loginError && (
              <p style={styles.error}>{loginError}</p>
            )}

            <form onSubmit={handleLogin}>
              <label style={styles.label} htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={styles.input}
                required
              />

              <label style={styles.label} htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={styles.input}
                required
              />

              <button
                type="submit"
                disabled={loginLoading}
                style={{
                  ...styles.button,
                  ...styles.primary,
                  width: "100%",
                }}
              >
                {loginLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </section>
        </div>
      </main>
    );
  }

  // Admin dashboard
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <h1 style={styles.heading}>Admin Dashboard</h1>

          <button
            onClick={handleLogout}
            style={{ ...styles.button, ...styles.danger }}
          >
            Logout
          </button>
        </header>

        {/* Tabs */}
        <nav style={styles.tabs}>
          <button
            onClick={() => setActiveTab("projects")}
            style={{
              ...styles.tab,
              ...(activeTab === "projects" ? styles.activeTab : {}),
            }}
          >
            Projects
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            style={{
              ...styles.tab,
              ...(activeTab === "skills" ? styles.activeTab : {}),
            }}
          >
            Skills
          </button>
        </nav>

        {/* Projects section */}
        {activeTab === "projects" && (
          <>
            {/* Project form */}
            <section
              ref={projectFormRef}
              style={{
                ...styles.card,
                scrollMarginTop: "20px",
              }}
            >
              <h2>
                {editingProjectId !== null
                  ? "Edit Project"
                  : "Add Project"}
              </h2>

              {projectError && (
                <p style={styles.error}>{projectError}</p>
              )}

              {projectSuccess && (
                <p style={styles.success}>{projectSuccess}</p>
              )}

              <form onSubmit={handleProjectSubmit}>
                <label
                  style={styles.label}
                  htmlFor="project-title"
                >
                  Project Title
                </label>

                <input
                  id="project-title"
                  name="title"
                  value={projectForm.title}
                  onChange={handleProjectChange}
                  placeholder="Project title"
                  style={styles.input}
                  required
                />

                <label
                  style={styles.label}
                  htmlFor="project-description"
                >
                  Description
                </label>

                <textarea
                  id="project-description"
                  name="description"
                  value={projectForm.description}
                  onChange={handleProjectChange}
                  placeholder="Project description"
                  style={styles.textarea}
                  required
                />

                <label
                  style={styles.label}
                  htmlFor="project-technologies"
                >
                  Technologies
                </label>

                <input
                  id="project-technologies"
                  name="technologies"
                  value={projectForm.technologies}
                  onChange={handleProjectChange}
                  placeholder="React, Spring Boot, PostgreSQL"
                  style={styles.input}
                  required
                />

                <label
                  style={styles.label}
                  htmlFor="github-url"
                >
                  GitHub URL
                </label>

                <input
                  id="github-url"
                  name="githubUrl"
                  type="url"
                  value={projectForm.githubUrl}
                  onChange={handleProjectChange}
                  placeholder="https://github.com/..."
                  style={styles.input}
                />

                <label
                  style={styles.label}
                  htmlFor="live-url"
                >
                  Live URL
                </label>

                <input
                  id="live-url"
                  name="liveUrl"
                  type="url"
                  value={projectForm.liveUrl}
                  onChange={handleProjectChange}
                  placeholder="https://..."
                  style={styles.input}
                />

                <button
                  type="submit"
                  disabled={projectLoading}
                  style={{
                    ...styles.button,
                    ...styles.primary,
                  }}
                >
                  {projectLoading
                    ? "Saving..."
                    : editingProjectId !== null
                    ? "Update Project"
                    : "Add Project"}
                </button>

                {editingProjectId !== null && (
                  <button
                    type="button"
                    onClick={resetProjectForm}
                    style={{
                      ...styles.button,
                      ...styles.secondary,
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </section>

            {/* Project list */}
            <section style={styles.card}>
              <h2>Manage Projects ({projects.length})</h2>

              {projects.length === 0 ? (
                <p>No projects found.</p>
              ) : (
                projects.map((project) => (
                  <article
                    key={project.id}
                    style={styles.item}
                  >
                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <p>
                      <strong>Technologies:</strong>{" "}
                      {project.technologies}
                    </p>

                    {project.githubUrl && (
                      <p>
                        <strong>GitHub:</strong>{" "}
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {project.githubUrl}
                        </a>
                      </p>
                    )}

                    {project.liveUrl && (
                      <p>
                        <strong>Live:</strong>{" "}
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {project.liveUrl}
                        </a>
                      </p>
                    )}

                    <button
                      onClick={() => handleEditProject(project)}
                      style={{
                        ...styles.button,
                        ...styles.primary,
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteProject(project.id)
                      }
                      style={{
                        ...styles.button,
                        ...styles.danger,
                      }}
                    >
                      Delete
                    </button>
                  </article>
                ))
              )}
            </section>
          </>
        )}

        {/* Skills section */}
        {activeTab === "skills" && (
          <>
            {/* Skill form */}
            <section style={styles.card}>
              <h2>
                {editingSkillId !== null
                  ? "Edit Skill"
                  : "Add Skill"}
              </h2>

              {skillError && (
                <p style={styles.error}>{skillError}</p>
              )}

              {skillSuccess && (
                <p style={styles.success}>{skillSuccess}</p>
              )}

              <form onSubmit={handleSkillSubmit}>
                <label
                  style={styles.label}
                  htmlFor="skill-name"
                >
                  Skill Name
                </label>

                <input
                  id="skill-name"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="Enter skill name"
                  style={styles.input}
                  required
                />

                <button
                  type="submit"
                  disabled={skillLoading}
                  style={{
                    ...styles.button,
                    ...styles.primary,
                  }}
                >
                  {skillLoading
                    ? "Saving..."
                    : editingSkillId !== null
                    ? "Update Skill"
                    : "Add Skill"}
                </button>

                {editingSkillId !== null && (
                  <button
                    type="button"
                    onClick={resetSkillForm}
                    style={{
                      ...styles.button,
                      ...styles.secondary,
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </section>

            {/* Skill list */}
            <section style={styles.card}>
              <h2>Manage Skills ({skills.length})</h2>

              {skills.length === 0 ? (
                <p>No skills found.</p>
              ) : (
                skills.map((skill) => (
                  <article
                    key={skill.id}
                    style={{
                      ...styles.item,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <strong>{skill.name}</strong>

                    <div>
                      <button
                        onClick={() => handleEditSkill(skill)}
                        style={{
                          ...styles.button,
                          ...styles.primary,
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteSkill(skill.id)
                        }
                        style={{
                          ...styles.button,
                          ...styles.danger,
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default Admin;
