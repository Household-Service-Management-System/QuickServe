package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.dto.ServiceProviderDetailsDTO;
import com.backend.dto.ServiceProviderResponseDTO;
import com.backend.entities.ServiceProvider;

import jakarta.transaction.Transactional;

@Repository
public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {

    long countByVerificationStatusTrue();

    long countByVerificationStatusFalse();
    
    @Query("""
    	    SELECT new com.backend.dto.ServiceProviderResponseDTO(
    	        sp.id,
    	        u.firstName,
    	        u.lastName,
    	        u.email,
    	        u.phone,
    	        sp.govIdType,
    	        sp.govId,
    	        sp.verificationStatus
    	    )
    	    FROM ServiceProvider sp
    	    JOIN sp.user u
    	    WHERE sp.verificationStatus = true
    	""")
    	List<ServiceProviderResponseDTO> findVerifiedProviders();
    
    @Query("""
    	    SELECT new com.backend.dto.ServiceProviderResponseDTO(
    	        sp.id,
    	        u.firstName,
    	        u.lastName,
    	        u.email,
    	        u.phone,
    	        sp.govIdType,
    	        sp.govId,
    	        sp.verificationStatus
    	    )
    	    FROM ServiceProvider sp
    	    JOIN sp.user u
    	    WHERE sp.verificationStatus = false
    	""")
    	List<ServiceProviderResponseDTO> findUnVerifiedProviders();

    @Query("""
    	    SELECT new com.backend.dto.ServiceProviderDetailsDTO(
    	        u.firstName,
    	        u.lastName,
    	        CONCAT(
    	            COALESCE(u.street, ''), ', ',
    	            COALESCE(u.city, ''), ', ',
    	            COALESCE(u.state, ''), ' - ',
    	            COALESCE(u.pincode, '')
    	        ),
    	        u.email,
    	        u.role,
    	        u.phone,
    	        p.certification,
    	        p.govId,
    	        p.govIdType
    	    )
    	    FROM ServiceProvider p
    	    JOIN p.user u
    	    WHERE p.id = :serviceProviderId
    	""")
    	ServiceProviderDetailsDTO fetchServiceProviderDetailsByServiceProviderId(
    	        @Param("serviceProviderId") Long serviceProviderId
    	);
    
    @Modifying
    @Transactional
    @Query("""
        UPDATE ServiceProvider sp
        SET sp.verificationStatus = false
        WHERE sp.id = :serviceProviderId
    """)
    int deactivateServiceProvider(@Param("serviceProviderId") Long serviceProviderId);
    
    @Modifying
    @Transactional
    @Query("""
        UPDATE ServiceProvider sp
        SET sp.verificationStatus = true
        WHERE sp.id = :serviceProviderId
    """)
    int activateServiceProvider(@Param("serviceProviderId") Long serviceProviderId);


}
