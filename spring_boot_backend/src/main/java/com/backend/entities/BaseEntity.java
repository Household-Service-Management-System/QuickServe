package com.backend.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@MappedSuperclass 
@ToString 
@Getter 
@Setter 
public class BaseEntity {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private Long id; 
	
	@Column(name="created_on") 
	@CreationTimestamp 
	private LocalDateTime createdOn; 
	
	@Column(name="updated_on") 
	@UpdateTimestamp 
	private LocalDateTime updatedOn; 
}
