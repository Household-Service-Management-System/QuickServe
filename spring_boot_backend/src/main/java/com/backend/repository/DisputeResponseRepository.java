package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.entities.DisputeResponse;

public interface DisputeResponseRepository 
        extends JpaRepository<DisputeResponse, Long> {
}
