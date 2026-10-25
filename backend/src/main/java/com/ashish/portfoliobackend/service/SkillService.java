package com.ashish.portfoliobackend.service;

import com.ashish.portfoliobackend.dto.SkillDto;
import java.util.List;

public interface SkillService {

    List<SkillDto> getAll();

    SkillDto create(SkillDto dto);

    SkillDto update(String id, SkillDto dto);

    void delete(String id);
}
