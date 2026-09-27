package com.ashish.portfoliobackend.config;

import com.ashish.portfoliobackend.model.Admin;
import com.ashish.portfoliobackend.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createAdmin(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            if (adminRepository.findByUsername("Ashish").isEmpty()) {

                String password = System.getenv("ADMIN_PASSWORD");

                if (password == null || password.isBlank()) {
                    throw new IllegalStateException(
                            "ADMIN_PASSWORD environment variable is not set"
                    );
                }

                Admin admin = new Admin(
                        "Ashish",
                        passwordEncoder.encode(password)
                );

                adminRepository.save(admin);

                System.out.println("Admin account created successfully.");
            }
        };
    }
}