package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.dto.ExperienceDto;
import com.ashish.portfoliobackend.service.ExperienceService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public List<ExperienceDto> getAllExperiences() {
        return experienceService.getAll();
    }

    @GetMapping("/{id}")
    public ExperienceDto getExperienceById(@PathVariable String id) {
        return experienceService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExperienceDto createExperience(@RequestBody ExperienceDto experience) {
        return experienceService.create(experience);
    }

    @PutMapping("/{id}")
    public ExperienceDto updateExperience(
            @PathVariable String id,
            @RequestBody ExperienceDto experience
    ) {
        return experienceService.update(id, experience);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExperience(@PathVariable String id) {
        experienceService.delete(id);
    }
}
