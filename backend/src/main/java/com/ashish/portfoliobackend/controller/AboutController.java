package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.dto.AboutDto;
import com.ashish.portfoliobackend.service.AboutService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/about")
public class AboutController {

    private final AboutService aboutService;

    public AboutController(AboutService aboutService) {
        this.aboutService = aboutService;
    }

    @GetMapping
    public List<AboutDto> getAllAbout() {
        return aboutService.getAll();
    }

    @PostMapping
    public AboutDto createAbout(@RequestBody AboutDto about) {
        return aboutService.create(about);
    }

    @PutMapping("/{id}")
    public AboutDto updateAbout(
            @PathVariable String id,
            @RequestBody AboutDto about
    ) {
        return aboutService.update(id, about);
    }

    @DeleteMapping("/{id}")
    public void deleteAbout(@PathVariable String id) {
        aboutService.delete(id);
    }
}
