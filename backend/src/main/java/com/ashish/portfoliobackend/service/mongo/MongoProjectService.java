package com.ashish.portfoliobackend.service.mongo;

import com.ashish.portfoliobackend.document.ProjectDocument;
import com.ashish.portfoliobackend.dto.ProjectDto;
import com.ashish.portfoliobackend.repository.mongo.MongoProjectRepository;
import com.ashish.portfoliobackend.service.ProjectService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Profile("prod")
public class MongoProjectService implements ProjectService {

    private final MongoProjectRepository projectRepository;

    public MongoProjectService(MongoProjectRepository projectRepository) {
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
        ProjectDocument document = toDocument(dto);
        ProjectDocument saved = projectRepository.save(document);
        return toDto(saved);
    }

    @Override
    public ProjectDto update(String id, ProjectDto dto) {
        ProjectDocument existing = projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Project not found"));

        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setTechnologies(dto.getTechnologies());
        existing.setGithubUrl(dto.getGithubUrl());
        existing.setLiveUrl(dto.getLiveUrl());

        ProjectDocument saved = projectRepository.save(existing);
        return toDto(saved);
    }

    @Override
    public void delete(String id) {
        projectRepository.deleteById(id);
    }

    private ProjectDto toDto(ProjectDocument document) {
        return new ProjectDto(
                document.getId(),
                document.getTitle(),
                document.getDescription(),
                document.getTechnologies(),
                document.getGithubUrl(),
                document.getLiveUrl()
        );
    }

    private ProjectDocument toDocument(ProjectDto dto) {
        ProjectDocument document = new ProjectDocument();
        if (dto.getId() != null) {
            document.setId(dto.getId().toString());
        }
        document.setTitle(dto.getTitle());
        document.setDescription(dto.getDescription());
        document.setTechnologies(dto.getTechnologies());
        document.setGithubUrl(dto.getGithubUrl());
        document.setLiveUrl(dto.getLiveUrl());
        return document;
    }
}
