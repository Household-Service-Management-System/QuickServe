package com.backend.service;


import com.backend.dtos.SlotResponseDTO;


import java.time.LocalDate;
import java.util.List;
public interface ProviderAvailabilityService {
	List<SlotResponseDTO> getAvailableSlots(Long providerId, LocalDate date);
}
