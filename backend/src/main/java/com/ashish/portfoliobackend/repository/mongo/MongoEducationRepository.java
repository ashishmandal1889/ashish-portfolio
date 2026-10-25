package com.ashish.portfoliobackend.repository.mongo;

import com.ashish.portfoliobackend.document.EducationDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MongoEducationRepository extends MongoRepository<EducationDocument, String> {
}
