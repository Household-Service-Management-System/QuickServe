package com.backend.dtos;

import lombok.*;

@Getter
@Setter
public class RegisterAdminDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String password;
}
