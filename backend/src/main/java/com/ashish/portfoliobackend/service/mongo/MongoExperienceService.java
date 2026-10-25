package com.ashish.portfoliobackend.service.mongo;

import com.ashish.portfoliobackend.document.ExperienceDocument;
import com.ashish.portfoliobackend.dto.ExperienceDto;
import com.ashish.portfoliobackend.repository.mongo.MongoExperienceRepository;
import com.ashish.portfoliobackend.service.ExperienceService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Profile("prod")
public class MongoExperienceService implements ExperienceService {

    private final MongoExperienceRepository experienceRepository;

    public MongoExperienceService(MongoExperienceRepository experienceRepository) {
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
        ExperienceDocument document = experienceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Experience not found"));
        return toDto(document);
    }

    @Override
    public ExperienceDto create(ExperienceDto dto) {
        ExperienceDocument document = toDocument(dto);
        ExperienceDocument saved = experienceRepository.save(document);
        return toDto(saved);
    }

    @Override
    public ExperienceDto update(String id, ExperienceDto dto) {
        ExperienceDocument existing = experienceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Experience not found"));

        existing.setCompany(dto.getCompany());
        existing.setPosition(dto.getPosition());
        existing.setDescription(dto.getDescription());
        existing.setStartDate(dto.getStartDate());
        existing.setEndDate(dto.getEndDate());
        existing.setCurrent(dto.isCurrent());

        ExperienceDocument saved = experienceRepository.save(existing);
        return toDto(saved);
    }

    @Override
    public void delete(String id) {
        if (!experienceRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Experience not found");
        }
        experienceRepository.deleteById(id);
    }

    private ExperienceDto toDto(ExperienceDocument document) {
        return new ExperienceDto(
                document.getId(),
                document.getCompany(),
                document.getPosition(),
                document.getDescription(),
                document.getStartDate(),
                document.getEndDate(),
                document.isCurrent()
        );
    }

    private ExperienceDocument toDocument(ExperienceDto dto) {
        ExperienceDocument document = new ExperienceDocument();
        if (dto.getId() != null) {
            document.setId(dto.getId().toString());
        }
        document.setCompany(dto.getCompany());
        document.setPosition(dto.getPosition());
        document.setDescription(dto.getDescription());
        document.setStartDate(dto.getStartDate());
        document.setEndDate(dto.getEndDate());
        document.setCurrent(dto.isCurrent());
        return document;
    }
}
