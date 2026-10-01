package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.service.AdminService;
import com.ashish.portfoliobackend.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AdminService adminService;
    private final JwtService jwtService;

    public AuthController(
            AdminService adminService,
            JwtService jwtService
    ) {
        this.adminService = adminService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        boolean authenticated = adminService.authenticate(
                request.username(),
                request.password()
        );

        if (!authenticated) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }

        String token = jwtService.generateToken(
                request.username()
        );

        return ResponseEntity.ok(
                new LoginResponse(token)
        );
    }

    public record LoginRequest(
            String username,
            String password
    ) {
    }

    public record LoginResponse(
            String token
    ) {
    }
}