package com.ashish.portfoliobackend.repository.mongo;

import com.ashish.portfoliobackend.document.CredentialDocument;
import com.ashish.portfoliobackend.entity.CredentialType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MongoCredentialRepository extends MongoRepository<CredentialDocument, String> {

    List<CredentialDocument> findByType(CredentialType type);
}
