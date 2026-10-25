import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiUrl } from "../config/api";

function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetch(apiUrl("/api/about"))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch about section");
        }

        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setAbout(data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching about section:", error);
      });
  }, []);

  return (
    <section
      id="about"
      style={{
        padding: "110px 24px",
        background: "linear-gradient(180deg, #031f17 0%, #064734 40%, #064734 70%, #031f17 100%)",
        color: "#E0FFC2",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
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
          {about?.heading || "About Me"}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            color: "#E0FFC2",
            fontSize: "clamp(32px, 6vw, 48px)",
            fontWeight: "700",
            letterSpacing: "-0.03em",
            margin: "0 0 36px",
          }}
        >
          Who I Am
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            background: "linear-gradient(145deg, rgba(7, 53, 39, 0.7), rgba(3, 31, 23, 0.85))",
            border: "1px solid rgba(224, 255, 194, 0.14)",
            borderRadius: "20px",
            padding: "44px 36px",
            boxShadow: "0 16px 36px -10px rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(10px)",
          }}
        >
          <motion.p
            style={{
              color: "#b2d4bd",
              fontSize: "19px",
              lineHeight: "1.85",
              maxWidth: "800px",
              margin: "0 auto",
              fontWeight: "400",
            }}
          >
            {about?.description || "Computer Science undergraduate graduating in 2027, focused on AI/ML and Generative AI. I build LLM-powered applications, dependable backend APIs, and full-stack projects that solve practical problems."}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
