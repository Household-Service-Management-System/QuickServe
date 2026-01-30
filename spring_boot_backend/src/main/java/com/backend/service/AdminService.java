package com.backend.service;

import com.backend.dtos.AdminDashBoardInfo;

public interface AdminService {

	AdminDashBoardInfo adminInfo(Long adminId);

	Object dispute();

	Object getPaymentList();

	//Object getDisputeFullDetails(Long disputeId);

}
