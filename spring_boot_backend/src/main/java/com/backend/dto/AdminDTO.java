package com.backend.dto;

public record AdminDTO(
        Long id,
        String fullName,
        String email,
        String phone,
        String city,
        String state
) {}
