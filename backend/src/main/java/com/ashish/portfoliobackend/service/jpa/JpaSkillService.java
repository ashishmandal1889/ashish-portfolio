package com.ashish.portfoliobackend.service.jpa;

import com.ashish.portfoliobackend.dto.SkillDto;
import com.ashish.portfoliobackend.model.Skill;
import com.ashish.portfoliobackend.repository.SkillRepository;
import com.ashish.portfoliobackend.service.SkillService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@Profile("local")
public class JpaSkillService implements SkillService {

    public static final List<String> DEFAULT_SKILLS = List.of(
            "Java", "Python", "JavaScript",
            "HTML5", "CSS3", "React", "Vite",
            "Node.js", "Express.js", "FastAPI", "REST APIs",
            "SQL", "PostgreSQL", "MongoDB", "Firebase", "Firestore",
            "NumPy", "Pandas", "Scikit-learn", "Machine Learning", "Generative AI", "LLM Fundamentals", "RAG Basics",
            "AWS", "Docker", "Git", "GitHub", "Linux", "GitHub Actions",
            "VS Code", "Jupyter Notebook", "Postman"
    );

    private final SkillRepository skillRepository;

    public JpaSkillService(SkillRepository skillRepository) {
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
        if (dto == null || dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Skill name cannot be empty");
        }
        String trimmedName = dto.getName().trim();
        Optional<Skill> existing = skillRepository.findByNameIgnoreCase(trimmedName);
        if (existing.isPresent()) {
            return toDto(existing.get());
        }

        Skill entity = new Skill(trimmedName);
        Skill saved = skillRepository.save(entity);
        return toDto(saved);
    }

    @Override
    public SkillDto update(String id, SkillDto dto) {
        if (dto == null || dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Skill name cannot be empty");
        }
        Long numericId = parseId(id);
        Skill existing = skillRepository.findById(numericId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Skill not found"));

        existing.setName(dto.getName().trim());
        Skill saved = skillRepository.save(existing);
        return toDto(saved);
    }

    @Override
    public void delete(String id) {
        Long numericId = parseId(id);
        skillRepository.deleteById(numericId);
    }

    @Override
    public void initDefaultSkills() {
        skillRepository.findByNameIgnoreCase("Spring Boot").ifPresent(skill -> skillRepository.deleteById(skill.getId()));
        for (String skillName : DEFAULT_SKILLS) {
            if (skillRepository.findByNameIgnoreCase(skillName).isEmpty()) {
                skillRepository.save(new Skill(skillName));
            }
        }
    }

    private SkillDto toDto(Skill entity) {
        return new SkillDto(entity.getId(), entity.getName());
    }

    private Long parseId(String id) {
        try {
            return Long.parseLong(id);
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid ID format: " + id);
        }
    }
}
