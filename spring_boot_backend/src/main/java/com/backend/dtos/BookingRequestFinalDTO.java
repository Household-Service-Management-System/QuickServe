package com.backend.dtos;

import lombok.Data;

@Data
public class BookingRequestFinalDTO {

    private Long serviceId;
    private Long providerId;
    private Long userId;

    private String date;       // "2026-01-30"
    private String startTime;  // "10:00"
}