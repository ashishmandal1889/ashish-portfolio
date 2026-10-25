package com.ashish.portfoliobackend.service.jpa;

import com.ashish.portfoliobackend.dto.EducationDto;
import com.ashish.portfoliobackend.model.Education;
import com.ashish.portfoliobackend.repository.EducationRepository;
import com.ashish.portfoliobackend.service.EducationService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Profile("local")
public class JpaEducationService implements EducationService {

    private final EducationRepository educationRepository;

    public JpaEducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    @Override
    public List<EducationDto> getAll() {
        return educationRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public EducationDto getById(String id) {
        Long numericId = parseId(id);
        Education entity = educationRepository.findById(numericId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Education record not found"));
        return toDto(entity);
    }

    @Override
    public EducationDto create(EducationDto dto) {
        Education entity = toEntity(dto);
        Education saved = educationRepository.save(entity);
        return toDto(saved);
    }

    @Override
    public EducationDto update(String id, EducationDto dto) {
        Long numericId = parseId(id);
        Education existing = educationRepository.findById(numericId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Education record not found"));

        existing.setInstitution(dto.getInstitution());
        existing.setDegree(dto.getDegree());
        existing.setFieldOfStudy(dto.getFieldOfStudy());
        existing.setDescription(dto.getDescription());
        existing.setStartDate(dto.getStartDate());
        existing.setEndDate(dto.getEndDate());
        existing.setCurrent(dto.isCurrent());

        Education saved = educationRepository.save(existing);
        return toDto(saved);
    }

    @Override
    public void delete(String id) {
        Long numericId = parseId(id);
        if (!educationRepository.existsById(numericId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Education record not found");
        }
        educationRepository.deleteById(numericId);
    }

    private EducationDto toDto(Education entity) {
        return new EducationDto(
                entity.getId(),
                entity.getInstitution(),
                entity.getDegree(),
                entity.getFieldOfStudy(),
                entity.getDescription(),
                entity.getStartDate(),
                entity.getEndDate(),
                entity.isCurrent()
        );
    }

    private Education toEntity(EducationDto dto) {
        return new Education(
                dto.getInstitution(),
                dto.getDegree(),
                dto.getFieldOfStudy(),
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
