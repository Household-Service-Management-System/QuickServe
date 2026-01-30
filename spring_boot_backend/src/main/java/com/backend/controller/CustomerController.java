package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.dtos.BookingReqDTO;
import com.backend.dtos.CategoryResponseDTO;
import com.backend.dtos.CustomerDTO;
import com.backend.dtos.CustomerReqDTO;
import com.backend.dtos.DisputeDTO;
import com.backend.dtos.PaymentDTO;
import com.backend.dtos.ReviewDTO;
import com.backend.entities.BookingStatus;
import com.backend.entities.ServiceProvider;
import com.backend.entities.Status;
import com.backend.entities.User;
import com.backend.repository.UserRepository;
import com.backend.service.CustomerService;
import com.backend.service.CustomerServiceImp;

import ch.qos.logback.core.net.SyslogOutputStream;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {

	@Autowired
	private CustomerServiceImp customerServiceImp;
	
	public final CustomerService customerService;
	
	public  UserRepository userRepository;
	
	
	private Long getLoggedInUserId(Authentication authentication) {
	    Claims claims = (Claims) authentication.getPrincipal();
	    return ((Number) claims.get("userId")).longValue();
	}
	
	
	//profile apis
	
//	@GetMapping("/profile")
//	public ResponseEntity<?> getCutomerById(Authentication authentication)
//	{
//		Long userId=getLoggedInUserId( authentication);
//		//Long id=user.getId();
//		return ResponseEntity.ok(customerService.getCutomerById(userId));
//	}
	
	
	
	@PostMapping(value = "/profile/update", consumes = "multipart/form-data")
	public ResponseEntity<?> updateCustomer(
			@ModelAttribute CustomerReqDTO customerReqDTO,
	        @RequestPart(value = "image", required = false) MultipartFile image
	) {
	    return ResponseEntity.ok(
	            customerService.putCustomer(customerReqDTO, image)
	    );
	}
	
	@GetMapping("/allServiceCategories")
	public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
		return ResponseEntity.ok(customerServiceImp.getAllCategories());
	}
	
	
	
	@GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        Long userId = getLoggedInUserId(authentication);
        return ResponseEntity.ok(customerService.getCutomerById(userId));
    }

    @PutMapping(value = "/profile", consumes = "multipart/form-data")
    public ResponseEntity<?> updateProfile(
            Authentication authentication,
            @RequestPart("data") CustomerReqDTO customerReqDTO,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        Long userId = getLoggedInUserId(authentication);
        customerReqDTO.setUserId(userId);   // 🔐 ENFORCED
        return ResponseEntity.ok(customerService.putCustomer(customerReqDTO, image));
    }

	
	
	
	//Booking apis
////	@GetMapping("/bookings/{id}")
////	public ResponseEntity<?> getBookingsByUser(@PathVariable Long id)
////	{
////		return ResponseEntity.ok(customerService.getBookingsByUser(id));
////	}
//	
//	@GetMapping("/bookings")
//	public ResponseEntity<?> getBookingsByUser(Authentication authentication) {
//	    Long userId = getLoggedInUserId(authentication);
//	    return ResponseEntity.ok(customerService.getBookingsByUser(userId));
//	}
//	
//	
//	@GetMapping("/booking/bookingId/{id}")
//	public ResponseEntity<?> getBookingsByBookingId(@PathVariable Long id)
//	{
//		return ResponseEntity.ok(customerService.getBookingsByBookingId(id));
//	}
//	
//	
//	@PostMapping("/booking")
//	public ResponseEntity<?> bookService(
//	        @RequestBody BookingReqDTO bookingReqDTO,
//	        Authentication authentication) {
//
//	    Long userId = getLoggedInUserId(authentication);
//	    bookingReqDTO.setUser_id(userId);   // 🔐 force ownership
//
//	    return ResponseEntity.status(HttpStatus.CREATED)
//	            .body(customerService.bookService(bookingReqDTO));
//	}
//	
//	
//	
//	@PutMapping("/booking/{id}/{status}")
//	public ResponseEntity<?> bookingStatusChange(
//	        @PathVariable Long id,
//	        @PathVariable BookingStatus status,
//	        Authentication authentication) {
//
//	    Long userId = getLoggedInUserId(authentication);
//	    // (optional) validate booking belongs to user inside service
//
//	    return ResponseEntity.ok(
//	            customerService.bookingStatusChange(id, status)
//	    );
//	}

    
    @GetMapping("/bookings")
    public ResponseEntity<?> getBookings(Authentication authentication) {
        Long userId = getLoggedInUserId(authentication);
        return ResponseEntity.ok(customerService.getBookingsByUser(userId));
    }

    @GetMapping("/booking/bookingId/{bookingId}")
    public ResponseEntity<?> getBookingById(@PathVariable Long bookingId) {
        return ResponseEntity.ok(customerService.getBookingsByBookingId(bookingId));
    }

    @PostMapping("/booking")
    public ResponseEntity<?> createBooking(
            @RequestBody BookingReqDTO bookingReqDTO,
            Authentication authentication
    ) {
        Long userId = getLoggedInUserId(authentication);
        bookingReqDTO.setUser_id(userId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(customerService.bookService(bookingReqDTO));
    }

    @PutMapping("/booking/{bookingId}/{status}")
    public ResponseEntity<?> updateBookingStatus(
            @PathVariable Long bookingId,
            @PathVariable BookingStatus status
    ) {
        return ResponseEntity.ok(
                customerService.bookingStatusChange(bookingId, status)
        );
    }

	
	
	
	
	//Payment apis
	@GetMapping("/payments")
    public ResponseEntity<?> getPayments(Authentication authentication) {
        Long userId = getLoggedInUserId(authentication);
        return ResponseEntity.ok(customerService.getPaymnetsByUser(userId));
    }

    @GetMapping("/payment/{paymentId}")
    public ResponseEntity<?> getPaymentById(@PathVariable Long paymentId) {
        return ResponseEntity.ok(customerService.getPaymnetsById(paymentId));
    }

    @GetMapping("/paymentByBooking/{bookingId}")
    public ResponseEntity<?> getPaymentByBooking(@PathVariable Long bookingId) {
        return ResponseEntity.ok(customerService.getPaymnetsByBooking(bookingId));
    }

    @PostMapping("/paymentAddByBooking")
    public ResponseEntity<?> addPayment(
            @RequestBody PaymentDTO paymentDTO,
            Authentication authentication
    ) {
        Long userId = getLoggedInUserId(authentication);
        // optional ownership check in service
        return ResponseEntity.ok(customerService.postPaymnetsByBookingId(paymentDTO));
    }

	
	
	
	
	//Reviews apis
	@GetMapping("/ReviewsByUser/{id}")
	public ResponseEntity<?> getReviewsByUser(@PathVariable Long id)
	{
		return ResponseEntity.ok(customerService.getReviewsByUser(id));
	}
	
	@GetMapping("/ReviewsByBooking/{id}")
	public ResponseEntity<?> getReviewsByBooking(@PathVariable Long id)
	{
		return ResponseEntity.ok(customerService.getReviewsByBooking(id));
	}
	
	@GetMapping("/ReviewsById/{id}")
	public ResponseEntity<?> getReviewById(@PathVariable Long id)
	{
		return ResponseEntity.ok(customerService.getReviewById(id));
	}
	
	@PostMapping("/ReviewCreate")
	public ResponseEntity<?> postReview(@RequestBody ReviewDTO reviewDTO)
	{
		return ResponseEntity.ok(customerService.postReview(reviewDTO));
	}
	
	@PutMapping("/ReviewUpdate/{id}")
	public ResponseEntity<?> putReview(@RequestBody ReviewDTO reviewDTO,@PathVariable Long id)
	{
		return ResponseEntity.ok(customerService.putReview(reviewDTO,id));
	}
	
	
	
	
	
	
	//Dispute apis
	@GetMapping("/disputes")
    public ResponseEntity<?> getDisputes(Authentication authentication) {
        Long userId = getLoggedInUserId(authentication);
        return ResponseEntity.ok(customerService.getDisputeByUser(userId));
    }

    @GetMapping("/DisputeByBooking/{bookingId}")
    public ResponseEntity<?> getDisputeByBooking(@PathVariable Long bookingId) {
        return ResponseEntity.ok(customerService.getDisputeByBooking(bookingId));
    }

    @PostMapping("/DisputeCreate")
    public ResponseEntity<?> createDispute(
            @RequestBody DisputeDTO disputeDTO,
            Authentication authentication
    ) {
        Long userId = getLoggedInUserId(authentication);
        disputeDTO.setRaisedById(userId);
        return ResponseEntity.ok(customerService.postDispute(disputeDTO));
    }

    @PutMapping("/DisputeUpdate/{disputeId}")
    public ResponseEntity<?> updateDispute(
            @RequestBody DisputeDTO disputeDTO,
            @PathVariable Long disputeId
    ) {
        return ResponseEntity.ok(customerService.putDispute(disputeDTO, disputeId));
    }

	
}
