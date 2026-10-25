package com.ashish.portfoliobackend.config;

import com.ashish.portfoliobackend.service.AdminService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createAdmin(AdminService adminService) {
        return args -> {
            adminService.initDefaultAdmin();
        };
    }
}
