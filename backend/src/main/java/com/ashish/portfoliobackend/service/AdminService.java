package com.ashish.portfoliobackend.service;

public interface AdminService {

    boolean authenticate(String username, String password);

    void initDefaultAdmin();
}
