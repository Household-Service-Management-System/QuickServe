package com.backend.controller;

import com.backend.dtos.SlotResponseDTO;
import com.backend.service.ProviderAvailabilityService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/providers")
@CrossOrigin
public class ProviderAvailabilityController {

    private final ProviderAvailabilityService availabilityService;

    public ProviderAvailabilityController(
            ProviderAvailabilityService availabilityService
    ) {
        this.availabilityService = availabilityService;
    }

    @GetMapping("/{providerId}/slots")
    public ResponseEntity<List<SlotResponseDTO>> getSlots(
            @PathVariable Long providerId,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {
        return ResponseEntity.ok(
                availabilityService.getAvailableSlots(providerId, date)
        );
    }
}
