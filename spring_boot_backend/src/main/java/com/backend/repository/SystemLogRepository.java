package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entities.SystemLog;

@Repository
public interface SystemLogRepository extends JpaRepository<SystemLog, Long> {
}
