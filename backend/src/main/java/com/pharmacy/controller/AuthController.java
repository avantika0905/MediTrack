package com.pharmacy.controller;

import com.pharmacy.dto.AuthDto;
import com.pharmacy.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthDto.AuthResponse> register(@RequestBody AuthDto.RegisterRequest request, HttpServletResponse response) {
        logger.info("Register request received: {}", request);
        AuthDto.AuthResponse authResponse = authService.register(request, response);
        logger.info("User registered successfully: {}", authResponse);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDto.AuthResponse> login(@RequestBody AuthDto.LoginRequest request, HttpServletResponse response) {
        logger.info("Login request received for email: {}", request.getEmail());
        AuthDto.AuthResponse authResponse = authService.login(request, response);
        logger.info("User logged in successfully: {}", authResponse);
        return ResponseEntity.ok(authResponse);
    }
}
