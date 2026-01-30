package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.dto.ServiceProviderDetailsDTO;
import com.backend.dto.ServiceProviderResponseDTO;
import com.backend.entities.Booking;
import com.backend.dtos.Booking_1_provider_detailsDTO;
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
    	    WHERE u.id = :userId
    	""")
    	ServiceProviderDetailsDTO fetchServiceProviderDetailsByUserId(@Param("userId") Long userId);

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
}
