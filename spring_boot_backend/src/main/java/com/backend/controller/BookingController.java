package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.BookingRequestFinalDTO;
import com.backend.dtos.BookingResponseDTO;
import com.backend.entities.ServiceProvider;
import com.backend.repository.ServiceProviderRepository;
import com.backend.service.BookingService;

import io.jsonwebtoken.Claims;





@RestController
@RequestMapping("/bookings")
@CrossOrigin
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }
    
    @Autowired
    private ServiceProviderRepository serviceProviderRepo;
    
    private ServiceProvider getLoggedInProvider(Authentication authentication) {
        Claims claims = (Claims) authentication.getPrincipal();
        Long userId = ((Number) claims.get("userId")).longValue();

        return serviceProviderRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Service provider not found"));
    }

    @PostMapping
    public ResponseEntity<BookingResponseDTO> createBooking(
            @org.springframework.web.bind.annotation.RequestBody BookingRequestFinalDTO request, Authentication authentication
    ) {
    	Claims claims = (Claims) authentication.getPrincipal();
    	Long userId = ((Number) claims.get("userId")).longValue();
    	
        return ResponseEntity.ok(
                bookingService.createBooking(request, userId)
        );
    }
}