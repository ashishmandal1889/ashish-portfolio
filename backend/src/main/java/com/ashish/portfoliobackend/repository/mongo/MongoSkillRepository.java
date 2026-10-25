package com.ashish.portfoliobackend.repository.mongo;

import com.ashish.portfoliobackend.document.SkillDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MongoSkillRepository extends MongoRepository<SkillDocument, String> {

    Optional<SkillDocument> findByName(String name);
}
