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

    @Override
    public AdminDashBoardInfo adminInfo(Long adminId) {

        long totalServiceProviders =
                serviceProviderRepository.countByVerificationStatusTrue();

        long totalCustomers =
                userRepository.count();

        long pendingRequests =
                serviceProviderRepository.countByVerificationStatusFalse();

        double totalRevenue =
                paymentRepository.getTotalAmountByStatus(PaymentStatus.SUCCESS);
       
        
        return new AdminDashBoardInfo(
                totalServiceProviders,
                totalRevenue,
                totalCustomers,
                pendingRequests
        );
    
	    }

	    
	    
   
	    // ================= COMPLAINTS =================

	    public List<DisputeDetailsDTO> dispute() {
	        return disputeRepository.fetchDisputeDetails();
	    }
	    
	    
//	    @Override
//	    public DisputeFullDetailsDTO getDisputeFullDetails(Long disputeId) {
//
//	        Dispute dispute = disputeRepository
//	                .findDisputeWithAllJoins(disputeId)
//	                .orElseThrow(() -> new RuntimeException("Dispute not found"));
//
//	        ServiceProvider sp = dispute.getBooking().getServiceProvider();
//
//	        DisputeFullDetailsDTO dto = new DisputeFullDetailsDTO();
//
//	        /* ================= DISPUTE ================= 
//	        dto.setDisputeId(dispute.getId());
//	        dto.setDisputeDescription(dispute.getDescription());
//	        dto.setDisputeStatus(dispute.getStatus());
//	        dto.setDisputeCreatedOn(dispute.getCreatedOn());
//	        dto.setDisputeUpdatedOn(dispute.getUpdatedOn());
//
//	        /* ================= CUSTOMER ================= */
//	        dto.setCustomerId(dispute.getRaisedBy().getId());
//	        dto.setCustomerFirstName(dispute.getRaisedBy().getFirstName());
//	        dto.setCustomerLastName(dispute.getRaisedBy().getLastName());
//	        dto.setCustomerEmail(dispute.getRaisedBy().getEmail());
//	        dto.setCustomerPhone(dispute.getRaisedBy().getPhone());
//	        dto.setCustomerStreet(dispute.getRaisedBy().getStreet());
//	        dto.setCustomerCity(dispute.getRaisedBy().getCity());
//	        dto.setCustomerState(dispute.getRaisedBy().getState());
//	        dto.setCustomerPincode(dispute.getRaisedBy().getPincode());
//	        dto.setCustomerDob(dispute.getRaisedBy().getDob());
//	        dto.setCustomerGender(dispute.getRaisedBy().getGender());
//	        dto.setCustomerStatus(dispute.getRaisedBy().getStatus());
//
//	        /* ================= BOOKING ================= */
//	        dto.setBookingId(dispute.getBooking().getId());
//	        dto.setScheduledAt(dispute.getBooking().getScheduledAt());
//	        dto.setPrice(dispute.getBooking().getPrice());
//	        dto.setBookingStatus(dispute.getBooking().getStatus());
//	        dto.setRejectionReason(dispute.getBooking().getRejectionReason());
//
//	        /* ================= SERVICE PROVIDER ================= */
//	        dto.setServiceProviderId(sp.getId());
//	        dto.setGovIdType(sp.getGovIdType());
//	        dto.setGovId(sp.getGovId());
//	        dto.setVerificationStatus(sp.isVerificationStatus());
//	        dto.setCertification(sp.getCertification());
//
//	        /* ================= PROVIDER USER ================= */
//	        dto.setProviderUserId(sp.getUser().getId());
//	        dto.setProviderFirstName(sp.getUser().getFirstName());
//	        dto.setProviderLastName(sp.getUser().getLastName());
//	        dto.setProviderEmail(sp.getUser().getEmail());
//	        dto.setProviderPhone(sp.getUser().getPhone());
//
//	        /* ================= SERVICES ================= */
//	        dto.setServices(mapServices(sp));





//	        /* ================= RESOLVED BY (ADMIN) ================= */
//	        if (dispute.getResolvedBy() != null) {
//	            dto.setResolvedById(dispute.getResolvedBy().getId());
//	            dto.setResolvedByName(
//	                    dispute.getResolvedBy().getFirstName() + " " +
//	                    dispute.getResolvedBy().getLastName()
//	            );
//	        }
//
//	        return dto;
//	    }

	    

	    /**/
	    // ================= SERVICE PROVIDERS =================

	    public List<ServiceProviderResponseDTO> getAllUnVerifiedServiceProviders() {
	        return serviceProviderRepository.findUnVerifiedProviders();
	    }
      
       
	    public List<ServiceProviderResponseDTO> getAllServiceProviders() {
	        return serviceProviderRepository.findVerifiedProviders();
	    }
	    
	    public ServiceProviderDetailsDTO getServiceProviderDetails(Long userId) {
	        return serviceProviderRepository
	                .fetchServiceProviderDetailsByServiceProviderId(userId);
	    }
	    /* */
	    
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
	    /*  */
	    // ================= PAYMENTS =================

	    public List<PaymentBookingUserDTO> getPaymentList() {
	        return paymentRepository.fetchPaymentBookingUserDetails();
	    }
	    
	    /*

	    // ================= USERS =================

	    public List<User> getUsersByRole() {
	        return userRepository.findUsersByRole();
	    }

	    // ================= ADMIN PROFILE =================

	    public AdminDTO getAdminDetails(Long adminId) {

	        User admin = userRepository.findById(adminId)
	                .orElseThrow(() -> new RuntimeException("Admin not found"));

	        if (admin.getRole() != Role.ROLE_ADMIN) {
	            throw new RuntimeException("Unauthorized access");
	        }

	        return new AdminDTO(
	                admin.getId(),
	                admin.getFullName(),
	                admin.getEmail(),
	                admin.getPhone(),
	                admin.getCity(),
	                admin.getState()
	        );
	    }

	    public void updateUserProfile(Long adminId, User user) {

	        validateAdmin(adminId);

	        int updated = userRepository.updateUserProfile(
	                adminId,
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

	    // ================= DISPUTE RESPONSE =================

	    public DisputeResponse insertResponse(Long disputeId, String adminResponse) {

	        Dispute dispute = disputeRepository.findById(disputeId)
	                .orElseThrow(() -> new RuntimeException("Dispute not found"));

	        DisputeResponse response = new DisputeResponse();
	        response.setDispute(dispute);
	        response.setAdminResponse(adminResponse);

	        disputeRepository.updateStatus(
	                disputeId,
	                DisputeStatus.RESOLVED
	        );

	        return disputeResponseRepository.save(response);
	    }

	    // ================= HELPER =================

	    private void validateAdmin(Long adminId) {
	        User admin = userRepository.findById(adminId)
	                .orElseThrow(() -> new RuntimeException("Admin not found"));

	        if (admin.getRole() != Role.ROLE_ADMIN) {
	            throw new RuntimeException("Unauthorized access");
	        }
	    }
	    */
	    
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
