package com.backend.service;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.AdminDashBoardInfo;
import com.backend.dto.DisputeComplaintDTO;
import com.backend.dto.DisputeDetailsDTO;
import com.backend.dto.PaymentBookingUserDTO;
import com.backend.dto.ServiceProviderDetailsDTO;
import com.backend.dto.ServiceProviderResponseDTO;
import com.backend.entities.PaymentStatus;
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

		    
		    double totalSuccessAmount =
		            paymentRepository.getTotalAmountByStatus(PaymentStatus.SUCCESS);
		    
		    return new AdminDashBoardInfo(
		            totalServiceProviders,
		            totalSuccessAmount,
		            totalCustomers,
		            pendingRequests
		    );
		}
	  
	 public  List<DisputeDetailsDTO> dispute() {
		 
		 return  disputeRepository.fetchDisputeDetails();
		
	 } 
	
	 public List<ServiceProviderResponseDTO> getAllServiceProviders() {
		   
		    return serviceProviderRepository.findVerifiedProviders();
		}
	 
	 public List<PaymentBookingUserDTO> getPaymentList() { 
		return paymentRepository.fetchPaymentBookingUserDetails();
	 }
	 
	 public ServiceProviderDetailsDTO getServiceProviderDetails(Long userId) {
		    return serviceProviderRepository
		            .fetchServiceProviderDetailsByUserId(userId);
		}
	 
	 public List<ServiceProvider> getAllServiceProvidersDetails() {
	        return serviceProviderRepository.findAll();
	    }

	 
	

}
