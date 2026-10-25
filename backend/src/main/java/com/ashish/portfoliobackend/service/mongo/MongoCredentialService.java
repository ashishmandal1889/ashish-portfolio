package com.ashish.portfoliobackend.service.mongo;

import com.ashish.portfoliobackend.document.CredentialDocument;
import com.ashish.portfoliobackend.dto.CredentialDto;
import com.ashish.portfoliobackend.entity.CredentialType;
import com.ashish.portfoliobackend.repository.mongo.MongoCredentialRepository;
import com.ashish.portfoliobackend.service.CredentialService;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Profile("prod")
public class MongoCredentialService implements CredentialService {

    private final MongoCredentialRepository credentialRepository;

    public MongoCredentialService(MongoCredentialRepository credentialRepository) {
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
        CredentialDocument document = toDocument(dto);
        CredentialDocument saved = credentialRepository.save(document);
        return toDto(saved);
    }

    @Override
    public Optional<CredentialDto> update(String id, CredentialDto dto) {
        return credentialRepository.findById(id)
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
        if (!credentialRepository.existsById(id)) {
            return false;
        }
        credentialRepository.deleteById(id);
        return true;
    }

    private CredentialDto toDto(CredentialDocument document) {
        return new CredentialDto(
                document.getId(),
                document.getTitle(),
                document.getType(),
                document.getOrganization(),
                document.getDescription(),
                document.getDate(),
                document.getUrl()
        );
    }

    private CredentialDocument toDocument(CredentialDto dto) {
        CredentialDocument document = new CredentialDocument();
        if (dto.getId() != null) {
            document.setId(dto.getId().toString());
        }
        document.setTitle(dto.getTitle());
        document.setType(dto.getType());
        document.setOrganization(dto.getOrganization());
        document.setDescription(dto.getDescription());
        document.setDate(dto.getDate());
        document.setUrl(dto.getUrl());
        return document;
    }
}
