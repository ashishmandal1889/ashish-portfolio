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

  const links = [
    "Home",
    "About",
    "Education",
    "Skills",
    "Projects",
    "Credentials",
    "Experience",
    "Contact",
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
        background: "rgba(3, 31, 23, 0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(224, 255, 194, 0.12)",
        color: "#E0FFC2",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      {/* LOGO */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        style={{
          fontSize: "24px",
          fontWeight: "800",
          letterSpacing: "-0.03em",
          color: "#E0FFC2",
          cursor: "pointer",
        }}
        onClick={() => handleNavigation("home")}
      >
        Ashish<span style={{ color: "#E0FFC2" }}>.</span>
      </motion.div>

      {/* DESKTOP MENU */}
      <div
        className="desktop-menu"
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
        }}
      >
        {links.map((link) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            whileHover={{
              y: -2,
              color: "#E0FFC2",
            }}
            transition={{ duration: 0.2 }}
            style={{
              color: "#8FAF9A",
              fontSize: "15px",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            {link}
          </motion.a>
        ))}

        <motion.a
          href="/admin/login"
          whileHover={{
            y: -2,
            color: "#E0FFC2",
          }}
          transition={{ duration: 0.2 }}
          style={{
            color: "#8FAF9A",
            fontSize: "15px",
            fontWeight: "500",
            textDecoration: "none",
          }}
        >
          Admin
        </motion.a>

        {/* DESKTOP RESUME */}
        <motion.a
          href="/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            y: -2,
            color: "#031f17",
            backgroundColor: "#E0FFC2",
            borderColor: "#E0FFC2",
          }}
          transition={{ duration: 0.2 }}
          style={{
            border: "1px solid rgba(224, 255, 194, 0.35)",
            background: "rgba(6, 71, 52, 0.35)",
            color: "#E0FFC2",
            padding: "8px 16px",
            borderRadius: "7px",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
            transition: "all 0.25s ease",
          }}
        >
          Resume
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
          color: "#E0FFC2",
          fontSize: "26px",
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
              background: "rgba(3, 31, 23, 0.97)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(224, 255, 194, 0.14)",
              borderBottom: "1px solid rgba(224, 255, 194, 0.14)",
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
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
                  color: "#E0FFC2",
                }}
                style={{
                  color: "#8FAF9A",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {link}
              </motion.button>
            ))}

            <motion.a
              href="/admin/login"
              className="mobile-nav-button"
              whileHover={{
                x: 5,
                color: "#E0FFC2",
              }}
              style={{
                textDecoration: "none",
                color: "#8FAF9A",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Admin Login
            </motion.a>

            {/* MOBILE RESUME */}
            <motion.a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-button"
              whileHover={{
                x: 5,
                color: "#E0FFC2",
              }}
              style={{
                textDecoration: "none",
                color: "#E0FFC2",
                fontWeight: "600",
                fontSize: "16px",
                paddingTop: "6px",
              }}
            >
              Resume ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
