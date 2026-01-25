package com.backend.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "user_id"))
public class User extends BaseEntity{
	
	
	@Column(name="first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name="last_name", nullable = false, length = 50)
    private String lastName;
    
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;
	
	@Column(name="email",nullable = false)
	private String email;
	
	@Column(name="phone",nullable = false)
	private String phone;
	
	@Column(name="password",nullable = false)
	private String password;
	
	@Column(name="street",nullable = true)
	private String street;
	
	@Column(name="city",nullable = true)
	private String city;
	
	@Column(name="state",nullable = true)
	private String state;
	
	@Column(name="pincode",nullable = true)
	private String pincode;
	
	@Column(name="dob",nullable = true)
	private LocalDate dob;
	
	@Column(name="gender",nullable = true)
	private String gender;
	
	@Column(name="last_login",nullable = true)
	private LocalDateTime lastLogin;
	
	@Column(name="is_active",nullable = true)
	private Status isActive;
	
	@Column(name="deactive_time",nullable = true)
	private LocalDateTime deactivationTime;
	
	@Column(name="deactive_reason",nullable = true)
	private String deactiveReason;
	
	//future_scope
	@Column(columnDefinition = "json", nullable = true)
	private String preferences; 
	
	public String getFullName() {
	    return this.firstName + " " + this.lastName;
	}
}
