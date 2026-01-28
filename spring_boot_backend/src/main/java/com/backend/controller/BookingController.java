package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.BookingRequestFinalDTO;
import com.backend.dtos.BookingResponseDTO;
import com.backend.service.BookingService;

@RestController
@RequestMapping("/bookings")
@CrossOrigin
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<BookingResponseDTO> createBooking(
            @org.springframework.web.bind.annotation.RequestBody BookingRequestFinalDTO request
    ) {
        return ResponseEntity.ok(
                bookingService.createBooking(request)
        );
    }
}