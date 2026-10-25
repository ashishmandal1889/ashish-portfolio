package com.ashish.portfoliobackend.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "about")
public class AboutDocument {

    @Id
    private String id;
    private String heading;
    private String description;

    public AboutDocument() {
    }

    public AboutDocument(String heading, String description) {
        this.heading = heading;
        this.description = description;
    }

    public AboutDocument(String id, String heading, String description) {
        this.id = id;
        this.heading = heading;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHeading() {
        return heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
