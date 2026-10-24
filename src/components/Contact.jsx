
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiUrl } from "../config/api";

const API_URL = apiUrl("/api/contact");
const resumeContact = {
  email: "ashishmandal1889@gmail.com", phone: "+91-9113458404", location: "Bengaluru, Karnataka",
  github: "https://github.com/ashishmandal1889", linkedIn: "https://www.linkedin.com/in/ashish-kumar-a802192a0/",
};

function Contact() {
  const [contact, setContact] = useState(resumeContact);
  const [loading, setLoading] = useState(true);

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
        console.error("Unable to load contact information:", error);
        setContact(resumeContact);
      } finally {
        setLoading(false);
      }
    }

    fetchContact();
  }, []);

  const email = contact?.email || "";
  const phone = contact?.phone || "";
  const github = contact?.github || "";
  const linkedIn = contact?.linkedIn || "";
  const leetCode = contact?.leetCode || "";
  const location = contact?.location || "";

  const buttonStyle = {
    border: "1px solid #333",
    color: "#fff",
    padding: "13px 25px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  };

  const socialLinks = [
    { label: "GitHub", url: github },
    { label: "LinkedIn", url: linkedIn },
    { label: "LeetCode", url: leetCode },
    { label: "Website", url: contact?.website || "" },
  ].filter((item) => item.url);

  return (
    <section
      id="contact"
      style={{
        minHeight: "80vh",
        padding: "100px 40px",
        background: "#000",
        color: "#fff",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            color: "#22d3ee",
            fontSize: "18px",
            marginBottom: "15px",
          }}
        >
          Get In Touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: "clamp(40px, 6vw, 60px)",
            margin: "0 0 20px",
          }}
        >
          Let's Work Together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            color: "#737373",
            fontSize: "18px",
            lineHeight: "1.7",
          }}
        >
          I'm currently looking for opportunities to start my career as a
          software engineer. If you'd like to discuss a project,
          opportunity, or just connect, feel free to reach out.
        </motion.p>

        {loading ? (
          <p style={{ color: "#9ca3af", marginTop: "25px" }}>
            Loading contact information...
          </p>
        ) : (
          <>
            {location && (
              <p style={{ color: "#9ca3af", marginTop: "20px" }}>
                {location}
              </p>
            )}

            {email && (
              <motion.a
                href={`mailto:${email}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                whileHover={{ color: "#22d3ee", scale: 1.03 }}
                style={{
                  display: "inline-block",
                  marginTop: "25px",
                  color: "#9ca3af",
                  fontSize: "17px",
                  textDecoration: "none",
                }}
              >
                {email}
              </motion.a>
            )}

            {phone && (
              <motion.a
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                whileHover={{ color: "#22d3ee", scale: 1.03 }}
                style={{
                  display: "block",
                  marginTop: "10px",
                  color: "#9ca3af",
                  fontSize: "17px",
                  textDecoration: "none",
                }}
              >
                {phone}
              </motion.a>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "15px",
                marginTop: "40px",
              }}
            >
              {email && (
                <motion.a
                  href={`mailto:${email}`}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: "#22d3ee",
                    color: "#000",
                    padding: "13px 25px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Email Me
                </motion.a>
              )}

              {socialLinks.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.05,
                    borderColor: "#22d3ee",
                    color: "#22d3ee",
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={buttonStyle}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

export default Contact;
