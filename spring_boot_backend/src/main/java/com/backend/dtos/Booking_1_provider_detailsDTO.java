package com.backend.dtos;

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
public class Booking_1_provider_detailsDTO {
	private Long providerId;
	private String fullName;
	private String profileImage;
	private Boolean verified;
	private String city;
	
}
