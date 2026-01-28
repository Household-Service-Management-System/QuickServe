package com.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterCustomerDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String password;
}

