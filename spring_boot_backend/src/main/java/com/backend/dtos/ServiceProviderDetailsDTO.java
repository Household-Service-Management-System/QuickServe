package com.backend.dtos;

import java.util.Set;
import com.backend.entities.GovIdType;
import com.backend.entities.Role;
import com.backend.entities.Service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@AllArgsConstructor
@Getter @Setter
public class ServiceProviderDetailsDTO {

    private String firstName;
    private String lastName;
    private String address;
    private String email;
    private Role role;
    private String phone;

   

    private String certification;
    private String govId;
    private GovIdType govIdType;
}
