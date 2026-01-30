package com.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.backend.entities.User;
import com.backend.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SettingsServiceImpl {
	private final UserRepository userRepo;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public void updateNotifications(Authentication authentication, boolean enabled) {
        Claims claims = (Claims) authentication.getPrincipal();
        Long userId = ((Number) claims.get("userId")).longValue();

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> prefs = parsePreferences(user.getPreferences());
        prefs.put("notificationsEnabled", enabled);

        user.setPreferences(writePreferences(prefs));
        userRepo.save(user);
    }

    public boolean getNotifications(Authentication authentication) {
        Claims claims = (Claims) authentication.getPrincipal();
        Long userId = ((Number) claims.get("userId")).longValue();

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> prefs = parsePreferences(user.getPreferences());
        return (boolean) prefs.getOrDefault("notificationsEnabled", true);
    }

    private Map<String, Object> parsePreferences(String json) {
        try {
            if (json == null || json.isBlank()) {
                return new HashMap<>();
            }
            return objectMapper.readValue(json, new TypeReference<>() {});
        } catch (Exception e) {
            return new HashMap<>();
        }
    }

    private String writePreferences(Map<String, Object> prefs) {
        try {
            return objectMapper.writeValueAsString(prefs);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save preferences");
        }
    }
}
