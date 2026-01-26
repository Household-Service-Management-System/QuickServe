package com.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow all endpoints in the application
        registry.addMapping("/**") 
                // Allow only your frontend origin
                .allowedOrigins("http://localhost:5173") 
                // Allow specific HTTP methods
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                // Allow all headers (important for future JWT headers)
                .allowedHeaders("*")
                // Allow credentials (needed later for cookies/sessions)
                .allowCredentials(true);
    }
}