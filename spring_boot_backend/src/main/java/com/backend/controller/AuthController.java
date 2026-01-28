package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.dtos.LoginRequestDTO;
import com.backend.dtos.RegisterCustomerDTO;
import com.backend.dtos.RegisterServiceProviderDTO;
import com.backend.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // -------- CUSTOMER REGISTER --------
    @PostMapping("/register/customer")
    public ResponseEntity<?> registerCustomer(
            @RequestBody RegisterCustomerDTO dto) {

        return ResponseEntity.ok(authService.registerCustomer(dto));
    }

    // -------- SERVICE PROVIDER REGISTER --------
    @PostMapping("/register/provider")
    public ResponseEntity<?> registerProvider(
            @RequestBody RegisterServiceProviderDTO dto) {

        return ResponseEntity.ok(authService.registerServiceProvider(dto));
    }

    // -------- LOGIN --------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }
}
