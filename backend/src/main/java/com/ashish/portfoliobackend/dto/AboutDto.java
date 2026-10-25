package com.ashish.portfoliobackend.dto;

public class AboutDto {

    private Object id;
    private String heading;
    private String description;

    public AboutDto() {
    }

    public AboutDto(Object id, String heading, String description) {
        this.id = id;
        this.heading = heading;
        this.description = description;
    }

    public Object getId() {
        return id;
    }

    public void setId(Object id) {
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
