package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entities.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
}

