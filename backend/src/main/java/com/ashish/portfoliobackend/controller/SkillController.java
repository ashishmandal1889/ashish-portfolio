package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.model.Skill;
import com.ashish.portfoliobackend.repository.SkillRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillRepository skillRepository;

    public SkillController(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @GetMapping
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    @PostMapping
    public Skill createSkill(@RequestBody Skill skill) {
        return skillRepository.save(skill);
    }
    @PutMapping("/{id}")
     public Skill updateSkill(@PathVariable Long id, @RequestBody Skill skill) {

        Skill existingSkill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        existingSkill.setName(skill.getName());

        return skillRepository.save(existingSkill);
    }
    @DeleteMapping("/{id}")
        public void deleteSkill(@PathVariable Long id) {
        skillRepository.deleteById(id);
    }

}
