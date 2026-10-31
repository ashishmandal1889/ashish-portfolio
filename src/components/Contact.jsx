import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { apiUrl } from "../config/api";

const API_URL = apiUrl("/api/contact");
const resumeContact = {
  email: "ashishmandal1889@gmail.com",
  phone: "+91-9113458404",
  location: "Bengaluru, Karnataka",
  github: "https://github.com/ashishmandal1889",
  linkedIn: "https://www.linkedin.com/in/ashish-kumar-a802192a0/",
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
        setContact(Array.isArray(data) ? data[0] ?? resumeContact : data ?? resumeContact);
      } catch (error) {
        console.warn("Using default rich contact information:", error.message);
        setContact(resumeContact);
      }
    }

    fetchContact();
  }, []);

  const email = contact?.email || "ashishmandal1889@gmail.com";
  const location = contact?.location || "Bengaluru, Karnataka";
  const github = contact?.github || "https://github.com/ashishmandal1889";
  const linkedIn = contact?.linkedIn || "https://www.linkedin.com/in/ashish-kumar-a802192a0/";

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="section-header section-header--center">
          <motion.p
            className="section-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="dot" />
            Get In Touch
          </motion.p>

          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Let&apos;s Build <span>Something Great</span>
          </motion.h2>

          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Whether you have an upcoming engineering role, a collaborative project idea, or simply want to connect, feel free to reach out.
          </motion.p>
        </div>

        <motion.div
          className="contact-card-editorial"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-channels-grid">
            <a href={`mailto:${email}`} className="contact-channel-item">
              <span className="channel-label">Email</span>
              <span className="channel-value" style={{ display: "inline-flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
                <Mail size={16} /> {email}
              </span>
            </a>

            <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="contact-channel-item">
              <span className="channel-label">LinkedIn</span>
              <span className="channel-value" style={{ display: "inline-flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
                <LinkedinIcon size={16} /> Connect on LinkedIn
              </span>
            </a>

            <a href={github} target="_blank" rel="noopener noreferrer" className="contact-channel-item">
              <span className="channel-label">GitHub</span>
              <span className="channel-value" style={{ display: "inline-flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
                <GithubIcon size={16} /> @ashishmandal1889
              </span>
            </a>

            <div className="contact-channel-item">
              <span className="channel-label">Location</span>
              <span className="channel-value" style={{ display: "inline-flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
                <MapPin size={16} /> {location}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginTop: "32px" }}>
            <a
              href={`mailto:${email}?subject=Project%20or%20Opportunity%20Inquiry`}
              className="btn btn--primary"
            >
              <Send size={16} />
              Send Direct Email
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              View Resume ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
