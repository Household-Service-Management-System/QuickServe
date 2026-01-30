package com.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dtos.AdminDashBoardInfo;
import com.backend.entities.PaymentStatus;
import com.backend.repository.PaymentRepository;
import com.backend.repository.ServiceProviderRepository;
import com.backend.repository.UserRepository;

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

	    
	    /*

	    // ================= COMPLAINTS =================

	    public List<DisputeDetailsDTO> dispute() {
	        return disputeRepository.fetchDisputeDetails();
	    }

	    @Transactional(readOnly = true)
	    public DisputeFullDetailsDTO getDisputeFullDetails(Long disputeId) {

	        Dispute dispute = disputeRepository
	                .findDisputeWithAllJoins(disputeId)
	                .orElseThrow(() ->
	                        new RuntimeException("Dispute not found"));

	        ServiceProvider sp = dispute.getBooking().getServiceProvider();

	        Set<ServiceDTO> services = sp.getServices()
	                .stream()
	                .map(s -> new ServiceDTO(s.getId(), s.getName()))
	                .collect(Collectors.toSet());

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

	    // ================= PAYMENTS =================

	    public List<PaymentBookingUserDTO> getPaymentList() {
	        return paymentRepository.fetchPaymentBookingUserDetails();
	    }

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
}
