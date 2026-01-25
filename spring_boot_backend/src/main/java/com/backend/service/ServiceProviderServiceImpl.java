package com.backend.service;

import com.backend.dtos.ServiceProviderDashboardDTO;
import com.backend.dtos.ServiceProviderDashboardDTO;
import com.backend.dtos.ServiceProviderBookingResponseDTO;
import com.backend.entities.BookingStatus;
import com.backend.repository.BookingRepository;
import com.backend.repository.ServiceRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class ServiceProviderServiceImpl implements ServiceProviderService {

	@Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private ServiceRepository serviceRepo;

    @Override
    public ServiceProviderDashboardDTO getDashboardSummary(Long providerId) {
        Double revenue = bookingRepo.sumRevenueByServiceProviderId(providerId);
        long totalServices = serviceRepo.countByServiceProvidersId(providerId);
        long completed = bookingRepo.countByServiceProviderIdAndStatus(providerId, BookingStatus.COMPLETED);
        long pending = bookingRepo.countByServiceProviderIdAndStatus(providerId, BookingStatus.PENDING);

        return new ServiceProviderDashboardDTO(
            revenue != null ? revenue : 0.0, 
            totalServices, 
            completed, 
            pending
        );
    }

    @Override
    public List<ServiceProviderBookingResponseDTO> getAllBookings(Long providerId) {
        // Implementation logic we discussed for the table
        return bookingRepo.findByServiceProviderId(providerId).stream()
            .map(booking -> new ServiceProviderBookingResponseDTO(
                booking.getId(),
                booking.getUser().getFirstName() + " " + booking.getUser().getLastName(),
                booking.getService().getName(),
                booking.getScheduledAt(),
                booking.getPrice(),
                booking.getStatus()
            )).collect(Collectors.toList());
    }

    @Override
    public void updateBookingStatus(Long bookingId, String status) {
        // We will implement the Accept/Reject logic here next!
    }

}
