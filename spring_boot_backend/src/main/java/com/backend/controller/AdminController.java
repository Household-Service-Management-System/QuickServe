package com.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.ServiceProviderDetailsDTO;
import com.backend.dto.ServiceProviderResponseDTO;
import com.backend.entities.ServiceProvider;
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

    @GetMapping("/customerComplaints")
    public ResponseEntity<?> getCustomerComplaints() {
        return ResponseEntity.ok(adminService.dispute());
    }

    @GetMapping("/serviceProviderComplaints")
    public ResponseEntity<?> serviceProviderComplaints() {
        return ResponseEntity.ok("suraj");
    }

    @GetMapping("/pendingRequests")
    public ResponseEntity<?> pendingRequests() {
        return ResponseEntity.ok( adminService.getAllServiceProviders() );
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


}
