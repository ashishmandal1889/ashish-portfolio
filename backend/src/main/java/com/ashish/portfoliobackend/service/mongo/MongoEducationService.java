package com.ashish.portfoliobackend.service.mongo;

import com.ashish.portfoliobackend.document.EducationDocument;
import com.ashish.portfoliobackend.dto.EducationDto;
import com.ashish.portfoliobackend.repository.mongo.MongoEducationRepository;
import com.ashish.portfoliobackend.service.EducationService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Profile("prod")
public class MongoEducationService implements EducationService {

    private final MongoEducationRepository educationRepository;

    public MongoEducationService(MongoEducationRepository educationRepository) {
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
        EducationDocument document = educationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Education record not found"));
        return toDto(document);
    }

    @Override
    public EducationDto create(EducationDto dto) {
        EducationDocument document = toDocument(dto);
        EducationDocument saved = educationRepository.save(document);
        return toDto(saved);
    }

    @Override
    public EducationDto update(String id, EducationDto dto) {
        EducationDocument existing = educationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Education record not found"));

        existing.setInstitution(dto.getInstitution());
        existing.setDegree(dto.getDegree());
        existing.setFieldOfStudy(dto.getFieldOfStudy());
        existing.setDescription(dto.getDescription());
        existing.setStartDate(dto.getStartDate());
        existing.setEndDate(dto.getEndDate());
        existing.setCurrent(dto.isCurrent());

        EducationDocument saved = educationRepository.save(existing);
        return toDto(saved);
    }

    @Override
    public void delete(String id) {
        if (!educationRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Education record not found");
        }
        educationRepository.deleteById(id);
    }

    private EducationDto toDto(EducationDocument document) {
        return new EducationDto(
                document.getId(),
                document.getInstitution(),
                document.getDegree(),
                document.getFieldOfStudy(),
                document.getDescription(),
                document.getStartDate(),
                document.getEndDate(),
                document.isCurrent()
        );
    }

    private EducationDocument toDocument(EducationDto dto) {
        EducationDocument document = new EducationDocument();
        if (dto.getId() != null) {
            document.setId(dto.getId().toString());
        }
        document.setInstitution(dto.getInstitution());
        document.setDegree(dto.getDegree());
        document.setFieldOfStudy(dto.getFieldOfStudy());
        document.setDescription(dto.getDescription());
        document.setStartDate(dto.getStartDate());
        document.setEndDate(dto.getEndDate());
        document.setCurrent(dto.isCurrent());
        return document;
    }
}
