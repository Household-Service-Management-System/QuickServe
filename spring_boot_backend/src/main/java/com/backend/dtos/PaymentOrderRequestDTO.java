package com.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentOrderRequestDTO {
    private Long bookingId;
    private double amount;
}
