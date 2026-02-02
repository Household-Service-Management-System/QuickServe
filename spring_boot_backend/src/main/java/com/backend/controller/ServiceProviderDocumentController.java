package com.backend.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.backend.dtos.ProviderDocumentResponseDTO;
import com.backend.entities.ProviderDocumentType;
import com.backend.entities.ServiceProvider;
import com.backend.repository.ServiceProviderRepository;
import com.backend.service.ServiceProviderDocumentService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping("/service-provider")
public class ServiceProviderDocumentController {

    @Autowired
    private ServiceProviderDocumentService documentService;

    @Autowired
    private ServiceProviderRepository serviceProviderRepo;

    //Just a helper method to get the logged-in service provider
    private ServiceProvider getLoggedInProvider(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Unauthenticated request");
        }

        Object principal = authentication.getPrincipal();

        if (!(principal instanceof Claims claims)) {
            throw new RuntimeException("Invalid JWT principal");
        }

        Long userId = ((Number) claims.get("userId")).longValue();

        return serviceProviderRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Service provider not found"));
    }

    //upload document
    @PostMapping(
        value = "/documents",
        consumes = "multipart/form-data"
    )
    public ResponseEntity<String> uploadDocument(
            Authentication authentication,
            @RequestParam("type") ProviderDocumentType type,
            @RequestPart("file") MultipartFile file) throws IOException {

        ServiceProvider provider = getLoggedInProvider(authentication);

        documentService.uploadDocument(provider.getId(), type, file);

        return ResponseEntity.ok("Document uploaded successfully");
    }

    //get documents
    @GetMapping("/documents")
    public ResponseEntity<List<ProviderDocumentResponseDTO>> getDocuments(
            Authentication authentication) {

        ServiceProvider provider = getLoggedInProvider(authentication);

        return ResponseEntity.ok(
                documentService.getDocuments(provider.getId())
        );
    }

    //delete document
    @DeleteMapping("/documents/{docId}")
    public ResponseEntity<String> deleteDocument(
            Authentication authentication,
            @PathVariable Long docId) throws IOException {

        ServiceProvider provider = getLoggedInProvider(authentication);

        documentService.deleteDocument(provider.getId(), docId);

        return ResponseEntity.ok("Document deleted");
    }
}

