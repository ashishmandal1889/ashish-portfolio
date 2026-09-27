package com.ashish.portfoliobackend.service;

import com.ashish.portfoliobackend.model.Admin;
import com.ashish.portfoliobackend.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean authenticate(String username, String password) {

        Admin admin = adminRepository.findByUsername(username)
                .orElse(null);

        if (admin == null) {
            return false;
        }

        return passwordEncoder.matches(
                password,
                admin.getPassword()
        );
    }
}