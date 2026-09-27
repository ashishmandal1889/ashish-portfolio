package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.model.About;
import com.ashish.portfoliobackend.repository.AboutRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/about")
public class AboutController {

    private final AboutRepository aboutRepository;

    public AboutController(AboutRepository aboutRepository) {
        this.aboutRepository = aboutRepository;
    }

    @GetMapping
    public List<About> getAllAbout() {
        return aboutRepository.findAll();
    }

    @PostMapping
    public About createAbout(@RequestBody About about) {
        return aboutRepository.save(about);
    }

    @PutMapping("/{id}")
    public About updateAbout(
            @PathVariable Long id,
            @RequestBody About about
    ) {

        About existingAbout = aboutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("About section not found"));

        existingAbout.setHeading(about.getHeading());
        existingAbout.setDescription(about.getDescription());

        return aboutRepository.save(existingAbout);
    }

    @DeleteMapping("/{id}")
    public void deleteAbout(@PathVariable Long id) {
        aboutRepository.deleteById(id);
    }
}