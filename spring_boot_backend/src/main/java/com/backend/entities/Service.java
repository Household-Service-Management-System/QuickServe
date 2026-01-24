package com.backend.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name="services")
@Getter
@Setter
@AttributeOverride(name = "id", column = @Column(name = "service_id"))
public class Service extends BaseEntity{
	
	@Column(name="name", nullable = false)
	private String name;
	
	@Column(name="base_price", nullable = false)
	private double basePrice;
	
	
	@Column(name="duration_minutes")
	private int duration;
	
//	@Column(name="is_deleted")
//	private boolean isDeleted= false;
	
	@Column(name="is_available")
	@Enumerated(EnumType.STRING)
	private Status isAvailable;
	
	
//	@Column(name="is_available", nullable = false)
//	private Status isAvailable;
	
	 
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="category_id", nullable = false)
	private ServiceCategory category;
	
	
	@ManyToMany(mappedBy = "services", fetch = FetchType.LAZY)
	private Set<ServiceProvider> serviceProviders = new HashSet<>();
}
