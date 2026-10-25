package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.dto.EducationDto;
import com.ashish.portfoliobackend.service.EducationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "http://localhost:5173")
public class EducationController {

    private final EducationService educationService;

    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    @GetMapping
    public List<EducationDto> getAllEducation() {
        return educationService.getAll();
    }

    @GetMapping("/{id}")
    public EducationDto getEducationById(@PathVariable String id) {
        return educationService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EducationDto createEducation(@RequestBody EducationDto education) {
        return educationService.create(education);
    }

    @PutMapping("/{id}")
    public EducationDto updateEducation(
            @PathVariable String id,
            @RequestBody EducationDto education
    ) {
        return educationService.update(id, education);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEducation(@PathVariable String id) {
        educationService.delete(id);
    }
}
