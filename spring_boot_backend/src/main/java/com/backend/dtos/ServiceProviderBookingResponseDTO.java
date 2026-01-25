package com.backend.dtos;

import com.backend.entities.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceProviderBookingResponseDTO {
	private Long bookingId;
    private String customerName;
    private String serviceName;  
    private LocalDateTime date;  
    private double amount;       
    private BookingStatus status;
}
