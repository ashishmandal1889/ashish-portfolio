
package com.ashish.portfoliobackend.repository;

import com.ashish.portfoliobackend.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
