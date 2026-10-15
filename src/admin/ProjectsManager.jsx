import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/projects";

function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
  });

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("adminToken");

  const loadProjects = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load projects");
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      technologies: "",
      githubUrl: "",
      liveUrl: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = editingId
      ? `${API_URL}/${editingId}`
      : API_URL;

    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to save project");
      }

      await loadProjects();
      resetForm();

      alert(
        editingId
          ? "Project updated successfully!"
          : "Project added successfully!"
      );
    } catch (error) {
      console.error(error);
      alert(`Failed to save project: ${error.message}`);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);

    setForm({
      title: project.title || "",
      description: project.description || "",
      technologies: project.technologies || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to delete project");
      }

      await loadProjects();

      alert("Project deleted successfully!");
    } catch (error) {
      console.error(error);
      alert(`Failed to delete project: ${error.message}`);
    }
  };

  return (
    <div className="projects-manager">

      {/* Add / Edit Form */}

      <div className="manager-card">

        <div className="manager-card-header">
          <div>
            <h2>
              {editingId ? "Edit Project" : "Add Project"}
            </h2>

            <p>
              {editingId
                ? "Update your project information"
                : "Add a new project to your portfolio"}
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              className="secondary-button"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form
          className="project-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Project Title</label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter project title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your project"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Technologies</label>

            <input
              type="text"
              name="technologies"
              value={form.technologies}
              onChange={handleChange}
              placeholder="React, Spring Boot, PostgreSQL"
              required
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>GitHub URL</label>

              <input
                type="url"
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="form-group">
              <label>Live URL</label>

              <input
                type="url"
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

          </div>

          <button
            type="submit"
            className="primary-button"
          >
            {editingId ? "Update Project" : "Add Project"}
          </button>

        </form>

      </div>

      {/* Existing Projects */}

      <div className="manager-card">

        <div className="manager-card-header">
          <div>
            <h2>Your Projects</h2>

            <p>
              {projects.length} project
              {projects.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <h3>No projects yet</h3>

            <p>
              Add your first project using the form above.
            </p>
          </div>
        ) : (
          <div className="projects-list">

            {projects.map((project) => (
              <div
                key={project.id}
                className="project-admin-card"
              >

                <div className="project-admin-info">

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <div className="technology-list">
                    {project.technologies}
                  </div>

                  <div style={{ marginTop: "10px" }}>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "#22d3ee",
                          marginRight: "15px",
                        }}
                      >
                        GitHub
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "#a78bfa",
                        }}
                      >
                        Live Demo
                      </a>
                    )}

                  </div>

                </div>

                <div className="project-actions">

                  <button
                    className="edit-button"
                    onClick={() => handleEdit(project)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default ProjectsManager;