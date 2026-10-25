package com.ashish.portfoliobackend.config;

import com.ashish.portfoliobackend.dto.ProjectDto;
import com.ashish.portfoliobackend.service.ProjectService;
import java.util.List;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

/** Updates only project links already represented in the supplied resume. */
@Component
@ConditionalOnProperty(name = "portfolio.seed.project-links", havingValue = "true")
public class ResumeProjectLinksUpdater implements ApplicationRunner {

    private final ProjectService projectService;

    public ResumeProjectLinksUpdater(ProjectService projectService) {
        this.projectService = projectService;
    }

    @Override
    public void run(ApplicationArguments args) {
        List<ProjectDto> projects = projectService.getAll();
        for (ProjectDto project : projects) {
            boolean updated = false;
            switch (project.getTitle()) {
                case "MindFlow AI - AI-Powered Reflection Platform" -> {
                    project.setGithubUrl("https://github.com/ashishmandal1889/mindflow-ai");
                    project.setLiveUrl("https://mindflow-ai-9fho.onrender.com");
                    updated = true;
                }
                case "SentinelSOS - AI-Powered Women Safety System" -> {
                    project.setGithubUrl("https://github.com/ashishmandal1889/Sentinel_SOS");
                    updated = true;
                }
                case "Narrivox AI - AI-Powered YouTube Script Generator" -> {
                    project.setGithubUrl("https://github.com/ashishmandal1889/narrivox-ai");
                    project.setLiveUrl("https://narrivox-ai.vercel.app/");
                    updated = true;
                }
                case "Wanderlust" -> {
                    project.setGithubUrl("https://github.com/ashishmandal1889/wanderlust");
                    project.setLiveUrl("https://wanderlust-1-ph3e.onrender.com/");
                    updated = true;
                }
                default -> {
                    continue;
                }
            }
            if (updated && project.getId() != null) {
                projectService.update(project.getId().toString(), project);
            }
        }

        boolean hasWanderlust = projects.stream()
                .anyMatch(project -> "Wanderlust".equals(project.getTitle()));
        if (!hasWanderlust) {
            projectService.create(new ProjectDto(
                    null,
                    "Wanderlust",
                    "A full-stack travel and property-listing web application where users can explore listings, create accounts, add properties, and share reviews.",
                    "JavaScript, Node.js, Express, MongoDB",
                    "https://github.com/ashishmandal1889/wanderlust",
                    null
            ));
        }
    }
}
