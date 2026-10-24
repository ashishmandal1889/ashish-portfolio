package com.ashish.portfoliobackend.config;

import com.ashish.portfoliobackend.entity.Credential;
import com.ashish.portfoliobackend.entity.CredentialType;
import com.ashish.portfoliobackend.model.About;
import com.ashish.portfoliobackend.model.Contact;
import com.ashish.portfoliobackend.model.Education;
import com.ashish.portfoliobackend.model.Project;
import com.ashish.portfoliobackend.model.Skill;
import com.ashish.portfoliobackend.repository.AboutRepository;
import com.ashish.portfoliobackend.repository.ContactRepository;
import com.ashish.portfoliobackend.repository.CredentialRepository;
import com.ashish.portfoliobackend.repository.EducationRepository;
import com.ashish.portfoliobackend.repository.ExperienceRepository;
import com.ashish.portfoliobackend.repository.ProjectRepository;
import com.ashish.portfoliobackend.repository.SkillRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

/**
 * One-time, opt-in replacement of portfolio content with the supplied resume.
 * Enable it only for a single startup with portfolio.seed.resume=true.
 */
@Component
@ConditionalOnProperty(name = "portfolio.seed.resume", havingValue = "true")
public class ResumePortfolioSeeder implements ApplicationRunner {

    private final AboutRepository aboutRepository;
    private final ContactRepository contactRepository;
    private final CredentialRepository credentialRepository;
    private final EducationRepository educationRepository;
    private final ExperienceRepository experienceRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;

    public ResumePortfolioSeeder(
            AboutRepository aboutRepository,
            ContactRepository contactRepository,
            CredentialRepository credentialRepository,
            EducationRepository educationRepository,
            ExperienceRepository experienceRepository,
            ProjectRepository projectRepository,
            SkillRepository skillRepository
    ) {
        this.aboutRepository = aboutRepository;
        this.contactRepository = contactRepository;
        this.credentialRepository = credentialRepository;
        this.educationRepository = educationRepository;
        this.experienceRepository = experienceRepository;
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        credentialRepository.deleteAll();
        experienceRepository.deleteAll();
        educationRepository.deleteAll();
        projectRepository.deleteAll();
        skillRepository.deleteAll();
        contactRepository.deleteAll();
        aboutRepository.deleteAll();

        aboutRepository.save(new About(
                "About Me",
                "Computer Science undergraduate graduating in 2027, focused on AI/ML and Generative AI. "
                        + "I build LLM-powered applications, reliable backend APIs, and full-stack projects that solve practical problems."
        ));

        Contact contact = new Contact();
        contact.setEmail("ashishmandal1889@gmail.com");
        contact.setPhone("+91-9113458404");
        contact.setLocation("Bengaluru, Karnataka");
        contact.setGithub("https://github.com/ashishmandal1889");
        contact.setLinkedIn("https://www.linkedin.com/in/ashish-kumar-a802192a0/");
        contact.setLeetCode("https://leetcode.com/u/ashishmandal1889/");
        contactRepository.save(contact);

        projectRepository.saveAll(List.of(
                new Project(
                        "MindFlow AI - AI-Powered Reflection Platform",
                        "Built an AI-powered reflection platform using Gemini to generate contextual responses, analyze sentiment, create actionable SMART goals, and retain user-specific conversation history.",
                        "Node.js, Express.js, JavaScript, Firebase, Firestore, Gemini API, Docker",
                        "https://github.com/ashishmandal1889/mindflow-ai",
                        "https://mindflow-ai-9fho.onrender.com"
                ),
                new Project(
                        "SentinelSOS - AI-Powered Women Safety System",
                        "Contributed to an emergency-safety application with SOS alerts, trusted contacts, location sharing, ML-based area risk analysis, FastAPI integration, automated API testing, and CI workflows.",
                        "Python, FastAPI, React Native, PostgreSQL, Pytest, Docker, GitHub Actions",
                        "https://github.com/ashishmandal1889/Sentinel_SOS",
                        null
                ),
                new Project(
                        "Narrivox AI - AI-Powered YouTube Script Generator",
                        "Developed a web application that creates structured, topic-relevant YouTube video scripts from user-provided topics through a generative AI API.",
                        "Generative AI, API Integration, Web Application",
                        "https://github.com/ashishmandal1889/narrivox-ai",
                        "https://narrivox-ai.vercel.app/"
                )
        ));

        skillRepository.saveAll(List.of(
                "Python", "Java", "JavaScript", "SQL", "Data Structures and Algorithms", "OOP", "DBMS",
                "Machine Learning", "Deep Learning fundamentals", "Statistics", "NumPy", "Pandas", "scikit-learn",
                "LLMs", "Gemini API", "OpenAI API", "Prompt Engineering", "LLM-powered applications", "Agentic AI fundamentals",
                "React", "Node.js", "Express.js", "FastAPI", "REST APIs", "PostgreSQL", "MySQL", "MongoDB",
                "Firebase Authentication", "Firestore", "AWS fundamentals", "Cloud Computing", "Docker", "Git", "GitHub", "GitHub Actions fundamentals", "MLOps fundamentals"
        ).stream().map(Skill::new).toList());

        educationRepository.save(new Education(
                "SEA College of Engineering and Technology",
                "Bachelor of Engineering",
                "Computer Science and Engineering",
                "CGPA: 7.8/10 | Visvesvaraya Technological University (VTU)",
                LocalDate.of(2023, 1, 1),
                LocalDate.of(2027, 1, 1),
                false
        ));

        credentialRepository.saveAll(List.of(
                new Credential("Artificial Intelligence Fundamentals", CredentialType.CERTIFICATE, "IBM SkillsBuild", null, LocalDate.of(2024, 9, 4), null),
                new Credential("Building RAG Apps Using MongoDB", CredentialType.CERTIFICATE, "MongoDB", null, LocalDate.of(2026, 10, 22), null),
                new Credential("Data Analytics Essentials", CredentialType.CERTIFICATE, "Coursera", null, LocalDate.of(2023, 7, 28), null),
                new Credential("Observability for AI Agents", CredentialType.CERTIFICATE, "MongoDB", null, LocalDate.of(2026, 10, 22), null),
                new Credential("Code Unnati Program", CredentialType.CERTIFICATE, "SAP and Edunet Foundation", "Machine Learning training and exposure to emerging technologies.", null, null),
                new Credential("100+ DSA Problems Solved", CredentialType.ACHIEVEMENT, "LeetCode", "Solved over 100 data structures and algorithms problems.", null, null),
                new Credential("Smart Waste Monitoring System for Sustainable Smart Cities", CredentialType.ACHIEVEMENT, "International Journal Research Publication Analysis (IJRPA)", "Published in Volume 2, Issue 1, January 2026. DOI: 101555/ijrpa.5184", LocalDate.of(2026, 1, 1), null),
                new Credential("Hackathon Contributions", CredentialType.ACHIEVEMENT, null, "Participated in Aptos Ctrl+Move and KRNL Dekoded hackathons; developed MindFlow AI during a Hack2Skill hackathon.", null, null)
        ));
    }
}
