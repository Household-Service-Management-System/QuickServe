package com.backend.service;

import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.dto.AdminDTO;
import com.backend.dto.AdminDashBoardInfo;
import com.backend.dto.DisputeComplaintDTO;
import com.backend.dto.DisputeDetailsDTO;
import com.backend.dto.DisputeFullDetailsDTO;
import com.backend.dto.PaymentBookingUserDTO;
import com.backend.dto.ServiceDTO;
import com.backend.dto.ServiceProviderDetailsDTO;
import com.backend.dto.ServiceProviderResponseDTO;
import com.backend.entities.Dispute;
import com.backend.entities.DisputeResponse;
import com.backend.entities.DisputeStatus;
import com.backend.entities.PaymentStatus;
import com.backend.entities.Role;
import com.backend.entities.ServiceProvider;
import com.backend.entities.User;
import com.backend.repository.DisputeRepository;
import com.backend.repository.DisputeResponseRepository;
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
	  @Autowired
	  private  DisputeResponseRepository disputeResponseRepository;
	  
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
	 
	 public List<ServiceProviderResponseDTO> getAllUnVerifiedServiceProviders() {
		   
		    return serviceProviderRepository.findUnVerifiedProviders();
		}
	
	 public List<ServiceProviderResponseDTO> getAllServiceProviders() {
		   
		    return serviceProviderRepository.findVerifiedProviders();
		}
	 
	 public List<PaymentBookingUserDTO> getPaymentList() { 
		return paymentRepository.fetchPaymentBookingUserDetails();
	 }
	 
	 public ServiceProviderDetailsDTO getServiceProviderDetails(Long userId) {
		    return serviceProviderRepository
		            .fetchServiceProviderDetailsByServiceProviderId(userId);
		 
		
		 
		}
	 
	 public List<ServiceProvider> getAllServiceProvidersDetails() {
	        return serviceProviderRepository.findAll();
	    }

	 
	    public List<User> getUsersByRole() {
	        return userRepository.findUsersByRole();
	    }
	    
	    @Transactional(readOnly = true)
	    public DisputeFullDetailsDTO getDisputeFullDetails(Long disputeId) {

	        Dispute dispute = disputeRepository
	                .findDisputeWithAllJoins(disputeId)
	                .orElseThrow(() ->
	                        new RuntimeException("Dispute not found"));

	        ServiceProvider sp = dispute.getBooking().getServiceProvider();

	        // Map services safely
	        Set<ServiceDTO> services = sp.getServices()
	                .stream()
	                .map(s -> new ServiceDTO(s.getId(), s.getName()))
	                .collect(Collectors.toSet());

	        // Build DTO
	        DisputeFullDetailsDTO dto = new DisputeFullDetailsDTO();
	        dto.setDisputeId(dispute.getId());
	        dto.setDisputeDescription(dispute.getDescription());
	        dto.setDisputeStatus(dispute.getStatus());

	        dto.setCustomerFirstName(dispute.getRaisedBy().getFirstName());
	        dto.setCustomerLastName(dispute.getRaisedBy().getLastName());
	        dto.setCustomerEmail(dispute.getRaisedBy().getEmail());
	        dto.setCustomerPhone(dispute.getRaisedBy().getPhone());

	        dto.setBookingId(dispute.getBooking().getId());
	        dto.setPrice(dispute.getBooking().getPrice());
	        dto.setBookingStatus(dispute.getBooking().getStatus());

	        dto.setServiceProviderId(sp.getId());
	        dto.setVerificationStatus(sp.isVerificationStatus());
	        dto.setServices(services);

	        return dto;
	    }

	    public AdminDTO getAdminDetails() {

	        User admin = userRepository
	                .findFirstByRole(Role.ROLE_ADMIN)   // ✅ IMPORTANT
	                .orElseThrow(() -> new RuntimeException("Admin not found"));

	        return new AdminDTO(
	                admin.getId(),
	                admin.getFullName(),
	                admin.getEmail(),
	                admin.getPhone(),
	                admin.getCity(),
	                admin.getState()
	        );
	    }
	    
	    public void updateUserProfile(User user) {

	        int updated = userRepository.updateUserProfile(
	                user.getId(),
	                user.getFirstName(),
	                user.getLastName(),
	                user.getPhone(),
	                user.getCity(),
	                user.getState()
	        );

	        if (updated == 0) {
	            throw new RuntimeException("Profile update failed");
	        }
	    }
	    
	    
	    
	    public void deactivateServiceProvider(Long id) {
	        int updated = serviceProviderRepository.deactivateServiceProvider(id);
	        if (updated == 0) {
	            throw new RuntimeException("Service Provider not found");
	        }
	    }
	    public void activateServiceProvider(Long id) {
	        int updated = serviceProviderRepository.activateServiceProvider(id);
	        if (updated == 0) {
	            throw new RuntimeException("Service Provider not found");
	        }
	    }
	    
	    public DisputeResponse insertResponse(Long disputeId, String adminResponse) {

	        Dispute dispute = disputeRepository.findById(disputeId).get();

	        DisputeResponse response = new DisputeResponse();
	        response.setDispute(dispute);
	        response.setAdminResponse(adminResponse);
	        //mark status 
	        disputeRepository.updateStatus(
	                disputeId,
	                DisputeStatus.RESOLVED
	        );

	        return disputeResponseRepository.save(response);
	    }

}
