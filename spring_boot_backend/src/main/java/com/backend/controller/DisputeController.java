package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.DisputeDTO;
import com.backend.service.DisputeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/disputes")
@RequiredArgsConstructor
public class DisputeController {

    private final DisputeService disputeService;

    // Create dispute (user / provider)
    @PostMapping
    public ResponseEntity<?> createDispute(
            @RequestBody DisputeDTO dto,
            Authentication authentication
    ) {
        return ResponseEntity.ok(disputeService.create(dto, authentication));
    }

    // Get dispute by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity.ok(disputeService.getById(id));
    }

    // Get disputes for logged-in user / provider
    @GetMapping("/my")
    public ResponseEntity<?> getMyDisputes(Authentication authentication) {
        return ResponseEntity.ok(disputeService.getMyDisputes(authentication));
    }

    // Update dispute status (admin / support)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDispute(
            @PathVariable Long id,
            @RequestBody DisputeDTO dto
    ) {
        return ResponseEntity.ok(disputeService.update(id, dto));
    }
}
