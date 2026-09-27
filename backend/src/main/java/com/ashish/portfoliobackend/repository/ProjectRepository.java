package com.ashish.portfoliobackend.repository;

import com.ashish.portfoliobackend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}