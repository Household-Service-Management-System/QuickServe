package com.backend.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDetailDTO {
	private Long id;
	private String name;
	private String categoryName;
	private Double basePrice;
	private Integer duration;
	private String availability;
	private String description; 
	private String image; 
}
