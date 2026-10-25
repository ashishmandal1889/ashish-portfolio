package com.ashish.portfoliobackend.service.jpa;

import com.ashish.portfoliobackend.dto.AboutDto;
import com.ashish.portfoliobackend.model.About;
import com.ashish.portfoliobackend.repository.AboutRepository;
import com.ashish.portfoliobackend.service.AboutService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Profile("local")
public class JpaAboutService implements AboutService {

    private final AboutRepository aboutRepository;

    public JpaAboutService(AboutRepository aboutRepository) {
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
        About entity = new About(dto.getHeading(), dto.getDescription());
        About saved = aboutRepository.save(entity);
        return toDto(saved);
    }

    @Override
    public AboutDto update(String id, AboutDto dto) {
        Long numericId = parseId(id);
        About existing = aboutRepository.findById(numericId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "About section not found"));

        existing.setHeading(dto.getHeading());
        existing.setDescription(dto.getDescription());
        About saved = aboutRepository.save(existing);
        return toDto(saved);
    }

    @Override
    public void delete(String id) {
        Long numericId = parseId(id);
        aboutRepository.deleteById(numericId);
    }

    private AboutDto toDto(About entity) {
        return new AboutDto(entity.getId(), entity.getHeading(), entity.getDescription());
    }

    private Long parseId(String id) {
        try {
            return Long.parseLong(id);
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid ID format: " + id);
        }
    }
}
