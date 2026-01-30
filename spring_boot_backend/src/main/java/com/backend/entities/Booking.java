package com.backend.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@AttributeOverride(name = "id", column = @Column(name = "booking_id"))
public class Booking extends BaseEntity {
	
	 @ManyToOne(fetch = FetchType.LAZY)
	 @JoinColumn(name = "user_id", nullable = false)
	 private User user;
	
	 @ManyToOne(fetch = FetchType.LAZY)
	 @JoinColumn(name = "service_id", nullable = false)
	 private Service service;
	
	 @ManyToOne(fetch = FetchType.LAZY)
	 @JoinColumn(name = "provider_id", nullable = false)
	 private ServiceProvider serviceProvider;
	    
	@Column(name = "scheduled_at", nullable = false)
    private LocalDateTime scheduledAt;
	
	@Column(nullable = false)
    private double price;
	
	@Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;
	
	
	@Column(name = "rejection_reason", nullable = true)
    private String rejectionReason;
	
}
