package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.entities.Booking;
import com.backend.entities.BookingStatus;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

	
	List<Booking> findByServiceProviderId(Long providerId);
	
	// Count by Status AND Provider ID for isolation
    long countByServiceProviderIdAndStatus(Long providerId, BookingStatus status);

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.booking.serviceProvider.id = :providerId AND p.status = 'SUCCESS'")
    Double sumRevenueByServiceProviderId(@Param("providerId") Long providerId);

}

