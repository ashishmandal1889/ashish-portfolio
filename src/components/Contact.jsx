import { motion } from "framer-motion";

function Contact() {
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
        {/* LABEL */}
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

        {/* TITLE */}
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

        {/* DESCRIPTION */}
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

        {/* EMAIL ADDRESS */}
        <motion.a
          href="mailto:ashishmandal1889@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          whileHover={{
            color: "#22d3ee",
            scale: 1.03,
          }}
          style={{
            display: "inline-block",
            marginTop: "25px",
            color: "#9ca3af",
            fontSize: "17px",
            textDecoration: "none",
          }}
        >
          ashishmandal1889@gmail.com
        </motion.a>

        {/* CONTACT BUTTONS */}
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
          {/* EMAIL */}
          <motion.a
            href="mailto:ashishmandal1889@gmail.com"
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

          {/* GITHUB */}
          <motion.a
            href="https://github.com/ashishmandal1889"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              borderColor: "#22d3ee",
              color: "#22d3ee",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              border: "1px solid #333",
              color: "#fff",
              padding: "13px 25px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            GitHub
          </motion.a>

          {/* LINKEDIN */}
          <motion.a
            href="https://www.linkedin.com/in/ashish-kumar-a802192a0/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              borderColor: "#22d3ee",
              color: "#22d3ee",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              border: "1px solid #333",
              color: "#fff",
              padding: "13px 25px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            LinkedIn
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;