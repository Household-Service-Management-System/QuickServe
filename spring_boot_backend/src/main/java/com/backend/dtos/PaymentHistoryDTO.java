package com.backend.dtos;

import java.time.LocalDateTime;
import com.backend.entities.PaymentStatus; // Import your actual Enum
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class PaymentHistoryDTO {
    private LocalDateTime date;
    private String customerName;
    private Long bookingId;
    private double amount; // Match primitive double in Payment entity
    private String status;
    private String transactionId;

    // Manual constructor to handle the exact types Hibernate will pass
    public PaymentHistoryDTO(LocalDateTime date, String customerName, Long bookingId, double amount, PaymentStatus status, String transactionId) {
        this.date = date;
        this.customerName = customerName;
        this.bookingId = bookingId;
        this.amount = amount;
        this.status = status != null ? status.name() : null; // Convert Enum to String here
        this.transactionId = transactionId;
    }
}