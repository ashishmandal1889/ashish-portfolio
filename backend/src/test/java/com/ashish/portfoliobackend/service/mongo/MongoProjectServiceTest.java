package com.ashish.portfoliobackend.service.mongo;

import com.ashish.portfoliobackend.document.ProjectDocument;
import com.ashish.portfoliobackend.dto.ProjectDto;
import com.ashish.portfoliobackend.repository.mongo.MongoProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class MongoProjectServiceTest {

    private MongoProjectRepository mongoProjectRepository;
    private MongoProjectService mongoProjectService;

    @BeforeEach
    void setUp() {
        mongoProjectRepository = mock(MongoProjectRepository.class);
        mongoProjectService = new MongoProjectService(mongoProjectRepository);
    }

    @Test
    void getAll_shouldReturnMappedDtos() {
        ProjectDocument doc = new ProjectDocument("65f8a1", "Mongo Project", "Desc", "FastAPI", "G", "L");
        when(mongoProjectRepository.findAll()).thenReturn(List.of(doc));

        List<ProjectDto> dtos = mongoProjectService.getAll();

        assertEquals(1, dtos.size());
        assertEquals("65f8a1", dtos.get(0).getId());
        assertEquals("Mongo Project", dtos.get(0).getTitle());
    }

    @Test
    void create_shouldSaveDocumentAndReturnDto() {
        ProjectDocument saved = new ProjectDocument("65f8a2", "New Project", "Desc", "Docker", null, null);
        when(mongoProjectRepository.save(any(ProjectDocument.class))).thenReturn(saved);

        ProjectDto input = new ProjectDto(null, "New Project", "Desc", "Docker", null, null);
        ProjectDto result = mongoProjectService.create(input);

        assertEquals("65f8a2", result.getId());
        assertEquals("New Project", result.getTitle());
        verify(mongoProjectRepository, times(1)).save(any(ProjectDocument.class));
    }

    @Test
    void update_shouldFindAndUpdateDocument() {
        ProjectDocument existing = new ProjectDocument("65f8a3", "Old", "Old", "Old", null, null);
        when(mongoProjectRepository.findById("65f8a3")).thenReturn(Optional.of(existing));
        when(mongoProjectRepository.save(any(ProjectDocument.class))).thenAnswer(inv -> inv.getArgument(0));

        ProjectDto update = new ProjectDto(null, "New Title", "New Desc", "Node.js", "G", "L");
        ProjectDto result = mongoProjectService.update("65f8a3", update);

        assertEquals("New Title", result.getTitle());
        assertEquals("Node.js", result.getTechnologies());
    }

    @Test
    void update_shouldThrowIfNotFound() {
        when(mongoProjectRepository.findById("non-existent")).thenReturn(Optional.empty());

        ProjectDto update = new ProjectDto(null, "Title", "Desc", "Tech", null, null);
        assertThrows(ResponseStatusException.class, () -> mongoProjectService.update("non-existent", update));
    }

    @Test
    void delete_shouldCallRepository() {
        doNothing().when(mongoProjectRepository).deleteById("65f8a4");

        assertDoesNotThrow(() -> mongoProjectService.delete("65f8a4"));
        verify(mongoProjectRepository, times(1)).deleteById("65f8a4");
    }
}
