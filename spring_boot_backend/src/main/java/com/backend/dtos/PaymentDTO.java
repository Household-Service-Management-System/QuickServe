package com.backend.dtos;

import java.time.LocalDateTime;

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

    private Long paymentId;

    private Long bookingId;

    private String serviceName;

    private String providerName;

    private double amount;

    private PaymentMethod method;

    private String transactionId;

    private PaymentStatus status;

    private LocalDateTime createdOn;
}
