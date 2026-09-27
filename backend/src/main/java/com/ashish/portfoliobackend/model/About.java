package com.ashish.portfoliobackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "about")
public class About {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String heading;

    @Column(nullable = false, length = 3000)
    private String description;

    public About() {
    }

    public About(String heading, String description) {
        this.heading = heading;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getHeading() {
        return heading;
    }

    public String getDescription() {
        return description;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}