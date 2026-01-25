package com.backend.service;

import org.springframework.stereotype.Service;

import com.backend.dtos.CustomerDTO;
import com.backend.dtos.CustomerReqDTO;
import com.backend.entities.User;

public interface CustomerService {

	CustomerDTO getCutomerById(Long id);

	User putCustomer(CustomerReqDTO customerReqDTO);
}
