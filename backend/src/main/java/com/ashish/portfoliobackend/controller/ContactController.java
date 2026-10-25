package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.dto.ContactDto;
import com.ashish.portfoliobackend.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public List<ContactDto> getContacts() {
        return contactService.getAll();
    }

    @PostMapping
    public ContactDto createContact(@RequestBody ContactDto contact) {
        return contactService.create(contact);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactDto> updateContact(
            @PathVariable String id,
            @RequestBody ContactDto updatedContact
    ) {
        return contactService.update(id, updatedContact)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable String id) {
        if (!contactService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
