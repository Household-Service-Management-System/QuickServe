package com.backend.dtos;

import com.backend.entities.Booking;
import com.backend.entities.PaymentMethod;
import com.backend.entities.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class PaymentDTO {
	
    private Long bookingId;
    
    private double amount;

    private PaymentMethod method;

    private String transactionId;

    private PaymentStatus status;
    

}
