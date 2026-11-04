import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.target);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigation = (targetId) => {
    setIsOpen(false);
    setActiveSection(targetId);

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
    <header className="editorial-navbar-wrapper">
      <nav className="editorial-navbar">
        {/* Left: Branding */}
        <div
          className="editorial-nav-brand"
          onClick={() => handleNavigation("home")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleNavigation("home")}
        >
          ASHISH KUMAR
        </div>

        {/* Center: Navigation Links */}
        <div className="editorial-nav-links">
          {navLinks.map((link) => {
            const isActive =
              activeSection === link.target ||
              (link.target === "about" && activeSection === "overview");

            return (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.target);
                }}
                className={`editorial-nav-link ${isActive ? "active" : ""}`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="editorial-nav-underline"
                    className="editorial-nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="editorial-nav-actions">
          <a
            href="/admin/login"
            className="editorial-nav-admin-link"
          >
            Admin
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-resume-btn"
          >
            Resume
          </a>

          {/* Mobile Menu Toggle (Clean Text Toggle, No Icons) */}
          <button
            type="button"
            className="editorial-mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="editorial-mobile-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.target);
                }}
                className="editorial-mobile-link"
              >
                {link.label}
              </a>
            ))}

            <div className="editorial-mobile-divider" />

            <a
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="editorial-mobile-admin"
            >
              Admin Portal
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-mobile-resume-btn"
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;