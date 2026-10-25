package com.ashish.portfoliobackend.service;

import com.ashish.portfoliobackend.dto.CredentialDto;
import com.ashish.portfoliobackend.entity.CredentialType;
import java.util.List;
import java.util.Optional;

public interface CredentialService {

    List<CredentialDto> getAll();

    List<CredentialDto> getByType(CredentialType type);

    CredentialDto create(CredentialDto dto);

    Optional<CredentialDto> update(String id, CredentialDto dto);

    boolean delete(String id);
}
