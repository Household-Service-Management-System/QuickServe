package com.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServiceUpdateDTO {
    private String name;
    private double basePrice;
    private int duration;
    private Long categoryId;
    private String isAvailable; // AVAILABLE / INACTIVE
}
