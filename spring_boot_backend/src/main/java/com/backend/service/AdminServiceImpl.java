package com.backend.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dtos.AdminDashBoardInfo;
import com.backend.dtos.AdminSetServiceDTO;
import com.backend.dtos.DisputeDetailsDTO;
import com.backend.dtos.DisputeFullDetailsDTO;
import com.backend.dtos.PaymentBookingUserDTO;
import com.backend.dtos.ServiceDTO;
import com.backend.dtos.ServiceProviderDetailsDTO;
import com.backend.dtos.ServiceProviderResponseDTO;
import com.backend.entities.Dispute;
import com.backend.entities.DisputeStatus;
import com.backend.entities.PaymentStatus;
import com.backend.entities.ServiceProvider;
import com.backend.repository.DisputeRepository;
import com.backend.repository.PaymentRepository;
import com.backend.repository.ServiceProviderDocumentRepository;
import com.backend.repository.ServiceProviderRepository;
import com.backend.repository.UserRepository;
import com.backend.dtos.AdminSetServiceDTO;
import com.backend.dtos.DisputeDetailsDTO;
import com.backend.dtos.DisputeFullDetailsDTO;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private  DisputeRepository  disputeRepository; 
    @Autowired
    private ServiceProviderDocumentRepository  serviceProviderDocumentRepository;

    @Override
    public AdminDashBoardInfo adminInfo(Long adminId) {

        long totalServiceProviders =
                serviceProviderRepository.countByVerificationStatusTrue();

        long countOpenDisputes =
        		disputeRepository.countOpenDisputes();

        long pendingRequests =
                serviceProviderRepository.countByVerificationStatusFalse();

        double totalRevenue =
                paymentRepository.getTotalAmountByStatus(PaymentStatus.SUCCESS);
       
        
        return new AdminDashBoardInfo(
                totalServiceProviders,
                totalRevenue,
                countOpenDisputes,
                pendingRequests
        );
    
	    }

	    
	    
   
	    // ================= COMPLAINTS =================

	    public List<DisputeDetailsDTO> dispute() {
	        return disputeRepository.fetchDisputeDetails();
	    }
	    
	    



	    public List<ServiceProviderResponseDTO> getAllUnVerifiedServiceProviders() {
	        return serviceProviderRepository.findUnVerifiedProviders();
	    }
      
       
	    public List<ServiceProviderResponseDTO> getAllServiceProviders() {
	        return serviceProviderRepository.findVerifiedProviders();
	    }
	    
	    public ServiceProviderDetailsDTO getServiceProviderDetails(Long userId) {

	        System.out.println("🔍 Fetching ServiceProviderDetails for userId = " + userId);

	        
	        ServiceProviderDetailsDTO dto =
	                serviceProviderRepository
	                        .fetchServiceProviderDetailsByServiceProviderId(userId);

	        if (dto == null) {
	            throw new RuntimeException("Service Provider not found for id: " + userId);
	        }

	       
	        List<String> documentUrls =
	                serviceProviderDocumentRepository
	                        .findDocumentUrlsByServiceProviderId(userId);

	        
	        dto.setDocumentUrls(documentUrls);

	        System.out.println("✅ ServiceProviderDetailsDTO received:");
	        System.out.println(dto);

	        return dto;
	    }


	 
	    
	    public void activateServiceProvider(Long id) {
	        int updated = serviceProviderRepository.activateServiceProvider(id);
	        if (updated == 0) {
	            throw new RuntimeException("Service Provider not found");
	        }
	    }
	    
       
	    public void deactivateServiceProvider(Long id) {
	        int updated = serviceProviderRepository.deactivateServiceProvider(id);
	        if (updated == 0) {
	            throw new RuntimeException("Service Provider not found");
	        }
	    }
	   

	    public List<PaymentBookingUserDTO> getPaymentList() {
	        return paymentRepository.fetchPaymentBookingUserDetails();
	    }
	    
	   
	    
	    @Override
	    public void startDispute(Long disputeId) {
	        Dispute dispute = disputeRepository.findById(disputeId)
	                .orElseThrow(() -> new RuntimeException("Dispute not found"));

	        if (dispute.getStatus() != DisputeStatus.OPEN) {
	            throw new RuntimeException("Only OPEN disputes can be started");
	        }

	        dispute.setStatus(DisputeStatus.IN_PROGRESS);
	        disputeRepository.save(dispute);
	    }

	    @Override
	    public void resolveDispute(Long disputeId) {
	        Dispute dispute = disputeRepository.findById(disputeId)
	                .orElseThrow(() -> new RuntimeException("Dispute not found"));

	        if (dispute.getStatus() != DisputeStatus.IN_PROGRESS) {
	            throw new RuntimeException("Only IN_PROGRESS disputes can be resolved");
	        }

	        dispute.setStatus(DisputeStatus.RESOLVED);
	        disputeRepository.save(dispute);
	    }

	    @Override
	    public void rejectDispute(Long disputeId) {
	        Dispute dispute = disputeRepository.findById(disputeId)
	                .orElseThrow(() -> new RuntimeException("Dispute not found"));

	        if (dispute.getStatus() != DisputeStatus.OPEN) {
	            throw new RuntimeException("Only OPEN disputes can be rejected");
	        }

	        dispute.setStatus(DisputeStatus.REJECTED);
	        disputeRepository.save(dispute);
	    }

}
