package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entities.ProviderDocumentType;
import com.backend.entities.ServiceProviderDocument;

public interface ServiceProviderDocumentRepository
        extends JpaRepository<ServiceProviderDocument, Long> {

    List<ServiceProviderDocument> findByServiceProviderId(Long providerId);

    List<ServiceProviderDocument> findByServiceProviderIdAndDocumentType(
            Long providerId,
            ProviderDocumentType type
    );
}
