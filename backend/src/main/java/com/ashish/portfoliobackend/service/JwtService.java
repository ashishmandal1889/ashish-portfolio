
package com.ashish.portfoliobackend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey key;

    // Read the JWT signing secret from an environment variable.
    public JwtService(@Value("${JWT_SECRET}") String secret) {
        if (secret == null || secret.isBlank()) {
            throw new IllegalStateException(
                    "JWT_SECRET environment variable must be configured"
            );
        }

        byte[] secretBytes = secret.getBytes(StandardCharsets.UTF_8);

        // HS256 requires a key of at least 32 bytes.
        if (secretBytes.length < 32) {
            throw new IllegalStateException(
                    "JWT_SECRET must contain at least 32 bytes"
            );
        }

        this.key = Keys.hmacShaKeyFor(secretBytes);
    }

    // Generate a JWT that expires after 24 hours.
    public String generateToken(String username) {
        if (username == null || username.isBlank()) {
            throw new IllegalArgumentException(
                    "Username must not be blank"
            );
        }

        Date now = new Date();
        Date expiration = new Date(now.getTime() + 24L * 60 * 60 * 1000);

        return Jwts.builder()
                .subject(username)
                .issuedAt(now)
                .expiration(expiration)
                .signWith(key)
                .compact();
    }

    // Verify the signature and extract the username.
    public String extractUsername(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // Invalid signatures, expired tokens, and malformed tokens are rejected.
    public boolean isTokenValid(String token) {
        if (token == null || token.isBlank()) {
            return false;
        }

        try {
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);

            return true;
        } catch (io.jsonwebtoken.JwtException
                 | IllegalArgumentException ex) {
            return false;
        }
    }
}
