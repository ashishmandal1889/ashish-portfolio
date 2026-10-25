package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.dto.CredentialDto;
import com.ashish.portfoliobackend.entity.CredentialType;
import com.ashish.portfoliobackend.service.CredentialService;
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

    private final CredentialService credentialService;

    public CredentialController(CredentialService credentialService) {
        this.credentialService = credentialService;
    }

    // Get all credentials
    @GetMapping
    public List<CredentialDto> getAllCredentials() {
        return credentialService.getAll();
    }

    // Get credentials by type
    @GetMapping("/type/{type}")
    public List<CredentialDto> getCredentialsByType(
            @PathVariable CredentialType type
    ) {
        return credentialService.getByType(type);
    }

    // Add credential
    @PostMapping
    public CredentialDto createCredential(
            @RequestBody CredentialDto credential
    ) {
        return credentialService.create(credential);
    }

    // Update credential
    @PutMapping("/{id}")
    public ResponseEntity<CredentialDto> updateCredential(
            @PathVariable String id,
            @RequestBody CredentialDto updatedCredential
    ) {
        return credentialService.update(id, updatedCredential)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete credential
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCredential(
            @PathVariable String id
    ) {
        if (!credentialService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
