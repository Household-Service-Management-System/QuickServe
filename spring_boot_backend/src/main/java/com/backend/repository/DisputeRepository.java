package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.dtos.DisputeDetailsDTO;
import com.backend.entities.Dispute;

@Repository
public interface DisputeRepository extends JpaRepository<Dispute, Long> {

	List<Dispute> findAllByRaisedById(Long id);

	Optional<Dispute> findByBookingId(Long id);
	
	List<Dispute> findByRaisedById(Long userId);
	
	@Query("""
		    SELECT new com.backend.dtos.DisputeDetailsDTO(
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
			SELECT d FROM Dispute d
			JOIN FETCH d.raisedBy
			JOIN FETCH d.booking b
			JOIN FETCH b.serviceProvider sp
			JOIN FETCH sp.user
			LEFT JOIN FETCH sp.services
			LEFT JOIN FETCH d.resolvedBy
			WHERE d.id = :disputeId
			""")
			Optional<Dispute> findDisputeWithAllJoins(Long disputeId);

	
	
	
	@Query("""
		    SELECT COUNT(d)
		    FROM Dispute d
		    WHERE d.status = com.backend.entities.DisputeStatus.OPEN
		""")
		long countOpenDisputes();

	

}

