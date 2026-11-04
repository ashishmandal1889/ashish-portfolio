package com.ashish.portfoliobackend.service.mongo;

import com.ashish.portfoliobackend.document.SkillDocument;
import com.ashish.portfoliobackend.dto.SkillDto;
import com.ashish.portfoliobackend.repository.mongo.MongoSkillRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class MongoSkillServiceTest {

    private MongoSkillRepository mongoSkillRepository;
    private MongoSkillService mongoSkillService;

    @BeforeEach
    void setUp() {
        mongoSkillRepository = mock(MongoSkillRepository.class);
        mongoSkillService = new MongoSkillService(mongoSkillRepository);
    }

    @Test
    void getAll_shouldReturnMappedDtos() {
        SkillDocument doc = new SkillDocument("skill-1", "Java");
        when(mongoSkillRepository.findAll()).thenReturn(List.of(doc));

        List<SkillDto> dtos = mongoSkillService.getAll();

        assertEquals(1, dtos.size());
        assertEquals("skill-1", dtos.get(0).getId());
        assertEquals("Java", dtos.get(0).getName());
    }

    @Test
    void create_shouldSaveDocumentAndReturnDto() {
        when(mongoSkillRepository.findByNameIgnoreCase("Docker")).thenReturn(Optional.empty());
        SkillDocument saved = new SkillDocument("skill-2", "Docker");
        when(mongoSkillRepository.save(any(SkillDocument.class))).thenReturn(saved);

        SkillDto input = new SkillDto(null, "Docker");
        SkillDto result = mongoSkillService.create(input);

        assertEquals("skill-2", result.getId());
        assertEquals("Docker", result.getName());
        verify(mongoSkillRepository, times(1)).save(any(SkillDocument.class));
    }

    @Test
    void create_shouldReturnExistingIfDuplicateName() {
        SkillDocument existing = new SkillDocument("skill-existing", "Java");
        when(mongoSkillRepository.findByNameIgnoreCase("Java")).thenReturn(Optional.of(existing));

        SkillDto input = new SkillDto(null, "Java");
        SkillDto result = mongoSkillService.create(input);

        assertEquals("skill-existing", result.getId());
        assertEquals("Java", result.getName());
        verify(mongoSkillRepository, never()).save(any(SkillDocument.class));
    }

    @Test
    void create_shouldThrowIfNameEmpty() {
        SkillDto input = new SkillDto(null, "   ");
        assertThrows(ResponseStatusException.class, () -> mongoSkillService.create(input));
    }

    @Test
    void update_shouldFindAndUpdateDocument() {
        SkillDocument existing = new SkillDocument("skill-3", "OldName");
        when(mongoSkillRepository.findById("skill-3")).thenReturn(Optional.of(existing));
        when(mongoSkillRepository.save(any(SkillDocument.class))).thenAnswer(inv -> inv.getArgument(0));

        SkillDto update = new SkillDto(null, "NewName");
        SkillDto result = mongoSkillService.update("skill-3", update);

        assertEquals("NewName", result.getName());
    }

    @Test
    void delete_shouldCallRepository() {
        doNothing().when(mongoSkillRepository).deleteById("skill-4");

        assertDoesNotThrow(() -> mongoSkillService.delete("skill-4"));
        verify(mongoSkillRepository, times(1)).deleteById("skill-4");
    }

    @Test
    void initDefaultSkills_shouldOnlyInsertMissingSkills() {
        when(mongoSkillRepository.findByNameIgnoreCase(anyString())).thenReturn(Optional.empty());
        when(mongoSkillRepository.save(any(SkillDocument.class))).thenAnswer(inv -> inv.getArgument(0));

        mongoSkillService.initDefaultSkills();

        verify(mongoSkillRepository, atLeastOnce()).save(any(SkillDocument.class));
    }
}
