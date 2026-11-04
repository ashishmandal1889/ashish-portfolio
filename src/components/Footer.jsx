import { motion } from "framer-motion";

function Footer() {
  const navLinks = [
    { label: "Home", target: "home" },
    { label: "About", target: "about" },
    { label: "Skills", target: "skills" },
    { label: "Projects", target: "projects" },
    { label: "Experience", target: "experience" },
    { label: "Education", target: "education" },
    { label: "Certifications", target: "certifications" },
    { label: "Contact", target: "contact" },
  ];

  const handleNavigation = (targetId) => {
    const el =
      document.getElementById(targetId) ||
      (targetId === "about" ? document.getElementById("overview") : null);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="editorial-footer">
      <div className="editorial-container">
        <motion.div
          className="editorial-footer-content"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Top Row: Name and Role */}
          <div className="editorial-footer-brand-block">
            <h2 className="editorial-footer-brand">
              Ashish Kumar
            </h2>
            <p className="editorial-footer-role">
              Software Engineer | Full-Stack Developer | AI/ML Enthusiast
            </p>
          </div>

          {/* Navigation Links */}
          <div className="editorial-footer-nav">
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.target);
                }}
                className="editorial-footer-nav-link"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social / Direct Links */}
          <div className="editorial-footer-links">
            <a
              href="https://github.com/ashishmandal1889"
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-footer-link"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/ashish-kumar-a802192a0/"
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-footer-link"
            >
              LinkedIn
            </a>

            <a
              href="mailto:ashishmandal1889@gmail.com"
              className="editorial-footer-link"
            >
              Email
            </a>

            <a
              href="/admin/login"
              className="editorial-footer-link"
            >
              Admin Portal
            </a>
          </div>

          <div className="editorial-footer-divider" />

          {/* Copyright Row */}
          <div className="editorial-footer-bottom">
            <p className="editorial-footer-copy">
              &copy; {new Date().getFullYear()} Ashish Kumar. All rights reserved.
            </p>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-footer-resume-link"
            >
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;