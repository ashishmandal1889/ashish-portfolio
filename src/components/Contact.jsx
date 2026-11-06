import { useState, useEffect } from "react";
import { apiUrl } from "../config/api";

const resumeContact = {
  email: "ashishmandal1889@gmail.com",
  location: "Bengaluru, Karnataka, India",
  github: "https://github.com/ashishmandal1889",
  linkedIn: "https://www.linkedin.com/in/ashish-kumar-a802192a0/",
  leetCode: "https://leetcode.com/u/ashishmandal1889/",
};

export default function Contact() {
  const [contact, setContact] = useState(resumeContact);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(apiUrl("/api/contact"))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load contact info");
        return res.json();
      })
      .then((data) => {
        const item = Array.isArray(data) ? data[0] ?? resumeContact : data ?? resumeContact;
        setContact({
          email: item.email || resumeContact.email,
          location: "Bengaluru, Karnataka, India",
          github: item.github || resumeContact.github,
          linkedIn: item.linkedIn || resumeContact.linkedIn,
          leetCode: item.leetCode || resumeContact.leetCode,
        });
      })
      .catch((err) => {
        console.warn("Using default verified contact:", err.message);
      });
  }, []);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="section contact">
      <div className="wrap closer__inner">
        <p className="eyebrow">06 / CONTACT</p>

        <h2 className="closer__heading">
          <span>Let's build</span>
          <span>something.</span>
        </h2>

        <p className="closer__text">
          Open for software engineering roles, internships, and ambitious projects. The fastest way to reach me is email, I answer all of them.
        </p>

        <div className="closer__mail-wrapper">
          <a
            className="closer__mail"
            href={`mailto:${contact.email}`}
            title="Click to send email"
          >
            {contact.email}
          </a>

          <button
            type="button"
            className="closer__copy-btn"
            onClick={handleCopyEmail}
            aria-label="Copy email address"
          >
            {copied ? "Copied to clipboard" : "Copy email"}
          </button>
        </div>

        <div className="closer__links">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="closer__pill"
          >
            GitHub
          </a>

          <a
            href={contact.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="closer__pill"
          >
            LinkedIn
          </a>

          <a
            href={contact.leetCode}
            target="_blank"
            rel="noopener noreferrer"
            className="closer__pill"
          >
            LeetCode
          </a>

          <a
            href="/resume.pdf"
            download="Ashish_Kumar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="closer__pill closer__pill--accent"
          >
            Download Resume PDF
          </a>
        </div>
      </div>
    </section>
  );
}
