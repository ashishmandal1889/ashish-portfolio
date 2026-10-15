
package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.model.Education;
import com.ashish.portfoliobackend.repository.EducationRepository;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "http://localhost:5173")
public class EducationController {

    private final EducationRepository educationRepository;

    public EducationController(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    @GetMapping
    public List<Education> getAllEducation() {
        return educationRepository.findAll();
    }

    @GetMapping("/{id}")
    public Education getEducationById(@PathVariable Long id) {
        return educationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Education record not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Education createEducation(@RequestBody Education education) {
        return educationRepository.save(education);
    }

    @PutMapping("/{id}")
    public Education updateEducation(
            @PathVariable Long id,
            @RequestBody Education education) {

        Education existing = educationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Education record not found"));

        existing.setInstitution(education.getInstitution());
        existing.setDegree(education.getDegree());
        existing.setFieldOfStudy(education.getFieldOfStudy());
        existing.setDescription(education.getDescription());
        existing.setStartDate(education.getStartDate());
        existing.setEndDate(education.getEndDate());
        existing.setCurrent(education.isCurrent());

        return educationRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEducation(@PathVariable Long id) {
        if (!educationRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Education record not found");
        }

        educationRepository.deleteById(id);
    }
}
