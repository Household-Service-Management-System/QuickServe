package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.dto.DisputeComplaintDTO;
import com.backend.dto.DisputeDetailsDTO;
import com.backend.entities.Dispute;
import com.backend.entities.DisputeStatus;

import jakarta.transaction.Transactional;

@Repository
public interface DisputeRepository extends JpaRepository<Dispute, Long> {
	
	@Query("""
		    SELECT new com.backend.dto.DisputeDetailsDTO(
		        u.firstName,
		        u.lastName,
		        u.email,
		        u.phone,
		        d.description,
		        d.status,
		        d.id

		    )
		    FROM Dispute d
		    JOIN d.raisedBy u
		""")
		List<DisputeDetailsDTO> fetchDisputeDetails();
	@Query("""
		    SELECT d
		    FROM Dispute d
		    JOIN FETCH d.booking b
		    JOIN FETCH b.serviceProvider sp
		    JOIN FETCH sp.user
		    JOIN FETCH d.raisedBy
		    LEFT JOIN FETCH d.resolvedBy
		    LEFT JOIN FETCH sp.services
		    WHERE d.id = :disputeId
		""")
		Optional<Dispute> findDisputeWithAllJoins(
		        @Param("disputeId") Long disputeId
		);


    @Modifying
    @Transactional
    @Query("""
        UPDATE Dispute d
        SET d.status = :status
        WHERE d.id = :disputeId
    """)
    int updateStatus(
            @Param("disputeId") Long disputeId,
            @Param("status") DisputeStatus status
    );


	List<Dispute> findAllByRaisedById(Long id);

	Optional<Dispute> findByBookingId(Long id);
}

