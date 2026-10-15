
package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.entity.Credential;
import com.ashish.portfoliobackend.entity.CredentialType;
import com.ashish.portfoliobackend.repository.CredentialRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/credentials")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://192.168.1.10:5173"
})
public class CredentialController {

    private final CredentialRepository credentialRepository;

    public CredentialController(
            CredentialRepository credentialRepository
    ) {
        this.credentialRepository = credentialRepository;
    }

    // Get all credentials
    @GetMapping
    public List<Credential> getAllCredentials() {
        return credentialRepository.findAll();
    }

    // Get credentials by type
    @GetMapping("/type/{type}")
    public List<Credential> getCredentialsByType(
            @PathVariable CredentialType type
    ) {
        return credentialRepository.findByType(type);
    }

    // Add credential
    @PostMapping
    public Credential createCredential(
            @RequestBody Credential credential
    ) {
        
        return credentialRepository.save(credential);
    }

    // Update credential
    @PutMapping("/{id}")
    public ResponseEntity<Credential> updateCredential(
            @PathVariable Long id,
            @RequestBody Credential updatedCredential
    ) {
        return credentialRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(updatedCredential.getTitle());
                    existing.setType(updatedCredential.getType());
                    existing.setOrganization(updatedCredential.getOrganization());
                    existing.setDescription(updatedCredential.getDescription());
                    existing.setDate(updatedCredential.getDate());
                    existing.setUrl(updatedCredential.getUrl());

                    Credential saved =
                            credentialRepository.save(existing);

                    return ResponseEntity.ok(saved);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete credential
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCredential(
            @PathVariable Long id
    ) {
        if (!credentialRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        credentialRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
