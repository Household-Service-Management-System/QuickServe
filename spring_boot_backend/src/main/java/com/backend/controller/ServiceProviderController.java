package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.ServiceProviderBookingResponseDTO;
import com.backend.dtos.ServiceProviderDashboardDTO;
import com.backend.service.ServiceProviderService;

@RestController
@RequestMapping("/service-provider")
public class ServiceProviderController {
	
	@Autowired
    private ServiceProviderService providerService;

    @GetMapping("/{id}/dashboard")
    public ResponseEntity<ServiceProviderDashboardDTO> getProviderDashboard(@PathVariable Long id) {
        return ResponseEntity.ok(providerService.getDashboardSummary(id));
    }
    
    
    @GetMapping("/{id}/bookings")
    public List<ServiceProviderBookingResponseDTO> getBookings(@PathVariable Long id) {
        return providerService.getAllBookings(id);
    }
    
    @PatchMapping("/bookings/{id}/accept")
    public ResponseEntity<?> acceptBooking(@PathVariable Long id) {
        providerService.acceptBooking(id);
        return ResponseEntity.ok("Booking accepted successfully");
    }

    @PatchMapping("/bookings/{id}/reject")
    public ResponseEntity<?> rejectBooking(@PathVariable Long id, @RequestBody String reason) {
        providerService.rejectBooking(id, reason);
        return ResponseEntity.ok("Booking rejected successfully");
    }
}