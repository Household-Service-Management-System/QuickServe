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

import com.backend.dtos.CategoryResponseDTO;
import com.backend.dtos.PaymentHistoryDTO;
import com.backend.dtos.PopularServiceDTO;
import com.backend.dtos.ServiceProviderBookingResponseDTO;
import com.backend.dtos.ServiceProviderDashboardDTO;
import com.backend.dtos.ServiceProviderProfileUpdateDTO;
import com.backend.service.ServiceProviderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import com.backend.dtos.ServiceProviderUpcomingBookingDTO;

@RestController
@RequestMapping("/service-provider")
public class ServiceProviderController {
	
	@Autowired
    private ServiceProviderService ServiceProviderService;

	
	//All below endpoints are for Service Provider Dashboard
	
	//1. It is for the Ist upper portion : revenue and all for a particular service-provider  
    @GetMapping("/dashboard/{id}")
    public ResponseEntity<ServiceProviderDashboardDTO> getProviderDashboard(@PathVariable Long id) {
        return ResponseEntity.ok(ServiceProviderService.getDashboardSummary(id));
    }
    
//    @GetMapping
//    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
//    return ResponseEntity.ok(categoryService.getAllCategories());
//    }
    
    //2. It is for Mid portion : upcoming bookings for a particular service-provider 
    @GetMapping("/bookings/{id}/upcoming")
    public ResponseEntity<Page<ServiceProviderUpcomingBookingDTO>> getUpcomingBookings(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size) {

        return ResponseEntity.ok(
            ServiceProviderService.getUpcomingBookings(id, page, size)
        );
    }

    
    @GetMapping("/dashboard/{id}/popular-services")
    public ResponseEntity<List<PopularServiceDTO>> getPopularServices(
            @PathVariable Long id) {

        return ResponseEntity.ok(
            ServiceProviderService.getPopularServices(id)
        );
    }

    
    
    
    @GetMapping("/bookings/{id}")
    public List<ServiceProviderBookingResponseDTO> getBookings(@PathVariable Long id) {
        return ServiceProviderService.getAllBookings(id);
    }
    
    
    // GET /service-provider/bookings/details/{bookingId}
    @GetMapping("/bookings/details/{bookingId}")
    public ResponseEntity<ServiceProviderBookingResponseDTO> getBookingDetails(
            @PathVariable Long bookingId) {

        return ResponseEntity.ok(
            ServiceProviderService.getSingleBookingDetails(bookingId)
        );
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
    
    
   
    @GetMapping("/profile/{id}")
    public ResponseEntity<ServiceProviderProfileUpdateDTO> getProfile(
            @PathVariable Long id) {

        return ResponseEntity.ok(
            ServiceProviderService.getProfile(id)
        );
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