package com.backend.dtos;


import com.backend.entities.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PaymentBookingUserDTO {

    private Long bookingId;
    private BookingStatus bookingStatus;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;

    private double amount;
    private String transactionId;
}

