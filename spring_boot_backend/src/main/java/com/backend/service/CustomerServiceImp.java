package com.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.backend.dtos.BookingDTO;
import com.backend.dtos.BookingReqDTO;
import com.backend.dtos.CustomerDTO;
import com.backend.dtos.CustomerReqDTO;
import com.backend.entities.Booking;
import com.backend.entities.BookingStatus;
import com.backend.entities.Role;
import com.backend.entities.ServiceProvider;
import com.backend.entities.Status;
import com.backend.entities.User;
import com.backend.repository.BookingRepository;
import com.backend.repository.ServiceProviderRepository;
import com.backend.repository.ServiceRepository;
import com.backend.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerServiceImp implements CustomerService {
	
	public final UserRepository userReopsitory;
	public final BookingRepository bookingsRepository;
	public final ServiceRepository serviceRepository;
	public final ServiceProviderRepository serviceProviderRepository;
	private final ModelMapper modelMapper;
	
	@Override
	public CustomerDTO getCutomerById(Long id) {
		 User user = userReopsitory.findById(id)
	                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));		
		 return modelMapper.map(user,CustomerDTO.class);
	}

	@Override
	public User putCustomer(CustomerReqDTO customerReqDTO) {
		User user=new User();
		modelMapper.map(customerReqDTO, user);
		user.setRole(Role.ROLE_USER);
		user.setLastLogin(LocalDateTime.now());
		user.setIsActive(Status.ACTIVE); 
		return userReopsitory.save(user);
	}

	@Override
	public List<BookingDTO> getBookingsByUser(Long id) {
		List<Booking> list=bookingsRepository.findAllByUserId(id);
		return list.stream().map(b->
		{
			BookingDTO dto=new BookingDTO();
			dto.setService(b.getService().getName());
			dto.setServiceProvider(b.getServiceProvider().getUser().getFirstName()+b.getServiceProvider().getUser().getLastName());
			dto.setPrice(b.getPrice());
			dto.setScheduledAt(b.getScheduledAt());
			dto.setStatus(b.getStatus());
			dto.setRejectionReason(b.getRejectionReason());
			 return dto;
		}
		).toList();
//		return list.stream()
//			    .map(b -> modelMapper.map(b, BookingDTO.class))
//			    .toList();
	}

	@Override
	public BookingDTO getBookingsByBookingId(Long id) {
		Booking b=bookingsRepository.findById(id).orElseThrow(() -> new RuntimeException("Boooking not found with ID: " + id));
		BookingDTO dto=new BookingDTO();
		dto.setService(b.getService().getName());
		dto.setServiceProvider(b.getServiceProvider().getUser().getFirstName()+b.getServiceProvider().getUser().getLastName());
		dto.setPrice(b.getPrice());
		dto.setScheduledAt(b.getScheduledAt());
		dto.setStatus(b.getStatus());
		dto.setRejectionReason(b.getRejectionReason());
		 return dto;
	}

	@Override
	public BookingDTO bookService(BookingReqDTO bookingReqDTO) {
		User user=userReopsitory.findById(bookingReqDTO.getUser_id()).orElseThrow(()->new RuntimeException("User not found"));
		com.backend.entities.Service service=serviceRepository.findById(bookingReqDTO.getService_id()).orElseThrow(()->new RuntimeException("Service not found"));
		ServiceProvider serviceProvider=serviceProviderRepository.findById(bookingReqDTO.getServiceProvider_id()).orElseThrow(()->new RuntimeException("Provider not found"));
		Booking b=new Booking();
		b.setUser(user);
		b.setService(service);
		b.setServiceProvider(serviceProvider);
		b.setScheduledAt(bookingReqDTO.getScheduledAt());
		b.setPrice(bookingReqDTO.getPrice());
		b.setStatus(bookingReqDTO.getStatus());
		b.setStatus(bookingReqDTO.getStatus());
		b.setRejectionReason(bookingReqDTO.getRejectionReason());
		
		bookingsRepository.save(b);
		
		return modelMapper.map(b, BookingDTO.class);
	}

	@Override
	public BookingDTO bookingStatusChange(Long id,BookingStatus status) {
		 Booking booking=bookingsRepository.findById(id).orElseThrow(()->new RuntimeException("Booking not found"));
		 booking.setStatus(status);
		 bookingsRepository.save(booking);
		return modelMapper.map(booking, BookingDTO.class);
	}
	
	
	
	
	
}
