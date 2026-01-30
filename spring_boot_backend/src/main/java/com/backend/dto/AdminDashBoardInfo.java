package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashBoardInfo{

    private Long totalServiceProviders;
    private Double totalRevenue;
    private Long totalCustomers;
    private Long pendingRequests;
}
