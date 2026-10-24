
package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.model.Contact;
import com.ashish.portfoliobackend.repository.ContactRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @GetMapping
    public List<Contact> getContacts() {
        return contactRepository.findAll();
    }

    @PostMapping
    public Contact createContact(@RequestBody Contact contact) {
        return contactRepository.save(contact);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(
            @PathVariable Long id,
            @RequestBody Contact updatedContact) {

        return contactRepository.findById(id)
                .map(contact -> {
                    contact.setEmail(updatedContact.getEmail());
                    contact.setPhone(updatedContact.getPhone());
                    contact.setLocation(updatedContact.getLocation());
                    contact.setLinkedIn(updatedContact.getLinkedIn());
                    contact.setGithub(updatedContact.getGithub());
                    contact.setLeetCode(updatedContact.getLeetCode());
                    contact.setWebsite(updatedContact.getWebsite());

                    Contact savedContact = contactRepository.save(contact);
                    return ResponseEntity.ok(savedContact);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        if (!contactRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        contactRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
