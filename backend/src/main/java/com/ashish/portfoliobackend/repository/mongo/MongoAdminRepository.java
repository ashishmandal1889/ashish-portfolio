package com.ashish.portfoliobackend.repository.mongo;

import com.ashish.portfoliobackend.document.AdminDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MongoAdminRepository extends MongoRepository<AdminDocument, String> {

    Optional<AdminDocument> findByUsername(String username);
}
