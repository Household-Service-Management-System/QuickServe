package com.backend.dtos;

import com.backend.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponseDTO {
    private String token;
    private Long userId;
    private String email;
    private Role role;
}

