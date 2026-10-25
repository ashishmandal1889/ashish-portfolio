package com.ashish.portfoliobackend.dto;

public class SkillDto {

    private Object id;
    private String name;

    public SkillDto() {
    }

    public SkillDto(Object id, String name) {
        this.id = id;
        this.name = name;
    }

    public Object getId() {
        return id;
    }

    public void setId(Object id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
