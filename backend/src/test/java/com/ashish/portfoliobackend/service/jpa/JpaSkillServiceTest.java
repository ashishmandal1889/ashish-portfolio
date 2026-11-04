package com.ashish.portfoliobackend.service.jpa;

import com.ashish.portfoliobackend.dto.SkillDto;
import com.ashish.portfoliobackend.model.Skill;
import com.ashish.portfoliobackend.repository.SkillRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class JpaSkillServiceTest {

    private SkillRepository skillRepository;
    private JpaSkillService jpaSkillService;

    @BeforeEach
    void setUp() {
        skillRepository = mock(SkillRepository.class);
        jpaSkillService = new JpaSkillService(skillRepository);
    }

    @Test
    void getAll_shouldReturnMappedDtos() {
        Skill entity = new Skill(1L, "Python");
        when(skillRepository.findAll()).thenReturn(List.of(entity));

        List<SkillDto> dtos = jpaSkillService.getAll();

        assertEquals(1, dtos.size());
        assertEquals(1L, dtos.get(0).getId());
        assertEquals("Python", dtos.get(0).getName());
    }

    @Test
    void create_shouldSaveEntityAndReturnDto() {
        when(skillRepository.findByNameIgnoreCase("Docker")).thenReturn(Optional.empty());
        Skill saved = new Skill(2L, "Docker");
        when(skillRepository.save(any(Skill.class))).thenReturn(saved);

        SkillDto input = new SkillDto(null, "Docker");
        SkillDto result = jpaSkillService.create(input);

        assertEquals(2L, result.getId());
        assertEquals("Docker", result.getName());
        verify(skillRepository, times(1)).save(any(Skill.class));
    }

    @Test
    void create_shouldReturnExistingIfDuplicateName() {
        Skill existing = new Skill(99L, "Java");
        when(skillRepository.findByNameIgnoreCase("Java")).thenReturn(Optional.of(existing));

        SkillDto input = new SkillDto(null, "Java");
        SkillDto result = jpaSkillService.create(input);

        assertEquals(99L, result.getId());
        assertEquals("Java", result.getName());
        verify(skillRepository, never()).save(any(Skill.class));
    }

    @Test
    void create_shouldThrowIfNameEmpty() {
        SkillDto input = new SkillDto(null, "   ");
        assertThrows(ResponseStatusException.class, () -> jpaSkillService.create(input));
    }

    @Test
    void update_shouldFindAndUpdateEntity() {
        Skill existing = new Skill(3L, "OldName");
        when(skillRepository.findById(3L)).thenReturn(Optional.of(existing));
        when(skillRepository.save(any(Skill.class))).thenAnswer(inv -> inv.getArgument(0));

        SkillDto update = new SkillDto(null, "NewName");
        SkillDto result = jpaSkillService.update("3", update);

        assertEquals("NewName", result.getName());
    }

    @Test
    void delete_shouldCallRepository() {
        doNothing().when(skillRepository).deleteById(4L);

        assertDoesNotThrow(() -> jpaSkillService.delete("4"));
        verify(skillRepository, times(1)).deleteById(4L);
    }

    @Test
    void initDefaultSkills_shouldOnlyInsertMissingSkills() {
        when(skillRepository.findByNameIgnoreCase(anyString())).thenReturn(Optional.empty());
        when(skillRepository.save(any(Skill.class))).thenAnswer(inv -> inv.getArgument(0));

        jpaSkillService.initDefaultSkills();

        verify(skillRepository, atLeastOnce()).save(any(Skill.class));
    }
}
