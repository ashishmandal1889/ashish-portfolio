package com.ashish.portfoliobackend.service.jpa;

import com.ashish.portfoliobackend.model.Admin;
import com.ashish.portfoliobackend.repository.AdminRepository;
import com.ashish.portfoliobackend.service.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Profile("local")
public class JpaAdminService implements AdminService {

    private static final Logger logger = LoggerFactory.getLogger(JpaAdminService.class);

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public JpaAdminService(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean authenticate(String username, String password) {
        Admin admin = adminRepository.findByUsername(username)
                .orElse(null);

        if (admin == null) {
            return false;
        }

        return passwordEncoder.matches(password, admin.getPassword());
    }

    @Override
    public void initDefaultAdmin() {
        if (adminRepository.findByUsername("Ashish").isEmpty()) {
            String password = System.getenv("ADMIN_PASSWORD");

            if (password == null || password.isBlank()) {
                logger.warn("ADMIN_PASSWORD environment variable is not set. Skipping default admin initialization in local profile.");
                return;
            }

            Admin admin = new Admin(
                    "Ashish",
                    passwordEncoder.encode(password)
            );

            adminRepository.save(admin);
            logger.info("Admin account created successfully in PostgreSQL (local profile).");
        }
    }
}
