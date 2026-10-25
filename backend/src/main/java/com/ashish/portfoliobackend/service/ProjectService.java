package com.ashish.portfoliobackend.service;

import com.ashish.portfoliobackend.dto.ProjectDto;
import java.util.List;

public interface ProjectService {

    List<ProjectDto> getAll();

    ProjectDto create(ProjectDto dto);

    ProjectDto update(String id, ProjectDto dto);

    void delete(String id);
}
