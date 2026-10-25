package com.ashish.portfoliobackend.service.jpa;

import com.ashish.portfoliobackend.dto.ExperienceDto;
import com.ashish.portfoliobackend.model.Experience;
import com.ashish.portfoliobackend.repository.ExperienceRepository;
import com.ashish.portfoliobackend.service.ExperienceService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Profile("local")
public class JpaExperienceService implements ExperienceService {

    private final ExperienceRepository experienceRepository;

    public JpaExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @Override
    public List<ExperienceDto> getAll() {
        return experienceRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public ExperienceDto getById(String id) {
        Long numericId = parseId(id);
        Experience entity = experienceRepository.findById(numericId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Experience not found"));
        return toDto(entity);
    }

    @Override
    public ExperienceDto create(ExperienceDto dto) {
        Experience entity = toEntity(dto);
        Experience saved = experienceRepository.save(entity);
        return toDto(saved);
    }

    @Override
    public ExperienceDto update(String id, ExperienceDto dto) {
        Long numericId = parseId(id);
        Experience existing = experienceRepository.findById(numericId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Experience not found"));

        existing.setCompany(dto.getCompany());
        existing.setPosition(dto.getPosition());
        existing.setDescription(dto.getDescription());
        existing.setStartDate(dto.getStartDate());
        existing.setEndDate(dto.getEndDate());
        existing.setCurrent(dto.isCurrent());

        Experience saved = experienceRepository.save(existing);
        return toDto(saved);
    }

    @Override
    public void delete(String id) {
        Long numericId = parseId(id);
        if (!experienceRepository.existsById(numericId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Experience not found");
        }
        experienceRepository.deleteById(numericId);
    }

    private ExperienceDto toDto(Experience entity) {
        return new ExperienceDto(
                entity.getId(),
                entity.getCompany(),
                entity.getPosition(),
                entity.getDescription(),
                entity.getStartDate(),
                entity.getEndDate(),
                entity.isCurrent()
        );
    }

    private Experience toEntity(ExperienceDto dto) {
        return new Experience(
                dto.getCompany(),
                dto.getPosition(),
                dto.getDescription(),
                dto.getStartDate(),
                dto.getEndDate(),
                dto.isCurrent()
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
