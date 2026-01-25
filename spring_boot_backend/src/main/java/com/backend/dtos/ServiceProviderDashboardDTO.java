package com.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceProviderDashboardDTO {
    private double monthlyRevenue;
    private long totalServices;
    private long completedJobs;
    private long pendingRequests;
}