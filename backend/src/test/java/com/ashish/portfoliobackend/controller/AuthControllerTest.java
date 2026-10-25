package com.ashish.portfoliobackend.controller;

import com.ashish.portfoliobackend.service.AdminService;
import com.ashish.portfoliobackend.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    private AdminService adminService;
    private JwtService jwtService;
    private AuthController authController;

    @BeforeEach
    void setUp() {
        adminService = mock(AdminService.class);
        jwtService = mock(JwtService.class);
        authController = new AuthController(adminService, jwtService);
    }

    @Test
    void login_successfulAuthentication_shouldReturnJwtToken() {
        when(adminService.authenticate("Ashish", "correct_password")).thenReturn(true);
        when(jwtService.generateToken("Ashish")).thenReturn("mock.jwt.token");

        AuthController.LoginRequest request = new AuthController.LoginRequest("Ashish", "correct_password");
        ResponseEntity<?> response = authController.login(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof AuthController.LoginResponse);
        assertEquals("mock.jwt.token", ((AuthController.LoginResponse) response.getBody()).token());
    }

    @Test
    void login_invalidCredentials_shouldReturn401Unauthorized() {
        when(adminService.authenticate("Ashish", "wrong_password")).thenReturn(false);

        AuthController.LoginRequest request = new AuthController.LoginRequest("Ashish", "wrong_password");
        ResponseEntity<?> response = authController.login(request);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Invalid username or password", response.getBody());
    }
}
