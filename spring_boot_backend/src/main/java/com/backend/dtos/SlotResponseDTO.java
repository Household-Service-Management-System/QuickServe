package com.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SlotResponseDTO {
	private String start;
	private String end;
	private boolean available;
}
