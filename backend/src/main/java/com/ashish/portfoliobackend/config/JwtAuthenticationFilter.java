package com.ashish.portfoliobackend.config;

import com.ashish.portfoliobackend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
) throws ServletException, IOException {

    String authHeader = request.getHeader("Authorization");

    System.out.println("JWT filter called: " + request.getRequestURI());
    System.out.println("Authorization header present: " + (authHeader != null));

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        System.out.println("No valid Bearer header found");
        filterChain.doFilter(request, response);
        return;
    }

    String token = authHeader.substring(7);
    boolean valid = jwtService.isTokenValid(token);

    System.out.println("JWT valid: " + valid);

    if (valid) {
        String username = jwtService.extractUsername(token);

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        Collections.emptyList()
                );

        authentication.setDetails(
                new WebAuthenticationDetailsSource()
                        .buildDetails(request)
        );

        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);

        System.out.println("Authentication set: " +
                SecurityContextHolder.getContext()
                        .getAuthentication().isAuthenticated());
    }

    filterChain.doFilter(request, response);
}
}