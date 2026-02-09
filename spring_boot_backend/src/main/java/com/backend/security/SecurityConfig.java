 package com.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    	
    	http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> cors.configurationSource(corsConfigurationSource))
   // 🔥 ENABLE CORS
        .formLogin(form -> form.disable())
        .httpBasic(basic -> basic.disable())
        .sessionManagement(session ->
        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    )
    .authorizeHttpRequests(auth -> auth

        .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
        
        // PUBLIC
        .requestMatchers("/auth/**","/services/**","/providers/**","/service-categories/**").permitAll()

        //  CUSTOMER
        .requestMatchers("/customer/**","/bookings/**").hasRole("USER")

        //SERVICE PROVIDER
        .requestMatchers("/service-provider/**").hasRole("SERVICEPROVIDER")

        //  ADMIN
        .requestMatchers("/admin/**").hasRole("ADMIN")

        //  EVERYTHING ELSE
        .anyRequest().authenticated()
    )
    .addFilterBefore(
        jwtAuthenticationFilter,
        UsernamePasswordAuthenticationFilter.class
    );

        return http.build();
    }

}

