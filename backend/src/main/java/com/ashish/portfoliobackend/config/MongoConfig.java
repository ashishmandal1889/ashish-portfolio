package com.ashish.portfoliobackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@Profile("prod")
@EnableMongoRepositories(basePackages = "com.ashish.portfoliobackend.repository.mongo")
public class MongoConfig {
}
