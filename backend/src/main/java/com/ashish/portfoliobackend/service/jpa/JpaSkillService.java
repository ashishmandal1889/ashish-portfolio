package com.ashish.portfoliobackend.service.jpa;

import com.ashish.portfoliobackend.dto.SkillDto;
import com.ashish.portfoliobackend.model.Skill;
import com.ashish.portfoliobackend.repository.SkillRepository;
import com.ashish.portfoliobackend.service.SkillService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Profile("local")
public class JpaSkillService implements SkillService {

    private final SkillRepository skillRepository;

    public JpaSkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Override
    public List<SkillDto> getAll() {
        return skillRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public SkillDto create(SkillDto dto) {
        Skill entity = new Skill(dto.getName());
        Skill saved = skillRepository.save(entity);
        return toDto(saved);
    }

    @Override
    public SkillDto update(String id, SkillDto dto) {
        Long numericId = parseId(id);
        Skill existing = skillRepository.findById(numericId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Skill not found"));

        existing.setName(dto.getName());
        Skill saved = skillRepository.save(existing);
        return toDto(saved);
    }

    @Override
    public void delete(String id) {
        Long numericId = parseId(id);
        skillRepository.deleteById(numericId);
    }

    private SkillDto toDto(Skill entity) {
        return new SkillDto(entity.getId(), entity.getName());
    }

    private Long parseId(String id) {
        try {
            return Long.parseLong(id);
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid ID format: " + id);
        }
    }
}
