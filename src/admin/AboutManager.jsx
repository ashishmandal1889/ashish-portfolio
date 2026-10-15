import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/about";

function AboutManager() {
  const [about, setAbout] = useState(null);

  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("adminToken");

  // Load About information
  const loadAbout = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load About information");
      }

      const data = await response.json();

      // GET /api/about returns an array
      const aboutData = Array.isArray(data) ? data[0] : data;

      setAbout(aboutData || null);
      setHeading(aboutData?.heading || "");
      setDescription(aboutData?.description || "");
    } catch (error) {
      console.error("Load About error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAbout();
  }, []);

  // Save / Update About
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!heading.trim() || !description.trim()) {
      alert("Please fill in both heading and description.");
      return;
    }

    setSaving(true);

    try {
      const url = about
        ? `${API_URL}/${about.id}`
        : API_URL;

      const method = about ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          heading: heading.trim(),
          description: description.trim(),
        }),
      });

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message || "Failed to save About information"
        );
      }

      const data = await response.json();

      // PUT/POST returns a single About object
      setAbout(data);
      setHeading(data.heading || "");
      setDescription(data.description || "");

      alert(
        about
          ? "About information updated successfully!"
          : "About information added successfully!"
      );
    } catch (error) {
      console.error("Save About error:", error);

      alert(`Failed to save: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="manager-card">
        <p>Loading About information...</p>
      </div>
    );
  }

  return (
    <div className="about-manager">

      {/* About Form */}

      <div className="manager-card">

        <div className="manager-card-header">
          <div>
            <h2>About Section</h2>

            <p>
              Manage the information displayed in your
              portfolio About section.
            </p>
          </div>
        </div>

        <form
          className="project-form"
          onSubmit={handleSubmit}
        >

          {/* Heading */}

          <div className="form-group">
            <label htmlFor="about-heading">
              Heading
            </label>

            <input
              id="about-heading"
              type="text"
              value={heading}
              onChange={(event) =>
                setHeading(event.target.value)
              }
              placeholder="About Me"
              required
            />
          </div>

          {/* Description */}

          <div className="form-group">
            <label htmlFor="about-description">
              Description
            </label>

            <textarea
              id="about-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Write your About description..."
              rows="10"
              maxLength="3000"
              required
            />
          </div>

          {/* Character count */}

          <div>
            <small style={{ color: "#737b8c" }}>
              {description.length}/3000 characters
            </small>
          </div>

          {/* Save Button */}

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : about
              ? "Update About"
              : "Save About"}
          </button>

        </form>

      </div>

      {/* Preview */}

      <div className="manager-card">

        <div className="manager-card-header">
          <div>
            <h2>Preview</h2>

            <p>
              Preview how your About information will look.
            </p>
          </div>
        </div>

        <div className="about-preview">

          <h2>
            {heading || "Your Heading"}
          </h2>

          <p>
            {description ||
              "Your About description will appear here."}
          </p>

        </div>

      </div>

    </div>
  );
}

export default AboutManager;