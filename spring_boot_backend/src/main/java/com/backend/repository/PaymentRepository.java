package com.backend.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.dtos.PaymentBookingUserDTO;
import com.backend.dtos.PaymentHistoryDTO;
import com.backend.entities.Payment;
import com.backend.entities.PaymentStatus;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

	@Query("SELECT new com.backend.dtos.PaymentHistoryDTO(" +
	           "p.createdOn, " +
	           "u.firstName, " + // Let's keep it simple first; combine in DTO or Service
	           "b.id, " +
	           "p.amount, " +
	           "p.status, " +
	           "p.transactionId) " +
	           "FROM Payment p " +
	           "JOIN p.booking b " +
	           "JOIN b.user u " +
	           "WHERE b.serviceProvider.id = :providerId " +
	           "ORDER BY p.createdOn DESC")
	    List<PaymentHistoryDTO> findPaymentHistoryByProviderId(@Param("providerId") Long providerId);

	
	
	@Query("SELECT new com.backend.dtos.PaymentHistoryDTO(" +
	           "p.createdOn, CONCAT(u.firstName, ' ', u.lastName), " +
	           "b.id, p.amount, p.status, p.transactionId) " +
	           "FROM Payment p JOIN p.booking b JOIN b.user u " +
	           "WHERE b.serviceProvider.id = :providerId " +
	           "AND p.createdOn >= :startDate " +
	           "AND (:query IS NULL OR " + 
	           "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
	           "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
	           "LOWER(p.transactionId) LIKE LOWER(CONCAT('%', :query, '%')))")
	    List<PaymentHistoryDTO> findFilteredPayments(
	            @Param("providerId") Long providerId, 
	            @Param("query") String query, 
	            @Param("startDate") LocalDateTime startDate);
	
	List<Payment> findByBookingUserId(Long id);
	
	Optional<Payment> findByBookingId(Long id);
	
	@Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.status = :status")
    double getTotalAmountByStatus(@Param("status") PaymentStatus status);
	
	@Query("""
	        SELECT new com.backend.dtos.PaymentBookingUserDTO(
	            b.id,
	            b.status,
	            u.firstName,
	            u.lastName,
	            u.email,
	            u.phone,
	            p.amount,
	            p.transactionId
	        )
	        FROM Payment p
	        JOIN p.booking b
	        JOIN b.user u
	    """)
	List<PaymentBookingUserDTO> fetchPaymentBookingUserDetails();
	
	
}
