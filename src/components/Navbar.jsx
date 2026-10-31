import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (section) => {
    setIsOpen(false);

    setTimeout(() => {
      const el = document.getElementById(section) || (section === "overview" ? document.getElementById("about") : null);
      el?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const links = [
    { label: "Home", target: "home" },
    { label: "Overview", target: "overview" },
    { label: "Experience", target: "experience" },
    { label: "Projects", target: "projects" },
    { label: "Skills", target: "skills" },
    { label: "Education", target: "education" },
    { label: "Credentials", target: "credentials" },
    { label: "Contact", target: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "16px 40px",
        background: "rgba(52, 61, 56, 0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(197, 208, 197, 0.16)",
        color: "#E9ECE7",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      {/* LOGO */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        style={{
          fontSize: "22px",
          fontWeight: "800",
          letterSpacing: "-0.03em",
          color: "#E9ECE7",
          cursor: "pointer",
        }}
        onClick={() => handleNavigation("home")}
      >
        Ashish<span style={{ color: "#C5D0C5" }}>.</span>
      </motion.div>

      {/* DESKTOP MENU */}
      <div
        className="desktop-menu"
        style={{
          display: "flex",
          gap: "22px",
          alignItems: "center",
        }}
      >
        {links.map((link) => (
          <motion.a
            key={link.target}
            href={`#${link.target}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(link.target);
            }}
            whileHover={{
              y: -2,
              color: "#E9ECE7",
            }}
            transition={{ duration: 0.2 }}
            style={{
              color: "#C5D0C5",
              fontSize: "14px",
              fontWeight: "600",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              cursor: "pointer",
            }}
          >
            {link.label}
          </motion.a>
        ))}

        <motion.a
          href="/admin/login"
          whileHover={{
            y: -2,
            color: "#E9ECE7",
          }}
          transition={{ duration: 0.2 }}
          style={{
            color: "#87988A",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Admin
        </motion.a>

        {/* DESKTOP RESUME */}
        <motion.a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            y: -2,
            backgroundColor: "#C5D0C5",
            borderColor: "#C5D0C5",
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2 }}
          style={{
            border: "1px solid #87988A",
            background: "#87988A",
            color: "#343D38",
            padding: "8px 18px",
            borderRadius: "7px",
            fontSize: "13px",
            fontWeight: "700",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            boxShadow: "0 4px 12px rgba(22, 27, 24, 0.3)",
          }}
        >
          Resume ↗
        </motion.a>
      </div>

      {/* MOBILE BUTTON */}
      <motion.button
        className="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle navigation menu"
        style={{
          display: "none",
          background: "transparent",
          border: "none",
          color: "#E9ECE7",
          fontSize: "24px",
          cursor: "pointer",
          padding: "6px",
        }}
      >
        {isOpen ? "✕" : "☰"}
      </motion.button>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "rgba(52, 61, 56, 0.98)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(197, 208, 197, 0.16)",
              borderBottom: "1px solid rgba(197, 208, 197, 0.16)",
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            {links.map((link) => (
              <motion.button
                key={link.target}
                onClick={() => handleNavigation(link.target)}
                className="mobile-nav-button"
                whileHover={{
                  x: 5,
                  color: "#E9ECE7",
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#C5D0C5",
                  fontSize: "16px",
                  fontWeight: "600",
                  textAlign: "left",
                  padding: "6px 0",
                  cursor: "pointer",
                }}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.a
              href="/admin/login"
              whileHover={{
                x: 5,
                color: "#E9ECE7",
              }}
              style={{
                textDecoration: "none",
                color: "#87988A",
                fontSize: "16px",
                fontWeight: "600",
                padding: "6px 0",
              }}
            >
              Admin Login
            </motion.a>

            {/* MOBILE RESUME */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                x: 5,
                color: "#C5D0C5",
              }}
              style={{
                textDecoration: "none",
                color: "#343D38",
                background: "#87988A",
                fontWeight: "700",
                fontSize: "15px",
                padding: "10px 16px",
                borderRadius: "8px",
                textAlign: "center",
                marginTop: "8px",
              }}
            >
              Download Resume ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
