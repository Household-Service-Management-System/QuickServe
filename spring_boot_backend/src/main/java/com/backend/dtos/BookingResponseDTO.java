package com.backend.dtos;


import lombok.Data;

import java.time.LocalDateTime;

import com.backend.entities.BookingStatus;

@Data
public class BookingResponseDTO {

    private Long bookingId;
    private Long serviceId;
    private Long providerId;
    private Long userId;

    private LocalDateTime scheduledAt;
    private Double price;
    private BookingStatus status;
}