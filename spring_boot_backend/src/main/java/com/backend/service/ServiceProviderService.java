package com.backend.service;

import com.backend.dtos.ServiceProviderDashboardDTO;
import com.backend.dtos.ServiceProviderProfileUpdateDTO;
import com.backend.dtos.ServiceProviderUpcomingBookingDTO;
import com.backend.dtos.Booking_1_provider_detailsDTO;
import com.backend.dtos.PaymentHistoryDTO;
import com.backend.dtos.PopularServiceDTO;
import com.backend.dtos.ServiceProviderBookingResponseDTO;
import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.backend.entities.*;

public interface ServiceProviderService {
	
    ServiceProviderDashboardDTO getDashboardSummary(Long providerId);
    
    List<ServiceProviderBookingResponseDTO> getAllBookings(Long providerId);
    
    void updateBookingStatus(Long bookingId, String status);
    
    void acceptBooking(Long bookingId);
    
    void rejectBooking(Long bookingId, String reason);

	List<PaymentHistoryDTO> getPaymentHistory(Long providerId);

	List<PaymentHistoryDTO> getFilteredPayments(Long providerId, String search, String filter);

	void updateProfile(Long userId, ServiceProviderProfileUpdateDTO dto);

	void removeServiceFromProvider(Long providerId, Long serviceId);

	void addServiceToProvider(Long providerId, Long serviceId);

	Set<Service> getProviderServices(Long providerId);

	Page<ServiceProviderUpcomingBookingDTO> getUpcomingBookings(Long providerId, int page, int size);

	List<PopularServiceDTO> getPopularServices(Long providerId);

	ServiceProviderBookingResponseDTO getSingleBookingDetails(Long bookingId);

	ServiceProviderProfileUpdateDTO getProfile(Long providerId);

	void updateProfile(Long id, ServiceProviderProfileUpdateDTO profileDto, MultipartFile image);

	List<Booking_1_provider_detailsDTO>
    getProvidersByService(Long serviceId);
	
}
