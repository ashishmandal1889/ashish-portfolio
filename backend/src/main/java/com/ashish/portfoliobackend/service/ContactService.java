package com.ashish.portfoliobackend.service;

import com.ashish.portfoliobackend.dto.ContactDto;
import java.util.List;
import java.util.Optional;

public interface ContactService {

    List<ContactDto> getAll();

    ContactDto create(ContactDto dto);

    Optional<ContactDto> update(String id, ContactDto dto);

    boolean delete(String id);
}
