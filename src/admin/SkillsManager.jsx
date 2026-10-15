import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/skills";

function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  const loadSkills = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load skills");
      }

      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

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
        body: JSON.stringify({
          name: name.trim(),
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to save skill");
      }

      setName("");
      setEditingId(null);

      await loadSkills();

      alert(
        editingId
          ? "Skill updated successfully!"
          : "Skill added successfully!"
      );
    } catch (error) {
      console.error(error);
      alert(`Failed to save skill: ${error.message}`);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setName(skill.name);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setName("");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
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
        throw new Error(message || "Failed to delete skill");
      }

      await loadSkills();

      alert("Skill deleted successfully!");
    } catch (error) {
      console.error(error);
      alert(`Failed to delete skill: ${error.message}`);
    }
  };

  return (
    <div className="skills-manager">

      {/* Add / Edit */}

      <div className="manager-card">

        <div className="manager-card-header">
          <div>
            <h2>
              {editingId ? "Edit Skill" : "Add Skill"}
            </h2>

            <p>
              {editingId
                ? "Update your skill"
                : "Add a skill to your portfolio"}
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              className="secondary-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>

        <form
          className="project-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Skill Name</label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Java, React, Python"
              required
            />
          </div>

          <button
            type="submit"
            className="primary-button"
          >
            {editingId ? "Update Skill" : "Add Skill"}
          </button>
        </form>

      </div>

      {/* Skills List */}

      <div className="manager-card">

        <div className="manager-card-header">
          <div>
            <h2>Your Skills</h2>

            <p>
              {skills.length} skill
              {skills.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {loading ? (
          <p>Loading skills...</p>
        ) : skills.length === 0 ? (
          <div className="empty-state">
            <h3>No skills yet</h3>

            <p>
              Add your first skill using the form above.
            </p>
          </div>
        ) : (
          <div className="skills-list">

            {skills.map((skill) => (
              <div
                key={skill.id}
                className="skill-admin-card"
              >
                <span>{skill.name}</span>

                <div className="project-actions">

                  <button
                    className="edit-button"
                    onClick={() => handleEdit(skill)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(skill.id)}
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

export default SkillsManager;