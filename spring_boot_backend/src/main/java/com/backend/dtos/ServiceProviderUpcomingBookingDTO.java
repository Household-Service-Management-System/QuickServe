package com.backend.dtos;

import com.backend.entities.BookingStatus;
import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceProviderUpcomingBookingDTO {

    private Long bookingId;
    private String customerName;
    private String serviceName;

    private LocalDate date;
    private String timeSlot;

    private BookingStatus status;
}
