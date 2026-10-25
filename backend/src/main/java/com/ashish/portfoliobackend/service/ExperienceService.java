package com.ashish.portfoliobackend.service;

import com.ashish.portfoliobackend.dto.ExperienceDto;
import java.util.List;

public interface ExperienceService {

    List<ExperienceDto> getAll();

    ExperienceDto getById(String id);

    ExperienceDto create(ExperienceDto dto);

    ExperienceDto update(String id, ExperienceDto dto);

    void delete(String id);
}
