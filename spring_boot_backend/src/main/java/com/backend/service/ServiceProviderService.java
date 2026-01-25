package com.backend.service;

import com.backend.dtos.ServiceProviderDashboardDTO;
import com.backend.dtos.ServiceProviderProfileUpdateDTO;
import com.backend.dtos.PaymentHistoryDTO;
import com.backend.dtos.ServiceProviderBookingResponseDTO;
import java.util.List;

public interface ServiceProviderService {
	
    ServiceProviderDashboardDTO getDashboardSummary(Long providerId);

    List<ServiceProviderBookingResponseDTO> getAllBookings(Long providerId);
    
//    void updateBookingStatus(Long bookingId, String status);
    
    void acceptBooking(Long bookingId);
    
    void rejectBooking(Long bookingId, String reason);

	List<PaymentHistoryDTO> getPaymentHistory(Long providerId);

	List<PaymentHistoryDTO> getFilteredPayments(Long providerId, String search, String filter);

	void updateProfile(Long userId, ServiceProviderProfileUpdateDTO dto);
}
