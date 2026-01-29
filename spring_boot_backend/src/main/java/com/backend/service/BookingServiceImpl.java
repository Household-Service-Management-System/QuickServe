package com.backend.service;


import com.backend.dtos.BookingRequestFinalDTO;
import com.backend.dtos.BookingResponseDTO;
import com.backend.entities.Booking;
import com.backend.entities.BookingStatus;
import com.backend.entities.Service;
import com.backend.entities.ServiceProvider;
import com.backend.entities.User;

import com.backend.repository.BookingRepository;
import com.backend.repository.ServiceProviderRepository;
import com.backend.repository.ServiceRepository;
import com.backend.repository.UserRepository;
import jakarta.transaction.Transactional;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@org.springframework.stereotype.Service
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final ServiceRepository serviceRepository;
    private final ServiceProviderRepository providerRepository;
    private final UserRepository userRepository;

    public BookingServiceImpl(
            BookingRepository bookingRepository,
            ServiceRepository serviceRepository,
            ServiceProviderRepository providerRepository,
            UserRepository userRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.serviceRepository = serviceRepository;
        this.providerRepository = providerRepository;
        this.userRepository = userRepository;
    }

    @Override
    public BookingResponseDTO createBooking(BookingRequestFinalDTO request) {

        LocalDate date = LocalDate.parse(request.getDate());
        LocalTime time = LocalTime.parse(request.getStartTime());
        LocalDateTime scheduledAt = LocalDateTime.of(date, time);

        List<java.sql.Timestamp> bookedTimestamps =
        		bookingRepository.findBookedSlots(
        		request.getProviderId(),
        		date
        		);


        		List<LocalDateTime> bookedSlots = bookedTimestamps.stream()
        		.map(java.sql.Timestamp::toLocalDateTime)
        		.toList();

        boolean slotTaken = bookedSlots.stream()
                .anyMatch(dt -> dt.getHour() == time.getHour());

        if (slotTaken) {
            throw new RuntimeException("Slot already booked");
        }

        Service service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));

        ServiceProvider provider = providerRepository.findById(request.getProviderId())
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = new Booking();
        booking.setService(service);
        booking.setServiceProvider(provider);
        booking.setUser(user);
        booking.setScheduledAt(scheduledAt);
        booking.setPrice(service.getBasePrice());
        booking.setStatus(BookingStatus.PENDING);

        Booking saved = bookingRepository.save(booking);

        BookingResponseDTO response = new BookingResponseDTO();
        response.setBookingId(saved.getId());
        response.setServiceId(service.getId());
        response.setProviderId(provider.getId());
        response.setUserId(user.getId());
        response.setScheduledAt(saved.getScheduledAt());
        response.setPrice(saved.getPrice());
        response.setStatus(saved.getStatus());

        return response;
    }
}