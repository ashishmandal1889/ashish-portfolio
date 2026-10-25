package com.ashish.portfoliobackend.service.mongo;

import com.ashish.portfoliobackend.document.AboutDocument;
import com.ashish.portfoliobackend.dto.AboutDto;
import com.ashish.portfoliobackend.repository.mongo.MongoAboutRepository;
import com.ashish.portfoliobackend.service.AboutService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Profile("prod")
public class MongoAboutService implements AboutService {

    private final MongoAboutRepository aboutRepository;

    public MongoAboutService(MongoAboutRepository aboutRepository) {
        this.aboutRepository = aboutRepository;
    }

    @Override
    public List<AboutDto> getAll() {
        return aboutRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public AboutDto create(AboutDto dto) {
        AboutDocument document = new AboutDocument(dto.getHeading(), dto.getDescription());
        if (dto.getId() != null) {
            document.setId(dto.getId().toString());
        }
        AboutDocument saved = aboutRepository.save(document);
        return toDto(saved);
    }

    @Override
    public AboutDto update(String id, AboutDto dto) {
        AboutDocument existing = aboutRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "About section not found"));

        existing.setHeading(dto.getHeading());
        existing.setDescription(dto.getDescription());
        AboutDocument saved = aboutRepository.save(existing);
        return toDto(saved);
    }

    @Override
    public void delete(String id) {
        aboutRepository.deleteById(id);
    }

    private AboutDto toDto(AboutDocument document) {
        return new AboutDto(document.getId(), document.getHeading(), document.getDescription());
    }
}
