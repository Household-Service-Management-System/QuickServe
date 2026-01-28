package com.backend.service;

import com.backend.dtos.SlotResponseDTO;
import com.backend.repository.BookingRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

@Service
public class ProviderAvailabilityServiceImpl
        implements ProviderAvailabilityService {

    private final BookingRepository bookingRepository;

    public ProviderAvailabilityServiceImpl(
            BookingRepository bookingRepository
    ) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public List<SlotResponseDTO> getAvailableSlots(
            Long providerId,
            LocalDate date
    ) {

        // 🔹 Fetch booked times
        List<LocalDateTime> bookedTimes =
                bookingRepository.findBookedSlots(providerId, date);

        // 🔹 Convert booked times → booked hours
        Set<Integer> bookedHours = bookedTimes.stream()
                .map(LocalDateTime::getHour)
                .collect(Collectors.toSet());

        // 🔹 Fixed working hours
        LocalTime startTime = LocalTime.of(10, 0);
        LocalTime endTime = LocalTime.of(20, 0);

        long totalSlots =
                startTime.until(endTime, java.time.temporal.ChronoUnit.HOURS);

        // 🔹 Generate slots
        return LongStream.range(0, totalSlots)
                .mapToObj(i -> {
                    LocalTime slotStart = startTime.plusHours(i);
                    LocalTime slotEnd = slotStart.plusHours(1);

                    boolean available =
                            !bookedHours.contains(slotStart.getHour());

                    return new SlotResponseDTO(
                            slotStart.toString(),
                            slotEnd.toString(),
                            available
                    );
                })
                .toList();
    }
}