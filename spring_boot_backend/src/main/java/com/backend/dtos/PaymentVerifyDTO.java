package com.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentVerifyDTO {

    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;

    private Long bookingId;
    private Double amount;
}
