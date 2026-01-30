package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.dto.DisputeComplaintDTO;
import com.backend.dto.DisputeDetailsDTO;
import com.backend.entities.Dispute;

@Repository
public interface DisputeRepository extends JpaRepository<Dispute, Long> {
	
	@Query("""
		    SELECT new com.backend.dto.DisputeDetailsDTO(
		        u.firstName,
		        u.lastName,
		        u.email,
		        u.phone,
		        d.description,
		        d.status
		    )
		    FROM Dispute d
		    JOIN d.raisedBy u
		""")
		List<DisputeDetailsDTO> fetchDisputeDetails();
	
	


	List<Dispute> findAllByRaisedById(Long id);

	Optional<Dispute> findByBookingId(Long id);
	
	List<Dispute> findByRaisedById(Long userId);
}

