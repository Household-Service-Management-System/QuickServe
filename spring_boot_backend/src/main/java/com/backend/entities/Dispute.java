package com.backend.entities;


import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "disputes")
@Getter
@Setter
@ToString
@AttributeOverride(name = "id", column = @Column(name = "dispute_id"))
public class Dispute extends BaseEntity{
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "raised_by_user_id", nullable = false)
    private User raisedBy;

	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false, unique = true)
    private Booking booking;
	
	//admin's userId will be used 
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "resolved_by_user_id", nullable = true)
	private User resolvedBy;
	
	@Column(nullable = false, length = 500)
	private String description;

		
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DisputeStatus status;
	    
	
}
