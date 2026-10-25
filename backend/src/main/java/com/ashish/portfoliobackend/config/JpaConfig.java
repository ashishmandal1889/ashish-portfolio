package com.ashish.portfoliobackend.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@Profile("local")
@EnableJpaRepositories(
        basePackages = "com.ashish.portfoliobackend.repository",
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.REGEX,
                pattern = "com\\.ashish\\.portfoliobackend\\.repository\\.mongo\\..*"
        )
)
public class JpaConfig {
}
