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

import com.backend.dtos.CustomerDTO;
import com.backend.dtos.CustomerReqDTO;
import com.backend.service.CustomerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {

	public final CustomerService customerService;
	
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
}
