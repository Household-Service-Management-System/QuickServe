package com.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.backend.dtos.*;

import com.backend.entities.User;
import com.backend.repository.UserRepository;
import com.backend.service.AdminService;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final UserRepository userRepository;

   
    private User getLoggedInAdmin(Authentication authentication) {

        Claims claims = (Claims) authentication.getPrincipal();
        Long userId = ((Number) claims.get("userId")).longValue();

        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }

    

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(Authentication authentication) {

        User admin = getLoggedInAdmin(authentication);
        return ResponseEntity.ok(
                adminService.adminInfo(admin.getId())
        );
    }

    
    

    @GetMapping("/complaints")
    public ResponseEntity<?> getCustomerComplaints(Authentication authentication) {

        getLoggedInAdmin(authentication);
        return ResponseEntity.ok(adminService.dispute());
    }
    

   

    @GetMapping("/pendingRequests")
    public ResponseEntity<List<ServiceProviderResponseDTO>> pendingRequests(Authentication authentication) {

        getLoggedInAdmin(authentication);
        return ResponseEntity.ok(
                adminService.getAllUnVerifiedServiceProviders()
        );
    }

    @GetMapping("/service-providers")
    public ResponseEntity<List<ServiceProviderResponseDTO>> getAllServiceProviders(
            Authentication authentication) {

        getLoggedInAdmin(authentication);
        return ResponseEntity.ok(
                adminService.getAllServiceProviders()
        );
    }

    @GetMapping("/serviceProviderDetail/{userId}")
    public ResponseEntity<ServiceProviderDetailsDTO> serviceProviderDetail(
            Authentication authentication,
            @PathVariable Long userId) {

        getLoggedInAdmin(authentication);

        ServiceProviderDetailsDTO dto =
                adminService.getServiceProviderDetails(userId);

        // 🔍 DEBUG PRINT
        System.out.println("==== ServiceProviderDetailsDTO ====");
        System.out.println(dto);
        System.out.println("==================================");

        return ResponseEntity.ok(dto);
    }

    

    @GetMapping("/verify/{id}")
    public ResponseEntity<String> verifyServiceProvider(
            Authentication authentication,
            @PathVariable Long id) {

        getLoggedInAdmin(authentication);
        adminService.activateServiceProvider(id);
        return ResponseEntity.ok("Service Provider verified successfully");
    }
  
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteServiceProvider(
            Authentication authentication,
            @PathVariable Long id) {

        getLoggedInAdmin(authentication);
        adminService.deactivateServiceProvider(id);
        return ResponseEntity.ok("Service Provider deleted successfully");
    }


    @GetMapping("/paymentRecords")
    public ResponseEntity<?> paymentRecords(Authentication authentication) {

        getLoggedInAdmin(authentication);
        return ResponseEntity.ok(
                adminService.getPaymentList()
        );
    }
    
   


 @PutMapping("/complaints/{id}/start")
 public ResponseEntity<?> startComplaint(
         Authentication authentication,
         @PathVariable Long id
 ) {
     getLoggedInAdmin(authentication);
     adminService.startDispute(id);
     return ResponseEntity.ok("Complaint moved to IN_PROGRESS");
 }

 
 @PutMapping("/complaints/{id}/resolve")
 public ResponseEntity<?> resolveComplaint(
         Authentication authentication,
         @PathVariable Long id
 ) {
     getLoggedInAdmin(authentication);
     adminService.resolveDispute(id);
     return ResponseEntity.ok("Complaint RESOLVED");
 }


 @PutMapping("/complaints/{id}/reject")
 public ResponseEntity<?> rejectComplaint(
         Authentication authentication,
         @PathVariable Long id
 ) {
     getLoggedInAdmin(authentication);
     adminService.rejectDispute(id);
     return ResponseEntity.ok("Complaint REJECTED");
 }
}
