package com.backend.controller;

import java.util.Map;

import org.apache.hc.core5.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.service.CloudinaryImageService;

@RestController
@RequestMapping("/cloudinary/upload")
public class CloudinaryImageUploadController {
	
	@Autowired
	private CloudinaryImageService cloudinaryImageService;
	
	@PostMapping
	public ResponseEntity<Map<String, Object>> uploadImage(@RequestParam("image") MultipartFile file){
		Map<String, Object> data = cloudinaryImageService.upload(file);
		return ResponseEntity.ok(data);
	}
}
