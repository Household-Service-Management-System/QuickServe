package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.backend.service.SettingsServiceImpl;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/settings")
@RequiredArgsConstructor
public class SettingsController {

    private final SettingsServiceImpl settingsService;

    @GetMapping("/notifications")
    public ResponseEntity<Boolean> getNotifications(Authentication authentication) {
        return ResponseEntity.ok(
                settingsService.getNotifications(authentication)
        );
    }

    @PutMapping("/notifications")
    public ResponseEntity<?> updateNotifications(
            @RequestParam boolean enabled,
            Authentication authentication
    ) {
        settingsService.updateNotifications(authentication, enabled);
        return ResponseEntity.ok("Updated");
    }
}
