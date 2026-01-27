package com.backend.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;



@Service
public class CloudinaryImageServiceImpl implements CloudinaryImageService {

	@Autowired
	private Cloudinary cloudinary;
	
	@Override
	public Map<String, Object> upload(MultipartFile file) {
		try {
			return cloudinary.uploader().upload(file.getBytes(),Map.of());
			
		} catch (IOException e) {
			throw new RuntimeException("Image Uploading fail...", e);
			
		}

	}

	public String uploadImage(MultipartFile file) {
	    try {
	        Map<?, ?> uploadResult = cloudinary.uploader().upload(
	            file.getBytes(),
	            Map.of("folder", "quickserve/users")
	        );
	        return uploadResult.get("secure_url").toString();
	    } catch (Exception e) {
	        throw new RuntimeException("Image upload failed");
	    }
	}

}
