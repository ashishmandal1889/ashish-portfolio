import { motion } from "framer-motion";

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(224, 255, 194, 0.12)",
        background: "#031f17",
        color: "#E0FFC2",
        padding: "60px 24px 36px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* NAME */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "26px",
            fontWeight: "800",
            letterSpacing: "-0.03em",
            color: "#E0FFC2",
            margin: "0 0 10px",
          }}
        >
          Ashish Kumar<span style={{ color: "#E0FFC2" }}>.</span>
        </motion.h3>

        {/* ROLE */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            color: "#8FAF9A",
            fontSize: "16px",
            fontWeight: "500",
            margin: "0 0 16px",
          }}
        >
          Software Engineer <span style={{ color: "#E0FFC2" }}>&amp;</span> AI/ML Builder
        </motion.p>

        {/* TECHNOLOGIES */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            color: "#6c8a77",
            fontSize: "14px",
            marginBottom: "28px",
          }}
        >
          Python • PyTorch • React • Node.js • FastAPI • PostgreSQL • Agentic AI
        </motion.p>

        {/* LINKS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "28px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          <motion.a
            href="https://github.com/ashishmandal1889"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              color: "#E0FFC2",
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              color: "#8FAF9A",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: "500",
              transition: "color 0.2s ease",
            }}
          >
            GitHub
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/ashish-kumar-a802192a0/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              color: "#E0FFC2",
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              color: "#8FAF9A",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: "500",
              transition: "color 0.2s ease",
            }}
          >
            LinkedIn
          </motion.a>

          <motion.a
            href="mailto:ashishmandal1889@gmail.com"
            whileHover={{
              color: "#E0FFC2",
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              color: "#8FAF9A",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: "500",
              transition: "color 0.2s ease",
            }}
          >
            Email
          </motion.a>
        </div>

        {/* RESUME */}
        <motion.a
          href="/Resume.pdf"
          download
          whileHover={{
            scale: 1.03,
            backgroundColor: "#E0FFC2",
            color: "#031f17",
            borderColor: "#E0FFC2",
            boxShadow: "0 8px 24px rgba(224, 255, 194, 0.2)",
          }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-block",
            border: "1px solid rgba(224, 255, 194, 0.38)",
            background: "rgba(6, 71, 52, 0.35)",
            color: "#E0FFC2",
            padding: "11px 24px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "14px",
            marginBottom: "40px",
            transition: "all 0.25s ease",
          }}
        >
          Download Resume ↓
        </motion.a>

        {/* COPYRIGHT */}
        <div
          style={{
            borderTop: "1px solid rgba(224, 255, 194, 0.08)",
            paddingTop: "26px",
            color: "#5a7764",
            fontSize: "14px",
          }}
        >
          © 2026 Ashish Kumar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
