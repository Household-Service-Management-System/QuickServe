package com.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.dtos.BookingDTO;
import com.backend.dtos.BookingReqDTO;
import com.backend.dtos.CategoryResponseDTO;
import com.backend.dtos.CustomerDTO;
import com.backend.dtos.CustomerReqDTO;
import com.backend.dtos.DisputeDTO;
import com.backend.dtos.PaymentDTO;
import com.backend.dtos.ReviewDTO;
import com.backend.entities.Booking;
import com.backend.entities.BookingStatus;
import com.backend.entities.Dispute;
import com.backend.entities.Payment;
import com.backend.entities.Review;
import com.backend.entities.Role;
import com.backend.entities.ServiceProvider;
import com.backend.entities.Status;
import com.backend.entities.User;
import com.backend.repository.BookingRepository;
import com.backend.repository.DisputeRepository;
import com.backend.repository.PaymentRepository;
import com.backend.repository.ReviewRepository;
import com.backend.repository.ServiceCategoryRepository;
import com.backend.repository.ServiceProviderRepository;
import com.backend.repository.ServiceRepository;
import com.backend.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerServiceImp implements CustomerService {
	
	@Autowired
	private CloudinaryImageServiceImpl cloudinaryImageServiceImpl;
	
	@Autowired
	private ServiceCategoryRepository serviceCategoryRepository;
	
	public final UserRepository userReopsitory;
	public final BookingRepository bookingsRepository;
	public final ServiceRepository serviceRepository;
	public final ServiceProviderRepository serviceProviderRepository;
	public final PaymentRepository paymentRepository;
	public final ReviewRepository reviewRepository;
	public final DisputeRepository disputeRepository;
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
	public CustomerDTO putCutomerById(CustomerDTO customerDTO,Long id) {
		User user = userReopsitory.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
		modelMapper.map(customerDTO,user);
		
	 return customerDTO;
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
			dto.setBookingId(b.getId());

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
		dto.setBookingId(b.getId());

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

	@Override
	public List<PaymentDTO> getPaymnetsByUser(Long id) {
		List<Payment> payments = paymentRepository.findByBookingUserId(id);

	    return payments.stream().map(p -> {
	        PaymentDTO dto = new PaymentDTO();

	        dto.setPaymentId(p.getId());
	        dto.setBookingId(p.getBooking().getId());
	        dto.setAmount(p.getAmount());
	        dto.setMethod(p.getMethod());
	        dto.setTransactionId(p.getTransactionId());
	        dto.setStatus(p.getStatus());
	        dto.setCreatedOn(p.getCreatedOn());

	        dto.setServiceName(p.getBooking().getService().getName());
	        dto.setProviderName(
	            p.getBooking().getServiceProvider()
	             .getUser()
	             .getFirstName()
	             + " " +
	             p.getBooking().getServiceProvider()
	             .getUser()
	             .getLastName()
	        );

	        return dto;
	    }).toList();
	}

	@Override
	public PaymentDTO getPaymnetsById(Long id) {
		Payment payment= paymentRepository.findById(id).orElseThrow(()->new RuntimeException("Paymnet entry not found id:"+id));
		PaymentDTO dto= modelMapper.map(payment, PaymentDTO.class);
		 dto.setBookingId(payment.getBooking().getId());
		 return dto;
	}

	@Override
	public PaymentDTO getPaymnetsByBooking(Long id) {
		Payment payment=paymentRepository.findByBookingId(id).orElseThrow(()->new RuntimeException("Paymnet entry not found with booking id:"+id));
		PaymentDTO dto= modelMapper.map(payment, PaymentDTO.class);
		dto.setBookingId(payment.getBooking().getId());
		 return dto;
	}

	@Override
	public PaymentDTO postPaymnetsByBookingId(PaymentDTO paymentDTO) {
		Booking booking=bookingsRepository.findById(paymentDTO.getBookingId()).orElseThrow(()->new RuntimeException("Booking not found"));
		//Booking booking=paymentDTO.getBooking();
		Payment payment=new Payment();
		payment.setBooking(booking);
		payment.setAmount(paymentDTO.getAmount());
		payment.setMethod(paymentDTO.getMethod());
		payment.setTransactionId(paymentDTO.getTransactionId());
		payment.setStatus(paymentDTO.getStatus());
		paymentRepository.save(payment);
		PaymentDTO dto= modelMapper.map(payment, PaymentDTO.class);
		dto.setBookingId(paymentDTO.getBookingId());
		return dto;
	}

	
	
	
	
	
	
	
	@Override
	public List<ReviewDTO> getReviewsByUser(Long id) {
		List<Review> reviews=reviewRepository.findAllByBookingUserId(id);//.orElseThrow(()->new RuntimeException("Review not found"+id));
		return reviews.stream().map(r->
		{
			ReviewDTO dto=new ReviewDTO();
			dto.setBookingId(r.getBooking().getId());
			dto.setUserId(id);
			dto.setRating(r.getRating());
			dto.setComment(r.getComment());
			return dto;
		}).toList();
	}

	@Override
	public ReviewDTO getReviewsByBooking(Long id) {
		Review review=reviewRepository.findAllByBookingId(id);
		ReviewDTO dto=modelMapper.map(review, ReviewDTO.class);
		dto.setBookingId(id);
		dto.setUserId(review.getUser().getId());
		return dto;
	}

	@Override
	public ReviewDTO getReviewById(Long id) {
		Review review=reviewRepository.findById(id).orElseThrow(()->new RuntimeException("Review not found"));
		ReviewDTO dto=modelMapper.map(review, ReviewDTO.class);
		dto.setBookingId(review.getBooking().getId());
		dto.setUserId(review.getUser().getId());
		return dto;
	}

	@Override
	public ReviewDTO postReview(ReviewDTO reviewDTO) {
		Review review=new Review();
		modelMapper.map(reviewDTO, review);
		Booking booking=new Booking();
		booking.setId(reviewDTO.getBookingId());
		User user=new User();
		user.setId(reviewDTO.getUserId());
		review.setBooking(booking);
		review.setUser(user);
		reviewRepository.save(review);
		return reviewDTO;
	}

	@Override
	public ReviewDTO putReview(ReviewDTO reviewDTO,Long id) {
		Review review=reviewRepository.findById(id).orElseThrow(()->new RuntimeException("Review not found"));
		//modelMapper.map(reviewDTO, review);
		Booking booking=new Booking();
		booking.setId(reviewDTO.getBookingId());
		User user=new User();
		user.setId(reviewDTO.getUserId());
		review.setBooking(booking);
		review.setUser(user);
		review.setRating(reviewDTO.getRating());
		review.setComment(reviewDTO.getComment());
		reviewRepository.save(review);
		return reviewDTO;
	}
	
	
	
	
	

	@Override
	public List<DisputeDTO> getDisputeByUser(Long id) {
		List<Dispute> dispute=disputeRepository.findAllByRaisedById(id);//.orElseThrow(()->new RuntimeException("Dispute not found"+id));
		return dispute.stream().map(r->
		{
			DisputeDTO dto=new DisputeDTO();
			dto.setDisputeId(r.getId());
			dto.setBookingId(r.getBooking().getId());
			dto.setRaisedById(id);
			dto.setResolvedById(r.getResolvedBy().getId());
			dto.setStatus(r.getStatus());
			dto.setDescription(r.getDescription());
			return dto;
		}).toList();
	}

	@Override
	public DisputeDTO getDisputeByBooking(Long id) {
		Dispute dispute=disputeRepository.findByBookingId(id).orElseThrow(()-> new RuntimeException("Dispute for this booking id not found"+id));
		DisputeDTO dto=new DisputeDTO();
		dto.setDisputeId(dispute.getId());
		dto.setBookingId(id);
		dto.setRaisedById(dispute.getRaisedBy().getId());
		dto.setResolvedById(dispute.getResolvedBy().getId());
		dto.setStatus(dispute.getStatus());
		dto.setDescription(dispute.getDescription());
		return dto;
	}

	@Override
	public DisputeDTO getDisputeById(Long id) {
		Dispute dispute=disputeRepository.findById(id).orElseThrow(()-> new RuntimeException("Dispute for this booking id not found"+id));
		DisputeDTO dto=new DisputeDTO();
		dto.setDisputeId(dispute.getId());
		dto.setBookingId(dispute.getBooking().getId());
		dto.setRaisedById(id);
		dto.setResolvedById(dispute.getResolvedBy().getId());
		dto.setStatus(dispute.getStatus());
		dto.setDescription(dispute.getDescription());
		return dto;
	}

	@Override
	public DisputeDTO postDispute(DisputeDTO disputeDTO) {
		Dispute dispute=new Dispute();
		//modelMapper.map(reviewDTO, review);
		Booking booking=new Booking();
		booking.setId(disputeDTO.getBookingId());
		User user=new User();
		user.setId(disputeDTO.getRaisedById());
		User admin=new User();
		admin.setId(disputeDTO.getResolvedById());
		dispute.setId(disputeDTO.getDisputeId());
		dispute.setBooking(booking);
		dispute.setRaisedBy(user);
		dispute.setResolvedBy(admin);
		dispute.setStatus(disputeDTO.getStatus());
		dispute.setDescription(disputeDTO.getDescription());
		disputeRepository.save(dispute);
		return disputeDTO;
	}

	@Override
	public DisputeDTO putDispute(DisputeDTO disputeDTO, Long id) {
		Dispute dispute=disputeRepository.findById(id).orElseThrow(()-> new RuntimeException("Dispute for this booking id not found"+id));
		//modelMapper.map(reviewDTO, review);
//		Booking booking=new Booking();
//		booking.setId(disputeDTO.getBookingId());
//		User user=new User();
//		user.setId(disputeDTO.getRaisedById());
//		User admin=new User();
//		admin.setId(disputeDTO.getResolvedById());
//		dispute.setId(disputeDTO.getDisputeId());
//		dispute.setBooking(booking);
//		dispute.setRaisedBy(user);
//		dispute.setResolvedBy(admin);
		dispute.setStatus(disputeDTO.getStatus());
		dispute.setDescription(disputeDTO.getDescription());
		disputeRepository.save(dispute);
		return disputeDTO;
	}

	
	

	public List<CategoryResponseDTO> getAllCategories() {

	    return serviceCategoryRepository.findAll()
	            .stream()
	            .map(category -> {
	                CategoryResponseDTO dto = new CategoryResponseDTO();

	                dto.setCategoryId(category.getId());

	                dto.setName(category.getName());
	                dto.setDescription(category.getDescription());
	                dto.setServiceImage(category.getServiceImage());

	                return dto;
	            })
	            .toList();
	}

	@Override
	public User putCustomer(CustomerReqDTO customerReqDTO, MultipartFile image) {
		// 🔴 FETCH EXISTING USER
		User user = userReopsitory.findByEmail(customerReqDTO.getEmail())
				.orElseThrow(() -> new RuntimeException("User not found with email"));


		// map ONLY non-image fields
		modelMapper.map(customerReqDTO, user);
		user.setLastLogin(LocalDateTime.now());
		user.setIsActive(Status.ACTIVE);


		// 👇 Cloudinary upload
		if (image != null && !image.isEmpty()) {
		String imageUrl = null;
		try {
			imageUrl = cloudinaryImageServiceImpl.uploadImage(image);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		user.setProfileImage(imageUrl);
		}

		return userReopsitory.save(user);
	}
	
	
	
	
	
}
