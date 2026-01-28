package com.backend.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ServicesFromCategoriesDTO {
	private Long id;
	private String name;
	private double basePrice;
	private Integer duration;
	private String serviceImage;
}
