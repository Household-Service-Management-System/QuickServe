package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.dto.PaymentBookingUserDTO;
import com.backend.entities.Payment;
import com.backend.entities.PaymentStatus;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
	@Query("""
	        SELECT new com.backend.dto.PaymentBookingUserDTO(
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
	
	
	@Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.status = :status")
    double getTotalAmountByStatus(@Param("status") PaymentStatus status);
}
