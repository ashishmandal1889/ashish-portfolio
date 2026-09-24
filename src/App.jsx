import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
      }}
    >
      <Navbar />

      {/* HERO SECTION */}
      <section
      id="home"
        className="hero-section"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 20px 60px",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        {/* HELLO */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            color: "#22d3ee",
            fontSize: "20px",
            marginBottom: "10px",
          }}
        >
          Hello, I'm
        </motion.p>

        {/* NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          style={{
            fontSize: "clamp(50px, 9vw, 90px)",
            margin: "10px 0",
            fontWeight: "700",
            lineHeight: "1.1",
          }}
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
          Software Engineer
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
         className="hero-description"
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
          I build scalable web applications and backend systems using
          Java, Spring Boot, React, PostgreSQL and modern cloud
          technologies.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
         className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.7,
          }}
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "35px",
            flexWrap: "wrap",
            justifyContent: "center",
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
            style={{
              background: "#22d3ee",
              color: "#000",
              padding: "13px 25px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
            }}
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
            style={{
              border: "1px solid #333",
              color: "#fff",
              padding: "13px 25px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </section>

      {/* ABOUT */}
      <About />

      {/* SKILLS */}
      <Skills />

      {/* PROJECTS */}
      <Projects />
      {/* CONTACT */}
      <Contact />
      {/* FOOTER */}
      <Footer />
    </div>
  );
}
  

export default App;