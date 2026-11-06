import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const items = [
  { id: "top", label: "Home", shortLabel: "Home" },
  { id: "about", label: "About", shortLabel: "About" },
  { id: "skills", label: "Skills", shortLabel: "Skills" },
  { id: "projects", label: "Projects", shortLabel: "Projects" },
  { id: "experience", label: "Experience", shortLabel: "Experience" },
  { id: "credentials", label: "Credentials", shortLabel: "Credentials" },
  { id: "contact", label: "Contact", shortLabel: "Contact" },
];

export default function Dock() {
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
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="dock-container" aria-label="Quick navigation dock">
      <nav className="dock__panel">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`dock__pill ${isActive ? "active" : ""}`}
              onClick={() => scrollTo(item.id)}
              aria-label={item.label}
            >
              {item.shortLabel}
            </button>
          );
        })}

        <div className="dock__divider" aria-hidden="true" />

        <div className="dock__theme-wrapper">
          <ThemeToggle className="dock__theme-btn" />
        </div>
      </nav>
    </div>
  );
}
