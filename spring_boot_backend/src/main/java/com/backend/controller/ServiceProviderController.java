
package com.backend.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.backend.dtos.*;
import com.backend.entities.ServiceProvider;
import com.backend.repository.ServiceProviderRepository;
import com.backend.dtos.Booking_1_provider_detailsDTO;
import com.backend.dtos.CategoryResponseDTO;
import com.backend.dtos.PaymentHistoryDTO;
import com.backend.dtos.PopularServiceDTO;
import com.backend.dtos.ServiceProviderBookingResponseDTO;
import com.backend.dtos.ServiceProviderDashboardDTO;
import com.backend.dtos.ServiceProviderProfileUpdateDTO;
import com.backend.service.ServiceProviderService;

import io.jsonwebtoken.Claims;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/service-provider")
public class ServiceProviderController {

    @Autowired
    private ServiceProviderService serviceProviderService;

    @Autowired
    private ServiceProviderRepository serviceProviderRepo;

    
      //Just a helper method to get the logged-in service provider
    
    private ServiceProvider getLoggedInProvider(Authentication authentication) {
        Claims claims = (Claims) authentication.getPrincipal();
        Long userId = ((Number) claims.get("userId")).longValue();

        return serviceProviderRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Service provider not found"));
    }

   //Dashboard

    @GetMapping("/dashboard")
    public ResponseEntity<ServiceProviderDashboardDTO> getProviderDashboard(
            Authentication authentication) {

        ServiceProvider provider = getLoggedInProvider(authentication);
        return ResponseEntity.ok(
                serviceProviderService.getDashboardSummary(provider.getId())
        );
    }

    @GetMapping("/dashboard/popular-services")
    public ResponseEntity<List<PopularServiceDTO>> getPopularServices(
            Authentication authentication) {

        ServiceProvider provider = getLoggedInProvider(authentication);
        return ResponseEntity.ok(
                serviceProviderService.getPopularServices(provider.getId())
        );
    }

   //bookings

    @GetMapping("/bookings/upcoming")
    public ResponseEntity<Page<ServiceProviderUpcomingBookingDTO>> getUpcomingBookings(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size) {

        ServiceProvider provider = getLoggedInProvider(authentication);
        return ResponseEntity.ok(
                serviceProviderService.getUpcomingBookings(provider.getId(), page, size)
        );
    }

    @GetMapping("/bookings")
    public List<ServiceProviderBookingResponseDTO> getAllBookings(
            Authentication authentication) {

        ServiceProvider provider = getLoggedInProvider(authentication);
        return serviceProviderService.getAllBookings(provider.getId());
    }

    @GetMapping("/bookings/details/{bookingId}")
    public ResponseEntity<ServiceProviderBookingResponseDTO> getBookingDetails(
            @PathVariable Long bookingId) {

        return ResponseEntity.ok(
                serviceProviderService.getSingleBookingDetails(bookingId)
        );
    }

    @PatchMapping("/bookings/{bookingId}/accept")
    public ResponseEntity<String> acceptBooking(@PathVariable Long bookingId) {
        serviceProviderService.acceptBooking(bookingId);
        return ResponseEntity.ok("Booking accepted successfully");
    }

    @PatchMapping("/bookings/{bookingId}/reject")
    public ResponseEntity<String> rejectBooking(
            @PathVariable Long bookingId,
            @RequestBody String reason) {

        serviceProviderService.rejectBooking(bookingId, reason);
        return ResponseEntity.ok("Booking rejected successfully");
    }

    //payments

    @GetMapping("/payments")
    public ResponseEntity<List<PaymentHistoryDTO>> getPaymentHistory(
            Authentication authentication) {

        ServiceProvider provider = getLoggedInProvider(authentication);
        return ResponseEntity.ok(
                serviceProviderService.getPaymentHistory(provider.getId())
        );
    }

    @GetMapping("/payments/search")
    public ResponseEntity<List<PaymentHistoryDTO>> searchPayments(
            Authentication authentication,
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "All") String filter) {

        ServiceProvider provider = getLoggedInProvider(authentication);
        return ResponseEntity.ok(
                serviceProviderService.getFilteredPayments(
                        provider.getId(), query, filter)
        );
    }

    //profile

    @GetMapping("/profile")
    public ResponseEntity<ServiceProviderProfileUpdateDTO> getProfile(
            Authentication authentication) {

        ServiceProvider provider = getLoggedInProvider(authentication);
        return ResponseEntity.ok(
                serviceProviderService.getProfile(provider.getId())
        );
    }

//    @PutMapping("/profile")
//    public ResponseEntity<String> updateProfile(
//            Authentication authentication,
//            @RequestBody ServiceProviderProfileUpdateDTO profileDto) {
//
//        ServiceProvider provider = getLoggedInProvider(authentication);
//        serviceProviderService.updateProfile(provider.getId(), profileDto);
//        return ResponseEntity.ok("Profile updated successfully");
//    }

    @PutMapping(value = "/profile", consumes = "multipart/form-data")
    public ResponseEntity<String> updateProfile(
            Authentication authentication,
            @RequestPart("data") ServiceProviderProfileUpdateDTO profileDto,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        ServiceProvider provider = getLoggedInProvider(authentication);
        serviceProviderService.updateProfile(provider.getId(), profileDto, image);
        return ResponseEntity.ok("Profile updated successfully");
    }

    //available services
    @GetMapping("/services")
    public ResponseEntity<Set<com.backend.entities.Service>> getMyServices(
            Authentication authentication) {

        ServiceProvider provider = getLoggedInProvider(authentication);
        return ResponseEntity.ok(
                serviceProviderService.getProviderServices(provider.getId())
        );
    }

    
    //manage services
    @PostMapping("/services/{serviceId}")
    public ResponseEntity<String> addService(
            Authentication authentication,
            @PathVariable Long serviceId) {

        ServiceProvider provider = getLoggedInProvider(authentication);
        serviceProviderService.addServiceToProvider(provider.getId(), serviceId);
        return ResponseEntity.ok("Service added to your profile");
    }

    
    //remove service
    @DeleteMapping("/services/{serviceId}")
    public ResponseEntity<String> removeService(
            Authentication authentication,
            @PathVariable Long serviceId) {

        ServiceProvider provider = getLoggedInProvider(authentication);
        serviceProviderService.removeServiceFromProvider(provider.getId(), serviceId);
        return ResponseEntity.ok("Service removed from your profile");
    }
}
    
    
    

 
