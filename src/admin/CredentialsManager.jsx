
import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";

const API_URL = apiUrl("/api/credentials");

const emptyForm = {
  title: "",
  type: "CERTIFICATE",
  organization: "",
  description: "",
  date: "",
  url: "",
};

function CredentialsManager({
  credentialType = "CERTIFICATE",
  heading = "Credentials Management",
}) {
  const [credentials, setCredentials] = useState([]);
  const [form, setForm] = useState({
    ...emptyForm,
    type: credentialType,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("adminToken");

  const filteredCredentials = credentials.filter(
    (item) => item.type === credentialType
  );

  async function loadCredentials() {
    setLoading(true);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `Unable to load credentials (HTTP ${response.status}).`
        );
      }

      const data = await response.json();
      setCredentials(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error("Load credentials error:", err);
      setError(err.message || "Failed to load credentials.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCredentials();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm({
      ...emptyForm,
      type: credentialType,
    });
    setEditingId(null);
  }

  function handleEdit(item) {
    setForm({
      title: item.title || "",
      type: item.type || credentialType,
      organization: item.organization || "",
      description: item.description || "",
      date: item.date || "",
      url: item.url || "",
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

    const payload = {
      ...form,
      type: credentialType,
      title: form.title.trim(),
      organization: form.organization.trim(),
      description: form.description.trim(),
      date: form.date || null,
      url: form.url.trim(),
    };

    setSaving(true);

    try {
      const response = await fetch(
        editingId !== null
          ? `${API_URL}/${editingId}`
          : API_URL,
        {
          method: editingId !== null ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const responseText = await response.text();

        console.error("Credentials API error:", {
          status: response.status,
          response: responseText,
          payload,
        });

        throw new Error(
          `HTTP ${response.status}: ${
            responseText || "Unable to save credential."
          }`
        );
      }

      const wasEditing = editingId !== null;

      resetForm();

      setMessage(
        wasEditing
          ? `${heading.replace("Management", "").trim()} updated successfully.`
          : `${heading.replace("Management", "").trim()} added successfully.`
      );

      await loadCredentials();
    } catch (err) {
      console.error("Save credential error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${
        credentialType === "CERTIFICATE" ? "certificate" : "achievement"
      }?`
    );

    if (!confirmed) return;

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

        throw new Error(
          `HTTP ${response.status}: ${
            responseText || "Unable to delete credential."
          }`
        );
      }

      if (editingId === id) {
        resetForm();
      }

      setMessage(
        credentialType === "CERTIFICATE"
          ? "Certificate deleted successfully."
          : "Achievement deleted successfully."
      );

      await loadCredentials();
    } catch (err) {
      console.error("Delete credential error:", err);
      setError(err.message || "Failed to delete credential.");
    }
  }

  return (
    <section className="manager-card">
      <h2>{heading}</h2>

      <p>
        Manage your{" "}
        {credentialType === "CERTIFICATE"
          ? "certificates and qualifications."
          : "achievements, awards, and accomplishments."}
      </p>

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
        <div className="form-group">
          <label htmlFor="credential-title">Title *</label>
          <input
            id="credential-title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            maxLength={255}
            placeholder={
              credentialType === "CERTIFICATE"
                ? "e.g. Java Programming Certificate"
                : "e.g. Hackathon Finalist"
            }
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="credential-organization">
              Organization
            </label>
            <input
              id="credential-organization"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              maxLength={255}
              placeholder="Issuing organization"
            />
          </div>

          <div className="form-group">
            <label htmlFor="credential-date">Date</label>
            <input
              id="credential-date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="credential-url">Credential URL</label>
          <input
            id="credential-url"
            name="url"
            type="url"
            value={form.url}
            onChange={handleChange}
            maxLength={2048}
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="credential-description">
            Description
          </label>
          <textarea
            id="credential-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe this credential"
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
              : editingId !== null
                ? "Update"
                : "Add"}{" "}
            {credentialType === "CERTIFICATE"
              ? "Certificate"
              : "Achievement"}
          </button>

          {editingId !== null && (
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
        <h3>
          Your{" "}
          {credentialType === "CERTIFICATE"
            ? "Certificates"
            : "Achievements"}
        </h3>

        {loading ? (
          <p>Loading...</p>
        ) : filteredCredentials.length === 0 ? (
          <p className="empty-state">
            No{" "}
            {credentialType === "CERTIFICATE"
              ? "certificates"
              : "achievements"}{" "}
            added yet.
          </p>
        ) : (
          filteredCredentials.map((item) => (
            <article
              key={item.id}
              className="project-admin-card"
            >
              <h3>{item.title}</h3>

              {item.organization && (
                <p>
                  <strong>Organization:</strong>{" "}
                  {item.organization}
                </p>
              )}

              {item.date && (
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
              )}

              {item.description && <p>{item.description}</p>}

              {item.url && (
                <p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Credential
                  </a>
                </p>
              )}

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

export default CredentialsManager;
