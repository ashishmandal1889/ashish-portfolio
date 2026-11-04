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
import java.util.Optional;

@Service
@Profile("prod")
public class MongoSkillService implements SkillService {

    public static final List<String> DEFAULT_SKILLS = List.of(
            "Java", "Python", "JavaScript",
            "HTML5", "CSS3", "React", "Vite",
            "Node.js", "Express.js", "FastAPI", "REST APIs",
            "SQL", "PostgreSQL", "MongoDB", "Firebase", "Firestore",
            "NumPy", "Pandas", "Scikit-learn", "Machine Learning", "Generative AI", "LLM Fundamentals", "RAG Basics",
            "AWS", "Docker", "Git", "GitHub", "Linux", "GitHub Actions",
            "VS Code", "Jupyter Notebook", "Postman"
    );

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
        if (dto == null || dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Skill name cannot be empty");
        }
        String trimmedName = dto.getName().trim();
        Optional<SkillDocument> existing = skillRepository.findByNameIgnoreCase(trimmedName);
        if (existing.isPresent()) {
            return toDto(existing.get());
        }

        SkillDocument document = new SkillDocument(trimmedName);
        if (dto.getId() != null && !dto.getId().toString().trim().isEmpty()) {
            document.setId(dto.getId().toString().trim());
        }
        SkillDocument saved = skillRepository.save(document);
        return toDto(saved);
    }

    @Override
    public SkillDto update(String id, SkillDto dto) {
        if (dto == null || dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Skill name cannot be empty");
        }
        SkillDocument existing = skillRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Skill not found"));

        existing.setName(dto.getName().trim());
        SkillDocument saved = skillRepository.save(existing);
        return toDto(saved);
    }

    @Override
    public void delete(String id) {
        skillRepository.deleteById(id);
    }

    @Override
    public void initDefaultSkills() {
        skillRepository.findByNameIgnoreCase("Spring Boot").ifPresent(skill -> skillRepository.deleteById(skill.getId()));
        for (String skillName : DEFAULT_SKILLS) {
            if (skillRepository.findByNameIgnoreCase(skillName).isEmpty()) {
                skillRepository.save(new SkillDocument(skillName));
            }
        }
    }

    private SkillDto toDto(SkillDocument document) {
        return new SkillDto(document.getId(), document.getName());
    }
}
