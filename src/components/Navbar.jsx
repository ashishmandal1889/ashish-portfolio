import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "About", target: "about" },
  { label: "Skills", target: "skills" },
  { label: "Projects", target: "projects" },
  { label: "Experience", target: "experience" },
  { label: "Credentials", target: "credentials" },
  { label: "Contact", target: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sectionIds = ["top", "about", "skills", "projects", "experience", "credentials", "contact"];
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

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bar" data-site-bar="true">
      <a
        className="mark"
        aria-label="Top of page"
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          handleNavigation("top");
        }}
      >
        AK
      </a>

      <nav className="bar__nav">
        {navLinks.map((link) => {
          const isActive = activeSection === link.target;
          return (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(link.target);
              }}
              className={isActive ? "active" : ""}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      <div className="bar__actions">
        <ThemeToggle />

        <a
          className="bar__cta"
          href="/resume.pdf"
          download="Ashish_Kumar_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Resume</span>
          <span className="long"> PDF</span>
        </a>

        <a
          href="/admin/login"
          className="bar__admin"
          title="Admin Access"
        >
          Admin
        </a>

        <button
          type="button"
          className={`burger ${isOpen ? "open" : ""}`}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer__links">
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.target);
                }}
                className={activeSection === link.target ? "active" : ""}
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-drawer__divider" />
            <a
              href="/resume.pdf"
              download="Ashish_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-drawer__resume"
            >
              Download Resume PDF
            </a>
            <a href="/admin/login" className="mobile-drawer__admin">
              Admin Portal
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
