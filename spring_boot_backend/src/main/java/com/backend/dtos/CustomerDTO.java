package com.backend.dtos;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {

	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private String street;
	private String city;
	private String state;
	private String pincode;
	private LocalDate dob;
	private String gender;
	
	
	public String getFullName() {
	    return this.firstName + " " + this.lastName;
	}
	
}
