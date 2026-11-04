package com.ashish.portfoliobackend.config;

import com.ashish.portfoliobackend.dto.*;
import com.ashish.portfoliobackend.entity.CredentialType;
import com.ashish.portfoliobackend.service.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class PortfolioDataInitializer {

    @Bean
    CommandLineRunner initPortfolioData(
            AboutService aboutService,
            ContactService contactService,
            CredentialService credentialService,
            EducationService educationService,
            ExperienceService experienceService,
            ProjectService projectService,
            SkillService skillService
    ) {
        return args -> {
            // 1. Initialize About if empty
            if (aboutService.getAll().isEmpty()) {
                aboutService.create(new AboutDto(
                        null,
                        "About Me",
                        "I am a Computer Science Engineering undergraduate interested in software engineering, full-stack development, and Artificial Intelligence. I enjoy building practical applications and learning technologies that solve real-world problems."
                ));
            }

            // 2. Initialize Contact if empty
            if (contactService.getAll().isEmpty()) {
                ContactDto contact = new ContactDto();
                contact.setEmail("ashishmandal1889@gmail.com");
                contact.setPhone("+91-9113458404");
                contact.setLocation("Bengaluru, Karnataka, India");
                contact.setGithub("https://github.com/ashishmandal1889");
                contact.setLinkedIn("https://www.linkedin.com/in/ashish-kumar-a802192a0/");
                contact.setLeetCode("https://leetcode.com/u/ashishmandal1889/");
                contactService.create(contact);
            }

            // 3. Initialize Education if empty
            if (educationService.getAll().isEmpty()) {
                educationService.create(new EducationDto(
                        null,
                        "SEA College of Engineering & Technology",
                        "Bachelor of Engineering – Computer Science and Engineering",
                        "Computer Science and Engineering",
                        "CGPA: 7.8/10 | Visvesvaraya Technological University (VTU)",
                        LocalDate.of(2023, 1, 1),
                        LocalDate.of(2027, 1, 1),
                        true
                ));
            }

            // 4. Initialize Projects if empty
            if (projectService.getAll().isEmpty()) {
                List<ProjectDto> defaultProjects = List.of(
                        new ProjectDto(
                                null,
                                "SentinelSOS",
                                "A safety application concept with emergency SOS, location tracking, voice-based alerts, and ML-based area risk estimation.",
                                "Python, FastAPI, PostgreSQL, Scikit-learn, React",
                                "https://github.com/ashishmandal1889/Sentinel_SOS",
                                null
                        ),
                        new ProjectDto(
                                null,
                                "MindFlow AI",
                                "An application designed to support personal reflection and growth using AI-powered features.",
                                "Node.js, Express.js, Firebase Authentication, Firestore, Gemini API, Docker",
                                "https://github.com/ashishmandal1889/mindflow-ai",
                                "https://mindflow-ai-9fho.onrender.com"
                        ),
                        new ProjectDto(
                                null,
                                "Wanderlust",
                                "An Airbnb-style application for exploring and managing property listings.",
                                "JavaScript, Node.js, Express.js, MongoDB",
                                "https://github.com/ashishmandal1889/wanderlust",
                                "https://wanderlust-1-ph3e.onrender.com/"
                        ),
                        new ProjectDto(
                                null,
                                "Narrivox AI",
                                "An AI application that helps generate YouTube video scripts.",
                                "JavaScript, AI API Integration, Web Development",
                                "https://github.com/ashishmandal1889/narrivox-ai",
                                "https://narrivox-ai.vercel.app/"
                        ),
                        new ProjectDto(
                                null,
                                "AWS Cloud Infrastructure & Monitoring Automation",
                                "Configured AWS infrastructure, monitoring, alerting, automated log archiving, and backups.",
                                "AWS, EC2, VPC, S3, IAM, CloudWatch, SNS, Linux, Python, Bash",
                                "https://github.com/ashishmandal1889/aws-cloud-infrastructure-project",
                                "http://ashish-aws-project.duckdns.org/"
                        )
                );

                for (ProjectDto defProj : defaultProjects) {
                    projectService.create(defProj);
                }
            }

            // 5. Initialize Experiences if empty
            if (experienceService.getAll().isEmpty()) {
                List<ExperienceDto> defaultExperiences = List.of(
                        new ExperienceDto(
                                null,
                                "Thiranex",
                                "Full Stack Development Intern",
                                "Working on full-stack development tasks.\nDeveloping a personal portfolio website.\nWorking with frontend and backend technologies.",
                                LocalDate.of(2026, 1, 1),
                                null,
                                true
                        ),
                        new ExperienceDto(
                                null,
                                "Code Unnati – SAP & Edunet Foundation",
                                "Machine Learning Engineer Trainee",
                                "Developing foundational knowledge of Python programming.\nLearning Machine Learning and Artificial Intelligence concepts.\nExploring data analysis and practical learning activities.",
                                null,
                                null,
                                false
                        ),
                        new ExperienceDto(
                                null,
                                "AWS Cloud Infrastructure & Monitoring Automation",
                                "Cloud Infrastructure & Automation Architect",
                                "Configured AWS VPC, EC2, and S3 infrastructure.\nImplemented monitoring and alerts using CloudWatch and SNS.\nAutomated log archiving and backups using Bash, cron, and Python.",
                                LocalDate.of(2026, 2, 1),
                                LocalDate.of(2026, 3, 31),
                                false
                        )
                );

                for (ExperienceDto defExp : defaultExperiences) {
                    experienceService.create(defExp);
                }
            }

            // 6. Initialize Skills non-destructively
            skillService.initDefaultSkills();

            // 7. Initialize Credentials if empty
            if (credentialService.getAll().isEmpty()) {
                List<CredentialDto> defaultCredentials = List.of(
                        new CredentialDto(null, "Artificial Intelligence Fundamentals", CredentialType.CERTIFICATE, "IBM SkillsBuild", null, LocalDate.of(2024, 9, 4), null),
                        new CredentialDto(null, "Building RAG Apps Using MongoDB", CredentialType.CERTIFICATE, "MongoDB", null, LocalDate.of(2026, 10, 22), null),
                        new CredentialDto(null, "Data Analytics Essentials", CredentialType.CERTIFICATE, "Coursera", null, LocalDate.of(2023, 7, 28), null),
                        new CredentialDto(null, "Observability for AI Agents", CredentialType.CERTIFICATE, "MongoDB", null, LocalDate.of(2026, 10, 22), null),
                        new CredentialDto(null, "Code Unnati Program", CredentialType.CERTIFICATE, "SAP and Edunet Foundation", "Machine Learning training and exposure to emerging technologies.", null, null),
                        new CredentialDto(null, "100+ DSA Problems Solved", CredentialType.ACHIEVEMENT, "LeetCode", "Solved over 100 data structures and algorithms problems.", null, null),
                        new CredentialDto(null, "Smart Waste Monitoring System for Sustainable Smart Cities", CredentialType.ACHIEVEMENT, "International Journal Research Publication Analysis (IJRPA)", "Published in Volume 2, Issue 1, January 2026. DOI: 101555/ijrpa.5184", LocalDate.of(2026, 1, 1), null),
                        new CredentialDto(null, "Hackathon Contributions", CredentialType.ACHIEVEMENT, null, "Participated in Aptos Ctrl+Move and KRNL Dekoded hackathons; developed MindFlow AI during a Hack2Skill hackathon.", null, null)
                );

                for (CredentialDto defCred : defaultCredentials) {
                    credentialService.create(defCred);
                }
            }
        };
    }
}
