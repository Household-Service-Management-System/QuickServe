package com.backend.dtos;

import com.backend.entities.Booking;
import com.backend.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReviewDTO {
    private Long bookingId;
    private Long userId;
    private int rating;
    private String comment;
}
