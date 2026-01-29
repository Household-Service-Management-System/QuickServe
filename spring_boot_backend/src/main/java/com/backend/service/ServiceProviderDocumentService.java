package com.backend.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.backend.dtos.ProviderDocumentResponseDTO;
import com.backend.entities.ProviderDocumentType;

public interface ServiceProviderDocumentService {

    void uploadDocument(
            Long providerId,
            ProviderDocumentType type,
            MultipartFile file
    );

    List<ProviderDocumentResponseDTO> getDocuments(Long providerId);

    void deleteDocument(Long documentId);
}

