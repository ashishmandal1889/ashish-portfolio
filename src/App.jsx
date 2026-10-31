import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, FileText, ArrowDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./components/Icons";
import "./App.css";

import Navbar from "./components/Navbar";
import Overview from "./components/Overview";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Credentials from "./components/Credentials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./admin/ProtectedRoute";

function Portfolio() {
  return (
    <div className="portfolio-shell">
      <Navbar />

      {/* HERO SECTION (Editorial Asymmetric Layout) */}
      <section id="home" className="hero-section--editorial">
        <div className="section-container">
          <div className="hero-grid-layout">
            {/* Left Column: Oversized typography & info */}
            <motion.div
              className="hero-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="hero-status-pill">
                <span className="status-indicator" />
                Available for Software Engineering &amp; AI Opportunities
              </div>

              <h1 className="hero-name-large">
                Ashish <span>Kumar</span>
              </h1>

              <h2 className="hero-role-title">
                Full Stack Developer | AI/ML Enthusiast
              </h2>

              <p className="hero-intro-lead">
                I engineer modern web platforms, distributed backends, and practical AI systems that transform complex data into intuitive, high-performance software.
              </p>

              <p className="hero-interests-text">
                Specializing in Java Spring Boot, Python FastAPI, React, Cloud Automation (AWS), and Generative AI applications with rigorous engineering discipline.
              </p>

              {/* Two CTA Buttons */}
              <div className="hero-cta-group">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn--primary"
                >
                  View Projects
                  <ArrowDown size={16} />
                </motion.a>

                <motion.a
                  href="/resume.pdf"
                  download="Ashish_Kumar_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn--secondary"
                >
                  <FileText size={16} />
                  Download Resume
                  <ExternalLink size={14} />
                </motion.a>
              </div>

              {/* Social Links */}
              <div className="hero-socials">
                <span className="hero-socials-label">Connect:</span>
                <a
                  href="https://github.com/ashishmandal1889"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-link"
                >
                  <GithubIcon size={15} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/ashish-kumar-a802192a0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-link"
                >
                  <LinkedinIcon size={15} />
                  LinkedIn
                </a>
              </div>
            </motion.div>

            {/* Right Column: Prominent Editorial Portrait */}
            <motion.div
              className="hero-right"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              <div className="hero-image-frame">
                <div className="hero-image-backdrop" aria-hidden="true" />
                <div className="hero-image-card">
                  <img
                    src="/profile.jpg"
                    alt="Ashish Kumar"
                    width="380"
                    height="440"
                    onError={(e) => {
                      // Fallback to original image if needed
                      e.currentTarget.src = "/WhatsApp Image 2026-09-27 at 11.56.01.jpeg";
                    }}
                  />
                  <div className="hero-image-badge">
                    <span className="badge-tag">Developer Profile</span>
                    <span className="badge-text">Bengaluru, IN • Graduating 2027</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OVERVIEW / ABOUT SECTION */}
      <Overview />

      {/* WORK EXPERIENCE */}
      <Experience />

      {/* FEATURED PROJECTS */}
      <Projects />

      {/* TECHNICAL SKILLS */}
      <Skills />

      {/* EDUCATION */}
      <Education />

      {/* CREDENTIALS & ACHIEVEMENTS */}
      <Credentials />

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

        {/* Support direct /overview route as well */}
        <Route path="/overview" element={<Portfolio />} />

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
