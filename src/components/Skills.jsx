import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, Layout, Server, Database, Cpu, Cloud, Wrench } from "lucide-react";
import { apiUrl } from "../config/api";

const BASE_CATEGORIES = [
  {
    id: "programming-languages",
    title: "Programming Languages",
    icon: Code,
    description: "Core typed and interpreted programming languages for backend logic and problem-solving.",
    skills: ["Java", "Python", "JavaScript"],
  },
  {
    id: "frontend-development",
    title: "Frontend Development",
    icon: Layout,
    description: "Building component-driven, responsive, and performance-optimized user interfaces.",
    skills: ["HTML5", "CSS3", "React", "Vite"],
  },
  {
    id: "backend-development",
    title: "Backend Development",
    icon: Server,
    description: "Architecting robust microservices, server architectures, and RESTful APIs.",
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs"],
  },
  {
    id: "databases",
    title: "Databases",
    icon: Database,
    description: "Modeling relational schemas, document collections, and cloud datastores.",
    skills: ["SQL", "PostgreSQL", "MongoDB", "Firebase", "Firestore"],
  },
  {
    id: "ai-machine-learning",
    title: "AI & Machine Learning",
    icon: Cpu,
    description: "Implementing predictive models, generative AI APIs, and retrieval-augmented workflows.",
    skills: [
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "Machine Learning",
      "Generative AI",
      "LLM Fundamentals",
      "RAG Basics",
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    icon: Cloud,
    description: "Configuring cloud infrastructure, containerized environments, and automated CI/CD.",
    skills: ["AWS", "Docker", "Git", "GitHub", "Linux", "GitHub Actions"],
  },
  {
    id: "development-tools",
    title: "Development Tools",
    icon: Wrench,
    description: "Essential developer toolchain for code editing, API testing, and data analysis.",
    skills: ["VS Code", "Jupyter Notebook", "Postman"],
  },
];

// Helper to determine the best category for any skill dynamically fetched from API
function categorizeSkill(skillName) {
  const lower = skillName.toLowerCase();

  if (
    lower.includes("react") ||
    lower.includes("frontend") ||
    lower.includes("css") ||
    lower.includes("html") ||
    lower.includes("tailwind") ||
    lower.includes("ui")
  ) {
    return "frontend-development";
  }

  if (
    lower.includes("fastapi") ||
    lower.includes("express") ||
    lower.includes("node") ||
    lower.includes("rest") ||
    lower.includes("backend") ||
    lower.includes("auth")
  ) {
    return "backend-development";
  }

  if (
    lower.includes("postgres") ||
    lower.includes("sql") ||
    lower.includes("mongo") ||
    lower.includes("mysql") ||
    lower.includes("firebase") ||
    lower.includes("firestore") ||
    lower.includes("database")
  ) {
    return "databases";
  }

  if (
    lower.includes("learning") ||
    lower.includes("ai") ||
    lower.includes("ml") ||
    lower.includes("llm") ||
    lower.includes("gemini") ||
    lower.includes("openai") ||
    lower.includes("prompt") ||
    lower.includes("numpy") ||
    lower.includes("pandas") ||
    lower.includes("scikit") ||
    lower.includes("rag") ||
    lower.includes("agent")
  ) {
    return "ai-machine-learning";
  }

  if (
    lower.includes("aws") ||
    lower.includes("docker") ||
    lower.includes("cloud") ||
    lower.includes("actions") ||
    lower.includes("devops") ||
    lower.includes("kubernetes")
  ) {
    return "cloud-devops";
  }

  if (
    lower.includes("git") ||
    lower.includes("postman") ||
    lower.includes("vite") ||
    lower.includes("jupyter") ||
    lower.includes("pytest") ||
    lower.includes("tool")
  ) {
    return "developer-tools";
  }

  return "programming-languages";
}

function Skills() {
  const [categories, setCategories] = useState(BASE_CATEGORIES);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    fetch(apiUrl("/api/skills"))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch skills");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Re-map categories preserving base skills and dynamically slotting new API skills without duplicates
          setCategories((prevCategories) => {
            const updated = prevCategories.map((cat) => ({
              ...cat,
              skills: [...cat.skills],
            }));

            data.forEach((item) => {
              const skillName = (item.name || "").trim();
              if (!skillName || skillName.toLowerCase().includes("spring boot")) return;

              // Check if already in any category (case-insensitive)
              const alreadyExists = updated.some((cat) =>
                cat.skills.some((s) => s.toLowerCase() === skillName.toLowerCase())
              );

              if (!alreadyExists) {
                const targetCategoryId = categorizeSkill(skillName);
                const targetCategory =
                  updated.find((c) => c.id === targetCategoryId) || updated[0];
                targetCategory.skills.push(skillName);
              }
            });

            return updated;
          });
        }
      })
      .catch((err) => {
        console.warn("Using default categorized skills:", err.message);
      });
  }, []);

  const displayedCategories =
    selectedFilter === "all"
      ? categories
      : categories.filter((cat) => cat.id === selectedFilter);

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="editorial-section-header">
          <motion.span
            className="editorial-section-label"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            TECHNICAL PROFICIENCY
          </motion.span>

          <motion.h2
            className="editorial-section-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Technical Skills
          </motion.h2>

          <motion.p
            className="editorial-section-desc"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Organized across core engineering disciplines, developer frameworks, cloud infrastructure, and generative AI systems.
          </motion.p>

          {/* Category Filter Tabs */}
          <div className="skills-filter-row">
            <button
              type="button"
              className={`skills-filter-btn ${selectedFilter === "all" ? "active" : ""}`}
              onClick={() => setSelectedFilter("all")}
            >
              All ({categories.reduce((acc, c) => acc + c.skills.length, 0)})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`skills-filter-btn ${selectedFilter === cat.id ? "active" : ""}`}
                onClick={() => setSelectedFilter(cat.id)}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Cards Grid */}
        <div className="skills-category-grid">
          {displayedCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.article
                key={category.id}
                className="skill-category-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <div className="skill-category-header">
                  <div className="skill-category-icon-box">
                    <IconComponent size={20} className="skill-cat-icon" />
                  </div>
                  <div>
                    <h3 className="skill-category-title">{category.title}</h3>
                    <span className="skill-count-badge">
                      {category.skills.length} skills
                    </span>
                  </div>
                </div>

                <p className="skill-category-desc">{category.description}</p>

                <div className="skill-pill-wrap">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;