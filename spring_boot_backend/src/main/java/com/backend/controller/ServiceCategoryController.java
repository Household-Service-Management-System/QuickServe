package com.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.ServiceCategoryDTO;
import com.backend.service.ServiceCategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/service-categories")
@RequiredArgsConstructor
public class ServiceCategoryController {
	
	
	 private final ServiceCategoryService categoryService;

	    @GetMapping
	    public ResponseEntity<List<ServiceCategoryDTO>> getAllCategories() {
	        return ResponseEntity.ok(
	            categoryService.getAllCategories()
	        );
	    }
}
