import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/about")
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
        padding: "100px 20px",
        background: "#000",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
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
            color: "#22d3ee",
            fontSize: "16px",
            marginBottom: "10px",
          }}
        >
          {about?.heading || "About Me"}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: "clamp(32px, 6vw, 45px)",
            margin: "10px 0 30px",
          }}
        >
          Who I Am
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            color: "#aaa",
            fontSize: "18px",
            lineHeight: "1.8",
            maxWidth: "750px",
            margin: "0 auto",
          }}
        >
          {about?.description || "Loading..."}
        </motion.p>
      </div>
    </section>
  );
}

export default About;