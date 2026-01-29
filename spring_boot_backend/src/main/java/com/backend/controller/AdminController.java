package com.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.AdminDTO;
import com.backend.dto.DisputeFullDetailsDTO;
import com.backend.dto.ServiceProviderDetailsDTO;
import com.backend.dto.ServiceProviderResponseDTO;
import com.backend.entities.Dispute;
import com.backend.entities.DisputeResponse;
import com.backend.entities.Role;
import com.backend.entities.ServiceProvider;
import com.backend.entities.User;
import com.backend.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")
public class AdminController {

    private final AdminService adminService;

    @GetMapping(
    	    value = "/dashboard",
    	    produces = "application/json"
    	)
    public ResponseEntity<?> dashboard() {
        return ResponseEntity.ok(adminService.adminInfo());
        
    }

    @GetMapping("/complaints")
    public ResponseEntity<?> getCustomerComplaints() {
        return ResponseEntity.ok(adminService.dispute());
    }

   

    @GetMapping("/pendingRequests")
    public ResponseEntity<?> pendingRequests() {
        return ResponseEntity.ok( adminService.getAllUnVerifiedServiceProviders() );
    }

    @GetMapping("/paymentRecords")
    public ResponseEntity<?> paymentRecords() {
        return ResponseEntity.ok( adminService.getPaymentList());
    }
    
    @GetMapping("/serviceProviderDetail/{userId}")
    public ResponseEntity<ServiceProviderDetailsDTO> serviceProviderDetail(
            @PathVariable Long userId
    ) {
    	
        return ResponseEntity.ok(
        		adminService.getServiceProviderDetails(userId)
        );
    }
    
    @GetMapping("/service-providers")
    public ResponseEntity<List<ServiceProviderResponseDTO>> getAllServiceProviders() {
        return ResponseEntity.ok(adminService.getAllServiceProviders());
    }
    
    @GetMapping("/customer")
    public ResponseEntity<List<User>> getUsersByRole(
            ) {

        List<User> users = adminService.getUsersByRole();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/compailntMoreDetail/{disputeId}")
    public ResponseEntity<DisputeFullDetailsDTO> getComplaintDetails(
            @PathVariable Long disputeId) {

        return ResponseEntity.ok(
        		adminService.getDisputeFullDetails(disputeId)
        );
    }
    
    @GetMapping("/profile")
    public ResponseEntity<AdminDTO> getAdminDetails() {
        return ResponseEntity.ok(adminService.getAdminDetails());
    }
    
    // UPDATE ADMIN PROFILE
    @PutMapping("/profile")
    public ResponseEntity<String> updateAdminProfile(
            @RequestBody User user
    ) {
    	adminService.updateUserProfile(user);
        return ResponseEntity.ok("Profile updated successfully");
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    	adminService.deactivateServiceProvider(id);
        return ResponseEntity.ok("User deleted successfully");
    }
    
    @GetMapping("/verify/{id}")
    public ResponseEntity<?> verifiy(@PathVariable Long id) {
    	adminService.activateServiceProvider(id);
        return ResponseEntity.ok("User Verify successfully");
    }
    
    @PostMapping("/{disputeId}/respose")
    public DisputeResponse insertResponse(
            @PathVariable Long disputeId,
            @RequestBody String adminResponse) {
    	System.out.println("Try programiz.pro");
        return adminService.insertResponse(disputeId, adminResponse);
    }


    



}
