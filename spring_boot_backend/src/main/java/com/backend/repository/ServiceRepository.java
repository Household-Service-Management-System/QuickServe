package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entities.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
	
	long countByServiceProvidersId(Long providerId);
	
	Optional<Service> findById(Long id);
}
