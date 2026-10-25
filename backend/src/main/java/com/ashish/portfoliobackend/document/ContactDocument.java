package com.ashish.portfoliobackend.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "contact")
public class ContactDocument {

    @Id
    private String id;
    private String email;
    private String phone;
    private String location;
    private String linkedIn;
    private String github;
    private String leetCode;
    private String website;

    public ContactDocument() {
    }

    public ContactDocument(
            String id,
            String email,
            String phone,
            String location,
            String linkedIn,
            String github,
            String leetCode,
            String website
    ) {
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.linkedIn = linkedIn;
        this.github = github;
        this.leetCode = leetCode;
        this.website = website;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLinkedIn() {
        return linkedIn;
    }

    public void setLinkedIn(String linkedIn) {
        this.linkedIn = linkedIn;
    }

    public String getGithub() {
        return github;
    }

    public void setGithub(String github) {
        this.github = github;
    }

    public String getLeetCode() {
        return leetCode;
    }

    public void setLeetCode(String leetCode) {
        this.leetCode = leetCode;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }
}
