package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.dtos.PopularServiceDTO;
import com.backend.entities.Booking;
import com.backend.entities.BookingStatus;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

	
	List<Booking> findByServiceProviderId(Long providerId);
	
	// Count by Status AND Provider ID for isolation
    long countByServiceProviderIdAndStatus(Long providerId, BookingStatus status);

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.booking.serviceProvider.id = :providerId AND p.status = 'SUCCESS'")
    Double sumRevenueByServiceProviderId(@Param("providerId") Long providerId);
    
    List<Booking> findAllByUserId(Long id);
    
    Optional<Booking> findById(Long id);

	Page<Booking> findByServiceProviderId(Long providerId, Pageable pageable);

	
	@Query("""
	        SELECT new com.backend.dtos.PopularServiceDTO(
	            s.id, s.name, COUNT(b.id)
	        )
	        FROM Booking b
	        JOIN b.service s
	        WHERE b.serviceProvider.id = :providerId
	        GROUP BY s.id, s.name
	        ORDER BY COUNT(b.id) DESC
	    """)
	    List<PopularServiceDTO> findPopularServices(
	        @Param("providerId") Long providerId
	    );
}

