package com.ashish.portfoliobackend.service;

import com.ashish.portfoliobackend.dto.AboutDto;
import java.util.List;

public interface AboutService {

    List<AboutDto> getAll();

    AboutDto create(AboutDto dto);

    AboutDto update(String id, AboutDto dto);

    void delete(String id);
}
