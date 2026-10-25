package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.dto.SkillDto;
import com.ashish.portfoliobackend.service.SkillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public List<SkillDto> getAllSkills() {
        return skillService.getAll();
    }

    @PostMapping
    public SkillDto createSkill(@RequestBody SkillDto skill) {
        return skillService.create(skill);
    }

    @PutMapping("/{id}")
    public SkillDto updateSkill(
            @PathVariable String id,
            @RequestBody SkillDto skill
    ) {
        return skillService.update(id, skill);
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable String id) {
        skillService.delete(id);
    }
}
