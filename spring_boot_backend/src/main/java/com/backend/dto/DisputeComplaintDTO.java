package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DisputeComplaintDTO {
    private Long userId;
    private String name;
    private String email;
    private String complaint;
}
