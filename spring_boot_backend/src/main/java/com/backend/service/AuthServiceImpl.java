package com.backend.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.dtos.LoginRequestDTO;
import com.backend.dtos.LoginResponseDTO;
import com.backend.dtos.RegisterAdminDTO;
import com.backend.dtos.RegisterCustomerDTO;
import com.backend.dtos.RegisterServiceProviderDTO;
import com.backend.entities.Role;
import com.backend.entities.ServiceProvider;
import com.backend.entities.Status;
import com.backend.entities.User;
import com.backend.repository.ServiceProviderRepository;
import com.backend.repository.UserRepository;
import com.backend.security.JwtUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final ServiceProviderRepository serviceProviderRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    // ---------------- CUSTOMER REGISTER ----------------
    @Override
    public String registerCustomer(RegisterCustomerDTO dto) {

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(Role.ROLE_USER);
        user.setIsActive(Status.ACTIVE);
        user.setLastLogin(LocalDateTime.now());

        userRepository.save(user);

        return "Customer registered successfully";
    }

    // ---------------- SERVICE PROVIDER REGISTER ----------------
    @Override
    public String registerServiceProvider(RegisterServiceProviderDTO dto) {

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(Role.ROLE_SERVICEPROVIDER);
        user.setIsActive(Status.ACTIVE);
        user.setLastLogin(LocalDateTime.now());

        userRepository.save(user);

        ServiceProvider provider = new ServiceProvider();
        provider.setUser(user);
        provider.setGovIdType(dto.getGovIdType());
        provider.setGovId(dto.getGovId());
        provider.setVerificationStatus(false);

        serviceProviderRepository.save(provider);

        return "Service Provider registered successfully";
    }

    @Override
    public String registerAdmin(RegisterAdminDTO dto) {

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Admin already exists");
        }

        User admin = new User();
        admin.setFirstName(dto.getFirstName());
        admin.setLastName(dto.getLastName());
        admin.setEmail(dto.getEmail());
        admin.setPhone(dto.getPhone());
        admin.setPassword(passwordEncoder.encode(dto.getPassword()));
        admin.setRole(Role.ROLE_ADMIN);
        admin.setIsActive(Status.ACTIVE);

        userRepository.save(admin);

        return "Admin registered successfully";
    }

    
    
    // ---------------- LOGIN ----------------
    @Override
    public LoginResponseDTO login(LoginRequestDTO dto) {

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user);

        return new LoginResponseDTO(token, user.getRole().name());
    }
}

