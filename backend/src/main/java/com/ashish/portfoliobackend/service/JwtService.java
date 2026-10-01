package com.ashish.portfoliobackend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    // Development secret key
    private static final String SECRET_KEY =
            "AshishPortfolioJwtSecretKey2026ForDevelopmentOnly123456";

    // Token will expire after 24 hours
    private static final long EXPIRATION_TIME =
            1000 * 60 * 60 * 24;

    private final SecretKey key;

    public JwtService() {
        this.key = Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes(StandardCharsets.UTF_8)
        );
    }

    // Generate JWT token after successful login
    public String generateToken(String username) {

        Date now = new Date();

        Date expiration = new Date(
                now.getTime() + EXPIRATION_TIME
        );

        return Jwts.builder()
                .subject(username)
                .issuedAt(now)
                .expiration(expiration)
                .signWith(key)
                .compact();
    }

    // Get username from JWT token
    public String extractUsername(String token) {

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // Check whether JWT token is valid
    public boolean isTokenValid(String token) {

        try {

            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }
}
