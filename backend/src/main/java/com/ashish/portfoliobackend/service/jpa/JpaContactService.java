package com.ashish.portfoliobackend.service.jpa;

import com.ashish.portfoliobackend.dto.ContactDto;
import com.ashish.portfoliobackend.model.Contact;
import com.ashish.portfoliobackend.repository.ContactRepository;
import com.ashish.portfoliobackend.service.ContactService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@Profile("local")
public class JpaContactService implements ContactService {

    private final ContactRepository contactRepository;

    public JpaContactService(ContactRepository contactRepository) {
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
        Contact entity = toEntity(dto);
        Contact saved = contactRepository.save(entity);
        return toDto(saved);
    }

    @Override
    public Optional<ContactDto> update(String id, ContactDto dto) {
        Long numericId = parseId(id);
        return contactRepository.findById(numericId)
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
        Long numericId = parseId(id);
        if (!contactRepository.existsById(numericId)) {
            return false;
        }
        contactRepository.deleteById(numericId);
        return true;
    }

    private ContactDto toDto(Contact entity) {
        return new ContactDto(
                entity.getId(),
                entity.getEmail(),
                entity.getPhone(),
                entity.getLocation(),
                entity.getLinkedIn(),
                entity.getGithub(),
                entity.getLeetCode(),
                entity.getWebsite()
        );
    }

    private Contact toEntity(ContactDto dto) {
        Contact entity = new Contact();
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setLocation(dto.getLocation());
        entity.setLinkedIn(dto.getLinkedIn());
        entity.setGithub(dto.getGithub());
        entity.setLeetCode(dto.getLeetCode());
        entity.setWebsite(dto.getWebsite());
        return entity;
    }

    private Long parseId(String id) {
        try {
            return Long.parseLong(id);
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid ID format: " + id);
        }
    }
}
