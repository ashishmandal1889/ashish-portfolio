package com.ashish.portfoliobackend.repository.mongo;

import com.ashish.portfoliobackend.document.ExperienceDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MongoExperienceRepository extends MongoRepository<ExperienceDocument, String> {
}
