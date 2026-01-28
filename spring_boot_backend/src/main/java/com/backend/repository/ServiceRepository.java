package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.entities.Service;
import com.backend.entities.Status;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
	
	long countByServiceProvidersId(Long providerId);
	
	Optional<Service> findById(Long id);
	
	
	@Query("""
	        SELECT s FROM Service s
	        JOIN FETCH s.category
	    """)
	    List<Service> findAllWithCategory();
	
	List<Service> findByCategory_IdAndIsAvailable(
			Long categoryId,
			Status isAvailable
			);
}
