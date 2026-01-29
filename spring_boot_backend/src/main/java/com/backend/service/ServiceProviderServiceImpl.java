package com.backend.service;

import com.backend.dtos.ServiceProviderDashboardDTO;
import com.backend.dtos.ServiceProviderProfileUpdateDTO;
import com.backend.dtos.ServiceProviderDashboardDTO;
import com.backend.custom_exceptions.ResourceNotFoundException;
import com.backend.dtos.Booking_1_provider_detailsDTO;
import com.backend.dtos.PaymentHistoryDTO;
import com.backend.dtos.PopularServiceDTO;
import com.backend.dtos.ServiceProviderBookingResponseDTO;
import com.backend.entities.Booking;
import com.backend.entities.BookingStatus;
import com.backend.entities.ServiceProvider;
import com.backend.entities.User;
import com.backend.repository.BookingRepository;
import com.backend.repository.PaymentRepository;
import com.backend.repository.ServiceProviderRepository;
import com.backend.repository.ServiceRepository;
import com.backend.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import com.backend.dtos.ServiceProviderUpcomingBookingDTO;
import com.backend.entities.Booking;


@Service
@Transactional
public class ServiceProviderServiceImpl implements ServiceProviderService {

	@Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private ServiceRepository serviceRepo;

    @Autowired
	private PaymentRepository paymentRepo;

    @Autowired 
    private UserRepository userRepo;

    @Autowired
	private ServiceProviderRepository serviceProviderRepo; 
    
    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private CloudinaryImageServiceImpl cloudinaryImageServiceImpl;
    
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

    //just for DashBoard I created it 
    @Override
    public Page<ServiceProviderUpcomingBookingDTO> getUpcomingBookings(
            Long providerId, int page, int size) {

        Pageable pageable = PageRequest.of(
            page, size, Sort.by("scheduledAt").ascending()
        );

        Page<Booking> bookings =
            bookingRepo.findByServiceProviderId(providerId, pageable);

        return bookings.map(booking -> {

            LocalDateTime start = booking.getScheduledAt();
            LocalDateTime end = start.plusHours(1);

            return new ServiceProviderUpcomingBookingDTO(
                booking.getId(),
                booking.getUser().getFullName(),
                booking.getService().getName(),
                start.toLocalDate(),
                start.toLocalTime() + " - " + end.toLocalTime(),
                booking.getStatus()
            );
        });
    }

    @Override
    public List<PopularServiceDTO> getPopularServices(Long providerId) {
        return bookingRepo.findPopularServices(providerId);
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
    public ServiceProviderBookingResponseDTO getSingleBookingDetails(Long bookingId) {

        Booking booking = bookingRepo.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        return new ServiceProviderBookingResponseDTO(
            booking.getId(),
            booking.getUser().getFullName(),
            booking.getService().getName(),
            booking.getScheduledAt(),
            booking.getPrice(),
            booking.getStatus()
        );
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
    
    
//    @Override
//    public ServiceProviderProfileUpdateDTO getProfile(Long providerId) {
//
//        User provider = userRepo.findById(providerId)
//            .orElseThrow(() -> new RuntimeException("Service provider not found"));
//
//        ServiceProviderProfileUpdateDTO dto = new ServiceProviderProfileUpdateDTO();
//
//        dto.setFirstName(provider.getFirstName());
//        dto.setLastName(provider.getLastName());
//        dto.setPhone(provider.getPhone());
//        dto.setStreet(provider.getStreet());
//        dto.setCity(provider.getCity());
//        dto.setState(provider.getState());
//        dto.setPincode(provider.getPincode());
//        dto.setDob(provider.getDob());
//        dto.setGender(provider.getGender());
//
//        return dto;
//    }

    @Override
    @Transactional
    public void updateProfile(Long userId, ServiceProviderProfileUpdateDTO dto) {
        User user = userRepo.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

       
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhone(dto.getPhone());
        user.setStreet(dto.getStreet());
        user.setCity(dto.getCity());
        user.setState(dto.getState());
        user.setPincode(dto.getPincode());
        user.setDob(dto.getDob());
        user.setGender(dto.getGender());
        
        userRepo.save(user);
    }
    
    
    @Override
    public void addServiceToProvider(Long providerId, Long serviceId) {
        ServiceProvider provider = serviceProviderRepo.findById(providerId)
            .orElseThrow(() -> new ResourceNotFoundException("Provider not found"));
        
        com.backend.entities.Service service = serviceRepo.findById(serviceId)
            .orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        // Add to the HashSet defined in your entity
        provider.getServices().add(service);
        serviceProviderRepo.save(provider);
    }

    
    //UI - Manage Services , Button associated - Delete Action
    @Override
    public void removeServiceFromProvider(Long providerId, Long serviceId) {
        ServiceProvider provider = serviceProviderRepo.findById(providerId)
            .orElseThrow(() -> new ResourceNotFoundException("Provider not found"));
        
        // Remove by matching ID within the Set
        provider.getServices().removeIf(s -> s.getId().equals(serviceId));
        serviceProviderRepo.save(provider);
    }

   
    @Override
    public Set<com.backend.entities.Service> getProviderServices(Long providerId) {
        ServiceProvider provider = serviceProviderRepo.findByIdWithServices(providerId)
            .orElseThrow(() -> new ResourceNotFoundException("Provider not found"));
        return provider.getServices();
    }

    @Override
    public void updateProfile(Long id,
            ServiceProviderProfileUpdateDTO dto,
            MultipartFile image) {

        ServiceProvider provider = serviceProviderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Service Provider not found"));

        User user = provider.getUser();

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhone(dto.getPhone());
        user.setStreet(dto.getStreet());
        user.setCity(dto.getCity());
        user.setState(dto.getState());
        user.setPincode(dto.getPincode());
        user.setDob(dto.getDob());
        user.setGender(dto.getGender());

        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryImageServiceImpl.uploadImage(image);
            user.setProfileImage(imageUrl);
        }

        userRepo.save(user);
    }
    
    @Override
    public ServiceProviderProfileUpdateDTO getProfile(Long id) {

        ServiceProvider provider = serviceProviderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        User user = provider.getUser();

        ServiceProviderProfileUpdateDTO dto = new ServiceProviderProfileUpdateDTO();
        modelMapper.map(user, dto);
        dto.setProfileImage(user.getProfileImage());

        return dto;
    }
    
    // Booking service 
    @Override
    public List<Booking_1_provider_detailsDTO>
    getProvidersByService(Long serviceId) {


    return serviceProviderRepo
    .findProvidersByServiceId(serviceId);
    }

}
