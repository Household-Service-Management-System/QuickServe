package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.backend.entities.Status;
import com.backend.service.CustomerService;
import com.backend.service.CustomerServiceImp;

import ch.qos.logback.core.net.SyslogOutputStream;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {

	
	
	public final CustomerService customerService;
	
	
	//profile apis
	@GetMapping("/profile/{id}")
	public ResponseEntity<?> getCutomerById(@PathVariable Long id)
	{
		return ResponseEntity.ok(customerService.getCutomerById(id));
	}
	
	// New profile register using image
	@PostMapping(value = "/profile/update", consumes = "multipart/form-data")
	public ResponseEntity<?> updateCustomer(
			@ModelAttribute CustomerReqDTO customerReqDTO,
	        @RequestPart(value = "image", required = false) MultipartFile image
	) {
	    return ResponseEntity.ok(
	            customerService.putCustomer(customerReqDTO, image)
	    );
	}
	
	
	
	
	
	@PutMapping("/profile/{id}")
	public ResponseEntity<?> putCutomerById(@RequestBody CustomerDTO customerDTO ,@PathVariable Long id)
	{
		return ResponseEntity.ok(customerService.putCutomerById(customerDTO,id));
	}
	
	
	
	//Booking apis
	@GetMapping("/bookings/{id}")
	public ResponseEntity<?> getBookingsByUser(@PathVariable Long id)
	{
		return ResponseEntity.ok(customerService.getBookingsByUser(id));
	}
	
	
	@GetMapping("/booking/bookingId/{id}")
	public ResponseEntity<?> getBookingsByBookingId(@PathVariable Long id)
	{
		return ResponseEntity.ok(customerService.getBookingsByBookingId(id));
	}
	
	@PostMapping("/booking")
	public ResponseEntity<?> bookService(@RequestBody BookingReqDTO bookingReqDTO)
	{
		return ResponseEntity.status(HttpStatus.CREATED).body(customerService.bookService(bookingReqDTO));
	}
	
	@PutMapping("/booking/{id}/{status}")
	public ResponseEntity<?> bookingStatusChange(@PathVariable Long id,@PathVariable BookingStatus status)
	{
		return ResponseEntity.status(HttpStatus.CREATED).body(customerService.bookingStatusChange(id,status));
	}
	
	
	
	
	
	//Payment apis
	@GetMapping("/paymentByUser/{id}")
	public ResponseEntity<?> getPaymnetsByUser(@PathVariable Long id)
	{
		return ResponseEntity.ok(customerService.getPaymnetsByUser(id));
	}
	
	
	@GetMapping("/payment/{id}")
	public ResponseEntity<?> getPaymnetsById(@PathVariable Long id)
	{
		return ResponseEntity.ok(customerService.getPaymnetsById(id));
	}
	
	@GetMapping("/paymentByBooking/{id}")
	public ResponseEntity<?> getPaymnetsByBooking(@PathVariable Long id)
	{
		return ResponseEntity.ok(customerService.getPaymnetsByBooking(id));
	}
	
	@PostMapping("/paymentAddByBooking")
	public ResponseEntity<?> postPaymnetsByBookingId(@RequestBody PaymentDTO paymentDTO)
	{
		System.out.println(paymentDTO.toString());
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
		@GetMapping("/DisputeByUser/{id}")
		public ResponseEntity<?> getDisputeByUser(@PathVariable Long id)
		{
			return ResponseEntity.ok(customerService.getDisputeByUser(id));
		}
		
		@GetMapping("/DisputeByBooking/{id}")
		public ResponseEntity<?> getDisputeByBooking(@PathVariable Long id)
		{
			return ResponseEntity.ok(customerService.getDisputeByBooking(id));
		}
		
		@GetMapping("/DisputeById/{id}")
		public ResponseEntity<?> getDisputeById(@PathVariable Long id)
		{
			return ResponseEntity.ok(customerService.getDisputeById(id));
		}
		
		@PostMapping("/DisputeCreate")
		public ResponseEntity<?> postDispute(@RequestBody DisputeDTO disputeDTO)
		{
			return ResponseEntity.ok(customerService.postDispute(disputeDTO));
		}
		
		@PutMapping("/DisputeUpdate/{id}")
		public ResponseEntity<?> putDispute(@RequestBody DisputeDTO disputeDTO,@PathVariable Long id)
		{
			return ResponseEntity.ok(customerService.putDispute(disputeDTO,id));
		}
	
}
