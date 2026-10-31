import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="footer-editorial">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="footer-logo">
            Ashish<span>.</span>
          </div>

          <p className="footer-role">
            Full Stack Developer | AI/ML Enthusiast
          </p>

          <div className="footer-links-row">
            <a
              href="https://github.com/ashishmandal1889"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/ashish-kumar-a802192a0/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>

            <a
              href="mailto:ashishmandal1889@gmail.com"
              className="footer-link"
            >
              Email
            </a>

            <a
              href="/admin/login"
              className="footer-link"
              style={{ color: "var(--muted-sage)" }}
            >
              Admin Portal
            </a>
          </div>

          <div>
            <a
              href="/resume.pdf"
              download="Ashish_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-resume-btn"
            >
              Download Resume ↓
            </a>
          </div>

          <div className="footer-copyright">
            © 2026 Ashish Kumar. All rights reserved. Crafted with React &amp; Spring Boot.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
