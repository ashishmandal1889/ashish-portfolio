package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.dto.ProjectDto;
import com.ashish.portfoliobackend.service.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class ProjectControllerTest {

    private ProjectService projectService;
    private ProjectController projectController;

    @BeforeEach
    void setUp() {
        projectService = mock(ProjectService.class);
        projectController = new ProjectController(projectService);
    }

    @Test
    void getAllProjects_shouldReturnListOfProjects() {
        ProjectDto p1 = new ProjectDto("1", "Title 1", "Desc 1", "Tech 1", "http://github.com/1", "http://live.com/1");
        ProjectDto p2 = new ProjectDto("2", "Title 2", "Desc 2", "Tech 2", "http://github.com/2", null);
        when(projectService.getAll()).thenReturn(List.of(p1, p2));

        List<ProjectDto> result = projectController.getAllProjects();

        assertEquals(2, result.size());
        assertEquals("Title 1", result.get(0).getTitle());
        verify(projectService, times(1)).getAll();
    }

    @Test
    void createProject_shouldDelegateToService() {
        ProjectDto request = new ProjectDto(null, "New Project", "New Desc", "React", null, null);
        ProjectDto saved = new ProjectDto("101", "New Project", "New Desc", "React", null, null);
        when(projectService.create(any(ProjectDto.class))).thenReturn(saved);

        ProjectDto result = projectController.createProject(request);

        assertNotNull(result.getId());
        assertEquals("New Project", result.getTitle());
        verify(projectService, times(1)).create(request);
    }

    @Test
    void updateProject_shouldDelegateToServiceWithId() {
        ProjectDto update = new ProjectDto(null, "Updated Title", "Updated Desc", "FastAPI", null, null);
        ProjectDto updated = new ProjectDto("101", "Updated Title", "Updated Desc", "FastAPI", null, null);
        when(projectService.update(eq("101"), any(ProjectDto.class))).thenReturn(updated);

        ProjectDto result = projectController.updateProject("101", update);

        assertEquals("Updated Title", result.getTitle());
        verify(projectService, times(1)).update("101", update);
    }

    @Test
    void deleteProject_shouldDelegateToService() {
        doNothing().when(projectService).delete("101");

        assertDoesNotThrow(() -> projectController.deleteProject("101"));
        verify(projectService, times(1)).delete("101");
    }
}
