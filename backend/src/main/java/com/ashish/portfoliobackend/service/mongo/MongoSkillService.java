package com.ashish.portfoliobackend.service.mongo;

import com.ashish.portfoliobackend.document.SkillDocument;
import com.ashish.portfoliobackend.dto.SkillDto;
import com.ashish.portfoliobackend.repository.mongo.MongoSkillRepository;
import com.ashish.portfoliobackend.service.SkillService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Profile("prod")
public class MongoSkillService implements SkillService {

    private final MongoSkillRepository skillRepository;

    public MongoSkillService(MongoSkillRepository skillRepository) {
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
        SkillDocument document = new SkillDocument(dto.getName());
        if (dto.getId() != null) {
            document.setId(dto.getId().toString());
        }
        SkillDocument saved = skillRepository.save(document);
        return toDto(saved);
    }

    @Override
    public SkillDto update(String id, SkillDto dto) {
        SkillDocument existing = skillRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Skill not found"));

        existing.setName(dto.getName());
        SkillDocument saved = skillRepository.save(existing);
        return toDto(saved);
    }

    @Override
    public void delete(String id) {
        skillRepository.deleteById(id);
    }

    private SkillDto toDto(SkillDocument document) {
        return new SkillDto(document.getId(), document.getName());
    }
}
