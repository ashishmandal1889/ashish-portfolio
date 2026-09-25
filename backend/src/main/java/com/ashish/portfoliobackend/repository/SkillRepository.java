package com.ashish.portfoliobackend.repository;

import com.ashish.portfoliobackend.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {
}