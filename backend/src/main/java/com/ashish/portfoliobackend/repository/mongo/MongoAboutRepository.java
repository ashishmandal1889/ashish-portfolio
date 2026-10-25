package com.ashish.portfoliobackend.repository.mongo;

import com.ashish.portfoliobackend.document.AboutDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MongoAboutRepository extends MongoRepository<AboutDocument, String> {
}
