package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.entities.ProviderDocumentType;
import com.backend.entities.ServiceProviderDocument;

public interface ServiceProviderDocumentRepository
        extends JpaRepository<ServiceProviderDocument, Long> {

    List<ServiceProviderDocument> findByServiceProviderId(Long providerId);

    List<ServiceProviderDocument> findByServiceProviderIdAndDocumentType(
            Long providerId,
            ProviderDocumentType type
    );
    
    @Query("""
    	    SELECT d.documentUrl
    	    FROM ServiceProviderDocument d
    	    WHERE d.serviceProvider.id = :serviceProviderId
    	""")
    	List<String> findDocumentUrlsByServiceProviderId(
    	        @Param("serviceProviderId") Long serviceProviderId
    	);

}
