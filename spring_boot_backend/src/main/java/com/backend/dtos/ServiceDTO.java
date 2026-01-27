package com.backend.dtos;

import com.backend.entities.ServiceCategory;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ServiceDTO {
    
	private Long id;
    private String name;
    private double basePrice;
    private int duration;
    private String categoryName;
    private String status;
}
