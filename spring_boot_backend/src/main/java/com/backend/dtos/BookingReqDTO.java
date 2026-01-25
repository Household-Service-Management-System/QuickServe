package com.backend.dtos;

import java.time.LocalDateTime;

import com.backend.entities.BookingStatus;
import com.backend.entities.Service;
import com.backend.entities.ServiceProvider;
import com.backend.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BookingReqDTO {
	 private Long user_id;
	 private Long service_id;
	 private Long serviceProvider_id;
   private LocalDateTime scheduledAt;
   private double price;
   private BookingStatus status;
   private String rejectionReason;
}
