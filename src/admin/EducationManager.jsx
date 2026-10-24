
import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";

const API_URL = apiUrl("/api/education");

const emptyForm = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  description: "",
  startDate: "",
  endDate: "",
  current: false,
};

function EducationManager() {
  const [educationList, setEducationList] = useState([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("adminToken");

  async function loadEducation() {
    setLoading(true);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Failed to load education (HTTP ${response.status}): ${text}`
        );
      }

      const data = await response.json();
      setEducationList(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error("Load education error:", err);
      setError(err.message || "Failed to load education records.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEducation();
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "current" && checked ? { endDate: "" } : {}),
    }));
  }

  function resetForm() {
    setForm({ ...emptyForm });
    setEditingId(null);
  }

  function handleEdit(item) {
    setForm({
      institution: item.institution || "",
      degree: item.degree || "",
      fieldOfStudy: item.fieldOfStudy || "",
      description: item.description || "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      current: Boolean(item.current),
    });

    setEditingId(item.id);
    setError("");
    setMessage("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("Please log in to the admin dashboard again.");
      return;
    }

    if (
      form.startDate &&
      form.endDate &&
      !form.current &&
      form.endDate < form.startDate
    ) {
      setError("End date cannot be earlier than start date.");
      return;
    }

    const payload = {
      institution: form.institution.trim(),
      degree: form.degree.trim(),
      fieldOfStudy: form.fieldOfStudy.trim(),
      description: form.description.trim(),
      startDate: form.startDate || null,
      endDate: form.current || !form.endDate ? null : form.endDate,
      current: form.current,
    };

    setSaving(true);

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
        const responseText = await response.text();

        console.error("Education API error:", {
          status: response.status,
          response: responseText,
          payload,
        });

        throw new Error(
          `HTTP ${response.status}: ${
            responseText || "Unable to save education"
          }`
        );
      }

      const wasEditing = editingId !== null;

      resetForm();
      setMessage(
        wasEditing
          ? "Education updated successfully."
          : "Education added successfully."
      );

      await loadEducation();
    } catch (err) {
      console.error("Education form submission failed:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (
      !window.confirm(
        "Are you sure you want to delete this education record?"
      )
    ) {
      return;
    }

    setError("");
    setMessage("");

    if (!token) {
      setError("Please log in to the admin dashboard again.");
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
        const responseText = await response.text();

        console.error("Delete education error:", {
          status: response.status,
          response: responseText,
        });

        throw new Error(
          `HTTP ${response.status}: ${
            responseText || "Failed to delete education"
          }`
        );
      }

      if (editingId === id) {
        resetForm();
      }

      setMessage("Education deleted successfully.");
      await loadEducation();
    } catch (err) {
      console.error("Education deletion failed:", err);
      setError(err.message || "Could not delete education.");
    }
  }

  return (
    <section className="manager-card">
      <h2>Education Management</h2>
      <p>Manage your academic qualifications.</p>

      {error && (
        <p role="alert" className="error-message">
          {error}
        </p>
      )}

      {message && (
        <p role="status" className="success-message">
          {message}
        </p>
      )}

      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="institution">Institution *</label>
            <input
              id="institution"
              name="institution"
              value={form.institution}
              onChange={handleChange}
              required
              maxLength={255}
              placeholder="College or university name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="degree">Degree *</label>
            <input
              id="degree"
              name="degree"
              value={form.degree}
              onChange={handleChange}
              required
              maxLength={255}
              placeholder="B.Tech, B.Sc, MCA..."
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="fieldOfStudy">Field of Study</label>
          <input
            id="fieldOfStudy"
            name="fieldOfStudy"
            value={form.fieldOfStudy}
            onChange={handleChange}
            maxLength={255}
            placeholder="Computer Science and Engineering"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={form.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={form.endDate}
              onChange={handleChange}
              disabled={form.current}
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="current"
              checked={form.current}
              onChange={handleChange}
            />
            {" "}I am currently studying here
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={3000}
            rows={4}
            placeholder="Relevant coursework, achievements, or details"
          />
        </div>

        <div className="project-actions">
          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : editingId
                ? "Update Education"
                : "Add Education"}
          </button>

          {editingId && (
            <button
              type="button"
              className="edit-button"
              onClick={resetForm}
              disabled={saving}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="projects-list">
        <h3>Your Education</h3>

        {loading ? (
          <p>Loading education records...</p>
        ) : educationList.length === 0 ? (
          <p className="empty-state">
            No education records yet. Add your first record above.
          </p>
        ) : (
          educationList.map((item) => (
            <article key={item.id} className="project-admin-card">
              <h3>{item.degree}</h3>

              <p>
                <strong>Institution:</strong> {item.institution}
              </p>

              {item.fieldOfStudy && (
                <p>
                  <strong>Field:</strong> {item.fieldOfStudy}
                </p>
              )}

              <p>
                <strong>Duration:</strong>{" "}
                {item.startDate || "Not specified"} –{" "}
                {item.current
                  ? "Present"
                  : item.endDate || "Not specified"}
              </p>

              {item.description && <p>{item.description}</p>}

              <div className="project-actions">
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default EducationManager;
