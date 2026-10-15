
package com.ashish.portfoliobackend.repository;

import com.ashish.portfoliobackend.entity.Credential;
import com.ashish.portfoliobackend.entity.CredentialType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CredentialRepository
        extends JpaRepository<Credential, Long> {

    List<Credential> findByType(CredentialType type);
}
