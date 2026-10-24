import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";

import Navbar from "./components/Navbar";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import Education from "./components/Education";
import Credentials from "./components/Credentials";
import ProtectedRoute from "./admin/ProtectedRoute";


function Portfolio() {
  return (
    <div className="portfolio-shell">
      <Navbar />

      {/* HERO SECTION */}
      <section
        id="home"
        className="hero-section hero-section--premium"
      >
        <div className="hero-orb hero-orb--one" aria-hidden="true" />
        <div className="hero-orb hero-orb--two" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
        <motion.div
          className="hero-profile"
          initial={{ opacity: 0, scale: 0.88, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          <img
            src="/WhatsApp Image 2026-09-27 at 11.56.01.jpeg"
            alt="Ashish Kumar"
            width="180"
            height="180"
          />
        </motion.div>
        {/* HELLO */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-eyebrow"
        >
          <span className="status-dot" /> Available for opportunities
        </motion.p>

        {/* NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="hero-title"
        >
          Ashish Kumar
        </motion.h1>

        {/* ROLE */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
          style={{
            color: "#9ca3af",
            fontWeight: "400",
            fontSize: "clamp(24px, 4vw, 40px)",
            margin: "15px 0",
          }}
        >
          Software Engineer <span>&amp;</span> AI/ML Builder
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          className="hero-description hero-description--premium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
          style={{
            maxWidth: "700px",
            color: "#737373",
            fontSize: "18px",
            lineHeight: "1.7",
            marginTop: "15px",
          }}
        >
          I design reliable software and intelligent experiences—from scalable
          web platforms to practical AI/ML solutions that solve real problems.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          className="hero-buttons hero-buttons--premium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.7,
          }}
        >
          {/* PROJECT BUTTON */}
          <motion.a
            href="#projects"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="button button--primary"
          >
            View My Projects
          </motion.a>

          {/* CONTACT BUTTON */}
          <motion.a
            href="#contact"
            whileHover={{
              scale: 1.05,
              borderColor: "#22d3ee",
              color: "#22d3ee",
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="button button--secondary"
          >
            Contact Me
          </motion.a>
        </motion.div>
        </div>
      </section>

      {/* ABOUT */}
     <About />

    {/* EDUCATION */}
      <Education />

      {/* ACHIEVEMENTS & CERTIFICATIONS */}
      <Credentials />

      {/* SKILLS */}
      <Skills />

      {/* PROJECTS */}
      <Projects />
      {/* EXPERIENCE */}
       <Experience />

      {/* CONTACT */}
      <Contact />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public portfolio */}
        <Route path="/" element={<Portfolio />} />

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin pages */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
        </Route>

        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
