package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.entities.Booking;
import com.backend.dtos.Booking_1_provider_detailsDTO;
import com.backend.dtos.ServiceProviderDetailsDTO;
import com.backend.dtos.ServiceProviderResponseDTO;
import com.backend.entities.ServiceProvider;

import jakarta.transaction.Transactional;

@Repository
public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {

    long countByVerificationStatusTrue();

    long countByVerificationStatusFalse();
    
    @Query("SELECT p FROM ServiceProvider p " +
            "LEFT JOIN FETCH p.services s " +
            "LEFT JOIN FETCH s.category " + // Added this line to fetch categories
            "WHERE p.id = :id")
    Optional<ServiceProvider> findByIdWithServices(@Param("id") Long id);

	Optional<ServiceProvider> findByUserId(Long userId);
    
    // Booking API to get service providers for certain service
    @Query(value = """
    		SELECT
    		sp.service_provider_id AS providerId,
    		CONCAT(u.first_name, ' ', u.last_name) AS fullName,
    		u.profile_image AS profileImage,
    		sp.verification_status AS verified,
    		u.city AS city
    		FROM provider_skills ps
    		JOIN service_providers sp
    		ON ps.service_provider_id = sp.service_provider_id
    		JOIN users u
    		ON sp.user_id = u.user_id
    		WHERE ps.service_id = :serviceId
    		AND sp.verification_status = 1
    		""", nativeQuery = true)
    		List<Booking_1_provider_detailsDTO> findProvidersByServiceId(
    		@Param("serviceId") Long serviceId
    		);
    		
    		@Query("""
    			    SELECT new com.backend.dtos.ServiceProviderResponseDTO(
    			        sp.id,
    			        u.firstName,
    			        u.lastName,
    			        u.email,
    			        u.phone,
    			        sp.govIdType,
    			        sp.govId,
    			        sp.verificationStatus,
    			        u.profileImage,
    			        spd.documentUrl
    			    )
    			    FROM ServiceProvider sp
    			    JOIN sp.user u
    			    LEFT JOIN ServiceProviderDocument spd
    			        ON spd.serviceProvider = sp
    			    WHERE sp.verificationStatus = true
    			""")
    			List<ServiceProviderResponseDTO> findVerifiedProviders();

    		    
    		 @Query("""
    				    SELECT new com.backend.dtos.ServiceProviderResponseDTO(
    				        sp.id,
    				        u.firstName,
    				        u.lastName,
    				        u.email,
    				        u.phone,
    				        sp.govIdType,
    				        sp.govId,
    				        sp.verificationStatus,
    				        u.profileImage,
    				        spd.documentUrl
    				    )
    				    FROM ServiceProvider sp
    				    JOIN sp.user u
    				    LEFT JOIN ServiceProviderDocument spd
    				        ON spd.serviceProvider = sp
    				    WHERE sp.verificationStatus = false
    				""")
    				List<ServiceProviderResponseDTO> findUnVerifiedProviders();

    		    
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
    		    
    		    @Query("""
    		    	    SELECT new com.backend.dtos.ServiceProviderDetailsDTO(
    		    	        p.id,
    		    	        u.firstName,
    		    	        u.lastName,
    		    	        CONCAT(
    		    	            COALESCE(u.street, ''),
    		    	            CASE WHEN u.street IS NOT NULL AND u.street <> '' THEN ', ' ELSE '' END,
    		    	            COALESCE(u.city, ''),
    		    	            CASE WHEN u.city IS NOT NULL AND u.city <> '' THEN ', ' ELSE '' END,
    		    	            COALESCE(u.state, ''),
    		    	            CASE WHEN u.state IS NOT NULL AND u.state <> '' THEN ' - ' ELSE '' END,
    		    	            COALESCE(u.pincode, '')
    		    	        ),
    		    	        u.email,
    		    	        u.role,
    		    	        u.phone,
    		    	        u.profileImage,
    		    	        p.certification,
    		    	        p.govId,
    		    	        p.govIdType,
    		    	        p.verificationStatus,
    		    	        null
    		    	    )
    		    	    FROM ServiceProvider p
    		    	    JOIN p.user u
    		    	    WHERE p.id = :serviceProviderId
    		    	""")
    		    	ServiceProviderDetailsDTO fetchServiceProviderDetailsByServiceProviderId(
    		    	    @Param("serviceProviderId") Long serviceProviderId
    		    	);




}
