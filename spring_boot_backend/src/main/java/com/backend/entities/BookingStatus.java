package com.backend.entities;

public enum BookingStatus {
	PENDING, // user created booking
    ACCEPTED, // provider accepted
    REJECTED, // provider rejected
    COMPLETED, // service done
    CANCELLED
}
