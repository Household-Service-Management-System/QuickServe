package com.backend.service;

import java.util.List;

import com.backend.dtos.AdminDashBoardInfo;
import com.backend.dtos.ServiceProviderDetailsDTO;
import com.backend.dtos.ServiceProviderResponseDTO;

public interface AdminService {

	AdminDashBoardInfo adminInfo(Long adminId);

	Object dispute();

	Object getPaymentList();

	List<ServiceProviderResponseDTO> getAllUnVerifiedServiceProviders();

	void activateServiceProvider(Long id);

	//void deactivateServiceProvider(Long id);

	ServiceProviderDetailsDTO getServiceProviderDetails(Long userId);

	List<ServiceProviderResponseDTO> getAllServiceProviders();

	void deactivateServiceProvider(Long id);

	
	public void startDispute(Long disputeId);
	public void resolveDispute(Long disputeId);
	public void rejectDispute(Long disputeId);

	//Object getDisputeFullDetails(Long disputeId);

}
