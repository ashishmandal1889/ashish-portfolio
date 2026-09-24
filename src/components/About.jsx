import { motion } from "framer-motion";

function About() {
  return (
    <section
      id="about"
      className="about-section"
      style={{
        minHeight: "80vh",
        padding: "100px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050505",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      <div
        className="about-content"
        style={{
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
            fontSize: "16px",
            marginBottom: "10px",
          }}
        >
          About Me
        </motion.p>

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: "clamp(36px, 5vw, 45px)",
            margin: "0 0 30px",
          }}
        >
          Who I Am
        </motion.h2>

        {/* PARAGRAPH 1 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            color: "#9ca3af",
            fontSize: "18px",
            lineHeight: "1.8",
          }}
        >
          I'm <strong style={{ color: "white" }}>Ashish Kumar</strong>,
          a passionate software engineering student who enjoys
          solving problems and building practical applications.
        </motion.p>

        {/* PARAGRAPH 2 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            color: "#9ca3af",
            fontSize: "18px",
            lineHeight: "1.8",
            marginTop: "20px",
          }}
        >
          I am currently focused on developing my skills in Java,
          Spring Boot, React, SQL and modern web technologies.
          I enjoy learning new technologies, adapting to different
          challenges and turning ideas into working software.
        </motion.p>

        {/* PARAGRAPH 3 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            color: "#9ca3af",
            fontSize: "18px",
            lineHeight: "1.8",
            marginTop: "20px",
          }}
        >
          My goal is to become a strong software engineer and
          contribute to real-world products while continuously
          improving my problem-solving and development skills.
        </motion.p>
      </div>
    </section>
  );
}

export default About;