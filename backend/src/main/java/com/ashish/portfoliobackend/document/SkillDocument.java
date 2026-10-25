package com.ashish.portfoliobackend.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "skills")
public class SkillDocument {

    @Id
    private String id;

    @Indexed(unique = true)
    private String name;

    public SkillDocument() {
    }

    public SkillDocument(String name) {
        this.name = name;
    }

    public SkillDocument(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
