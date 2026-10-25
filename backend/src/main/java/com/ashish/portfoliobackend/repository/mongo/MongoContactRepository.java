package com.ashish.portfoliobackend.repository.mongo;

import com.ashish.portfoliobackend.document.ContactDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MongoContactRepository extends MongoRepository<ContactDocument, String> {
}
