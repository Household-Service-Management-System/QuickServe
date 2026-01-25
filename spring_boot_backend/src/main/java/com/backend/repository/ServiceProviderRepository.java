package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.entities.ServiceProvider;

@Repository
public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {

    long countByVerificationStatusTrue();

    long countByVerificationStatusFalse();
    
    @Query("SELECT p FROM ServiceProvider p " +
            "LEFT JOIN FETCH p.services s " +
            "LEFT JOIN FETCH s.category " + // Added this line to fetch categories
            "WHERE p.id = :id")
    Optional<ServiceProvider> findByIdWithServices(@Param("id") Long id);
}
