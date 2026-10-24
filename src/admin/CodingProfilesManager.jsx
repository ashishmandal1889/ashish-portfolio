
import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolioCodingProfiles";

const emptyProfile = {
  platform: "LeetCode",
  username: "",
  url: "",
};

function CodingProfilesManager() {
  const [profiles, setProfiles] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState({ ...emptyProfile });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  }, [profiles]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm({ ...emptyProfile });
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const platform = form.platform.trim();
    const username = form.username.trim();
    const url = form.url.trim();

    let parsedUrl;

    try {
      parsedUrl = new URL(url);
    } catch {
      setError("Please enter a valid profile URL.");
      return;
    }

    if (
      parsedUrl.protocol !== "https:" ||
      !parsedUrl.hostname.includes(".")
    ) {
      setError("Please enter a valid HTTPS profile URL.");
      return;
    }

    if (!platform || !username) {
      setError("Platform and username are required.");
      return;
    }

    const profile = {
      id: editingId ?? `${Date.now()}-${Math.random()}`,
      platform,
      username,
      url,
    };

    if (editingId !== null) {
      setProfiles((previous) =>
        previous.map((item) =>
          item.id === editingId ? profile : item
        )
      );
      setMessage("Coding profile updated successfully.");
    } else {
      setProfiles((previous) => [...previous, profile]);
      setMessage("Coding profile added successfully.");
    }

    resetForm();
  }

  function handleEdit(profile) {
    setForm({
      platform: profile.platform,
      username: profile.username,
      url: profile.url,
    });

    setEditingId(profile.id);
    setMessage("");
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this coding profile?")) {
      return;
    }

    setProfiles((previous) =>
      previous.filter((item) => item.id !== id)
    );

    if (editingId === id) {
      resetForm();
    }

    setMessage("Coding profile deleted successfully.");
    setError("");
  }

  return (
    <section className="manager-card">
      <h2>Coding Profiles</h2>
      <p>Add and manage your coding platform profile links.</p>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {message && (
        <p className="success-message" role="status">
          {message}
        </p>
      )}

      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="platform">Platform *</label>
            <select
              id="platform"
              name="platform"
              value={form.platform}
              onChange={handleChange}
              required
            >
              <option value="LeetCode">LeetCode</option>
              <option value="GitHub">GitHub</option>
              <option value="HackerRank">HackerRank</option>
              <option value="CodeChef">CodeChef</option>
              <option value="Codeforces">Codeforces</option>
              <option value="GeeksforGeeks">GeeksforGeeks</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="Your platform username"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="profileUrl">Profile URL *</label>
          <input
            id="profileUrl"
            name="url"
            type="url"
            value={form.url}
            onChange={handleChange}
            required
            maxLength={2048}
            placeholder="https://..."
          />
        </div>

        <div className="project-actions">
          <button type="submit" className="primary-button">
            {editingId !== null ? "Update Profile" : "Add Profile"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              className="edit-button"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="projects-list">
        <h3>Your Coding Profiles ({profiles.length})</h3>

        {profiles.length === 0 ? (
          <p className="empty-state">
            No coding profiles added yet. Add your first profile above.
          </p>
        ) : (
          profiles.map((profile) => (
            <article
              key={profile.id}
              className="project-admin-card"
            >
              <h3>{profile.platform}</h3>

              <p>
                <strong>Username:</strong> {profile.username}
              </p>

              <p>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Profile
                </a>
              </p>

              <div className="project-actions">
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => handleEdit(profile)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(profile.id)}
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

export default CodingProfilesManager;
