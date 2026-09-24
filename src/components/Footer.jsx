import { motion } from "framer-motion";

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #222",
        background: "#000",
        color: "#fff",
        padding: "50px 20px 30px",
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
            margin: "0 0 10px",
          }}
        >
          Ashish Kumar<span style={{ color: "#22d3ee" }}>.</span>
        </motion.h3>

        {/* ROLE */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            color: "#737373",
            margin: "0 0 25px",
          }}
        >
          Software Engineer
        </motion.p>

        {/* TECHNOLOGIES */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            color: "#525252",
            fontSize: "14px",
            marginBottom: "25px",
          }}
        >
          Java • Spring Boot • React • PostgreSQL • JavaScript
        </motion.p>

        {/* LINKS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <motion.a
            href="https://github.com/ashishmandal1889"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              color: "#22d3ee",
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              color: "#9ca3af",
              textDecoration: "none",
            }}
          >
            GitHub
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/ashish-kumar-a802192a0/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              color: "#22d3ee",
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              color: "#9ca3af",
              textDecoration: "none",
            }}
          >
            LinkedIn
          </motion.a>

          <motion.a
            href="mailto:ashishmandal1889@gmail.com"
            whileHover={{
              color: "#22d3ee",
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              color: "#9ca3af",
              textDecoration: "none",
            }}
          >
            Email
          </motion.a>
        </div>

        {/* RESUME */}
        <motion.a
          href="/resume.pdf"
          download
          whileHover={{
            scale: 1.05,
            backgroundColor: "#22d3ee",
            color: "#000",
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "inline-block",
            border: "1px solid #22d3ee",
            color: "#22d3ee",
            padding: "11px 22px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            marginBottom: "35px",
          }}
        >
          Download Resume
        </motion.a>

        {/* COPYRIGHT */}
        <div
          style={{
            borderTop: "1px solid #1a1a1a",
            paddingTop: "25px",
            color: "#404040",
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