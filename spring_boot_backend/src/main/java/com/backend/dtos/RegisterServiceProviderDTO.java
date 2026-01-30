package com.backend.dtos;

import com.backend.entities.GovIdType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterServiceProviderDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String password;

    private GovIdType govIdType;
    private String govId;
}

