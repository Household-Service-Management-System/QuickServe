package com.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.backend.dtos.ProviderDocumentResponseDTO;
import com.backend.entities.ProviderDocumentType;

public interface ServiceProviderDocumentService {

    void uploadDocument(
            Long providerId,
            ProviderDocumentType type,
            MultipartFile file
    ) throws IOException;

    List<ProviderDocumentResponseDTO> getDocuments(Long providerId);

//    void deleteDocument(Long documentId);

	void deleteDocument(Long id, Long docId) throws IOException;
}

