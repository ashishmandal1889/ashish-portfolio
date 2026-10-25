package com.ashish.portfoliobackend.service;

import com.ashish.portfoliobackend.dto.EducationDto;
import java.util.List;

public interface EducationService {

    List<EducationDto> getAll();

    EducationDto getById(String id);

    EducationDto create(EducationDto dto);

    EducationDto update(String id, EducationDto dto);

    void delete(String id);
}
