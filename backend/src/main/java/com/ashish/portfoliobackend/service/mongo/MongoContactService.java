package com.ashish.portfoliobackend.service.mongo;

import com.ashish.portfoliobackend.document.ContactDocument;
import com.ashish.portfoliobackend.dto.ContactDto;
import com.ashish.portfoliobackend.repository.mongo.MongoContactRepository;
import com.ashish.portfoliobackend.service.ContactService;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Profile("prod")
public class MongoContactService implements ContactService {

    private final MongoContactRepository contactRepository;

    public MongoContactService(MongoContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public List<ContactDto> getAll() {
        return contactRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public ContactDto create(ContactDto dto) {
        ContactDocument document = toDocument(dto);
        ContactDocument saved = contactRepository.save(document);
        return toDto(saved);
    }

    @Override
    public Optional<ContactDto> update(String id, ContactDto dto) {
        return contactRepository.findById(id)
                .map(existing -> {
                    existing.setEmail(dto.getEmail());
                    existing.setPhone(dto.getPhone());
                    existing.setLocation(dto.getLocation());
                    existing.setLinkedIn(dto.getLinkedIn());
                    existing.setGithub(dto.getGithub());
                    existing.setLeetCode(dto.getLeetCode());
                    existing.setWebsite(dto.getWebsite());
                    return toDto(contactRepository.save(existing));
                });
    }

    @Override
    public boolean delete(String id) {
        if (!contactRepository.existsById(id)) {
            return false;
        }
        contactRepository.deleteById(id);
        return true;
    }

    private ContactDto toDto(ContactDocument document) {
        return new ContactDto(
                document.getId(),
                document.getEmail(),
                document.getPhone(),
                document.getLocation(),
                document.getLinkedIn(),
                document.getGithub(),
                document.getLeetCode(),
                document.getWebsite()
        );
    }

    private ContactDocument toDocument(ContactDto dto) {
        ContactDocument document = new ContactDocument();
        if (dto.getId() != null) {
            document.setId(dto.getId().toString());
        }
        document.setEmail(dto.getEmail());
        document.setPhone(dto.getPhone());
        document.setLocation(dto.getLocation());
        document.setLinkedIn(dto.getLinkedIn());
        document.setGithub(dto.getGithub());
        document.setLeetCode(dto.getLeetCode());
        document.setWebsite(dto.getWebsite());
        return document;
    }
}
