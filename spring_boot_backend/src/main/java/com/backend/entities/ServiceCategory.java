package com.backend.entities;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="service_categories")
@Getter
@Setter
@AttributeOverride(name = "id", column = @Column(name = "category_id"))
public class ServiceCategory extends BaseEntity{
	
	@Column(nullable = false, unique = true)
	private String name;
	
	@Column(name="description")
	private String description;
	
	@Column(name = "service_image", nullable = true)
	private String serviceImage;
}
