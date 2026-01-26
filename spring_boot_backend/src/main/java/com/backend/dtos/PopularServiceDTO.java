package com.backend.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PopularServiceDTO {

    private Long serviceId;
    private String serviceName;
    private Long totalRequests;
}
