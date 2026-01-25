package com.backend.service;

import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.backend.dtos.CustomerDTO;
import com.backend.dtos.CustomerReqDTO;
import com.backend.entities.Role;
import com.backend.entities.Status;
import com.backend.entities.User;
import com.backend.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerServiceImp implements CustomerService {
	
	public final UserRepository userReopsitory;
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
	
	
	
}
