package com.ashish.portfoliobackend;

import com.ashish.portfoliobackend.service.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(properties = {
        "spring.autoconfigure.exclude="
                + "org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration,"
                + "org.springframework.boot.hibernate.autoconfigure.HibernateJpaAutoConfiguration,"
                + "org.springframework.boot.jdbc.autoconfigure.DataSourceTransactionManagerAutoConfiguration,"
                + "org.springframework.boot.data.jpa.autoconfigure.DataJpaRepositoriesAutoConfiguration,"
                + "org.springframework.boot.mongodb.autoconfigure.MongoAutoConfiguration,"
                + "org.springframework.boot.data.mongodb.autoconfigure.DataMongoAutoConfiguration,"
                + "org.springframework.boot.data.mongodb.autoconfigure.DataMongoRepositoriesAutoConfiguration",
        "JWT_SECRET=test_secret_key_at_least_32_bytes_long_123456789",
        "ADMIN_PASSWORD=test_password"
})
@ActiveProfiles("test")
@Import(PortfolioBackendApplicationTests.MockServiceConfig.class)
class PortfolioBackendApplicationTests {

    @TestConfiguration
    static class MockServiceConfig {
        @Bean AboutService aboutService() { return Mockito.mock(AboutService.class); }
        @Bean ContactService contactService() { return Mockito.mock(ContactService.class); }
        @Bean CredentialService credentialService() { return Mockito.mock(CredentialService.class); }
        @Bean EducationService educationService() { return Mockito.mock(EducationService.class); }
        @Bean ExperienceService experienceService() { return Mockito.mock(ExperienceService.class); }
        @Bean ProjectService projectService() { return Mockito.mock(ProjectService.class); }
        @Bean SkillService skillService() { return Mockito.mock(SkillService.class); }
        @Bean AdminService adminService() { return Mockito.mock(AdminService.class); }
    }

    @Test
    void contextLoads() {
    }
}
