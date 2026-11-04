package com.ashish.portfoliobackend.repository;

import com.ashish.portfoliobackend.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> findByName(String name);

    Optional<Skill> findByNameIgnoreCase(String name);
}
