
package com.ashish.portfoliobackend.repository;

import com.ashish.portfoliobackend.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository
        extends JpaRepository<Experience, Long> {
}
