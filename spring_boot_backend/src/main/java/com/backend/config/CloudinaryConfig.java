package com.backend.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;

@Configuration
public class CloudinaryConfig {

	@Bean
	public Cloudinary getCloudinary() {
		Map<String, Object> config = new HashMap<>();
		config.put("cloud_name", "dbqf39erv");
		config.put("api_key","495714754738214");
		config.put("api_secret", "JP-L1gVeW200OplUTh0KPnMeRHA");
		config.put("secure", true);
		
		return new Cloudinary(config);
		
	}
}
