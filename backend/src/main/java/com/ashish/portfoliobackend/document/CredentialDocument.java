package com.ashish.portfoliobackend.document;

import com.ashish.portfoliobackend.entity.CredentialType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "credentials")
public class CredentialDocument {

    @Id
    private String id;
    private String title;
    private CredentialType type;
    private String organization;
    private String description;
    private LocalDate date;
    private String url;

    public CredentialDocument() {
    }

    public CredentialDocument(
            String id,
            String title,
            CredentialType type,
            String organization,
            String description,
            LocalDate date,
            String url
    ) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.organization = organization;
        this.description = description;
        this.date = date;
        this.url = url;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
