package com.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;

import com.backend.dtos.DisputeDTO;
import com.backend.entities.Booking;
import com.backend.entities.Dispute;
import com.backend.entities.DisputeStatus;
import com.backend.entities.User;
import com.backend.repository.BookingRepository;
import com.backend.repository.DisputeRepository;
import com.backend.repository.UserRepository;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class DisputeServiceImpl implements DisputeService {

    private final DisputeRepository disputeRepo;
    private final BookingRepository bookingRepo;
    private final UserRepository userRepo;

    // 🔹 Create dispute
    @Override
    public Dispute create(DisputeDTO dto, Authentication authentication) {

        Claims claims = (Claims) authentication.getPrincipal();
        Long userId = ((Number) claims.get("userId")).longValue();

        User raisedBy = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = bookingRepo.findById(dto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Dispute dispute = new Dispute();
        dispute.setBooking(booking);
        dispute.setDescription(dto.getDescription());
        dispute.setRaisedBy(raisedBy);
        dispute.setStatus(DisputeStatus.OPEN);

        return disputeRepo.save(dispute);
    }

    // 🔹 Get dispute by ID
    @Override
    public Dispute getById(Long id) {
        return disputeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Dispute not found"));
    }

    // 🔹 Get disputes for logged-in user / provider
    @Override
    public List<Dispute> getMyDisputes(Authentication authentication) {

        Claims claims = (Claims) authentication.getPrincipal();
        Long userId = ((Number) claims.get("userId")).longValue();

        return disputeRepo.findByRaisedById(userId);
    }

    // 🔹 Update dispute (admin / support)
    @Override
    public Dispute update(Long id, DisputeDTO dto) {

        Dispute dispute = disputeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Dispute not found"));

        if (dto.getStatus() != null) {
            dispute.setStatus(dto.getStatus());
        }

        if (dto.getDescription() != null) {
            dispute.setDescription(dto.getDescription());
        }

        return disputeRepo.save(dispute);
    }
}

