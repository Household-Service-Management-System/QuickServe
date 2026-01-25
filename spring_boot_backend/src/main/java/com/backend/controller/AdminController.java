package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
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
        return ResponseEntity.ok("suraj");
    }
}
