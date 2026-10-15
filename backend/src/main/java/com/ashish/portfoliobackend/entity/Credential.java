
package com.ashish.portfoliobackend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "credentials")
public class Credential {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Enumerated(EnumType.STRING)
    private CredentialType type;

    private String organization;

    @Column(length = 2000)
    private String description;

    private LocalDate date;

    private String url;

    public Credential() {
    }

    public Credential(
            String title,
            CredentialType type,
            String organization,
            String description,
            LocalDate date,
            String url
    ) {
        this.title = title;
        this.type = type;
        this.organization = organization;
        this.description = description;
        this.date = date;
        this.url = url;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public CredentialType getType() {
        return type;
    }

    public void setType(CredentialType type) {
        this.type = type;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
