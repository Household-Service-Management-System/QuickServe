package com.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashBoardInfo{

    private Long totalServiceProviders;
    private double totalRevenue;
    private Long totalCustomers;
    private Long pendingRequests;
}

