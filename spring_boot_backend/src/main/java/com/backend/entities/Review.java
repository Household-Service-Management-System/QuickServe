package com.backend.entities;


import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@AttributeOverride(name = "id", column = @Column(name = "review_id"))
public class Review extends BaseEntity{
	
	
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false, unique = true)
    private Booking booking;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
	
	@Min(1)
    @Max(5)
    @Column
    private int rating;

    @Column(nullable = true, length = 500)
    private String comment;

   
}
