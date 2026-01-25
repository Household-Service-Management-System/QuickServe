package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.dtos.PaymentHistoryDTO;
import com.backend.entities.Payment;

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

}
