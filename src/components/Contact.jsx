import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiUrl } from "../config/api";

const API_URL = apiUrl("/api/contact");
const resumeContact = {
  email: "ashishmandal1889@gmail.com",
  location: "Bengaluru, Karnataka, India",
  github: "https://github.com/ashishmandal1889",
  linkedIn: "https://www.linkedin.com/in/ashish-kumar-a802192a0/",
  leetCode: "https://leetcode.com/u/ashishmandal1889/",
};

function Contact() {
  const [contact, setContact] = useState(resumeContact);

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to load contact information");
        }
        const data = await response.json();
        const item = Array.isArray(data) ? data[0] ?? resumeContact : data ?? resumeContact;
        setContact({
          email: item.email || resumeContact.email,
          location: "Bengaluru, Karnataka, India",
          github: item.github || resumeContact.github,
          linkedIn: item.linkedIn || resumeContact.linkedIn,
          leetCode: item.leetCode || resumeContact.leetCode,
        });
      } catch (error) {
        console.warn("Using default verified contact information:", error.message);
        setContact(resumeContact);
      }
    }

    fetchContact();
  }, []);

  const email = contact?.email || "ashishmandal1889@gmail.com";
  const github = contact?.github || "https://github.com/ashishmandal1889";
  const linkedIn = contact?.linkedIn || "https://www.linkedin.com/in/ashish-kumar-a802192a0/";
  const leetCode = contact?.leetCode || "https://leetcode.com/u/ashishmandal1889/";
  const location = contact?.location || "Bengaluru, Karnataka, India";

  return (
    <section id="contact" className="editorial-section editorial-section--contact">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="editorial-section-header">
          <motion.span
            className="editorial-section-label"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            GET IN TOUCH
          </motion.span>

          <motion.h2
            className="editorial-section-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Let&apos;s Connect
          </motion.h2>

          <motion.p
            className="editorial-section-desc"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            I&apos;m open to opportunities, collaboration, and conversations about software development and AI.
          </motion.p>
        </div>

        {/* Minimalist Contact Card (No Form) */}
        <motion.div
          className="editorial-contact-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="editorial-contact-card">
            <div className="editorial-contact-card-header">
              <h3 className="editorial-contact-subheading">
                Direct Channels &amp; Profiles
              </h3>
              <p className="editorial-contact-subtext">
                Reach out directly via email or connect through my verified engineering profiles.
              </p>
            </div>

            <div className="editorial-contact-channels-grid">
              {/* Email */}
              <div className="editorial-contact-item">
                <span className="contact-item-label">EMAIL</span>
                <a
                  href={`mailto:${email}`}
                  className="contact-interactive-link"
                >
                  {email}
                </a>
              </div>

              {/* Location */}
              <div className="editorial-contact-item">
                <span className="contact-item-label">LOCATION</span>
                <span className="contact-static-text">
                  {location}
                </span>
              </div>

              {/* LinkedIn */}
              <div className="editorial-contact-item">
                <span className="contact-item-label">LINKEDIN</span>
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-interactive-link"
                >
                  linkedin.com/in/ashish-kumar-a802192a0
                </a>
              </div>

              {/* GitHub */}
              <div className="editorial-contact-item">
                <span className="contact-item-label">GITHUB</span>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-interactive-link"
                >
                  github.com/ashishmandal1889
                </a>
              </div>

              {/* LeetCode */}
              <div className="editorial-contact-item">
                <span className="contact-item-label">LEETCODE</span>
                <a
                  href={leetCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-interactive-link"
                >
                  leetcode.com/u/ashishmandal1889
                </a>
              </div>
            </div>

            {/* Resume Button */}
            <div className="editorial-contact-action-row">
              <a
                href={`mailto:${email}`}
                className="btn-editorial-primary"
              >
                Send Email
              </a>

              <a
                href="/resume.pdf"
                download="Ashish_Kumar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-secondary"
              >
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;