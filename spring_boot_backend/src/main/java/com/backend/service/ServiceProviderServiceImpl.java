package com.backend.service;

import com.backend.dtos.ServiceProviderDashboardDTO;
import com.backend.dtos.ServiceProviderDashboardDTO;
import com.backend.custom_exceptions.ResourceNotFoundException;
import com.backend.dtos.PaymentHistoryDTO;
import com.backend.dtos.ServiceProviderBookingResponseDTO;
import com.backend.entities.Booking;
import com.backend.entities.BookingStatus;
import com.backend.repository.BookingRepository;
import com.backend.repository.PaymentRepository;
import com.backend.repository.ServiceRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class ServiceProviderServiceImpl implements ServiceProviderService {

	@Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private ServiceRepository serviceRepo;

    @Autowired
	private PaymentRepository paymentRepo;

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
    public void acceptBooking(Long bookingId) {
        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));
        booking.setStatus(BookingStatus.ACCEPTED);
        bookingRepo.save(booking);
    }

    
    @Override
    public void rejectBooking(Long bookingId, String reason) {
        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));
        booking.setStatus(BookingStatus.REJECTED);
        booking.setRejectionReason(reason);
        bookingRepo.save(booking);
    }
    
    
    @Override
    public List<PaymentHistoryDTO> getPaymentHistory(Long providerId) {
        return paymentRepo.findPaymentHistoryByProviderId(providerId);
    }


    @Override
    public List<PaymentHistoryDTO> getFilteredPayments(Long providerId, String search, String filter) {
        LocalDateTime startDate;
        LocalDateTime now = LocalDateTime.now();

        switch (filter) {
            case "Last 7 days":
                startDate = now.minusDays(7);
                break;
            case "This month":
                startDate = now.withDayOfMonth(1).withHour(0).withMinute(0);
                break;
            case "All":
            default:
                startDate = now.minusYears(10); // Effectively "All"
                break;
        }

        // If search is empty, pass null so the query ignores it
        String searchPattern = (search == null || search.trim().isEmpty()) ? null : search;
        
        return paymentRepo.findFilteredPayments(providerId, searchPattern, startDate);
    }
}
