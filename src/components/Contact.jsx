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

  const secondaryButtonStyle = {
    border: "1px solid rgba(224, 255, 194, 0.38)",
    background: "rgba(6, 71, 52, 0.35)",
    color: "#E0FFC2",
    padding: "13px 26px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s ease",
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
        minHeight: "85vh",
        padding: "110px 24px",
        background: "linear-gradient(180deg, #031f17 0%, #064734 50%, #031f17 100%)",
        color: "#E0FFC2",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "880px",
          textAlign: "center",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            color: "#8FAF9A",
            fontSize: "0.8rem",
            fontWeight: "700",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Get In Touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: "clamp(36px, 6vw, 54px)",
            margin: "0 0 20px",
            color: "#E0FFC2",
            fontWeight: "700",
            letterSpacing: "-0.03em",
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
            maxWidth: "680px",
            margin: "0 auto",
            color: "#8FAF9A",
            fontSize: "18px",
            lineHeight: "1.75",
          }}
        >
          I'm currently seeking opportunities as a Software Engineer and AI/ML Builder.
          Whether you want to discuss an opening, collaborate on an idea, or just connect,
          I'd love to hear from you.
        </motion.p>

        {loading ? (
          <p style={{ color: "#8FAF9A", marginTop: "28px", fontSize: "16px" }}>
            Loading contact information...
          </p>
        ) : (
          <>
            {location && (
              <p
                style={{
                  color: "#b2d4bd",
                  marginTop: "22px",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                📍 {location}
              </p>
            )}

            {email && (
              <motion.a
                href={`mailto:${email}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                whileHover={{ color: "#E0FFC2", scale: 1.02 }}
                style={{
                  display: "inline-block",
                  marginTop: "16px",
                  color: "#8FAF9A",
                  fontSize: "18px",
                  textDecoration: "none",
                  fontWeight: "500",
                  transition: "color 0.2s ease",
                }}
              >
                ✉️ {email}
              </motion.a>
            )}

            {phone && (
              <motion.a
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                whileHover={{ color: "#E0FFC2", scale: 1.02 }}
                style={{
                  display: "block",
                  marginTop: "10px",
                  color: "#8FAF9A",
                  fontSize: "17px",
                  textDecoration: "none",
                  fontWeight: "500",
                  transition: "color 0.2s ease",
                }}
              >
                📞 {phone}
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
                gap: "14px",
                marginTop: "44px",
              }}
            >
              {email && (
                <motion.a
                  href={`mailto:${email}`}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 12px 30px rgba(224, 255, 194, 0.28)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "#E0FFC2",
                    color: "#031f17",
                    border: "1px solid #E0FFC2",
                    padding: "13px 28px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "700",
                    fontSize: "15px",
                    boxShadow: "0 8px 24px rgba(224, 255, 194, 0.16)",
                    transition: "all 0.25s ease",
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
                    scale: 1.03,
                    borderColor: "#E0FFC2",
                    backgroundColor: "rgba(224, 255, 194, 0.12)",
                    color: "#E0FFC2",
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={secondaryButtonStyle}
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
