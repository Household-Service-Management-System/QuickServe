package com.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentOrderResponseDTO {
    private String orderId;
    private String currency;
    private Integer amount;
    private String razorpayKey;
}
