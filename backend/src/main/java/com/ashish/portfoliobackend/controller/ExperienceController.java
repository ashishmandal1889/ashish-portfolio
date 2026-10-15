
package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.model.Experience;
import com.ashish.portfoliobackend.repository.ExperienceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
public class ExperienceController {

    private final ExperienceRepository experienceRepository;

    public ExperienceController(
            ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @GetMapping
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    @GetMapping("/{id}")
    public Experience getExperienceById(@PathVariable Long id) {
        return experienceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Experience not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Experience createExperience(
            @RequestBody Experience experience) {
        return experienceRepository.save(experience);
    }

    @PutMapping("/{id}")
    public Experience updateExperience(
            @PathVariable Long id,
            @RequestBody Experience experience) {

        Experience existing = experienceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Experience not found"));

        existing.setCompany(experience.getCompany());
        existing.setPosition(experience.getPosition());
        existing.setDescription(experience.getDescription());
        existing.setStartDate(experience.getStartDate());
        existing.setEndDate(experience.getEndDate());
        existing.setCurrent(experience.isCurrent());

        return experienceRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExperience(@PathVariable Long id) {
        if (!experienceRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Experience not found");
        }

        experienceRepository.deleteById(id);
    }
}
