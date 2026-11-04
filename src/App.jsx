import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
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

      {/* HERO SECTION — Premium Minimalist Editorial */}
      <section id="home" className="hero-editorial-section">
        <div className="hero-editorial-container">
          <div className="hero-editorial-grid">
            {/* Left Column: Name, Role, Headline, Introduction, Buttons */}
            <motion.div
              className="hero-editorial-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="hero-editorial-label">
                Software Engineer | Full-Stack Developer | AI/ML Enthusiast
              </span>

              <h1 className="hero-editorial-name">
                Ashish Kumar
              </h1>

              <h2 className="hero-editorial-subheadline">
                Building Practical Software Solutions with Code and AI.
              </h2>

              <p className="hero-editorial-intro">
                Computer Science undergraduate interested in full-stack development, software engineering and Artificial Intelligence. I build web applications, backend APIs and AI-powered solutions.
              </p>

              <div className="hero-editorial-actions">
                <a href="#projects" className="btn-editorial-primary">
                  View Projects
                </a>

                <a
                  href="/resume.pdf"
                  download="Ashish_Kumar_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-secondary"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>

            {/* Right Column: Rectangular Portrait with Sage Accent */}
            <motion.div
              className="hero-editorial-right"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              <div className="hero-portrait-frame">
                <div className="hero-portrait-block" aria-hidden="true" />
                <img
                  src="/profile.jpg"
                  alt="Ashish Kumar - Software Engineer | Full-Stack Developer | AI/ML Enthusiast"
                  className="hero-portrait-image"
                  onError={(e) => {
                    e.currentTarget.src = "/profile.jpeg";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM SECTION — Dark-Green Background with Professional Statement */}
        <div className="hero-editorial-statement-strip">
          <div className="hero-editorial-statement-container">
            <p className="hero-editorial-statement-text">
              Focused on engineering scalable architectures, crafting clean web interfaces, and building intelligent software solutions with code and AI.
            </p>
          </div>
        </div>
      </section>

      {/* OVERVIEW / ABOUT SECTION */}
      <Overview />

      {/* TECHNICAL SKILLS */}
      <Skills />

      {/* FEATURED PROJECTS */}
      <Projects />

      {/* WORK EXPERIENCE */}
      <Experience />

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

        {/* Direct /overview anchor route */}
        <Route path="/overview" element={<Portfolio />} />

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Unknown route redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;