package com.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.AdminDashBoardInfo;
import com.backend.dto.CustomerComplaintsDTO;
import com.backend.dto.DisputeDetailsDTO;
import com.backend.entities.ServiceProvider;
import com.backend.repository.DisputeRepository;
import com.backend.repository.PaymentRepository;
import com.backend.repository.ServiceProviderRepository;
import com.backend.repository.ServiceRepository;
import com.backend.repository.UserRepository;

@Service
public class AdminService {
    
	  @Autowired
	private ServiceProviderRepository serviceProviderRepository;
	  @Autowired
	private UserRepository userRepository;
	  @Autowired
	private PaymentRepository paymentRepository; 
	  @Autowired
	private DisputeRepository disputeRepository;
	  
	  public AdminDashBoardInfo adminInfo() {

		    long totalServiceProviders =
		            serviceProviderRepository.countByVerificationStatusTrue();

		    long totalCustomers =
		            userRepository.count();

		    long pendingRequests =
		            serviceProviderRepository.countByVerificationStatusFalse();

		    return new AdminDashBoardInfo(
		            totalServiceProviders,
		            0L,
		            totalCustomers,
		            pendingRequests
		    );
		}
	  
	 public  List<DisputeDetailsDTO> dispute() {
		 
		 return  disputeRepository.fetchDisputeDetails();
		
	 } 
	

}
