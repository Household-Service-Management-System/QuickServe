package com.backend.dtos;

import java.time.LocalDateTime;

import com.backend.entities.Booking;
import com.backend.entities.BookingStatus;
import com.backend.entities.DisputeStatus;
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
public class DisputeDTO {
    private Long raisedById;
    private Long bookingId;
	private Long resolvedById;
	private String description;
    private DisputeStatus status;

}
