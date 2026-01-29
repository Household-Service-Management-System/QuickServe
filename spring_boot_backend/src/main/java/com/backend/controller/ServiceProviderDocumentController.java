package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.backend.dtos.ProviderDocumentResponseDTO;
import com.backend.entities.ProviderDocumentType;
import com.backend.service.ServiceProviderDocumentService;

@RestController
@RequestMapping("/service-provider")
public class ServiceProviderDocumentController {

    @Autowired
    private ServiceProviderDocumentService documentService;

    @PostMapping(
        value = "/{id}/documents",
        consumes = "multipart/form-data"
    )
    public ResponseEntity<String> uploadDocument(
            @PathVariable Long id,
            @RequestParam ProviderDocumentType type,
            @RequestPart MultipartFile file) {

        documentService.uploadDocument(id, type, file);
        return ResponseEntity.ok("Document uploaded successfully");
    }

    @GetMapping("/{id}/documents")
    public ResponseEntity<List<ProviderDocumentResponseDTO>> getDocuments(
            @PathVariable Long id) {

        return ResponseEntity.ok(documentService.getDocuments(id));
    }

    @DeleteMapping("/documents/{docId}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long docId) {
        documentService.deleteDocument(docId);
        return ResponseEntity.ok("Document deleted");
    }
}

