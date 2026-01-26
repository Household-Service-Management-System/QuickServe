package com.backend.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.backend.dtos.PaymentHistoryDTO;
import com.backend.dtos.ServiceProviderBookingResponseDTO;
import com.backend.dtos.ServiceProviderDashboardDTO;
import com.backend.dtos.ServiceProviderProfileUpdateDTO;
import com.backend.service.ServiceProviderService;

@RestController
@RequestMapping("/service-provider")
public class ServiceProviderController {
	
	@Autowired
    private ServiceProviderService ServiceProviderService;

    @GetMapping("/dashboard/{id}")
    public ResponseEntity<ServiceProviderDashboardDTO> getProviderDashboard(@PathVariable Long id) {
        return ResponseEntity.ok(ServiceProviderService.getDashboardSummary(id));
    }
    
    
    @GetMapping("/bookings/{id}")
    public List<ServiceProviderBookingResponseDTO> getBookings(@PathVariable Long id) {
        return ServiceProviderService.getAllBookings(id);
    }
    
    
    @PatchMapping("/bookings/{id}/accept")
    public ResponseEntity<?> acceptBooking(@PathVariable Long id) {
    	ServiceProviderService.acceptBooking(id);
        return ResponseEntity.ok("Booking accepted successfully");
    }

    @PatchMapping("/bookings/{id}/reject")
    public ResponseEntity<?> rejectBooking(@PathVariable Long id, @RequestBody String reason) {
    	ServiceProviderService.rejectBooking(id, reason);
        return ResponseEntity.ok("Booking rejected successfully");
    }
    
    @GetMapping("/payments/{providerId}")
    public ResponseEntity<List<PaymentHistoryDTO>> getPaymentHistory(@PathVariable Long providerId) {
        return ResponseEntity.ok(ServiceProviderService.getPaymentHistory(providerId));
    }
    
    
 // GET /service-provider/payments/{id}/search?query=rohit&filter=This month
    @GetMapping("/payments/{id}/search")
    public ResponseEntity<List<PaymentHistoryDTO>> searchPayments(
            @PathVariable Long id,
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "All") String filter) {
        return ResponseEntity.ok(ServiceProviderService.getFilteredPayments(id, query, filter));
    }
    
 // Endpoint: PUT /service-provider/profile/{id}
    @PutMapping("/profile/{id}")
    public ResponseEntity<String> updateProfile(
            @PathVariable Long id, 
            @RequestBody ServiceProviderProfileUpdateDTO profileDto) {
        
        ServiceProviderService.updateProfile(id, profileDto);
        return ResponseEntity.ok("Profile updated successfully!");
    }
    
    
 
    @GetMapping("/{id}/services")
    public ResponseEntity<Set<com.backend.entities.Service>> getMyServices(@PathVariable Long id) {
        return ResponseEntity.ok(ServiceProviderService.getProviderServices(id));
    }

   
    @PostMapping("/{id}/services/{serviceId}")
    public ResponseEntity<String> addSkill(@PathVariable Long id, @PathVariable Long serviceId) {
        ServiceProviderService.addServiceToProvider(id, serviceId);
        return ResponseEntity.ok("Service added to your profile");
    }

  
    @DeleteMapping("/{id}/services/{serviceId}")
    public ResponseEntity<String> removeSkill(@PathVariable Long id, @PathVariable Long serviceId) {
        ServiceProviderService.removeServiceFromProvider(id, serviceId);
        return ResponseEntity.ok("Service removed from your profile");
    }
}