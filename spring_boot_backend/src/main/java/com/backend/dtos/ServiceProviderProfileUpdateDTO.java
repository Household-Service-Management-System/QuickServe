package com.backend.dtos;

import java.time.LocalDate;

import lombok.*;

@Getter
@Setter
public class ServiceProviderProfileUpdateDTO {
	private String firstName;
    private String lastName;
    private String phone;
    private String street;
    private String city;
    private String state;
    private String pincode;
    private LocalDate dob;
    private String gender;
    private String profileImage;
}
