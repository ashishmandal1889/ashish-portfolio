package com.ashish.portfoliobackend.repository;

import com.ashish.portfoliobackend.model.About;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AboutRepository extends JpaRepository<About, Long> {
}