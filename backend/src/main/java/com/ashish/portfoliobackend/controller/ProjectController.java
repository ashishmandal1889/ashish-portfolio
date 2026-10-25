package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.dto.ProjectDto;
import com.ashish.portfoliobackend.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<ProjectDto> getAllProjects() {
        return projectService.getAll();
    }

    @PostMapping
    public ProjectDto createProject(@RequestBody ProjectDto project) {
        return projectService.create(project);
    }

    @PutMapping("/{id}")
    public ProjectDto updateProject(
            @PathVariable String id,
            @RequestBody ProjectDto project
    ) {
        return projectService.update(id, project);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable String id) {
        projectService.delete(id);
    }
}
