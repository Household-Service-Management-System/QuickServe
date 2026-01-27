package com.backend.service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryImageService {
	public Map<String, Object> upload(MultipartFile file);
}
