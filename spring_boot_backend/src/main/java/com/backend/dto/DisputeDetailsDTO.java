package com.backend.dto;

import com.backend.entities.DisputeStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DisputeDetailsDTO {

	private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String description;
    private DisputeStatus status;

    
}