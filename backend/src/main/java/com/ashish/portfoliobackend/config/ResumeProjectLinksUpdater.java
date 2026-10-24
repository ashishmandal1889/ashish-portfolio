package com.ashish.portfoliobackend.config;

import com.ashish.portfoliobackend.model.Project;
import com.ashish.portfoliobackend.repository.ProjectRepository;
import java.util.List;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

/** Updates only project links already represented in the supplied resume. */
@Component
@ConditionalOnProperty(name = "portfolio.seed.project-links", havingValue = "true")
public class ResumeProjectLinksUpdater implements ApplicationRunner {

    private final ProjectRepository projectRepository;

    public ResumeProjectLinksUpdater(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        List<Project> projects = projectRepository.findAll();
        for (Project project : projects) {
            switch (project.getTitle()) {
                case "MindFlow AI - AI-Powered Reflection Platform" -> {
                    project.setGithubUrl("https://github.com/ashishmandal1889/mindflow-ai");
                    project.setLiveUrl("https://mindflow-ai-9fho.onrender.com");
                }
                case "SentinelSOS - AI-Powered Women Safety System" ->
                        project.setGithubUrl("https://github.com/ashishmandal1889/Sentinel_SOS");
                case "Narrivox AI - AI-Powered YouTube Script Generator" -> {
                    project.setGithubUrl("https://github.com/ashishmandal1889/narrivox-ai");
                    project.setLiveUrl("https://narrivox-ai.vercel.app/");
                }
                case "Wanderlust" -> {
                    project.setGithubUrl("https://github.com/ashishmandal1889/wanderlust");
                    project.setLiveUrl("https://wanderlust-1-ph3e.onrender.com/");
                }
                default -> {
                    continue;
                }
            }
            projectRepository.save(project);
        }

        boolean hasWanderlust = projects.stream()
                .anyMatch(project -> project.getTitle().equals("Wanderlust"));
        if (!hasWanderlust) {
            projectRepository.save(new Project(
                    "Wanderlust",
                    "A full-stack travel and property-listing web application where users can explore listings, create accounts, add properties, and share reviews.",
                    "JavaScript, Node.js, Express, MongoDB",
                    "https://github.com/ashishmandal1889/wanderlust",
                    null
            ));
        }
    }
}
