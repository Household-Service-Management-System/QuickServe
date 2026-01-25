package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.dto.ServiceProviderResponseDTO;
import com.backend.entities.ServiceProvider;

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
    	    WHERE sp.verificationStatus = false
    	""")
    	List<ServiceProviderResponseDTO> findVerifiedProviders();




}
