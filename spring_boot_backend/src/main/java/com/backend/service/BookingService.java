package com.backend.service;



import com.backend.dtos.BookingRequestFinalDTO;
import com.backend.dtos.BookingResponseDTO;



public interface BookingService {
	public BookingResponseDTO createBooking(BookingRequestFinalDTO request, Long userId);
}
