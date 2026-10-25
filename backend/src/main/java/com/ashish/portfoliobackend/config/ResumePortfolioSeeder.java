package com.ashish.portfoliobackend.config;

import com.ashish.portfoliobackend.dto.*;
import com.ashish.portfoliobackend.entity.CredentialType;
import com.ashish.portfoliobackend.service.*;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

/**
 * One-time, opt-in replacement of portfolio content with the supplied resume.
 * Enable it only for a single startup with portfolio.seed.resume=true.
 */
@Component
@ConditionalOnProperty(name = "portfolio.seed.resume", havingValue = "true")
public class ResumePortfolioSeeder implements ApplicationRunner {

    private final AboutService aboutService;
    private final ContactService contactService;
    private final CredentialService credentialService;
    private final EducationService educationService;
    private final ExperienceService experienceService;
    private final ProjectService projectService;
    private final SkillService skillService;

    public ResumePortfolioSeeder(
            AboutService aboutService,
            ContactService contactService,
            CredentialService credentialService,
            EducationService educationService,
            ExperienceService experienceService,
            ProjectService projectService,
            SkillService skillService
    ) {
        this.aboutService = aboutService;
        this.contactService = contactService;
        this.credentialService = credentialService;
        this.educationService = educationService;
        this.experienceService = experienceService;
        this.projectService = projectService;
        this.skillService = skillService;
    }

    @Override
    public void run(ApplicationArguments args) {
        credentialService.getAll().forEach(item -> credentialService.delete(item.getId().toString()));
        experienceService.getAll().forEach(item -> experienceService.delete(item.getId().toString()));
        educationService.getAll().forEach(item -> educationService.delete(item.getId().toString()));
        projectService.getAll().forEach(item -> projectService.delete(item.getId().toString()));
        skillService.getAll().forEach(item -> skillService.delete(item.getId().toString()));
        contactService.getAll().forEach(item -> contactService.delete(item.getId().toString()));
        aboutService.getAll().forEach(item -> aboutService.delete(item.getId().toString()));

        aboutService.create(new AboutDto(
                null,
                "About Me",
                "Computer Science undergraduate graduating in 2027, focused on AI/ML and Generative AI. "
                        + "I build LLM-powered applications, reliable backend APIs, and full-stack projects that solve practical problems."
        ));

        ContactDto contact = new ContactDto();
        contact.setEmail("ashishmandal1889@gmail.com");
        contact.setPhone("+91-9113458404");
        contact.setLocation("Bengaluru, Karnataka");
        contact.setGithub("https://github.com/ashishmandal1889");
        contact.setLinkedIn("https://www.linkedin.com/in/ashish-kumar-a802192a0/");
        contact.setLeetCode("https://leetcode.com/u/ashishmandal1889/");
        contactService.create(contact);

        List<ProjectDto> projects = List.of(
                new ProjectDto(
                        null,
                        "MindFlow AI - AI-Powered Reflection Platform",
                        "Built an AI-powered reflection platform using Gemini to generate contextual responses, analyze sentiment, create actionable SMART goals, and retain user-specific conversation history.",
                        "Node.js, Express.js, JavaScript, Firebase, Firestore, Gemini API, Docker",
                        "https://github.com/ashishmandal1889/mindflow-ai",
                        "https://mindflow-ai-9fho.onrender.com"
                ),
                new ProjectDto(
                        null,
                        "SentinelSOS - AI-Powered Women Safety System",
                        "Contributed to an emergency-safety application with SOS alerts, trusted contacts, location sharing, ML-based area risk analysis, FastAPI integration, automated API testing, and CI workflows.",
                        "Python, FastAPI, React Native, PostgreSQL, Pytest, Docker, GitHub Actions",
                        "https://github.com/ashishmandal1889/Sentinel_SOS",
                        null
                ),
                new ProjectDto(
                        null,
                        "Narrivox AI - AI-Powered YouTube Script Generator",
                        "Developed a web application that creates structured, topic-relevant YouTube video scripts from user-provided topics through a generative AI API.",
                        "Generative AI, API Integration, Web Application",
                        "https://github.com/ashishmandal1889/narrivox-ai",
                        "https://narrivox-ai.vercel.app/"
                )
        );
        for (ProjectDto project : projects) {
            projectService.create(project);
        }

        List<String> skills = List.of(
                "Python", "Java", "JavaScript", "SQL", "Data Structures and Algorithms", "OOP", "DBMS",
                "Machine Learning", "Deep Learning fundamentals", "Statistics", "NumPy", "Pandas", "scikit-learn",
                "LLMs", "Gemini API", "OpenAI API", "Prompt Engineering", "LLM-powered applications", "Agentic AI fundamentals",
                "React", "Node.js", "Express.js", "FastAPI", "REST APIs", "PostgreSQL", "MySQL", "MongoDB",
                "Firebase Authentication", "Firestore", "AWS fundamentals", "Cloud Computing", "Docker", "Git", "GitHub", "GitHub Actions fundamentals", "MLOps fundamentals"
        );
        for (String skillName : skills) {
            skillService.create(new SkillDto(null, skillName));
        }

        educationService.create(new EducationDto(
                null,
                "SEA College of Engineering and Technology",
                "Bachelor of Engineering",
                "Computer Science and Engineering",
                "CGPA: 7.8/10 | Visvesvaraya Technological University (VTU)",
                LocalDate.of(2023, 1, 1),
                LocalDate.of(2027, 1, 1),
                false
        ));

        List<CredentialDto> credentials = List.of(
                new CredentialDto(null, "Artificial Intelligence Fundamentals", CredentialType.CERTIFICATE, "IBM SkillsBuild", null, LocalDate.of(2024, 9, 4), null),
                new CredentialDto(null, "Building RAG Apps Using MongoDB", CredentialType.CERTIFICATE, "MongoDB", null, LocalDate.of(2026, 10, 22), null),
                new CredentialDto(null, "Data Analytics Essentials", CredentialType.CERTIFICATE, "Coursera", null, LocalDate.of(2023, 7, 28), null),
                new CredentialDto(null, "Observability for AI Agents", CredentialType.CERTIFICATE, "MongoDB", null, LocalDate.of(2026, 10, 22), null),
                new CredentialDto(null, "Code Unnati Program", CredentialType.CERTIFICATE, "SAP and Edunet Foundation", "Machine Learning training and exposure to emerging technologies.", null, null),
                new CredentialDto(null, "100+ DSA Problems Solved", CredentialType.ACHIEVEMENT, "LeetCode", "Solved over 100 data structures and algorithms problems.", null, null),
                new CredentialDto(null, "Smart Waste Monitoring System for Sustainable Smart Cities", CredentialType.ACHIEVEMENT, "International Journal Research Publication Analysis (IJRPA)", "Published in Volume 2, Issue 1, January 2026. DOI: 101555/ijrpa.5184", LocalDate.of(2026, 1, 1), null),
                new CredentialDto(null, "Hackathon Contributions", CredentialType.ACHIEVEMENT, null, "Participated in Aptos Ctrl+Move and KRNL Dekoded hackathons; developed MindFlow AI during a Hack2Skill hackathon.", null, null)
        );
        for (CredentialDto credential : credentials) {
            credentialService.create(credential);
        }
    }
}
