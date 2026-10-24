
import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";

const API_URL = apiUrl("/api/experiences");

const emptyForm = {
  company: "",
  position: "",
  description: "",
  startDate: "",
  endDate: "",
  current: false,
};

function ExperienceManager() {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("adminToken");

  const loadExperiences = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load experiences");
      }

      setExperiences(await response.json());
    } catch (error) {
      console.error("Load experiences:", error);
      alert("Could not load experiences. Check the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "current" && checked ? { endDate: "" } : {}),
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      startDate: form.startDate || null,
      endDate: form.current ? null : form.endDate || null,
    };

    try {
      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text() || "Could not save experience");
      }

      await loadExperiences();
      resetForm();
      alert(editingId ? "Experience updated!" : "Experience added!");
    } catch (error) {
      console.error("Save experience:", error);
      alert(`Save failed: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (experience) => {
    setEditingId(experience.id);

    setForm({
      company: experience.company || "",
      position: experience.position || "",
      description: experience.description || "",
      startDate: experience.startDate || "",
      endDate: experience.endDate || "",
      current: Boolean(experience.current),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(await response.text() || "Could not delete experience");
      }

      await loadExperiences();
      if (editingId === id) resetForm();

      alert("Experience deleted!");
    } catch (error) {
      console.error("Delete experience:", error);
      alert(`Delete failed: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="manager-card">
        <div className="manager-card-header">
          <div>
            <h2>{editingId ? "Edit Experience" : "Add Experience"}</h2>
            <p>Manage your work history and professional experience.</p>
          </div>
          {editingId && (
            <button type="button" className="secondary-button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>

        <form className="project-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="company">Company / Organization</label>
            <input
              id="company"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position / Role</label>
            <input
              id="position"
              name="position"
              value={form.position}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="experience-description">Description</label>
            <textarea
              id="experience-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="5"
              maxLength="3000"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                id="endDate"
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                disabled={form.current}
              />
            </div>
          </div>

          <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              type="checkbox"
              name="current"
              checked={form.current}
              onChange={handleChange}
            />
            I currently work here
          </label>

          <button type="submit" className="primary-button" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Update Experience" : "Add Experience"}
          </button>
        </form>
      </div>

      <div className="manager-card">
        <div className="manager-card-header">
          <div>
            <h2>Your Experience</h2>
            <p>{experiences.length} record(s)</p>
          </div>
        </div>

        {loading ? (
          <p>Loading experiences...</p>
        ) : experiences.length === 0 ? (
          <div className="empty-state">
            <h3>No experience records yet</h3>
            <p>Add a record using the form above.</p>
          </div>
        ) : (
          <div className="projects-list">
            {experiences.map((experience) => (
              <div className="project-admin-card" key={experience.id}>
                <div className="project-admin-info">
                  <h3>{experience.position}</h3>
                  <p><strong>{experience.company}</strong></p>
                  <p>{experience.description}</p>
                  <small>
                    {experience.startDate || "Start date not set"} —{" "}
                    {experience.current
                      ? "Present"
                      : experience.endDate || "End date not set"}
                  </small>
                </div>

                <div className="project-actions">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => handleEdit(experience)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(experience.id)}
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

export default ExperienceManager;
