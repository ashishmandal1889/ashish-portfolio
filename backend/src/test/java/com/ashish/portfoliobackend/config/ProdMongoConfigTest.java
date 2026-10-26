package com.ashish.portfoliobackend.config;

import org.junit.jupiter.api.Test;
import org.springframework.boot.mongodb.autoconfigure.MongoProperties;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.data.mongodb.MongoDatabaseFactory;

import static org.assertj.core.api.Assertions.assertThat;

class ProdMongoConfigTest {

    @Test
    void shouldBindSpringMongoPropertiesCorrectlyInProd() {
        new ApplicationContextRunner()
                .withPropertyValues(
                        "spring.mongodb.uri=mongodb://localhost:27017",
                        "spring.mongodb.database=portfolio_db"
                )
                .withConfiguration(org.springframework.boot.autoconfigure.AutoConfigurations.of(
                        org.springframework.boot.mongodb.autoconfigure.MongoAutoConfiguration.class,
                        org.springframework.boot.data.mongodb.autoconfigure.DataMongoAutoConfiguration.class
                ))
                .run(context -> {
                    assertThat(context).hasNotFailed();
                    MongoProperties properties = context.getBean(MongoProperties.class);
                    assertThat(properties.getUri()).isEqualTo("mongodb://localhost:27017");
                    assertThat(properties.getDatabase()).isEqualTo("portfolio_db");
                    assertThat(properties.getMongoClientDatabase()).isEqualTo("portfolio_db");

                    MongoDatabaseFactory factory = context.getBean(MongoDatabaseFactory.class);
                    assertThat(factory.getMongoDatabase().getName()).isEqualTo("portfolio_db");
                });
    }

    @Test
    void shouldDefaultDatabaseToPortfolioDbWhenEnvNotSet() {
        new ApplicationContextRunner()
                .withPropertyValues(
                        "spring.mongodb.uri=mongodb://localhost:27017",
                        "spring.mongodb.database=${MONGODB_DATABASE:portfolio_db}"
                )
                .withConfiguration(org.springframework.boot.autoconfigure.AutoConfigurations.of(
                        org.springframework.boot.mongodb.autoconfigure.MongoAutoConfiguration.class,
                        org.springframework.boot.data.mongodb.autoconfigure.DataMongoAutoConfiguration.class
                ))
                .run(context -> {
                    assertThat(context).hasNotFailed();
                    MongoProperties properties = context.getBean(MongoProperties.class);
                    assertThat(properties.getDatabase()).isEqualTo("portfolio_db");
                    assertThat(properties.getMongoClientDatabase()).isEqualTo("portfolio_db");

                    MongoDatabaseFactory factory = context.getBean(MongoDatabaseFactory.class);
                    assertThat(factory.getMongoDatabase().getName()).isEqualTo("portfolio_db");
                });
    }

    @Test
    void shouldFailWhenDatabaseNameIsNotConfiguredUnderSpringMongodb() {
        // Reproduces the exact Render crash: spring.data.mongodb.database was ignored by Spring Boot 4
        new ApplicationContextRunner()
                .withPropertyValues(
                        "spring.mongodb.uri=mongodb://localhost:27017",
                        "spring.data.mongodb.database=portfolio_db"
                )
                .withConfiguration(org.springframework.boot.autoconfigure.AutoConfigurations.of(
                        org.springframework.boot.mongodb.autoconfigure.MongoAutoConfiguration.class,
                        org.springframework.boot.data.mongodb.autoconfigure.DataMongoAutoConfiguration.class
                ))
                .run(context -> {
                    assertThat(context).hasFailed();
                    assertThat(context.getStartupFailure())
                            .hasRootCauseInstanceOf(IllegalArgumentException.class)
                            .hasRootCauseMessage("Database name must not be empty");
                });
    }
}


