package com.ashish.portfoliobackend.service.mongo;

import com.ashish.portfoliobackend.document.AdminDocument;
import com.ashish.portfoliobackend.repository.mongo.MongoAdminRepository;
import com.ashish.portfoliobackend.service.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Profile("prod")
public class MongoAdminService implements AdminService {

    private static final Logger logger = LoggerFactory.getLogger(MongoAdminService.class);

    private final MongoAdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public MongoAdminService(
            MongoAdminRepository adminRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean authenticate(String username, String password) {
        AdminDocument admin = adminRepository.findByUsername(username)
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
                logger.warn("ADMIN_PASSWORD environment variable is not set. Skipping default admin initialization in prod profile.");
                return;
            }

            AdminDocument admin = new AdminDocument(
                    "Ashish",
                    passwordEncoder.encode(password)
            );

            adminRepository.save(admin);
            logger.info("Admin account created successfully in MongoDB (prod profile).");
        }
    }
}
