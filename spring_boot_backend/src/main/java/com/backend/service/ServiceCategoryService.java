package com.backend.service;

import java.util.List;

import com.backend.dtos.ServiceCategoryDTO;

public interface ServiceCategoryService {
    List<ServiceCategoryDTO> getAllCategories();
}
