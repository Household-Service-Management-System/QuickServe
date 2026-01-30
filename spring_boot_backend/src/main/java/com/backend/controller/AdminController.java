package com.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.backend.dtos.*;
//import com.backend.entities.DisputeResponse;
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

    // 🔐 Helper: get logged-in admin from JWT
    private User getLoggedInAdmin(Authentication authentication) {

        Claims claims = (Claims) authentication.getPrincipal();
        Long userId = ((Number) claims.get("userId")).longValue();

        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }

    // ================= DASHBOARD =================

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(Authentication authentication) {

        User admin = getLoggedInAdmin(authentication);
        return ResponseEntity.ok(
                adminService.adminInfo(admin.getId())
        );
    }

    /*
    // ================= COMPLAINTS =================

    @GetMapping("/complaints")
    public ResponseEntity<?> getCustomerComplaints(Authentication authentication) {

        getLoggedInAdmin(authentication);
        return ResponseEntity.ok(adminService.dispute());
    }

    @GetMapping("/complaintMoreDetail/{disputeId}")
    public ResponseEntity<DisputeFullDetailsDTO> getComplaintDetails(
            Authentication authentication,
            @PathVariable Long disputeId) {

        getLoggedInAdmin(authentication);
        return ResponseEntity.ok(
                adminService.getDisputeFullDetails(disputeId)
        );
    }
    
    //i comment

//    @PostMapping("/{disputeId}/response")
//    public ResponseEntity<DisputeResponse> insertResponse(
//            Authentication authentication,
//            @PathVariable Long disputeId,
//            @RequestBody String adminResponse) {
//
//        getLoggedInAdmin(authentication);
//        return ResponseEntity.ok(
//                adminService.insertResponse(disputeId, adminResponse)
//        );
//    }

    // ================= SERVICE PROVIDERS =================

    @GetMapping("/pendingRequests")
    public ResponseEntity<?> pendingRequests(Authentication authentication) {

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
        return ResponseEntity.ok(
                adminService.getServiceProviderDetails(userId)
        );
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

    // ================= PAYMENTS =================

    @GetMapping("/paymentRecords")
    public ResponseEntity<?> paymentRecords(Authentication authentication) {

        getLoggedInAdmin(authentication);
        return ResponseEntity.ok(
                adminService.getPaymentList()
        );
    }

    // ================= CUSTOMERS =================

    @GetMapping("/customer")
    public ResponseEntity<List<User>> getCustomers(Authentication authentication) {

        getLoggedInAdmin(authentication);
        return ResponseEntity.ok(
                adminService.getUsersByRole()
        );
    }

    // ================= ADMIN PROFILE =================

    @GetMapping("/profile")
    public ResponseEntity<AdminDTO> getAdminDetails(Authentication authentication) {

        User admin = getLoggedInAdmin(authentication);
        return ResponseEntity.ok(
                adminService.getAdminDetails(admin.getId())
        );
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateAdminProfile(
            Authentication authentication,
            @RequestBody User user) {

        User admin = getLoggedInAdmin(authentication);
        adminService.updateUserProfile(admin.getId(), user);
        return ResponseEntity.ok("Profile updated successfully");
    }
    */
}
