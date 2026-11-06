import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";

const BASE_CATEGORIES = [
  {
    id: "programming-languages",
    title: "Programming Languages",
    skills: ["Java", "Python", "JavaScript"],
  },
  {
    id: "frontend-development",
    title: "Frontend Development",
    skills: ["HTML5", "CSS3", "React", "Vite"],
  },
  {
    id: "backend-development",
    title: "Backend Development",
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs"],
  },
  {
    id: "databases",
    title: "Databases",
    skills: ["SQL", "PostgreSQL", "MongoDB", "Firebase", "Firestore"],
  },
  {
    id: "ai-machine-learning",
    title: "AI & Machine Learning",
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
    skills: ["AWS", "Docker", "Git", "GitHub", "Linux", "GitHub Actions"],
  },
  {
    id: "development-tools",
    title: "Development Tools",
    skills: ["VS Code", "Jupyter Notebook", "Postman"],
  },
];

function categorizeSkill(skillName) {
  const lower = skillName.toLowerCase();

  if (
    lower.includes("react") ||
    lower.includes("frontend") ||
    lower.includes("css") ||
    lower.includes("html") ||
    lower.includes("vite") ||
    lower.includes("tailwind")
  ) {
    return "frontend-development";
  }

  if (
    lower.includes("fastapi") ||
    lower.includes("express") ||
    lower.includes("node") ||
    lower.includes("rest") ||
    lower.includes("backend")
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
    lower.includes("numpy") ||
    lower.includes("pandas") ||
    lower.includes("scikit") ||
    lower.includes("rag")
  ) {
    return "ai-machine-learning";
  }

  if (
    lower.includes("aws") ||
    lower.includes("docker") ||
    lower.includes("cloud") ||
    lower.includes("actions") ||
    lower.includes("devops") ||
    lower.includes("linux")
  ) {
    return "cloud-devops";
  }

  if (
    lower.includes("git") ||
    lower.includes("postman") ||
    lower.includes("jupyter") ||
    lower.includes("tool")
  ) {
    return "development-tools";
  }

  return "programming-languages";
}

export default function Skills() {
  const [categories, setCategories] = useState(BASE_CATEGORIES);

  useEffect(() => {
    fetch(apiUrl("/api/skills"))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch skills");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories((prevCategories) => {
            const updated = prevCategories.map((cat) => ({
              ...cat,
              skills: [...cat.skills],
            }));

            data.forEach((item) => {
              const skillName = (item.name || "").trim();
              if (!skillName || skillName.toLowerCase().includes("spring boot")) return;

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
        console.warn("Using default skills:", err.message);
      });
  }, []);

  return (
    <section id="skills" className="section skills">
      <div className="wrap">
        <div className="section__head">
          <p className="eyebrow">02 / SKILLS</p>
          <h2>What I build with</h2>
        </div>

        <div className="skills__grid">
          {categories.map((group) => (
            <div key={group.id} className="skillgroup">
              <h3>{group.title}</h3>
              <div className="s-tools">
                {group.skills.map((skill) => (
                  <span key={skill} className="s-tool">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
