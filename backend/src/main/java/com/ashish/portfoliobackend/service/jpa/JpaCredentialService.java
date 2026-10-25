package com.ashish.portfoliobackend.service.jpa;

import com.ashish.portfoliobackend.dto.CredentialDto;
import com.ashish.portfoliobackend.entity.Credential;
import com.ashish.portfoliobackend.entity.CredentialType;
import com.ashish.portfoliobackend.repository.CredentialRepository;
import com.ashish.portfoliobackend.service.CredentialService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@Profile("local")
public class JpaCredentialService implements CredentialService {

    private final CredentialRepository credentialRepository;

    public JpaCredentialService(CredentialRepository credentialRepository) {
        this.credentialRepository = credentialRepository;
    }

    @Override
    public List<CredentialDto> getAll() {
        return credentialRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public List<CredentialDto> getByType(CredentialType type) {
        return credentialRepository.findByType(type).stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public CredentialDto create(CredentialDto dto) {
        Credential entity = toEntity(dto);
        Credential saved = credentialRepository.save(entity);
        return toDto(saved);
    }

    @Override
    public Optional<CredentialDto> update(String id, CredentialDto dto) {
        Long numericId = parseId(id);
        return credentialRepository.findById(numericId)
                .map(existing -> {
                    existing.setTitle(dto.getTitle());
                    existing.setType(dto.getType());
                    existing.setOrganization(dto.getOrganization());
                    existing.setDescription(dto.getDescription());
                    existing.setDate(dto.getDate());
                    existing.setUrl(dto.getUrl());
                    return toDto(credentialRepository.save(existing));
                });
    }

    @Override
    public boolean delete(String id) {
        Long numericId = parseId(id);
        if (!credentialRepository.existsById(numericId)) {
            return false;
        }
        credentialRepository.deleteById(numericId);
        return true;
    }

    private CredentialDto toDto(Credential entity) {
        return new CredentialDto(
                entity.getId(),
                entity.getTitle(),
                entity.getType(),
                entity.getOrganization(),
                entity.getDescription(),
                entity.getDate(),
                entity.getUrl()
        );
    }

    private Credential toEntity(CredentialDto dto) {
        return new Credential(
                dto.getTitle(),
                dto.getType(),
                dto.getOrganization(),
                dto.getDescription(),
                dto.getDate(),
                dto.getUrl()
        );
    }

    private Long parseId(String id) {
        try {
            return Long.parseLong(id);
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid ID format: " + id);
        }
    }
}
