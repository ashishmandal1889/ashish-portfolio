import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (section) => {
    setIsOpen(false);

    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const links = ["Home", "About", "Skills", "Projects", "Contact"];

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
        padding: "18px 40px",
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #222",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      {/* LOGO */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => handleNavigation("home")}
      >
        Ashish<span style={{ color: "#22d3ee" }}>.</span>
      </motion.div>

      {/* DESKTOP MENU */}
      <div
        className="desktop-menu"
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
        }}
      >
        {links.map((link) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            whileHover={{
              y: -2,
              color: "#22d3ee",
            }}
            transition={{ duration: 0.2 }}
          >
            {link}
          </motion.a>
        ))}

        {/* DESKTOP RESUME */}
        <motion.a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            y: -2,
            color: "#000",
            backgroundColor: "#22d3ee",
          }}
          transition={{ duration: 0.2 }}
          style={{
            border: "1px solid #22d3ee",
            color: "#22d3ee",
            padding: "7px 14px",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          Resume
        </motion.a>
      </div>

      {/* MOBILE BUTTON */}
      <motion.button
        className="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        style={{
          display: "none",
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "28px",
          cursor: "pointer",
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
              background: "rgba(0, 0, 0, 0.95)",
              backdropFilter: "blur(12px)",
              borderTop: "1px solid #222",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            {/* MOBILE NAVIGATION LINKS */}
            {links.map((link) => (
              <motion.button
                key={link}
                onClick={() => handleNavigation(link.toLowerCase())}
                className="mobile-nav-button"
                whileHover={{
                  x: 5,
                  color: "#22d3ee",
                }}
              >
                {link}
              </motion.button>
            ))}

            {/* MOBILE RESUME */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-button"
              whileHover={{
                x: 5,
                color: "#22d3ee",
              }}
              style={{
                textDecoration: "none",
              }}
            >
              Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;