package com.backend.service;

import com.backend.dtos.AuthResponseDTO;
import com.backend.dtos.LoginRequestDTO;
import com.backend.dtos.LoginResponseDTO;
import com.backend.dtos.RegisterAdminDTO;
import com.backend.dtos.RegisterCustomerDTO;
import com.backend.dtos.RegisterServiceProviderDTO;

public interface AuthService {

    String registerCustomer(RegisterCustomerDTO dto);

    String registerServiceProvider(RegisterServiceProviderDTO dto);

    String registerAdmin(RegisterAdminDTO dto);

    LoginResponseDTO login(LoginRequestDTO dto);
    
    
//    AuthResponseDTO login(AuthRequestDTO request);
}
