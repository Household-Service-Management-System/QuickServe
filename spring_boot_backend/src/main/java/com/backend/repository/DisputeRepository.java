package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entities.Dispute;

@Repository
public interface DisputeRepository extends JpaRepository<Dispute, Long> {

	List<Dispute> findAllByRaisedById(Long id);

	Optional<Dispute> findByBookingId(Long id);
}

