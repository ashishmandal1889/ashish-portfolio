import { useEffect, useState } from "react";
import { apiUrl } from "../config/api";

const defaultExperiences = [
  {
    id: "exp-thiranex",
    company: "Thiranex",
    role: "Full Stack Development Intern",
    period: "Jan 2026 – Present",
    location: "Bengaluru, India",
    lede: "Developing full-stack web applications, integrating responsive interfaces with backend services and RESTful APIs.",
    responsibilities: [
      "Working on full-stack development tasks and client-facing interfaces.",
      "Developing personal portfolio website and application modules.",
      "Collaborating on frontend engineering, backend integrations, and version control workflows.",
    ],
    technologies: ["React", "JavaScript", "REST APIs", "CSS3", "Git"],
  },
  {
    id: "exp-code-unnati",
    company: "Code Unnati – SAP & Edunet Foundation",
    role: "Machine Learning Engineer Trainee",
    period: "2026",
    location: "Bengaluru, India",
    lede: "Undertaking Machine Learning Engineer training focusing on core ML algorithms, Python data science stack, and predictive modeling.",
    responsibilities: [
      "Developing foundational and advanced knowledge of Python programming for data science.",
      "Learning Machine Learning and Artificial Intelligence concepts and model architectures.",
      "Exploring data analysis techniques, data pipelines, and practical implementation activities.",
    ],
    technologies: ["Python", "Machine Learning", "Artificial Intelligence", "Data Analysis"],
  },
  {
    id: "exp-aws-infra",
    company: "AWS Cloud Infrastructure & Automation",
    role: "Cloud Infrastructure Architect",
    period: "Feb 2026 – Mar 2026",
    location: "Bengaluru, India",
    lede: "Configured secure and resilient cloud infrastructure on AWS, establishing automated monitoring, alerts, and log archiving.",
    responsibilities: [
      "Configured AWS VPC, EC2 instance environments, and S3 secure storage buckets.",
      "Implemented continuous system monitoring and automated alerts using CloudWatch and SNS.",
      "Automated log archiving and database backup routines using Bash, cron schedules, and Python scripts.",
    ],
    technologies: ["AWS", "EC2", "VPC", "S3", "CloudWatch", "Linux", "Python", "Bash"],
  },
];

export default function Experience() {
  const [experiences, setExperiences] = useState(defaultExperiences);
  const [activeExpId, setActiveExpId] = useState(defaultExperiences[0].id);

  useEffect(() => {
    fetch(apiUrl("/api/experiences"))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load experiences");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item, idx) => {
            const lines = (item.description || "")
              .split("\n")
              .map((l) => l.trim())
              .filter(Boolean);

            const startYear = item.startDate ? new Date(item.startDate).getFullYear() : "";
            const endYear = item.current ? "Present" : item.endDate ? new Date(item.endDate).getFullYear() : "";
            const periodStr = startYear && endYear ? `${startYear} – ${endYear}` : startYear || "Recent";

            return {
              id: item.id ? String(item.id) : `exp-${idx}`,
              company: item.company || "Engineering Role",
              role: item.position || "Developer",
              period: periodStr,
              location: "India",
              lede: lines[0] || "Software development and engineering responsibilities.",
              responsibilities: lines.slice(1).length > 0 ? lines.slice(1) : lines,
              technologies: defaultExperiences[idx]?.technologies || ["Full-Stack", "Git"],
            };
          });

          if (mapped.length > 0) {
            setExperiences(mapped);
            setActiveExpId(mapped[0].id);
          }
        }
      })
      .catch((err) => {
        console.warn("Using default experiences:", err.message);
      });
  }, []);

  return (
    <section id="experience" className="section experience">
      <div className="wrap xp__grid">
        <aside className="xp__index">
          <div className="section__head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">04 / EXPERIENCE</p>
            <h2>Where I've been</h2>
          </div>

          <ol className="xp__list" aria-label="Roles">
            {experiences.map((exp) => {
              const isActive = activeExpId === exp.id;
              return (
                <li key={exp.id}>
                  <button
                    type="button"
                    className="xp__item"
                    data-on={isActive ? "1" : "0"}
                    onClick={() => {
                      setActiveExpId(exp.id);
                      const el = document.getElementById(`job-${exp.id}`);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                  >
                    <span className="xp__bullet" aria-hidden="true" />
                    <span className="xp__item-text">
                      <b>{exp.company}</b>
                      <span>{exp.role} · {exp.period}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        <div className="xp__detail">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className="job"
              id={`job-${exp.id}`}
              data-active={activeExpId === exp.id ? "true" : undefined}
            >
              <p className="job__when">
                <b>{exp.period}</b>
                <span>{exp.location}</span>
              </p>

              <h3>
                {exp.role} <span className="job__at">— {exp.company}</span>
              </h3>

              <div className="job__body">
                <p className="job__lede">{exp.lede}</p>

                <ul className="job__points">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>

                <div className="s-chips">
                  {exp.technologies.map((t) => (
                    <span key={t} className="s-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
