package com.backend.service;

import java.util.List;

import org.springframework.security.core.Authentication;

import com.backend.dtos.DisputeDTO;
import com.backend.entities.Dispute;

public interface DisputeService {

	Dispute create(DisputeDTO dto, Authentication authentication);

	Dispute getById(Long id);

	List<Dispute> getMyDisputes(Authentication authentication);

	Dispute update(Long id, DisputeDTO dto);

}
