import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";

const API_URL = apiUrl("/api/contact");
const emptyForm = { email: "", phone: "", location: "", linkedIn: "", github: "", leetCode: "", website: "" };

function ContactManager() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadContacts() {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Unable to load contact information.");
      setContacts(await response.json());
    } catch (err) {
      setError(err.message || "Unable to load contact information.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadContacts(); }, []);

  function resetForm() { setForm(emptyForm); setEditingId(null); }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setError("");
    setMessage("");
  }

  function handleEdit(contact) {
    setForm({
      email: contact.email || "", phone: contact.phone || "", location: contact.location || "",
      linkedIn: contact.linkedIn || "", github: contact.github || "", leetCode: contact.leetCode || "", website: contact.website || "",
    });
    setEditingId(contact.id);
    setError("");
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("adminToken");
    if (!token) { setError("Please log in to the admin dashboard again."); return; }
    setSaving(true);
    setError("");
    try {
      const payload = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()]));
      const response = await fetch(editingId === null ? API_URL : `${API_URL}/${editingId}`, {
        method: editingId === null ? "POST" : "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Unable to save contact information.");
      setMessage(editingId === null ? "Contact information added." : "Contact information updated.");
      resetForm();
      await loadContacts();
    } catch (err) {
      setError(err.message || "Unable to save contact information.");
    } finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this contact record?")) return;
    const token = localStorage.getItem("adminToken");
    if (!token) { setError("Please log in to the admin dashboard again."); return; }
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error("Unable to delete contact information.");
      if (editingId === id) resetForm();
      setMessage("Contact information deleted.");
      await loadContacts();
    } catch (err) { setError(err.message || "Unable to delete contact information."); }
  }

  return (
    <section className="manager-card">
      <h2>Contact &amp; Social</h2>
      <p>Manage the contact details and social links shown on your portfolio.</p>
      {error && <p className="error-message" role="alert">{error}</p>}
      {message && <p className="success-message" role="status">{message}</p>}
      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <Field id="contact-email" label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
          <Field id="contact-phone" label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
        </div>
        <Field id="contact-location" label="Location" name="location" value={form.location} onChange={handleChange} />
        <div className="form-row">
          <Field id="contact-linkedin" label="LinkedIn URL" name="linkedIn" type="url" value={form.linkedIn} onChange={handleChange} />
          <Field id="contact-github" label="GitHub URL" name="github" type="url" value={form.github} onChange={handleChange} />
        </div>
        <div className="form-row">
          <Field id="contact-leetcode" label="LeetCode URL" name="leetCode" type="url" value={form.leetCode} onChange={handleChange} />
          <Field id="contact-website" label="Website URL" name="website" type="url" value={form.website} onChange={handleChange} />
        </div>
        <div className="project-actions">
          <button type="submit" className="primary-button" disabled={saving}>{saving ? "Saving..." : editingId === null ? "Add Contact" : "Update Contact"}</button>
          {editingId !== null && <button type="button" className="edit-button" onClick={resetForm}>Cancel Edit</button>}
        </div>
      </form>
      <div className="projects-list">
        <h3>Contact Records</h3>
        {loading ? <p>Loading...</p> : contacts.length === 0 ? <p className="empty-state">No contact information added yet.</p> : contacts.map((contact) => (
          <article key={contact.id} className="project-admin-card">
            <h3>{contact.email || contact.phone || "Contact record"}</h3>
            {contact.location && <p>{contact.location}</p>}
            <div className="project-actions">
              <button type="button" className="edit-button" onClick={() => handleEdit(contact)}>Edit</button>
              <button type="button" className="delete-button" onClick={() => handleDelete(contact.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Field({ id, label, type = "text", ...props }) {
  return <div className="form-group"><label htmlFor={id}>{label}</label><input id={id} type={type} {...props} /></div>;
}

export default ContactManager;
