package com.ashish.portfoliobackend.repository.mongo;

import com.ashish.portfoliobackend.document.ProjectDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MongoProjectRepository extends MongoRepository<ProjectDocument, String> {
}
