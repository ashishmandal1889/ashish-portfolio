package com.ashish.portfoliobackend.service.jpa;

import com.ashish.portfoliobackend.dto.ProjectDto;
import com.ashish.portfoliobackend.model.Project;
import com.ashish.portfoliobackend.repository.ProjectRepository;
import com.ashish.portfoliobackend.service.ProjectService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Profile("local")
public class JpaProjectService implements ProjectService {

    private final ProjectRepository projectRepository;

    public JpaProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public List<ProjectDto> getAll() {
        return projectRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public ProjectDto create(ProjectDto dto) {
        Project entity = toEntity(dto);
        Project saved = projectRepository.save(entity);
        return toDto(saved);
    }

    @Override
    public ProjectDto update(String id, ProjectDto dto) {
        Long numericId = parseId(id);
        Project existing = projectRepository.findById(numericId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Project not found"));

        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setTechnologies(dto.getTechnologies());
        existing.setGithubUrl(dto.getGithubUrl());
        existing.setLiveUrl(dto.getLiveUrl());

        Project saved = projectRepository.save(existing);
        return toDto(saved);
    }

    @Override
    public void delete(String id) {
        Long numericId = parseId(id);
        projectRepository.deleteById(numericId);
    }

    private ProjectDto toDto(Project entity) {
        return new ProjectDto(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getTechnologies(),
                entity.getGithubUrl(),
                entity.getLiveUrl()
        );
    }

    private Project toEntity(ProjectDto dto) {
        return new Project(
                dto.getTitle(),
                dto.getDescription(),
                dto.getTechnologies(),
                dto.getGithubUrl(),
                dto.getLiveUrl()
        );
    }

    private Long parseId(String id) {
        try {
            return Long.parseLong(id);
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid ID format: " + id);
        }
    }
}
