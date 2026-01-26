package com.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.BookingReqDTO;
import com.backend.dtos.CustomerDTO;
import com.backend.dtos.CustomerReqDTO;
import com.backend.dtos.PaymentDTO;
import com.backend.entities.BookingStatus;
import com.backend.entities.Status;
import com.backend.service.CustomerService;

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
	
	@PostMapping("/profile/register")
	public ResponseEntity<?> putCustomer(@RequestBody CustomerReqDTO customerReqDTO)
	{
		System.out.println("Email controller customerDTO saving: " + customerReqDTO.toString());
		return ResponseEntity.status(HttpStatus.CREATED)//SC 201
		.body(customerService.putCustomer(customerReqDTO));
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
	
	
	
}
