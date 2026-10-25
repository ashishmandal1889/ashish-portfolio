package com.ashish.portfoliobackend.service.jpa;

import com.ashish.portfoliobackend.dto.ProjectDto;
import com.ashish.portfoliobackend.model.Project;
import com.ashish.portfoliobackend.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class JpaProjectServiceTest {

    private ProjectRepository projectRepository;
    private JpaProjectService jpaProjectService;

    @BeforeEach
    void setUp() {
        projectRepository = mock(ProjectRepository.class);
        jpaProjectService = new JpaProjectService(projectRepository);
    }

    @Test
    void getAll_shouldReturnMappedDtos() {
        Project p = new Project("P1", "D1", "T1", "G1", "L1");
        when(projectRepository.findAll()).thenReturn(List.of(p));

        List<ProjectDto> dtos = jpaProjectService.getAll();

        assertEquals(1, dtos.size());
        assertEquals("P1", dtos.get(0).getTitle());
    }

    @Test
    void create_shouldSaveEntityAndReturnDto() {
        Project saved = new Project("P1", "D1", "T1", "G1", "L1");
        when(projectRepository.save(any(Project.class))).thenReturn(saved);

        ProjectDto input = new ProjectDto(null, "P1", "D1", "T1", "G1", "L1");
        ProjectDto result = jpaProjectService.create(input);

        assertEquals("P1", result.getTitle());
        verify(projectRepository, times(1)).save(any(Project.class));
    }

    @Test
    void update_shouldFindAndUpdateEntity() {
        Project existing = new Project("Old Title", "Old Desc", "Java", "G", "L");
        when(projectRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(projectRepository.save(any(Project.class))).thenAnswer(inv -> inv.getArgument(0));

        ProjectDto update = new ProjectDto(null, "New Title", "New Desc", "Python", "G2", "L2");
        ProjectDto result = jpaProjectService.update("1", update);

        assertEquals("New Title", result.getTitle());
        assertEquals("Python", result.getTechnologies());
    }

    @Test
    void update_shouldThrowIfNotFound() {
        when(projectRepository.findById(99L)).thenReturn(Optional.empty());

        ProjectDto update = new ProjectDto(null, "New Title", "New Desc", "Python", null, null);
        assertThrows(ResponseStatusException.class, () -> jpaProjectService.update("99", update));
    }

    @Test
    void delete_shouldCallRepository() {
        doNothing().when(projectRepository).deleteById(1L);

        assertDoesNotThrow(() -> jpaProjectService.delete("1"));
        verify(projectRepository, times(1)).deleteById(1L);
    }
}
