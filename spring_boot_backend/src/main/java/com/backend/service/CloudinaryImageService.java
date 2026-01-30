package com.backend.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.backend.dtos.CloudinaryUploadResult;

public interface CloudinaryImageService {
	public Map<String, Object> upload(MultipartFile file);


	public String uploadImage(MultipartFile image);


	CloudinaryUploadResult uploadDocument(MultipartFile file) throws IOException;
		
}
